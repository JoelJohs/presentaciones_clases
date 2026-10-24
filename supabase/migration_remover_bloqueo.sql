-- ==============================================================================
-- MIGRACIÓN: ELIMINAR CAMPOS DE BLOQUEO Y RESETEAR CONTRASEÑAS A "sabcpi"
-- 1. Elimina físicamente las columnas de bloqueo en public.alumnos
-- 2. Restablece contraseñas a "sabcpi" para que inicien con correo y cambien clave
-- 3. Actualiza las funciones login_alumno y cambiar_password
-- ==============================================================================

-- 1. Eliminar definitivamente las columnas de bloqueo de la tabla
alter table public.alumnos drop column if exists intentos_fallidos;
alter table public.alumnos drop column if exists bloqueado_hasta;

-- 2. Restablecer contraseñas de todos los alumnos a "sabcpi" y obligar a cambiarla
update public.alumnos
set password_hash = extensions.crypt('sabcpi', extensions.gen_salt('bf', 10)),
    debe_cambiar_password = true
where clase <> 'domingo' and grupo <> 'domingo';

-- 2.1 Asegurar alumno de prueba domingo con contraseña "domcpi" y correo de ejemplo
insert into public.alumnos (username, email, nombre_completo, password_hash, debe_cambiar_password, clase, grupo, matricula)
values ('alumno.domingo', 'prueba.domingo@example.com', 'Alumno Prueba Domingo', extensions.crypt('domcpi', extensions.gen_salt('bf', 10)), true, 'domingo', 'domingo', 'DOM-01')
on conflict (username) do update set
  email = excluded.email,
  nombre_completo = excluded.nombre_completo,
  password_hash = excluded.password_hash,
  debe_cambiar_password = excluded.debe_cambiar_password,
  clase = excluded.clase,
  grupo = excluded.grupo,
  matricula = excluded.matricula;

-- 3. Actualizar función login_alumno para autenticar limpiamente sin bloqueo
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

-- 4. Actualizar función cambiar_password para no tocar columnas eliminadas
create or replace function public.cambiar_password(p_alumno_id uuid, p_nueva text)
returns json
language plpgsql security definer set search_path = public, extensions
as $$
declare
  v_len int := char_length(p_nueva);
begin
  if v_len < 8 then
    return json_build_object('ok', false, 'error', 'La nueva contraseña debe tener mínimo 8 caracteres');
  end if;

  update public.alumnos
    set password_hash = extensions.crypt(p_nueva, extensions.gen_salt('bf', 10)),
        debe_cambiar_password = false
    where id = p_alumno_id;

  if not found then
    return json_build_object('ok', false, 'error', 'Alumno no encontrado');
  end if;

  return json_build_object('ok', true);
end;
$$;

grant execute on function public.login_alumno(text, text) to anon, authenticated;
grant execute on function public.cambiar_password(uuid, text) to anon, authenticated;
