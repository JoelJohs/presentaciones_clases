import type { PortalDB, PortalUser, GroupId, SessionState, TareaSemanal, CsvImportResult } from './types';
import { sanitizeWeekNumber } from '../../utils/security';
export type { GroupId, PortalUser, PortalDB, SessionState, TareaSemanal, CsvImportResult } from './types';

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
    { id: 'u_sab_12', nombre: 'Erika Maciel Hernández', rol: 'alumno', grupo: 'sabado', clase: 'sabado', username: 'erika.maciel', matricula: 'SAB-12' },
    { id: 'u_sab_11', nombre: 'Alumno Prueba (Test)', rol: 'alumno', grupo: 'sabado', clase: 'sabado', username: 'alumno.prueba', matricula: 'SAB-11' },
    { id: 'u_dom_01', nombre: 'Alumno Prueba Domingo', rol: 'alumno', grupo: 'domingo', clase: 'domingo', username: 'alumno.domingo', email: 'prueba.domingo@example.com', matricula: 'DOM-01' },
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
      u_sab_12: { m1: 6.7, m2: 0.0 },
    },
    domingo: {
      u_dom_01: {},
    },
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

export const KNOWN_STUDENT_EMAILS: Record<string, string> = {
  // Matrículas (clave canónica)
  'sab-01': 'alvaradoerandi40@gmail.com',
  'sab-02': 'cecivaldez823@gmail.com',
  'sab-03': 'alexandermadrigal207@gmail.com',
  'sab-04': 'mhelenjudith@gmail.com',
  'sab-05': 'negretemariana448@gmail.com',
  'sab-07': 'alejandrin1109@gmail.com',
  'sab-08': 'eduardosotozavala81@gmail.com',
  'sab-09': 'jazminaguilera2007@gmail.com',
  'sab-12': 'wuendymaciel12@gmail.com',
  'dom-01': 'prueba.domingo@example.com',

  // Nombres de usuario
  'erandi.alvarado': 'alvaradoerandi40@gmail.com',
  'camila.lopez': 'cecivaldez823@gmail.com',
  'fernando.madrigal': 'alexandermadrigal207@gmail.com',
  'helen.moreno': 'mhelenjudith@gmail.com',
  'mariana.negrete': 'negretemariana448@gmail.com',
  'alejandro.rangel': 'alejandrin1109@gmail.com',
  'jose.soto': 'eduardosotozavala81@gmail.com',
  'ana.aguilera': 'jazminaguilera2007@gmail.com',
  'erika.maciel': 'wuendymaciel12@gmail.com',
  'alumno.domingo': 'prueba.domingo@example.com',

  // UUIDs reales de Supabase
  'c123eebd-342c-4cb3-a460-147710d80438': 'alvaradoerandi40@gmail.com',
  '6ac3fb22-a868-43b9-8323-7a4fc4500797': 'cecivaldez823@gmail.com',
  '47be2400-3ecf-4fea-bf69-1044935b715f': 'alexandermadrigal207@gmail.com',
  'e57d6aea-3b4c-4d91-93b5-1cbf49cf8e90': 'mhelenjudith@gmail.com',
  'bd8444dd-ec00-4107-a313-791d45c53f32': 'negretemariana448@gmail.com',
  'e1e9e091-687f-41c6-87cb-a57b41cfc006': 'alejandrin1109@gmail.com',
  '715a2dd2-5b3e-4769-8e74-6f7583bb8a89': 'eduardosotozavala81@gmail.com',
  'bef4170f-2c67-44ed-aca8-ba651d83162b': 'jazminaguilera2007@gmail.com',
  '7e746df1-6fcd-41f0-a6ae-17175d77a538': 'wuendymaciel12@gmail.com',
  'c63abbb7-164f-48fa-bc3d-39a7dc712fc9': 'prueba.domingo@example.com',

  // IDs semilla legacy
  u_sab_01: 'alvaradoerandi40@gmail.com',
  u_sab_02: 'cecivaldez823@gmail.com',
  u_sab_03: 'alexandermadrigal207@gmail.com',
  u_sab_04: 'mhelenjudith@gmail.com',
  u_sab_05: 'negretemariana448@gmail.com',
  u_sab_07: 'alejandrin1109@gmail.com',
  u_sab_08: 'eduardosotozavala81@gmail.com',
  u_sab_09: 'jazminaguilera2007@gmail.com',
  u_sab_12: 'wuendymaciel12@gmail.com',
  u_dom_01: 'prueba.domingo@example.com',
};

