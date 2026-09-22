-- ==============================================================================
-- MIGRACIÓN CPI: TABLA DE GRUPOS Y AVANCE SEMANAL EN TIEMPO REAL
-- ==============================================================================
-- Ejecuta este script en el SQL Editor de tu proyecto en Supabase (https://supabase.com).

-- 1. Tabla de grupos
create table if not exists public.grupos (
  id text primary key check (id in ('sabado', 'domingo')),
  nombre text not null,
  dia text not null,
  horario text not null default '09:00 – 11:00 h',
  semana_actual smallint not null default 1 check (semana_actual between 1 and 54),
  actualizada_en timestamptz not null default now()
);

-- 2. Datos iniciales de los grupos de fin de semana
insert into public.grupos (id, nombre, dia, horario, semana_actual) values
  ('sabado', 'Clase Sábado', 'Sábado', '09:00 – 11:00 h', 4),
  ('domingo', 'Clase Domingo', 'Domingo', '09:00 – 11:00 h', 1)
on conflict (id) do nothing;

-- 3. Habilitar seguridad por fila (RLS)
alter table public.grupos enable row level security;

-- Políticas de acceso
drop policy if exists "Cualquiera puede consultar grupos" on public.grupos;
create policy "Cualquiera puede consultar grupos" on public.grupos
  for select using (true);

drop policy if exists "Actualizacion de grupos permitida" on public.grupos;
create policy "Actualizacion de grupos permitida" on public.grupos
  for update using (true);

drop policy if exists "Insercion de grupos permitida" on public.grupos;
create policy "Insercion de grupos permitida" on public.grupos
  for insert with check (true);

-- 4. RPC para consultar grupos de forma segura y uniforme
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

-- 5. RPC para fijar o avanzar la semana activa de un grupo
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
      '09:00 – 11:00 h',
      v_semana
    );
  end if;

  return json_build_object('ok', true, 'grupo', v_id, 'semana_actual', v_semana);
end;
$$;

grant execute on function public.obtener_grupos() to anon, authenticated;
grant execute on function public.actualizar_semana_grupo(text, int) to anon, authenticated;
