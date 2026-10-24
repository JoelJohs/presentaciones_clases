-- ==============================================================================
-- RESTABLECER CONTRASEÑAS DE TODOS LOS ALUMNOS A "sabcpi"
-- Activa la pantalla obligatoria para definir nueva contraseña en su primer inicio.
-- Limpia bloqueos y contadores de intentos fallidos.
-- ==============================================================================

update public.alumnos
set password_hash = extensions.crypt('sabcpi', extensions.gen_salt('bf', 10)),
    debe_cambiar_password = true,
    bloqueado_hasta = null,
    intentos_fallidos = 0;
