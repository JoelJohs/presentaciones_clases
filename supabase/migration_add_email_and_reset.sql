-- ==============================================================================
-- CPI: SCRIPT DE MIGRACIÓN PARA SUPABASE SQL EDITOR
-- Agrega columna email, remueve bloqueos, actualiza correos y resetea contraseñas
-- ==============================================================================

-- 1. Extensiones requeridas
create extension if not exists pgcrypto with schema extensions;
create extension if not exists citext;

-- 2. Asegurar que la columna email existe en public.alumnos
alter table public.alumnos add column if not exists email citext;
create unique index if not exists alumnos_email_unique_idx on public.alumnos (lower(email)) where email is not null;

-- 3. Eliminar definitivamente las columnas de bloqueo de cuenta
alter table public.alumnos drop column if exists intentos_fallidos;
alter table public.alumnos drop column if exists bloqueado_hasta;

-- 4. Actualizar correos de todos los alumnos registrados en el CSV
update public.alumnos set email = 'alvaradoerandi40@gmail.com' where lower(username) = 'erandi.alvarado' or lower(matricula) = 'sab-01';
update public.alumnos set email = 'cecivaldez823@gmail.com' where lower(username) = 'camila.lopez' or lower(matricula) = 'sab-02';
update public.alumnos set email = 'alexandermadrigal207@gmail.com' where lower(username) = 'fernando.madrigal' or lower(matricula) = 'sab-03';
update public.alumnos set email = 'mhelenjudith@gmail.com' where lower(username) = 'helen.moreno' or lower(matricula) = 'sab-04';
update public.alumnos set email = 'negretemariana448@gmail.com' where lower(username) = 'mariana.negrete' or lower(matricula) = 'sab-05';
update public.alumnos set email = 'alejandrin1109@gmail.com' where lower(username) = 'alejandro.rangel' or lower(matricula) = 'sab-07';
update public.alumnos set email = 'eduardosotozavala81@gmail.com' where lower(username) = 'jose.soto' or lower(matricula) = 'sab-08';
update public.alumnos set email = 'jazminaguilera2007@gmail.com' where lower(username) = 'ana.aguilera' or lower(matricula) = 'sab-09';
update public.alumnos set email = 'wuendymaciel12@gmail.com' where lower(username) = 'erika.maciel' or lower(matricula) = 'sab-12';
update public.alumnos set email = 'prueba.domingo@example.com' where lower(username) = 'alumno.domingo' or lower(matricula) = 'dom-01';

-- 5. Restablecer contraseñas provisionales y obligar cambio en 1er login
-- Sábado -> clave provisional: sabcpi
update public.alumnos 
set password_hash = extensions.crypt('sabcpi', extensions.gen_salt('bf', 8)),
    debe_cambiar_password = true
where coalesce(grupo, clase) = 'sabado';

-- Domingo -> clave provisional: domcpi
update public.alumnos 
set password_hash = extensions.crypt('domcpi', extensions.gen_salt('bf', 8)),
    debe_cambiar_password = true
where coalesce(grupo, clase) = 'domingo';

-- 6. Función RPC login_alumno actualizada (soporta username, email y matrícula; sin bloqueo)
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

grant execute on function public.login_alumno(text, text) to anon, authenticated;
