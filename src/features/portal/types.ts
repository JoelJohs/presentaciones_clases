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
  debeCambiarPassword?: boolean;
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
