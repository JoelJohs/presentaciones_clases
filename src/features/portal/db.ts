import type { PortalDB, PortalUser, GroupId, SessionState, TareaSemanal } from './types';
export type { GroupId, PortalUser, PortalDB, SessionState, TareaSemanal } from './types';

export const SEED_PORTAL_DB: PortalDB = {
  meta: {
    clase: 'Capacitación Profesional en Informática',
    escuela: 'CPI',
    totalSemanas: 54,
  },
  grupos: {
    sabado: {
      nombre: 'Clase Sábado',
      dia: 'Sábado',
      horario: '09:00 – 13:00 h',
      semanaActual: 4,
    },
    domingo: {
      nombre: 'Clase Domingo',
      dia: 'Domingo',
      horario: '09:00 – 13:00 h',
      semanaActual: 1,
    },
  },
  usuarios: [
    { id: 'u_prof', nombre: 'Ing. Joel Josafat Hernández Saucedo', rol: 'profesor' },
    { id: 'u_sab_01', nombre: 'Erandi Alvarado Morales', rol: 'alumno', grupo: 'sabado', clase: 'sabado', username: 'erandi.alvarado', matricula: 'SAB-01' },
    { id: 'u_sab_02', nombre: 'Camila Lopez Valdez', rol: 'alumno', grupo: 'sabado', clase: 'sabado', username: 'camila.lopez', matricula: 'SAB-02' },
    { id: 'u_sab_03', nombre: 'Fernando Alexander Madrigal Saldaña', rol: 'alumno', grupo: 'sabado', clase: 'sabado', username: 'fernando.madrigal', matricula: 'SAB-03' },
    { id: 'u_sab_04', nombre: 'Helen Judith Moreno Bernal', rol: 'alumno', grupo: 'sabado', clase: 'sabado', username: 'helen.moreno', matricula: 'SAB-04' },
    { id: 'u_sab_05', nombre: 'Mariana Guadalupe Negrete Aguilera', rol: 'alumno', grupo: 'sabado', clase: 'sabado', username: 'mariana.negrete', matricula: 'SAB-05' },
    { id: 'u_sab_06', nombre: 'Elizabeth Negrete', rol: 'alumno', grupo: 'sabado', clase: 'sabado', username: 'elizabeth.negrete', matricula: 'SAB-06' },
    { id: 'u_sab_07', nombre: 'Alejandro Rangel Valdez', rol: 'alumno', grupo: 'sabado', clase: 'sabado', username: 'alejandro.rangel', matricula: 'SAB-07' },
    { id: 'u_sab_08', nombre: 'Jose Eduardo Soto Zavala', rol: 'alumno', grupo: 'sabado', clase: 'sabado', username: 'jose.soto', matricula: 'SAB-08' },
    { id: 'u_sab_09', nombre: 'Ana Jazmin Aguilera Alvarado', rol: 'alumno', grupo: 'sabado', clase: 'sabado', username: 'ana.aguilera', matricula: 'SAB-09' },
    { id: 'u_sab_10', nombre: 'Mateo Urueta Nara', rol: 'alumno', grupo: 'sabado', clase: 'sabado', username: 'mateo.urueta', matricula: 'SAB-10' },
    { id: 'u_sab_11', nombre: 'Alumno Prueba (Test)', rol: 'alumno', grupo: 'sabado', clase: 'sabado', username: 'alumno.prueba', matricula: 'SAB-11' },
  ],
  calificaciones: {
    sabado: {
      u_sab_01: {},
      u_sab_02: {},
      u_sab_03: {},
      u_sab_04: {},
      u_sab_05: {},
      u_sab_06: {},
      u_sab_07: {},
      u_sab_08: {},
      u_sab_09: {},
      u_sab_10: {},
      u_sab_11: {},
    },
    domingo: {},
  },
  tareas: {
    'sabado-4': {
      id: 'sabado-4',
      grupo: 'sabado',
      semana: 4,
      titulo: 'Investigación: Comandos de Diagnóstico en Linux',
      descripcion: 'Investiga la función técnica de los comandos "lshw", "free -h", "df -h" y "top". Anota en tu libreta técnica para qué sirve cada uno y prepara una explicación breve sobre cómo interpretar el uso de memoria RAM para la ronda de preguntas en clase.',
      fechaEntrega: 'Inicio de la próxima sesión (09:00 h)',
      actualizadaEn: '2026-09-22T00:00:00.000Z',
    },
  },
};

export const ACCESS_KEYS: Record<string, { rol: 'profesor' | 'alumno'; grupo?: GroupId; label: string }> = {
  profesor: { rol: 'profesor', label: 'Profesor (Acceso Total)' },
  sabado: { rol: 'alumno', grupo: 'sabado', label: 'Grupo Sábado' },
  domingo: { rol: 'alumno', grupo: 'domingo', label: 'Grupo Domingo' },
};

const LS_DB_KEY = 'cpi_portal_db_v2';
const LS_SESSION_KEY = 'cpi_portal_session_v1';