/**
 * Deduplica la base de datos de usuarios protegiendo y migrando calificaciones existentes.
 * Elimina registros fantasma u obsoletos conservando los registros canónicos con calificaciones.
 */
export function deduplicatePortalDB(db: PortalDB): { db: PortalDB; removedCount: number } {
  const userMap = new Map<string, PortalUser>();
  const idReplacements: Record<string, string> = {};

  const prof = db.usuarios.find(u => u.rol === 'profesor') || SEED_PORTAL_DB.usuarios[0];
  userMap.set('profesor', prof);

  let removedCount = 0;

  for (const u of db.usuarios) {
    if (u.rol === 'profesor') continue;
    const key = (u.matricula || u.username || u.id).trim().toLowerCase();

    const knownEmail = (u.matricula && KNOWN_STUDENT_EMAILS[u.matricula.toLowerCase()]) ||
                       (u.username && KNOWN_STUDENT_EMAILS[u.username.toLowerCase()]) ||
                       KNOWN_STUDENT_EMAILS[u.id];

    if (!userMap.has(key)) {
      userMap.set(key, { ...u, email: u.email || knownEmail });
    } else {
      const existing = userMap.get(key)!;
      const isExistingUuid = existing.id.includes('-');
      const isNewUuid = u.id.includes('-');

      let canonical: PortalUser;
      let obsoleteId: string;

      if (isNewUuid && !isExistingUuid) {
        canonical = { ...u };
        obsoleteId = existing.id;
        canonical.email = u.email || existing.email || knownEmail;
      } else {
        canonical = { ...existing };
        obsoleteId = u.id;
        canonical.email = existing.email || u.email || knownEmail;
      }

      idReplacements[obsoleteId] = canonical.id;
      userMap.set(key, canonical);
      removedCount++;
    }
  }

  db.usuarios = Array.from(userMap.values());

  // Migrar calificaciones si algún alumno duplicado u obsoleto tenía notas asociadas
  if (db.calificaciones) {
    for (const grupoKey of ['sabado', 'domingo'] as const) {
      const grupoGrades = db.calificaciones[grupoKey];
      if (grupoGrades) {
        for (const [oldId, newId] of Object.entries(idReplacements)) {
          if (grupoGrades[oldId]) {
            grupoGrades[newId] = { ...(grupoGrades[newId] || {}), ...grupoGrades[oldId] };
            delete grupoGrades[oldId];
          }
        }
      }
    }
  }

  return { db, removedCount };
}

