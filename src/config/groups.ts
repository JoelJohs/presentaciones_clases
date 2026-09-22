/**
 * Arquitectura de Grupos de Estudiantes
 * 
 * Permite segmentación por Grupo 1 (Sábado) y Grupo 2 (Domingo).
 * Nota: El Grupo 2 se mantiene como feature latente/pendiente según requerimiento del docente.
 */

export type GroupId = 'sabado' | 'domingo';

export interface StudentGroup {
  id: GroupId;
  name: string;
  code: string;
  day: string;
  schedule: string;
  active: boolean; // Indica si el grupo está abierto para inscripciones
  classroom: string;
}

export const STUDENT_GROUPS: Record<GroupId, StudentGroup> = {
  sabado: {
    id: 'sabado',
    name: 'Grupo 1 — Sábado',
    code: 'G1-SAB',
    day: 'Sábado',
    schedule: '09:00 - 13:00',
    active: true,
    classroom: 'Laboratorio de Cómputo A',
  },
  domingo: {
    id: 'domingo',
    name: 'Grupo 2 — Domingo',
    code: 'G2-DOM',
    day: 'Domingo',
    schedule: '09:00 - 13:00',
    active: false, // Pendiente de confirmación de apertura
    classroom: 'Laboratorio de Cómputo B',
  },
};

export const DEFAULT_GROUP_ID: GroupId = 'sabado';

export function getActiveGroups(): StudentGroup[] {
  return Object.values(STUDENT_GROUPS).filter(g => g.active);
}

export function getAllGroups(): StudentGroup[] {
  return Object.values(STUDENT_GROUPS);
}

export function getGroupById(id: GroupId): StudentGroup {
  return STUDENT_GROUPS[id] || STUDENT_GROUPS[DEFAULT_GROUP_ID];
}
