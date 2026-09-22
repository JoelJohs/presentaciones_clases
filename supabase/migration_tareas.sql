-- ==============================================================================
-- MIGRACIÓN: Tareas Semanales (Teóricas y de Investigación)
-- ==============================================================================

-- 1. Tabla de tareas semanales
create table if not exists public.tareas (
  id text primary key, -- ej: 'sabado-4' o 'domingo-1'
  grupo text not null check (grupo in ('sabado', 'domingo')),
  semana int not null check (semana >= 1 and semana <= 54),
  titulo text not null,
  descripcion text not null,
  fecha_entrega text,
  actualizada_en timestamptz not null default now(),
  constraint uq_tarea_grupo_semana unique (grupo, semana)
);

-- 2. Habilitar RLS
alter table public.tareas enable row level security;

drop policy if exists "Lectura publica de tareas" on public.tareas;
create policy "Lectura publica de tareas"
  on public.tareas for select
  to anon, authenticated
  using (true);

drop policy if exists "Modificacion total de tareas" on public.tareas;
create policy "Modificacion total de tareas"
  on public.tareas for all
  to anon, authenticated
  using (true)
  with check (true);

-- 3. Tarea inicial de ejemplo para semana 4 (Sábado)
insert into public.tareas (id, grupo, semana, titulo, descripcion, fecha_entrega)
values (
  'sabado-4',
  'sabado',
  4,
  'Investigación: Comandos de Diagnóstico en Linux',
  'Investiga la función técnica de los comandos "lshw", "free -h", "df -h" y "top". Anota en tu libreta técnica para qué sirve cada uno y prepara una explicación breve sobre cómo interpretar el uso de memoria RAM para la ronda de preguntas en clase.',
  'Inicio de la próxima sesión (09:00 h)'
)
on conflict (id) do update set
  titulo = excluded.titulo,
  descripcion = excluded.descripcion,
  fecha_entrega = excluded.fecha_entrega,
  actualizada_en = now();

-- 4. RPC para consultar todas las tareas
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
language sql
security definer
as $$
  select id, grupo, semana, titulo, descripcion, fecha_entrega, actualizada_en
  from public.tareas
  order by semana asc;
$$;

-- 5. RPC para guardar o actualizar tarea
create or replace function public.guardar_tarea(
  p_grupo text,
  p_semana int,
  p_titulo text,
  p_descripcion text,
  p_fecha_entrega text
)
returns json
language plpgsql
security definer
as $$
declare
  v_id text;
  v_grupo text;
  v_semana int;
begin
  v_grupo := lower(trim(p_grupo));
  v_semana := greatest(1, least(54, p_semana));
  v_id := v_grupo || '-' || v_semana;

  insert into public.tareas (id, grupo, semana, titulo, descripcion, fecha_entrega, actualizada_en)
  values (
    v_id,
    v_grupo,
    v_semana,
    trim(p_titulo),
    trim(p_descripcion),
    nullif(trim(p_fecha_entrega), ''),
    now()
  )
  on conflict (id) do update set
    titulo = excluded.titulo,
    descripcion = excluded.descripcion,
    fecha_entrega = excluded.fecha_entrega,
    actualizada_en = now();

  return json_build_object('ok', true, 'id', v_id);
end;
$$;

-- 6. RPC para eliminar tarea
create or replace function public.eliminar_tarea(
  p_grupo text,
  p_semana int
)
returns json
language plpgsql
security definer
as $$
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
