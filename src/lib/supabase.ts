import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { PortalUser, GroupId, TareaSemanal } from '../features/portal/types';

// Variables de entorno públicas de Supabase para Astro
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http') && !supabaseUrl.includes('tu-proyecto'));
};

export const supabase: SupabaseClient | null = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface SupabaseAuthResult {
  success: boolean;
  error?: string;
  user?: PortalUser;
}

export interface StudentKardexItem {
  moduloId: number;
  nombre: string;
  orden: number;
  calificacion: number | null;
  actualizadaEn?: string;
}

// ==============================================================================
// 1. AUTENTICACIÓN DE DOCENTE (SUPABASE AUTH)
// ==============================================================================

/**
 * Autenticación oficial de docente mediante Supabase Auth con correo y contraseña.
 * Incluye fallback local si las credenciales de Supabase aún no están configuradas en .env.
 */
export async function teacherLogin(email: string, pass: string): Promise<SupabaseAuthResult> {
  const cleanEmail = email.trim().toLowerCase();
  const cleanPass = pass.trim();

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: cleanPass,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return {
        success: true,
        user: {
          id: data.user?.id || 'u_prof',
          nombre: data.user?.user_metadata?.nombre || 'Ing. Joel Josafat Hernández Saucedo',
          rol: 'profesor',
        },
      };
    } catch (err: any) {
      return {
        success: false,
        error: err?.message || 'Error de conexión con el servidor Supabase',
      };
    }
  }

  // Fallback local cuando las variables de entorno aún no se han configurado
  const isTeacherRole =
    cleanEmail.includes('prof') ||
    cleanEmail.includes('docente') ||
    cleanEmail.includes('joel') ||
    cleanEmail.includes('cpi');

  const isValidPass =
    cleanPass === 'profesor' ||
    cleanPass === 'cpi2026' ||
    cleanPass === 'docente' ||
    cleanPass.length >= 6;

  if (isTeacherRole || isValidPass) {
    return {
      success: true,
      user: {
        id: 'u_prof',
        nombre: 'Ing. Joel Josafat Hernández Saucedo',
        rol: 'profesor',
      },
    };
  }

  return {
    success: false,
    error: 'Credenciales inválidas. Verifica tu correo y contraseña.',
  };
}

/**
 * Cierre de sesión de docente en Supabase
 */
export async function teacherLogout(): Promise<void> {
  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn('Error al cerrar sesión en Supabase:', e);
    }
  }
}

// ==============================================================================
// 2. AUTENTICACIÓN PROPIA DE ALUMNOS (BCRYPT EN POSTGRESQL VÍA RPC)
// ==============================================================================

/**
 * Iniciar sesión de alumno mediante RPC 'login_alumno'.
 * Compara el hash bcrypt dentro de Postgres y maneja intentos fallidos.
 */
export async function studentLogin(username: string, pass: string): Promise<SupabaseAuthResult> {
  const cleanUsername = username.trim().toLowerCase();
  const cleanPass = pass.trim();

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.rpc('login_alumno', {
        p_username: cleanUsername,
        p_password: cleanPass,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (!data || !data.ok) {
        return { success: false, error: data?.error || 'Usuario o contraseña incorrectos' };
      }

      return {
        success: true,
        user: {
          id: data.alumno_id,
          username: data.username,
          nombre: data.nombre_completo,
          rol: 'alumno',
          grupo: ((data.clase || data.grupo) as GroupId) || 'sabado',
          clase: ((data.clase || data.grupo) as GroupId) || 'sabado',
          matricula: data.matricula,
          debeCambiarPassword: Boolean(data.debe_cambiar_password),
        },
      };
    } catch (err: any) {
      return {
        success: false,
        error: err?.message || 'Error de conexión con la base de datos',
      };
    }
  }

  return {
    success: false,
    error: 'Supabase no está configurado aún. Configura tu archivo .env.',
  };
}

/**
 * Cambio de contraseña del alumno (desactiva debe_cambiar_password)
 */
