-- ==============================================================================
-- MIGRACIÓN: ELIMINAR BLOQUEO TEMPORAL DE CUENTAS POR INTENTOS FALLIDOS
-- Permite que los alumnos intenten ingresar sin que su cuenta quede bloqueada.
-- Desbloquea de inmediato a todos los alumnos bloqueados actualmente.
-- ==============================================================================

-- 1. Desbloquear a todos los alumnos existentes y limpiar contadores de fallos
update public.alumnos
set bloqueado_hasta = null,
    intentos_fallidos = 0;

-- 2. Actualizar función login_alumno para no bloquear nunca la cuenta
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
