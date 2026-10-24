-- ==============================================================================
-- RESTABLECER CONTRASEÑAS DE TODOS LOS ALUMNOS A "sabcpi"
-- Activa la pantalla obligatoria para definir nueva contraseña en su primer inicio.
-- ==============================================================================

update public.alumnos
set password_hash = extensions.crypt('sabcpi', extensions.gen_salt('bf', 10)),
    debe_cambiar_password = true;