export function findStudentByIdentifier(rawKey: string): PortalUser | undefined {
  const key = rawKey.trim().toLowerCase();
  if (!key) return undefined;
  const db = getPortalDB();

  // 1. Coincidencia directa por correo en usuarios existentes o catálogo semilla
  const byUserEmail = db.usuarios.find(u => u.email?.trim().toLowerCase() === key) ||
                      SEED_PORTAL_DB.usuarios.find(u => u.email?.trim().toLowerCase() === key);
  if (byUserEmail) return byUserEmail;

  // 2. Coincidencia por correo en el catálogo maestro
  for (const [studentKey, email] of Object.entries(KNOWN_STUDENT_EMAILS)) {
    if (email.trim().toLowerCase() === key) {
      const u = db.usuarios.find(x =>
        x.id === studentKey ||
        (x.matricula && x.matricula.toLowerCase() === studentKey.toLowerCase()) ||
        (x.username && x.username.toLowerCase() === studentKey.toLowerCase())
      ) || SEED_PORTAL_DB.usuarios.find(x =>
        x.id === studentKey ||
        (x.matricula && x.matricula.toLowerCase() === studentKey.toLowerCase()) ||
        (x.username && x.username.toLowerCase() === studentKey.toLowerCase())
      );
      if (u) return { ...u, email: email.trim().toLowerCase() };
    }
  }

  // 3. Coincidencia por nombre de usuario
  const byUsername = db.usuarios.find(u => u.username?.trim().toLowerCase() === key) ||
                     SEED_PORTAL_DB.usuarios.find(u => u.username?.trim().toLowerCase() === key);
  if (byUsername) {
    const email = byUsername.email ||
                  (byUsername.username && KNOWN_STUDENT_EMAILS[byUsername.username.toLowerCase()]) ||
                  (byUsername.matricula && KNOWN_STUDENT_EMAILS[byUsername.matricula.toLowerCase()]) ||
                  KNOWN_STUDENT_EMAILS[byUsername.id];
    return { ...byUsername, email };
  }

  // 4. Coincidencia por matrícula
  const byMatricula = db.usuarios.find(u => u.matricula?.trim().toLowerCase() === key) ||
                      SEED_PORTAL_DB.usuarios.find(u => u.matricula?.trim().toLowerCase() === key);
  if (byMatricula) {
    const email = byMatricula.email ||
                  (byMatricula.matricula && KNOWN_STUDENT_EMAILS[byMatricula.matricula.toLowerCase()]) ||
                  (byMatricula.username && KNOWN_STUDENT_EMAILS[byMatricula.username.toLowerCase()]) ||
                  KNOWN_STUDENT_EMAILS[byMatricula.id];
    return { ...byMatricula, email };
  }

  // 5. Coincidencia por ID
  const byId = db.usuarios.find(u => u.id.trim().toLowerCase() === key) ||
               SEED_PORTAL_DB.usuarios.find(u => u.id.trim().toLowerCase() === key);
  if (byId) {
    return { ...byId, email: byId.email || KNOWN_STUDENT_EMAILS[byId.id] };
  }

  return undefined;
}

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
        // Ejecutar deduplicación automática para limpiar duplicados protegiendo calificaciones
        const { db: cleaned, removedCount } = deduplicatePortalDB(parsed);
        if (removedCount > 0) {
          try {
            storage.setItem(LS_DB_KEY, JSON.stringify(cleaned));
          } catch {}
        }
        return cleaned;
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

  // Búsqueda en catálogo de alumnos (correo, usuario, matrícula o id)
  const student = findStudentByIdentifier(key);
  if (student) {
    setSessionUser(student.id);
    return { success: true, user: student };
  }

  return { success: false, error: 'Clave no válida. Consulta con tu docente.' };
}