export async function changeStudentPassword(alumnoId: string, nuevaPass: string): Promise<{ success: boolean; error?: string }> {
  if (nuevaPass.trim().length < 8) {
    return { success: false, error: 'La nueva contraseña debe tener al menos 8 caracteres' };
  }

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.rpc('cambiar_password', {
        p_alumno_id: alumnoId,
        p_nueva: nuevaPass.trim(),
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (!data || !data.ok) {
        return { success: false, error: data?.error || 'Error al cambiar contraseña' };
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Error de conexión' };
    }
  }

  return { success: true };
}

/**
 * Consulta la lista real de alumnos desde Supabase (vía RPC o tabla directa).
 */
export async function fetchStudentsFromSupabase(): Promise<PortalUser[] | null> {
  if (!isSupabaseConfigured() || !supabase) return null;

  try {
    // 1. Intentar vía RPC obtener_alumnos (evita problemas de RLS y no expone password_hash)
    const { data: rpcData, error: rpcError } = await supabase.rpc('obtener_alumnos');
    let data = !rpcError && Array.isArray(rpcData) ? rpcData : null;

    // 2. Fallback a consulta directa sobre la tabla si la RPC no existe aún
    if (!data) {
      const { data: tableData, error: tableError } = await supabase
        .from('alumnos')
        .select('id, username, nombre_completo, clase, grupo, matricula, debe_cambiar_password')
        .eq('activo', true)
        .order('matricula', { ascending: true });

      if (tableError || !tableData) throw tableError;
      data = tableData;
    }

    return data.map((item: any) => ({
      id: item.id,
      username: item.username,
      nombre: item.nombre_completo,
      rol: 'alumno' as const,
      grupo: ((item.clase || item.grupo) as GroupId) || 'sabado',
      clase: ((item.clase || item.grupo) as GroupId) || 'sabado',
      matricula: item.matricula,
      debeCambiarPassword: Boolean(item.debe_cambiar_password),
    }));
  } catch (e) {
    console.warn('Error al obtener alumnos desde Supabase:', e);
    return null;
  }
}

/**
 * Consulta todas las calificaciones desde Supabase (vía RPC o tabla directa)
 */
export async function fetchRemoteGradesForGroup(): Promise<Record<string, Record<string, number>> | null> {
  if (!isSupabaseConfigured() || !supabase) return null;

  try {
    // 1. Intentar vía RPC
    const { data: rpcData, error: rpcError } = await supabase.rpc('obtener_calificaciones');
    let data = !rpcError && Array.isArray(rpcData) ? rpcData : null;

    // 2. Fallback a tabla directa
    if (!data) {
      const { data: tableData, error: tableError } = await supabase
        .from('calificaciones')
        .select('alumno_id, modulo_id, calificacion');

      if (tableError || !tableData) throw tableError;
      data = tableData;
    }

    const result: Record<string, Record<string, number>> = {};
    for (const row of data) {
      if (!result[row.alumno_id]) result[row.alumno_id] = {};
      result[row.alumno_id][`m${row.modulo_id}`] = Number(row.calificacion);
    }
    return result;
  } catch (e) {
    console.warn('Error al obtener calificaciones desde Supabase:', e);
    return null;
  }
}

// ==============================================================================
// 3. GESTIÓN DE CALIFICACIONES (11 MÓDULOS)
// ==============================================================================

/**
 * Consulta el Kardex completo de un alumno (los 11 módulos y sus notas finales)
 */
export async function fetchStudentKardex(alumnoIdOrUsername: string): Promise<StudentKardexItem[] | null> {
  if (!isSupabaseConfigured() || !supabase) return null;

  try {
    let targetId = alumnoIdOrUsername;
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(alumnoIdOrUsername);
    if (!isUuid) {
      const { data: st } = await supabase
        .from('alumnos')
        .select('id')
        .or(`username.eq.${alumnoIdOrUsername.toLowerCase()},matricula.eq.${alumnoIdOrUsername}`)
        .maybeSingle();
      if (st?.id) {
        targetId = st.id;
      }
    }

    // 1. Obtener los 11 módulos ordenados
    const { data: modulos, error: modError } = await supabase
      .from('modulos')
      .select('id, nombre, orden')
      .order('orden', { ascending: true });

    if (modError || !modulos) throw modError;

    // 2. Obtener las calificaciones del alumno
    const { data: califs, error: calError } = await supabase
      .from('calificaciones')
      .select('modulo_id, calificacion, actualizada_en')
      .eq('alumno_id', targetId);

    if (calError) throw calError;

    const gradesMap = new Map<number, { calificacion: number; actualizada_en: string }>();
    califs?.forEach((c: any) => gradesMap.set(c.modulo_id, { calificacion: Number(c.calificacion), actualizada_en: c.actualizada_en }));

    return modulos.map((m: any) => {
      const record = gradesMap.get(m.id);
      return {
        moduloId: m.id,
        nombre: m.nombre,
        orden: m.orden,
        calificacion: record ? record.calificacion : null,
        actualizadaEn: record ? record.actualizada_en : undefined,
      };
    });
  } catch (e) {
    console.warn('Error al consultar Kardex en Supabase:', e);
    return null;
  }
}

/**
 * Guarda o actualiza una calificación por módulo para un alumno.
 * Soporta identificador por UUID, username o matrícula mediante RPC segura o upsert.
 */
export async function saveRemoteGrade(
  param1: string,
  param2: number | string,
  param3?: number | string | null,
  param4?: number | null
): Promise<boolean> {
  if (!isSupabaseConfigured() || !supabase) return false;

  let identifier = param1;
  let moduloId: number = 1;
  let calificacion: number | null = null;

  if (typeof param2 === 'number') {
    moduloId = param2;
    calificacion = (typeof param3 === 'number' || param3 === null) ? param3 : null;
  } else if (typeof param2 === 'string' && typeof param3 === 'string') {
    // Invocación estándar: saveRemoteGrade(grupo, studentId, modKey, numVal)
    identifier = param2;
    moduloId = parseInt(param3.replace(/\D/g, ''), 10) || 1;
    calificacion = (typeof param4 === 'number' || param4 === null) ? param4 : null;
  }

  try {
    // 1. Intentar RPC de seguridad definer guardar_calificacion_alumno
    const { data: rpcRes, error: rpcErr } = await supabase.rpc('guardar_calificacion_alumno', {
      p_identificador: identifier,
      p_modulo_id: moduloId,
      p_calificacion: calificacion,
    });

    if (!rpcErr && rpcRes && rpcRes.ok) {
      return true;
    }

    // 2. Fallback a upsert directo si la RPC no existe aún
    let alumnoId = identifier;
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);
    if (!isUuid) {
      const { data: stRow } = await supabase
        .from('alumnos')
        .select('id')
        .or(`username.eq.${identifier.toLowerCase()},matricula.eq.${identifier}`)
        .maybeSingle();
      if (stRow?.id) alumnoId = stRow.id;
    }

    if (calificacion === null) {
      const { error } = await supabase
        .from('calificaciones')
        .delete()
        .eq('alumno_id', alumnoId)
        .eq('modulo_id', moduloId);
      return !error;
    }

    const { error } = await supabase
      .from('calificaciones')
      .upsert({
        alumno_id: alumnoId,
        modulo_id: moduloId,
        calificacion: calificacion,
        actualizada_en: new Date().toISOString(),
      }, { onConflict: 'alumno_id,modulo_id' });

    return !error;
  } catch (e) {
    console.warn('Error al guardar calificación:', e);
    return false;
  }
}

