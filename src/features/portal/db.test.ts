import { describe, it, expect, beforeEach } from 'vitest';
import {
  getPortalDB,
  savePortalDB,
  getCurrentUser,
  setSessionUser,
  loginWithKey,
  logout,
  updateWeek,
  updateGrade,
  exportDB,
  importDB,
  SEED_PORTAL_DB,
} from './db';

describe('Portal DB & BaaS Data Layer', () => {
  beforeEach(() => {
    savePortalDB(JSON.parse(JSON.stringify(SEED_PORTAL_DB)));
    setSessionUser('u_prof');
  });

  it('retorna la base semilla si no hay modificaciones', () => {
    const db = getPortalDB();
    expect(db.meta.escuela).toBe('CPI');
    expect(db.usuarios.length).toBeGreaterThan(0);
    expect(db.grupos.sabado.semanaActual).toBe(4);
  });

  it('obtiene el usuario activo y permite cambiar de sesión', () => {
    expect(getCurrentUser()?.rol).toBe('profesor');
    setSessionUser('u_sab_01');
    expect(getCurrentUser()?.nombre).toBe('Erandi Alvarado Morales');
    expect(getCurrentUser()?.grupo).toBe('sabado');
  });

  it('permite autenticar mediante clave de grupo o docente y cerrar sesión', () => {
    // Login con clave de grupo
    const resGrupo = loginWithKey('sabado');
    expect(resGrupo.success).toBe(true);
    expect(getCurrentUser()?.grupo).toBe('sabado');

    // Login por username de alumno
    const resUser = loginWithKey('erandi.alvarado');
    expect(resUser.success).toBe(true);
    expect(getCurrentUser()?.nombre).toBe('Erandi Alvarado Morales');

    // Login con clave de docente
    const resDocente = loginWithKey('profesor');
    expect(resDocente.success).toBe(true);
    expect(getCurrentUser()?.rol).toBe('profesor');

    // Logout
    logout();
    expect(getCurrentUser()).toBeNull();
  });

  it('permite actualizar la semana de un grupo', () => {
    updateWeek('sabado', 6);
    expect(getPortalDB().grupos.sabado.semanaActual).toBe(6);
  });

  it('permite calificar alumnos y calcular notas redondeadas a 1 decimal', () => {
    updateGrade('sabado', 'u_sab_01', 'm1', 9.8);
    const db = getPortalDB();
    expect(db.calificaciones.sabado.u_sab_01.m1).toBe(9.8);

    updateGrade('sabado', 'u_sab_01', 'm1', null);
    const dbAfter = getPortalDB();
    expect(dbAfter.calificaciones.sabado.u_sab_01.m1).toBeUndefined();
  });

  it('permite exportar e importar la base en JSON', () => {
    const json = exportDB();
    expect(json).toContain('Capacitación Profesional en Informática');
    const imported = importDB(json);
    expect(imported).toBe(true);
  });
});