let memoryDB: PortalDB = JSON.parse(JSON.stringify(SEED_PORTAL_DB));
let memorySession: SessionState = { userId: '' };

let listeners: Array<(db: PortalDB, user: PortalUser | null) => void> = [];

function getStorage(): Storage | null {
  if (typeof window !== 'undefined' && window.localStorage) return window.localStorage;
  if (typeof globalThis !== 'undefined' && (globalThis as any).localStorage) return (globalThis as any).localStorage;
  return null;
}

export function getPortalDB(): PortalDB {
  const storage = getStorage();
  if (!storage) return memoryDB;
  try {
    const raw = storage.getItem(LS_DB_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.usuarios && parsed?.grupos) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Error al leer base de datos de portal:', e);
  }
  return memoryDB;
}

export function savePortalDB(db: PortalDB): void {
  memoryDB = db;
  const storage = getStorage();
  if (storage) {
    try {
      storage.setItem(LS_DB_KEY, JSON.stringify(db));
    } catch (e) {
      console.error('Error al persistir base de datos de portal:', e);
    }
  }
  notify();
}

export function getCurrentSession(): SessionState {
  const storage = getStorage();
  if (!storage) return memorySession;
  try {
    const raw = storage.getItem(LS_SESSION_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed.userId === 'string') return parsed;
    }
  } catch (e) {}
  return memorySession;
}

export function getCurrentUser(): PortalUser | null {
  const db = getPortalDB();
  const session = getCurrentSession();
  if (!session || !session.userId) return null;
  const user = db.usuarios.find(u => u.id === session.userId);
  return user || null;
}

export function setSessionUser(userId: string): void {
  memorySession = { userId };
  const storage = getStorage();
  if (storage) {
    storage.setItem(LS_SESSION_KEY, JSON.stringify(memorySession));
  }
  if (typeof document !== 'undefined') {
    const user = getPortalDB().usuarios.find(u => u.id === userId);
    if (user) {
      document.documentElement.dataset.authRole = user.rol;
    }
  }
  notify();
}

export function logout(): void {
  memorySession = { userId: '' };
  const storage = getStorage();
  if (storage) {
    storage.removeItem(LS_SESSION_KEY);
  }
  if (typeof document !== 'undefined') {
    delete document.documentElement.dataset.authRole;
  }
  notify();
}

export function loginWithKey(rawKey: string): { success: boolean; user?: PortalUser; error?: string } {
  const key = rawKey.trim().toLowerCase();
  if (!key) {
    return { success: false, error: 'Ingresa una clave de acceso.' };
  }

  const db = getPortalDB();

  // Docente
  if (['profesor', 'docente', 'admin', 'maestro', 'cpi-prof'].includes(key)) {
    const prof = db.usuarios.find(u => u.rol === 'profesor') || db.usuarios[0];
    setSessionUser(prof.id);
    return { success: true, user: prof };
  }

  // Grupo 1: Sábado
  if (['sabado', 'sábado', 'g1', 'g1-sab', 'grupo1', 'grupo-1', 'sab'].includes(key)) {
    const student = db.usuarios.find(u => u.grupo === 'sabado');
    if (student) {
      setSessionUser(student.id);
      return { success: true, user: student };
    }
  }

  // Grupo 2: Domingo
  if (['domingo', 'g2', 'g2-dom', 'grupo2', 'grupo-2', 'dom'].includes(key)) {
    const student = db.usuarios.find(u => u.grupo === 'domingo');
    if (student) {
      setSessionUser(student.id);
      return { success: true, user: student };
    }
  }

  // Por nombre de usuario (ej. erandi.alvarado, camila.lopez)
  const byUsername = db.usuarios.find(u => u.username?.toLowerCase() === key);
  if (byUsername) {
    setSessionUser(byUsername.id);
    return { success: true, user: byUsername };
  }

  // Matrícula individual (ej. SAB-01)
  const byMatricula = db.usuarios.find(u => u.matricula?.toLowerCase() === key);
  if (byMatricula) {
    setSessionUser(byMatricula.id);
    return { success: true, user: byMatricula };
  }

  // Por ID de usuario
  const byId = db.usuarios.find(u => u.id.toLowerCase() === key);
  if (byId) {
    setSessionUser(byId.id);
    return { success: true, user: byId };
  }

  return { success: false, error: 'Clave no válida. Consulta con tu docente.' };
}

export function updateWeek(group: GroupId, week: number): void {
  const db = getPortalDB();
  if (db.grupos[group]) {
    db.grupos[group].semanaActual = Math.max(1, Math.min(db.meta.totalSemanas, week));
    savePortalDB(db);
  }
  // Sincronizar en tiempo real con Supabase
  if (typeof window !== 'undefined') {
    import('../../lib/supabase').then(({ saveRemoteWeek, isSupabaseConfigured }) => {
      if (isSupabaseConfigured()) {
        saveRemoteWeek(group, week).catch(console.warn);
      }
    }).catch(() => {});
  }
}

