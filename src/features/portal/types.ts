export type UserRole = 'profesor' | 'alumno';
export type GroupId = 'sabado' | 'domingo';

export interface PortalUser {
  id: string;
  nombre: string;
  rol: UserRole;
  grupo?: GroupId;
  clase?: GroupId;
  matricula?: string;
  username?: string;
  email?: string;
  debeCambiarPassword?: boolean;
}

export interface CsvImportResult {
  totalRows: number;
  processed: number;
  updated: Array<{ matricula: string; username: string; nombre: string; email: string }>;
  skippedAlreadyHasEmail: Array<{ matricula: string; username: string; currentEmail: string; csvEmail: string }>;
  skippedEmptyEmail: Array<{ matricula: string; username: string; nombre: string }>;
  skippedNotFound: Array<{ matricula?: string; username?: string; nombre?: string }>;
  errors: Array<{ row: number; error: string }>;
}

export interface GroupConfig {
  nombre: string;
  dia: string;
  horario: string;
  semanaActual: number;
}

export interface TareaSemanal {
  id: string; // ej. 'sabado-4'
  grupo: GroupId;
  semana: number;
  titulo: string;
  descripcion: string;
  fechaEntrega?: string;
  actualizadaEn?: string;
}

export interface PortalDB {
  meta: {
    clase: string;
    escuela: string;
    totalSemanas: number;
  };
  grupos: Record<GroupId, GroupConfig>;
  usuarios: PortalUser[];
  calificaciones: {
    sabado: Record<string, Record<string, number>>;
    domingo: Record<string, Record<string, number>>;
  };
  tareas?: Record<string, TareaSemanal>;
}

export interface SessionState {
  userId: string;
}
