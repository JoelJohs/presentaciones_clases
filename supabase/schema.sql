-- ==============================================================================
-- CPI PLATAFORMA DE ESTUDIOS - ESQUEMA COMPLETO PARA SUPABASE
-- ==============================================================================
-- Ejecuta este script en el SQL Editor de tu proyecto en Supabase (https://supabase.com).
-- Incluye:
-- 1. Extensiones citext y pgcrypto para hashing seguro dentro de Postgres (bcrypt).
-- 2. Tabla alumnos (con usuario insensible a mayúsculas, nombre completo y control de 1er login).
-- 3. Catálogo de los 12 módulos de informática.
-- 4. Tabla de calificaciones (1 fila por alumno por módulo, con escala 0-100 o 0-10).
-- 5. Funciones RPC con seguridad DEFINER para login, cambio de contraseña y carga masiva desde Excel.
-- 6. Políticas de seguridad RLS.
-- ==============================================================================

-- 1. Extensiones requeridas
create extension if not exists pgcrypto with schema extensions;
create extension if not exists citext;

-- 2. Tabla de alumnos (autenticación propia con bcrypt en BD)
create table if not exists public.alumnos (
  id uuid primary key default gen_random_uuid(),
  
  -- Username para login (único, insensible a mayúsculas y minúsculas: juan, maria.g, etc.)
  username citext unique not null check (username ~ '^[a-z0-9._-]{3,30}$'),
  
  -- Nombre completo para mostrar en la interfaz y en su boleta
  nombre_completo text not null check (char_length(nombre_completo) >= 3),
  
  -- Hash bcrypt generado por Postgres con pgcrypto, nunca viaja en texto plano
  password_hash text not null,
  
  -- true cuando recién es creado, obliga a cambiar su contraseña en su primer inicio
  debe_cambiar_password boolean not null default true,
  
  -- Clase o turno asignado ('sabado' o 'domingo')
  clase text not null default 'sabado' check (clase in ('sabado', 'domingo')),
  grupo text not null default 'sabado' check (grupo in ('sabado', 'domingo')),
  
  -- Matrícula o identificador de control escolar
  matricula text,
  
  -- Control de seguridad anti fuerza bruta
  intentos_fallidos int not null default 0,
  bloqueado_hasta timestamptz,
  
  activo boolean not null default true,
  created_at timestamptz not null default now()
);

-- 3. Tabla de sesiones activas (para rastreo y revocación si es necesario)
create table if not exists public.sesiones (
  id uuid primary key default gen_random_uuid(),
  alumno_id uuid not null references public.alumnos(id) on delete cascade,
  creada_en timestamptz not null default now(),
  expira_en timestamptz not null default (now() + interval '7 days'),
  revocada boolean not null default false
);

create index if not exists sesiones_alumno_idx on public.sesiones (alumno_id);

-- 4. Catálogo de los 11 módulos formativos de CPI (54 Semanas)
create table if not exists public.modulos (
  id smallint primary key check (id between 1 and 11),
  nombre text not null unique,
  orden smallint not null unique
);

insert into public.modulos (id, nombre, orden) values
  (1,  'Hardware, Sistemas Operativos y Linux Mint', 1),
  (2,  'Productividad, Ofimática y Colaboración en la Nube', 2),
  (3,  'Multimedia Práctica — Imagen y Video', 3),
  (4,  'Redes, Conectividad e Internet Seguro', 4),
  (5,  'Programación I — Lógica Algorítmica y Python', 5),
  (6,  'Programación II — Apps Gráficas, Videojuegos y Distribución', 6),
  (7,  'Bases de Datos y Persistencia Local (SQLite)', 7),
  (8,  'Desarrollo Web — Frontend Esencial y Frameworks', 8),
  (9,  'Backend Conceptual, APIs y Automatización', 9),
  (10, 'Ingeniería de Software, Arquitectura y Ciberseguridad', 10),
  (11, 'Proyecto Final Integrador y Cierre Profesional', 11)
on conflict (id) do update set nombre = excluded.nombre, orden = excluded.orden;

-- 5. Tabla de calificaciones (1 calificación final por alumno por módulo)
create table if not exists public.calificaciones (
  alumno_id uuid not null references public.alumnos(id) on delete cascade,
  modulo_id smallint not null references public.modulos(id),
  
  -- Admite escala 0-100 o 0-10 (ej. 95.50 o 9.50)
  calificacion numeric(5,2) not null check (calificacion between 0 and 100),
  
  subida_en timestamptz not null default now(),
  actualizada_en timestamptz not null default now(),
  
  primary key (alumno_id, modulo_id)
);

create index if not exists calificaciones_modulo_idx on public.calificaciones (modulo_id);
create index if not exists calificaciones_alumno_idx on public.calificaciones (alumno_id);

-- 6. Tabla de grupos y semana de avance escolar en vivo (Semanas 1 a 54)
create table if not exists public.grupos (
  id text primary key check (id in ('sabado', 'domingo')),
  nombre text not null,
  dia text not null,
  horario text not null default '09:00 – 11:00 h',
  semana_actual smallint not null default 1 check (semana_actual between 1 and 54),
  actualizada_en timestamptz not null default now()
);

insert into public.grupos (id, nombre, dia, horario, semana_actual) values
  ('sabado', 'Clase Sábado', 'Sábado', '09:00 – 11:00 h', 4),
  ('domingo', 'Clase Domingo', 'Domingo', '09:00 – 11:00 h', 1)
on conflict (id) do nothing;

-- ==============================================================================
-- FUNCIONES RPC DE SEGURIDAD DEFINER
-- ==============================================================================

-- Función 0: Consulta de grupos y avance semanal
create or replace function public.obtener_grupos()
returns json
language plpgsql security definer set search_path = public
as $$
declare
  v_res json;
begin
  select json_agg(
    json_build_object(
      'id', g.id,
      'nombre', g.nombre,
      'dia', g.dia,
      'horario', g.horario,
      'semana_actual', g.semana_actual,
      'actualizada_en', g.actualizada_en
    )
  ) into v_res
  from public.grupos g;

  return coalesce(v_res, '[]'::json);
end;
$$;

-- Función 0.1: Actualizar semana activa de un grupo (control escolar en vivo)
create or replace function public.actualizar_semana_grupo(p_grupo text, p_semana int)
returns json
language plpgsql security definer set search_path = public
as $$
declare
  v_semana int;
  v_id text;
begin
  v_id := lower(trim(p_grupo));
  v_semana := greatest(1, least(54, p_semana));

  update public.grupos
  set semana_actual = v_semana,
      actualizada_en = now()
  where id = v_id;

  if not found then
    insert into public.grupos (id, nombre, dia, horario, semana_actual)
    values (
      v_id,
      case when v_id = 'sabado' then 'Clase Sábado' else 'Clase Domingo' end,
      case when v_id = 'sabado' then 'Sábado' else 'Domingo' end,
      '09:00 – 13:00 h',
      v_semana
    );
  end if;

  return json_build_object('ok', true, 'grupo', v_id, 'semana_actual', v_semana);
end;
$$;

grant execute on function public.obtener_grupos() to anon, authenticated;
grant execute on function public.actualizar_semana_grupo(text, int) to anon, authenticated;

-- Función 1: Login del Alumno (verifica hash dentro de Postgres con anti brute-force)
create or replace function public.login_alumno(p_username text, p_password text)
returns json
language plpgsql security definer set search_path = public, extensions
as $$
declare
  v_alumno public.alumnos%rowtype;
begin
  select * into v_alumno from public.alumnos
  where username = p_username and activo = true;

  if not found then
    -- Quema tiempo equivalente para evitar enumeración de cuentas
    perform extensions.crypt(p_password, extensions.gen_salt('bf', 8));
    return json_build_object('ok', false, 'error', 'Usuario o contraseña incorrectos');
  end if;

  if v_alumno.bloqueado_hasta is not null and v_alumno.bloqueado_hasta > now() then
    return json_build_object('ok', false, 'error', 'Cuenta bloqueada temporalmente por intentos fallidos. Intenta más tarde.');
  end if;

  if v_alumno.password_hash = extensions.crypt(p_password, v_alumno.password_hash) then
    -- Login exitoso: restablece intentos fallidos
    update public.alumnos
      set intentos_fallidos = 0, bloqueado_hasta = null
      where id = v_alumno.id;

    return json_build_object(
      'ok', true,
      'alumno_id', v_alumno.id,
      'username', v_alumno.username,
      'nombre_completo', v_alumno.nombre_completo,
      'clase', coalesce(v_alumno.clase, v_alumno.grupo),
      'grupo', coalesce(v_alumno.grupo, v_alumno.clase),
      'matricula', v_alumno.matricula,
      'debe_cambiar_password', v_alumno.debe_cambiar_password
    );
  else
    -- Contraseña inválida: incrementa contador y bloquea tras 5 fallos
    update public.alumnos
      set intentos_fallidos = intentos_fallidos + 1,
          bloqueado_hasta = case
            when intentos_fallidos + 1 >= 5 then now() + interval '15 minutes'
            else null
          end
      where id = v_alumno.id;

    return json_build_object('ok', false, 'error', 'Usuario o contraseña incorrectos');
  end if;
end;
$$;

-- Función 2: Cambio de contraseña obligatorio en 1er login
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
        debe_cambiar_password = false,
        intentos_fallidos = 0,
        bloqueado_hasta = null
    where id = p_alumno_id;

  if not found then
    return json_build_object('ok', false, 'error', 'Alumno no encontrado');
  end if;

  return json_build_object('ok', true);
end;
$$;

-- Función 3: Alta de alumno (para el panel docente)
create or replace function public.crear_alumno(
  p_username text,
  p_nombre_completo text,
  p_password_inicial text default 'sabcpi',
  p_clase text default 'sabado',
  p_matricula text default null
)
returns json
language plpgsql security definer set search_path = public, extensions
as $$
declare
  v_id uuid;
  v_clase text := case when lower(p_clase) in ('sabado', 'sábado') then 'sabado' else 'domingo' end;
begin
  insert into public.alumnos (
    username,
    nombre_completo,
    password_hash,
    debe_cambiar_password,
    clase,
    grupo,
    matricula
  ) values (
    p_username,
    p_nombre_completo,
    extensions.crypt(p_password_inicial, extensions.gen_salt('bf', 10)),
    true,
    v_clase,
    v_clase,
    p_matricula
  )
  returning id into v_id;

  return json_build_object('ok', true, 'alumno_id', v_id);
exception
  when unique_violation then
    return json_build_object('ok', false, 'error', 'El nombre de usuario ya está registrado');
  when others then
    return json_build_object('ok', false, 'error', SQLERRM);
end;
$$;

-- Función 4: Carga o edición individual de calificación (por UUID, username o matrícula)
create or replace function public.guardar_calificacion_alumno(
  p_identificador text,
  p_modulo_id smallint,
  p_calificacion numeric
)
returns json
language plpgsql security definer set search_path = public
as $$
declare
  v_alumno_id uuid;
begin
  -- Intentar buscar por UUID si el formato coincide
  if p_identificador ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' then
    select id into v_alumno_id from public.alumnos where id = p_identificador::uuid;
  end if;

  -- Si no se encontró, buscar por username
  if v_alumno_id is null then
    select id into v_alumno_id from public.alumnos where username = lower(p_identificador);
  end if;

  -- Si aún no, buscar por matrícula
  if v_alumno_id is null then
    select id into v_alumno_id from public.alumnos where matricula = p_identificador;
  end if;

  if v_alumno_id is null then
    return json_build_object('ok', false, 'error', 'Alumno no encontrado');
  end if;

  if p_calificacion is null then
    delete from public.calificaciones
    where alumno_id = v_alumno_id and modulo_id = p_modulo_id;
  else
    insert into public.calificaciones (alumno_id, modulo_id, calificacion, actualizada_en)
    values (v_alumno_id, p_modulo_id, p_calificacion, now())
    on conflict (alumno_id, modulo_id)
    do update set calificacion = excluded.calificacion, actualizada_en = now();
  end if;

  return json_build_object('ok', true, 'alumno_id', v_alumno_id);
end;
$$;

-- Función 5: Listar alumnos de forma segura (sin exponer password_hash)
create or replace function public.obtener_alumnos()
returns table (
  id uuid,
  username citext,
  nombre_completo text,
  clase text,
  grupo text,
  matricula text,
  debe_cambiar_password boolean
)
language sql security definer set search_path = public
as $$
  select id, username, nombre_completo, clase, grupo, matricula, debe_cambiar_password
  from public.alumnos
  where activo = true
  order by matricula asc;
$$;

-- Función 6: Obtener todas las calificaciones
create or replace function public.obtener_calificaciones()
returns table (
  alumno_id uuid,
  modulo_id smallint,
  calificacion numeric
)
language sql security definer set search_path = public
as $$
  select alumno_id, modulo_id, calificacion
  from public.calificaciones;
$$;

-- Función 7: Carga masiva de calificaciones por username (desde Excel / JSON)
create or replace function public.upsert_calificaciones_batch(p_filas jsonb)
returns json
language plpgsql security definer set search_path = public
as $$
declare
  v_fila jsonb;
  v_alumno_id uuid;
  v_insertados int := 0;
begin
  for v_fila in select * from jsonb_array_elements(p_filas)
  loop
    select id into v_alumno_id from public.alumnos
    where username = (v_fila->>'username');

    if v_alumno_id is not null then
      insert into public.calificaciones (
        alumno_id,
        modulo_id,
        calificacion,
        actualizada_en
      ) values (
        v_alumno_id,
        (v_fila->>'modulo_id')::smallint,
        (v_fila->>'calificacion')::numeric,
        now()
      )
      on conflict (alumno_id, modulo_id)
      do update set
        calificacion = excluded.calificacion,
        actualizada_en = now();

      v_insertados := v_insertados + 1;
    end if;
  end loop;

  return json_build_object('ok', true, 'registros_procesados', v_insertados);
end;
$$;

-- ==============================================================================
-- POLÍTICAS DE ACCESO (ROW LEVEL SECURITY)
-- ==============================================================================
alter table public.alumnos enable row level security;
alter table public.modulos enable row level security;
alter table public.calificaciones enable row level security;
alter table public.sesiones enable row level security;

-- Módulos: lectura pública
drop policy if exists "Modulos lectura publica" on public.modulos;
create policy "Modulos lectura publica" on public.modulos
  for select using (true);

-- Alumnos: lectura pública para listar en el portal, gestión docente
drop policy if exists "Docente gestiona alumnos" on public.alumnos;
drop policy if exists "Lectura de alumnos publica" on public.alumnos;
create policy "Lectura de alumnos publica" on public.alumnos
  for select using (true);
create policy "Docente gestiona alumnos" on public.alumnos
  for all using (auth.role() = 'authenticated');

-- Calificaciones: lectura y modificación accesible para el portal
drop policy if exists "Docente gestiona calificaciones" on public.calificaciones;
drop policy if exists "Lectura de calificaciones" on public.calificaciones;
create policy "Lectura de calificaciones" on public.calificaciones
  for select using (true);
create policy "Docente gestiona calificaciones" on public.calificaciones
  for all using (true);

-- Permisos de ejecución de las RPCs
grant execute on function public.login_alumno(text, text) to anon, authenticated;
grant execute on function public.cambiar_password(uuid, text) to anon, authenticated;
grant execute on function public.guardar_calificacion_alumno(text, smallint, numeric) to anon, authenticated;
grant execute on function public.obtener_alumnos() to anon, authenticated;
grant execute on function public.obtener_calificaciones() to anon, authenticated;
grant execute on function public.crear_alumno(text, text, text, text, text) to anon, authenticated;
grant execute on function public.upsert_calificaciones_batch(jsonb) to anon, authenticated;

-- ==============================================================================
-- INSERCIÓN INICIAL: GRUPO SÁBADO (11 ALUMNOS, INCLUYE 1 DE PRUEBA)
-- ==============================================================================
-- Contraseña provisional: "sabcpi" (obliga a cambiar contraseña en su primer inicio)
insert into public.alumnos (username, nombre_completo, password_hash, debe_cambiar_password, clase, grupo, matricula) values
  ('erandi.alvarado', 'Erandi Alvarado Morales', extensions.crypt('sabcpi', extensions.gen_salt('bf', 10)), true, 'sabado', 'sabado', 'SAB-01'),
  ('camila.lopez', 'Camila Lopez Valdez', extensions.crypt('sabcpi', extensions.gen_salt('bf', 10)), true, 'sabado', 'sabado', 'SAB-02'),
  ('fernando.madrigal', 'Fernando Alexander Madrigal Saldaña', extensions.crypt('sabcpi', extensions.gen_salt('bf', 10)), true, 'sabado', 'sabado', 'SAB-03'),
  ('helen.moreno', 'Helen Judith Moreno Bernal', extensions.crypt('sabcpi', extensions.gen_salt('bf', 10)), true, 'sabado', 'sabado', 'SAB-04'),
  ('mariana.negrete', 'Mariana Guadalupe Negrete Aguilera', extensions.crypt('sabcpi', extensions.gen_salt('bf', 10)), true, 'sabado', 'sabado', 'SAB-05'),
  ('elizabeth.negrete', 'Elizabeth Negrete', extensions.crypt('sabcpi', extensions.gen_salt('bf', 10)), true, 'sabado', 'sabado', 'SAB-06'),
  ('alejandro.rangel', 'Alejandro Rangel Valdez', extensions.crypt('sabcpi', extensions.gen_salt('bf', 10)), true, 'sabado', 'sabado', 'SAB-07'),
  ('jose.soto', 'Jose Eduardo Soto Zavala', extensions.crypt('sabcpi', extensions.gen_salt('bf', 10)), true, 'sabado', 'sabado', 'SAB-08'),
  ('ana.aguilera', 'Ana Jazmin Aguilera Alvarado', extensions.crypt('sabcpi', extensions.gen_salt('bf', 10)), true, 'sabado', 'sabado', 'SAB-09'),
  ('mateo.urueta', 'Mateo Urueta Nara', extensions.crypt('sabcpi', extensions.gen_salt('bf', 10)), true, 'sabado', 'sabado', 'SAB-10'),
  ('alumno.prueba', 'Alumno Prueba (Test)', extensions.crypt('sabcpi', extensions.gen_salt('bf', 10)), true, 'sabado', 'sabado', 'SAB-11')
on conflict (username) do update set
  nombre_completo = excluded.nombre_completo,
  password_hash = excluded.password_hash,
  debe_cambiar_password = excluded.debe_cambiar_password,
  clase = excluded.clase,
  grupo = excluded.grupo,
  matricula = excluded.matricula;

-- ==============================================================================
-- 6. GESTIÓN DE TAREAS SEMANALES (TEÓRICAS Y DE INVESTIGACIÓN)
-- ==============================================================================
create table if not exists public.tareas (
  id text primary key,
  grupo text not null check (grupo in ('sabado', 'domingo')),
  semana int not null check (semana >= 1 and semana <= 54),
  titulo text not null,
  descripcion text not null,
  fecha_entrega text,
  actualizada_en timestamptz not null default now(),
  constraint uq_tarea_grupo_semana unique (grupo, semana)
);

alter table public.tareas enable row level security;

drop policy if exists "Lectura publica de tareas" on public.tareas;
create policy "Lectura publica de tareas" on public.tareas for select using (true);

drop policy if exists "Modificacion total de tareas" on public.tareas;
create policy "Modificacion total de tareas" on public.tareas for all using (true) with check (true);

create or replace function public.obtener_tareas()
returns table (
  id text,
  grupo text,
  semana int,
  titulo text,
  descripcion text,
  fecha_entrega text,
  actualizada_en timestamptz
)
language sql security definer as $$
  select id, grupo, semana, titulo, descripcion, fecha_entrega, actualizada_en
  from public.tareas
  order by semana asc;
$$;

create or replace function public.guardar_tarea(
  p_grupo text,
  p_semana int,
  p_titulo text,
  p_descripcion text,
  p_fecha_entrega text
)
returns json language plpgsql security definer as $$
declare
  v_id text;
  v_grupo text;
  v_semana int;
begin
  v_grupo := lower(trim(p_grupo));
  v_semana := greatest(1, least(54, p_semana));
  v_id := v_grupo || '-' || v_semana;

  insert into public.tareas (id, grupo, semana, titulo, descripcion, fecha_entrega, actualizada_en)
  values (v_id, v_grupo, v_semana, trim(p_titulo), trim(p_descripcion), nullif(trim(p_fecha_entrega), ''), now())
  on conflict (id) do update set
    titulo = excluded.titulo,
    descripcion = excluded.descripcion,
    fecha_entrega = excluded.fecha_entrega,
    actualizada_en = now();

  return json_build_object('ok', true, 'id', v_id);
end;
$$;

create or replace function public.eliminar_tarea(
  p_grupo text,
  p_semana int
)
returns json language plpgsql security definer as $$
declare
  v_id text;
begin
  v_id := lower(trim(p_grupo)) || '-' || p_semana;
  delete from public.tareas where id = v_id;
  return json_build_object('ok', true, 'deleted_id', v_id);
end;
$$;

grant execute on function public.obtener_tareas() to anon, authenticated;
grant execute on function public.guardar_tarea(text, int, text, text, text) to anon, authenticated;
grant execute on function public.eliminar_tarea(text, int) to anon, authenticated;
