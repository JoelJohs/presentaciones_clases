-- ==============================================================================
-- MIGRACIÓN: SOPORTE DE CORREO ELECTRÓNICO Y LOGIN HÍBRIDO PARA ALUMNOS
-- Permite acceso por Correo, Username o Matrícula
-- Migración idempotente (segura para correr múltiples veces)
-- ==============================================================================

-- 1. Agregar columna email a la tabla public.alumnos
alter table public.alumnos add column if not exists email citext unique;
create index if not exists alumnos_email_idx on public.alumnos (email);

-- 2. Actualizar función RPC login_alumno para admitir correo, username o matrícula
create or replace function public.login_alumno(p_username text, p_password text)
returns json
language plpgsql security definer set search_path = public, extensions
as $$
declare
  v_alumno public.alumnos%rowtype;
  v_clean text;
begin
  v_clean := lower(trim(p_username));

  select * into v_alumno from public.alumnos
  where (username = v_clean or email = v_clean or lower(matricula) = v_clean)
    and activo = true
  limit 1;

  if not found then
    perform extensions.crypt(p_password, extensions.gen_salt('bf', 8));
    return json_build_object('ok', false, 'error', 'Usuario o contraseña incorrectos');
  end if;

  if v_alumno.password_hash = extensions.crypt(p_password, v_alumno.password_hash) then
    return json_build_object(
      'ok', true,
      'alumno_id', v_alumno.id,
      'username', v_alumno.username,
      'email', v_alumno.email,
      'nombre_completo', v_alumno.nombre_completo,
      'clase', coalesce(v_alumno.clase, v_alumno.grupo),
      'grupo', coalesce(v_alumno.grupo, v_alumno.clase),
      'matricula', v_alumno.matricula,
      'debe_cambiar_password', v_alumno.debe_cambiar_password
    );
  else
    return json_build_object('ok', false, 'error', 'Usuario o contraseña incorrectos');
  end if;
end;
$$;

-- 2.1 Eliminar columnas de bloqueo de la tabla
alter table public.alumnos drop column if exists intentos_fallidos;
alter table public.alumnos drop column if exists bloqueado_hasta;

-- 3. Actualizar función RPC obtener_alumnos para incluir email
create or replace function public.obtener_alumnos()
returns table (
  id uuid,
  username citext,
  email citext,
  nombre_completo text,
  clase text,
  grupo text,
  matricula text,
  debe_cambiar_password boolean
)
language sql security definer set search_path = public
as $$
  select id, username, email, nombre_completo, clase, grupo, matricula, debe_cambiar_password
  from public.alumnos
  where activo = true
  order by matricula asc;
$$;

-- 4. Función RPC para asignar o migrar correo de forma parcial e idempotente
create or replace function public.asignar_correo_alumno(p_identificador text, p_correo text, p_sobrescribir boolean default false)
returns json
language plpgsql security definer set search_path = public
as $$
declare
  v_alumno public.alumnos%rowtype;
  v_clean_id text := lower(trim(p_identificador));
  v_clean_email text := lower(trim(p_correo));
begin
  select * into v_alumno from public.alumnos
  where lower(username) = v_clean_id or lower(matricula) = v_clean_id;

  if not found then
    return json_build_object('ok', false, 'status', 'not_found', 'error', 'Alumno no encontrado');
  end if;

  if v_alumno.email is not null and not p_sobrescribir then
    return json_build_object('ok', true, 'status', 'skipped_has_email', 'current_email', v_alumno.email);
  end if;

  update public.alumnos set email = v_clean_email where id = v_alumno.id;
  return json_build_object('ok', true, 'status', 'updated', 'email', v_clean_email);
end;
$$;

grant execute on function public.login_alumno(text, text) to anon, authenticated;
grant execute on function public.obtener_alumnos() to anon, authenticated;
grant execute on function public.asignar_correo_alumno(text, text, boolean) to anon, authenticated;