export async function syncRemoteGroups(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  try {
    const { fetchRemoteGroups, isSupabaseConfigured } = await import('../../lib/supabase');
    if (!isSupabaseConfigured()) return false;
    const remote = await fetchRemoteGroups();
    if (remote && Array.isArray(remote)) {
      const db = getPortalDB();
      let changed = false;
      for (const item of remote) {
        const gKey = item.id as GroupId;
        if (db.grupos[gKey] && typeof item.semana_actual === 'number') {
          if (db.grupos[gKey].semanaActual !== item.semana_actual) {
            db.grupos[gKey].semanaActual = item.semana_actual;
            changed = true;
          }
        }
      }
      if (changed) {
        savePortalDB(db);
        return true;
      }
    }
  } catch (e) {
    console.warn('Error al sincronizar grupos remotos:', e);
  }
  return false;
}

export function getTaskForWeek(group: GroupId, week: number): TareaSemanal | null {
  const db = getPortalDB();
  if (!db.tareas) return null;
  return db.tareas[`${group}-${week}`] || null;
}

export function saveTask(group: GroupId, week: number, titulo: string, descripcion: string, fechaEntrega?: string): TareaSemanal {
  const db = getPortalDB();
  if (!db.tareas) db.tareas = {};
  const taskId = `${group}-${week}`;
  const tarea: TareaSemanal = {
    id: taskId,
    grupo: group,
    semana: week,
    titulo: titulo.trim(),
    descripcion: descripcion.trim(),
    fechaEntrega: fechaEntrega?.trim() || undefined,
    actualizadaEn: new Date().toISOString(),
  };
  db.tareas[taskId] = tarea;
  savePortalDB(db);

  if (typeof window !== 'undefined') {
    import('../../lib/supabase').then(({ saveRemoteTask, isSupabaseConfigured }) => {
      if (isSupabaseConfigured()) {
        saveRemoteTask(tarea).catch(console.warn);
      }
    }).catch(() => {});
  }

  return tarea;
}

export function deleteTask(group: GroupId, week: number): void {
  const db = getPortalDB();
  if (db.tareas && db.tareas[`${group}-${week}`]) {
    delete db.tareas[`${group}-${week}`];
    savePortalDB(db);
  }

  if (typeof window !== 'undefined') {
    import('../../lib/supabase').then(({ deleteRemoteTask, isSupabaseConfigured }) => {
      if (isSupabaseConfigured()) {
        deleteRemoteTask(group, week).catch(console.warn);
      }
    }).catch(() => {});
  }
}

export async function syncRemoteTasks(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  try {
    const { fetchRemoteTasks, isSupabaseConfigured } = await import('../../lib/supabase');
    if (!isSupabaseConfigured()) return false;
    const remote = await fetchRemoteTasks();
    if (remote && Array.isArray(remote)) {
      const db = getPortalDB();
      if (!db.tareas) db.tareas = {};
      let changed = false;
      for (const t of remote) {
        const key = `${t.grupo}-${t.semana}`;
        const cur = db.tareas[key];
        if (!cur || cur.titulo !== t.titulo || cur.descripcion !== t.descripcion || cur.fechaEntrega !== t.fechaEntrega) {
          db.tareas[key] = t;
          changed = true;
        }
      }
      if (changed) {
        savePortalDB(db);
        return true;
      }
    }
  } catch (e) {
    console.warn('Error al sincronizar tareas remotas:', e);
  }
  return false;
}

export function updateGrade(group: GroupId, studentId: string, moduleKey: string, grade: number | null): void {
  const db = getPortalDB();
  if (!db.calificaciones[group]) db.calificaciones[group] = {};
  if (!db.calificaciones[group][studentId]) db.calificaciones[group][studentId] = {};

  if (grade === null || isNaN(grade)) {
    delete db.calificaciones[group][studentId][moduleKey];
  } else {
    db.calificaciones[group][studentId][moduleKey] = Math.round(Math.max(0, Math.min(10, grade)) * 10) / 10;
  }
  savePortalDB(db);
}

export function exportDB(): string {
  return JSON.stringify(getPortalDB(), null, 2);
}

export function importDB(jsonStr: string): boolean {
  try {
    const parsed = JSON.parse(jsonStr);
    if (parsed.usuarios && parsed.grupos) {
      savePortalDB(parsed);
      return true;
    }
  } catch (e) {}
  return false;
}

export function subscribePortal(cb: (db: PortalDB, user: PortalUser | null) => void): () => void {
  listeners.push(cb);
  return () => {
    listeners = listeners.filter(l => l !== cb);
  };
}

function notify(): void {
  const db = getPortalDB();
  const user = getCurrentUser();
  listeners.forEach(cb => {
    try {
      cb(db, user);
    } catch (e) {
      console.error('Error in portal subscriber:', e);
    }
  });
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cpi-portal-update', { detail: { db, user } }));
  }
}