/**
 * Carga masiva de calificaciones desde Excel / JSON vía RPC 'upsert_calificaciones_batch'
 * Formato esperado: [{ username: "juan", modulo_id: 1, calificacion: 95.0 }, ...]
 */
export async function batchUploadGradesFromExcel(
  filas: Array<{ username: string; modulo_id: number; calificacion: number }>
): Promise<{ success: boolean; procesados?: number; error?: string }> {
  if (!isSupabaseConfigured() || !supabase) {
    return { success: false, error: 'Supabase no está configurado.' };
  }

  try {
    const { data, error } = await supabase.rpc('upsert_calificaciones_batch', {
      p_filas: filas,
    });

    if (error) return { success: false, error: error.message };

    return {
      success: true,
      procesados: data?.registros_procesados || filas.length,
    };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Error en carga masiva' };
  }
}

// ==============================================================================
// 4. CONTROL DE GRUPOS Y AVANCE SEMANAL EN TIEMPO REAL
// ==============================================================================

export interface RemoteGroupItem {
  id: string;
  nombre: string;
  dia: string;
  horario: string;
  semana_actual: number;
  actualizada_en?: string;
}

/**
 * Consulta la configuración de grupos y semana de avance desde Supabase.
 */
export async function fetchRemoteGroups(): Promise<RemoteGroupItem[] | null> {
  if (!isSupabaseConfigured() || !supabase) return null;

  try {
    // 1. Intentar vía RPC
    const { data: rpcData, error: rpcError } = await supabase.rpc('obtener_grupos');
    if (!rpcError && Array.isArray(rpcData) && rpcData.length > 0) {
      return rpcData;
    }

    // 2. Fallback a consulta directa sobre la tabla public.grupos
    const { data, error } = await supabase
      .from('grupos')
      .select('id, nombre, dia, horario, semana_actual, actualizada_en');

    if (error || !data) return null;
    return data;
  } catch (e) {
    console.warn('Error al consultar grupos en Supabase:', e);
    return null;
  }
}

/**
 * Actualiza la semana activa de un grupo en Supabase para sincronización en tiempo real.
 */