export function updateWeek(group: GroupId, rawWeek: number): void {
  const week = sanitizeWeekNumber(rawWeek);
  const db = getPortalDB();
  if (db.grupos[group]) {
    db.grupos[group].semanaActual = week;
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

export function getTaskForWeek(group: GroupId, rawWeek: number): TareaSemanal | null {
  const week = sanitizeWeekNumber(rawWeek);
  const db = getPortalDB();
  if (!db.tareas) return null;
  return db.tareas[`${group}-${week}`] || null;
}

export function saveTask(group: GroupId, rawWeek: number, titulo: string, descripcion: string, fechaEntrega?: string): TareaSemanal {
  const week = sanitizeWeekNumber(rawWeek);
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

export function importStudentsFromCsv(
  csvText: string,
  options: { overwriteExisting?: boolean } = {}
): CsvImportResult {
  const overwrite = Boolean(options.overwriteExisting);
  const result: CsvImportResult = {
    totalRows: 0,
    processed: 0,
    updated: [],
    skippedAlreadyHasEmail: [],
    skippedEmptyEmail: [],
    skippedNotFound: [],
    errors: [],
  };

  if (!csvText || typeof csvText !== 'string') {
    result.errors.push({ row: 0, error: 'El contenido del archivo CSV está vacío.' });
    return result;
  }

  const rawLines = csvText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  if (rawLines.length === 0) {
    result.errors.push({ row: 0, error: 'El archivo CSV no contiene registros.' });
    return result;
  }

  const headerLine = rawLines[0];
  const separator = headerLine.includes(';') && !headerLine.includes(',') ? ';' : ',';

  const parseRow = (line: string): string[] => {
    const fields: string[] = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"' || char === "'") {
        inQuotes = !inQuotes;
      } else if (char === separator && !inQuotes) {
        fields.push(current.trim().replace(/^["']|["']$/g, ''));
        current = '';
      } else {
        current += char;
      }
    }
    fields.push(current.trim().replace(/^["']|["']$/g, ''));
    return fields;
  };

  const headers = parseRow(headerLine).map(h => h.toLowerCase().trim());
  const colMatricula = headers.findIndex(h => h.includes('matricula') || h.includes('clave'));
  const colUsuario = headers.findIndex(h => h.includes('usuario') || h.includes('username') || h.includes('user'));
  const colNombre = headers.findIndex(h => h.includes('nombre') || h.includes('alumno'));
  const colCorreo = headers.findIndex(h => h.includes('correo para ingresar') || h.includes('correo') || h.includes('email'));
  const colRepite = headers.findIndex((h, idx) => idx !== colCorreo && (h.includes('repite') || h.includes('confirmar')));

  if (colMatricula === -1 && colUsuario === -1) {
    result.errors.push({ row: 1, error: 'No se encontró columna de Matrícula ni de Usuario en el encabezado.' });
    return result;
  }

  if (colCorreo === -1) {
    result.errors.push({ row: 1, error: 'No se encontró columna de Correo en el encabezado.' });
    return result;
  }

  const db = getPortalDB();
  let hasChanges = false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  for (let i = 1; i < rawLines.length; i++) {
    result.totalRows++;
    const rowNum = i + 1;
    const row = parseRow(rawLines[i]);
    if (row.length === 0 || row.every(cell => !cell)) {
      continue;
    }

    const matriculaVal = colMatricula !== -1 && row[colMatricula] ? row[colMatricula].trim() : '';
    const usuarioVal = colUsuario !== -1 && row[colUsuario] ? row[colUsuario].trim().toLowerCase() : '';
    const nombreVal = colNombre !== -1 && row[colNombre] ? row[colNombre].trim() : '';
    const correoVal = colCorreo !== -1 && row[colCorreo] ? row[colCorreo].trim().toLowerCase() : '';
    const repiteVal = colRepite !== -1 && row[colRepite] ? row[colRepite].trim().toLowerCase() : '';

    result.processed++;

    const alumno = db.usuarios.find(u => {
      if (u.rol !== 'alumno') return false;
      if (matriculaVal && u.matricula && u.matricula.toLowerCase() === matriculaVal.toLowerCase()) return true;
      if (usuarioVal && u.username && u.username.toLowerCase() === usuarioVal) return true;
      return false;
    });

    if (!alumno) {
      result.skippedNotFound.push({ matricula: matriculaVal, username: usuarioVal, nombre: nombreVal });
      continue;
    }

    if (!correoVal) {
      result.skippedEmptyEmail.push({
        matricula: alumno.matricula || matriculaVal,
        username: alumno.username || usuarioVal,
        nombre: alumno.nombre,
      });
      continue;
    }

    if (!emailRegex.test(correoVal)) {
      result.errors.push({
        row: rowNum,
        error: `El correo "${correoVal}" de ${alumno.nombre} tiene un formato inválido.`,
      });
      continue;
    }

    if (repiteVal && repiteVal !== correoVal) {
      result.errors.push({
        row: rowNum,
        error: `En la fila de ${alumno.nombre}, el correo "${correoVal}" no coincide con la repetición "${repiteVal}".`,
      });
      continue;
    }

    if (alumno.email && !overwrite) {
      result.skippedAlreadyHasEmail.push({
        matricula: alumno.matricula || matriculaVal,
        username: alumno.username || usuarioVal,
        currentEmail: alumno.email,
        csvEmail: correoVal,
      });
      continue;
    }

    alumno.email = correoVal;
    hasChanges = true;
    result.updated.push({
      matricula: alumno.matricula || matriculaVal,
      username: alumno.username || usuarioVal,
      nombre: alumno.nombre,
      email: correoVal,
    });
  }

  if (hasChanges) {
    savePortalDB(db);
  }

  return result;
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