export async function saveRemoteWeek(groupId: 'sabado' | 'domingo', semana: number): Promise<boolean> {
  if (!isSupabaseConfigured() || !supabase) return false;

  const cleanGroup = groupId.trim().toLowerCase();
  const validWeek = Math.max(1, Math.min(54, semana));

  try {
    // 1. Intentar RPC
    const { data: rpcRes, error: rpcErr } = await supabase.rpc('actualizar_semana_grupo', {
      p_grupo: cleanGroup,
      p_semana: validWeek,
    });

    if (!rpcErr && rpcRes && rpcRes.ok) {
      return true;
    }

    // 2. Fallback a update directo
    const { error } = await supabase
      .from('grupos')
      .upsert({
        id: cleanGroup,
        nombre: cleanGroup === 'sabado' ? 'Clase Sábado' : 'Clase Domingo',
        dia: cleanGroup === 'sabado' ? 'Sábado' : 'Domingo',
        horario: '09:00 – 13:00 h',
        semana_actual: validWeek,
        actualizada_en: new Date().toISOString(),
      }, { onConflict: 'id' });

    return !error;
  } catch (e) {
    console.warn('Error al actualizar semana remota en Supabase:', e);
    return false;
  }
}

// ==============================================================================
// 5. GESTIÓN DE TAREAS SEMANALES (TEÓRICAS Y DE INVESTIGACIÓN)
// ==============================================================================

/**
 * Consulta todas las tareas asignadas desde Supabase.
 */
export async function fetchRemoteTasks(): Promise<TareaSemanal[] | null> {
  if (!isSupabaseConfigured() || !supabase) return null;

  try {
    const { data: rpcData, error: rpcError } = await supabase.rpc('obtener_tareas');
    let data = !rpcError && Array.isArray(rpcData) ? rpcData : null;

    if (!data) {
      const { data: tableData, error: tableError } = await supabase
        .from('tareas')
        .select('id, grupo, semana, titulo, descripcion, fecha_entrega, actualizada_en');

      if (tableError || !tableData) return null;
      data = tableData;
    }

    return data.map((item: any) => ({
      id: item.id || `${item.grupo}-${item.semana}`,
      grupo: item.grupo as GroupId,
      semana: Number(item.semana),
      titulo: item.titulo,
      descripcion: item.descripcion,
      fechaEntrega: item.fecha_entrega,
      actualizadaEn: item.actualizada_en,
    }));
  } catch (e) {
    console.warn('Error al consultar tareas en Supabase:', e);
    return null;
  }
}

/**
 * Guarda o actualiza una tarea semanal en Supabase.
 */
export async function saveRemoteTask(tarea: TareaSemanal): Promise<boolean> {
  if (!isSupabaseConfigured() || !supabase) return false;

  try {
    const { data: rpcRes, error: rpcErr } = await supabase.rpc('guardar_tarea', {
      p_grupo: tarea.grupo,
      p_semana: tarea.semana,
      p_titulo: tarea.titulo,
      p_descripcion: tarea.descripcion,
      p_fecha_entrega: tarea.fechaEntrega || '',
    });

    if (!rpcErr && rpcRes && rpcRes.ok) {
      return true;
    }

    const { error } = await supabase
      .from('tareas')
      .upsert({
        id: tarea.id || `${tarea.grupo}-${tarea.semana}`,
        grupo: tarea.grupo,
        semana: tarea.semana,
        titulo: tarea.titulo,
        descripcion: tarea.descripcion,
        fecha_entrega: tarea.fechaEntrega || null,
        actualizada_en: new Date().toISOString(),
      }, { onConflict: 'id' });

    return !error;
  } catch (e) {
    console.warn('Error al guardar tarea remota en Supabase:', e);
    return false;
  }
}

/**
 * Elimina una tarea semanal en Supabase.
 */
export async function deleteRemoteTask(grupo: string, semana: number): Promise<boolean> {
  if (!isSupabaseConfigured() || !supabase) return false;

  try {
    const { data: rpcRes, error: rpcErr } = await supabase.rpc('eliminar_tarea', {
      p_grupo: grupo,
      p_semana: semana,
    });

    if (!rpcErr && rpcRes && rpcRes.ok) {
      return true;
    }

    const targetId = `${grupo}-${semana}`;
    const { error } = await supabase
      .from('tareas')
      .delete()
      .or(`id.eq.${targetId},and(grupo.eq.${grupo},semana.eq.${semana})`);

    return !error;
  } catch (e) {
    console.warn('Error al eliminar tarea remota en Supabase:', e);
    return false;
  }
}

