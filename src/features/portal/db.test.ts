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
  getTaskForWeek,
  saveTask,
  exportDB,
  importDB,
  importStudentsFromCsv,
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

  it('[US1] gestiona semanas de Sábado y Domingo de forma completamente independiente', () => {
    updateWeek('sabado', 8);
    updateWeek('domingo', 2);
    const db = getPortalDB();
    expect(db.grupos.sabado.semanaActual).toBe(8);
    expect(db.grupos.domingo.semanaActual).toBe(2);

    // Modificar uno no afecta al otro
    updateWeek('sabado', 10);
    const db2 = getPortalDB();
    expect(db2.grupos.sabado.semanaActual).toBe(10);
    expect(db2.grupos.domingo.semanaActual).toBe(2);
  });

  it('[US2] gestiona tareas por grupo y semana, y maneja semanas sin tarea', () => {
    // Semana sin tarea asignada
    expect(getTaskForWeek('domingo', 1)).toBeNull();

    // Asignar tarea a grupo sábado
    const tarea = saveTask('sabado', 5, 'Investigación BIOS', 'Detalla POST y UEFI', 'Próxima clase');
    expect(tarea.titulo).toBe('Investigación BIOS');
    expect(tarea.semana).toBe(5);

    const obtenida = getTaskForWeek('sabado', 5);
    expect(obtenida?.titulo).toBe('Investigación BIOS');
    expect(obtenida?.descripcion).toBe('Detalla POST y UEFI');

    // No se filtra al grupo domingo
    expect(getTaskForWeek('domingo', 5)).toBeNull();
  });

  it('[US4] sanitiza y acota el rango de semanas a 1..54', () => {
    updateWeek('sabado', 0);
    expect(getPortalDB().grupos.sabado.semanaActual).toBe(1);

    updateWeek('sabado', 999);
    expect(getPortalDB().grupos.sabado.semanaActual).toBe(54);
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

  describe('Migración Parcial e Idempotente de Correos (CSV)', () => {
    const csvMuestra = `Matricula,Usuario,Nombre completo,Correo para ingresar,Repite tu correo
SAB-01,erandi.alvarado,Erandi Alvarado Morales,erandi@cpi.edu,erandi@cpi.edu
SAB-02,camila.lopez,Camila Lopez Valdez,,
SAB-03,fernando.madrigal,Fernando Alexander Madrigal Saldaña,fernando@cpi.edu,fernando@cpi.edu`;

    it('ejecuta migración parcial: asigna correo solo a quienes lo tienen en el CSV y omite celdas vacías', () => {
      const res = importStudentsFromCsv(csvMuestra);
      expect(res.totalRows).toBe(3);
      expect(res.updated.length).toBe(2);
      expect(res.skippedEmptyEmail.length).toBe(1);
      expect(res.skippedEmptyEmail[0].username).toBe('camila.lopez');

      const db = getPortalDB();
      const erandi = db.usuarios.find(u => u.username === 'erandi.alvarado');
      const camila = db.usuarios.find(u => u.username === 'camila.lopez');
      const fernando = db.usuarios.find(u => u.username === 'fernando.madrigal');

      expect(erandi?.email).toBe('erandi@cpi.edu');
      expect(fernando?.email).toBe('fernando@cpi.edu');
      expect(camila?.email).toBeUndefined();
    });

    it('es idempotente: si se vuelve a usar el CSV, omite los que ya tienen correo y solo coloca los pendientes', () => {
      // 1. Primera pasada
      importStudentsFromCsv(csvMuestra);

      // 2. Segunda pasada con un CSV donde Camila ya puso su correo
      const csvSegundaPasada = `Matricula,Usuario,Nombre completo,Correo para ingresar,Repite tu correo
SAB-01,erandi.alvarado,Erandi Alvarado Morales,erandi.nuevo@cpi.edu,erandi.nuevo@cpi.edu
SAB-02,camila.lopez,Camila Lopez Valdez,camila@cpi.edu,camila@cpi.edu
SAB-03,fernando.madrigal,Fernando Alexander Madrigal Saldaña,fernando@cpi.edu,fernando@cpi.edu`;

      const resSegunda = importStudentsFromCsv(csvSegundaPasada);

      // Erandi y Fernando ya tenían correo, por lo que se omiten y conservan su correo inicial
      expect(resSegunda.skippedAlreadyHasEmail.length).toBe(2);
      expect(resSegunda.updated.length).toBe(1);
      expect(resSegunda.updated[0].username).toBe('camila.lopez');
      expect(resSegunda.updated[0].email).toBe('camila@cpi.edu');

      const db = getPortalDB();
      const erandi = db.usuarios.find(u => u.username === 'erandi.alvarado');
      const camila = db.usuarios.find(u => u.username === 'camila.lopez');

      expect(erandi?.email).toBe('erandi@cpi.edu'); // Conserva el original
      expect(camila?.email).toBe('camila@cpi.edu'); // Recibe su correo nuevo
    });

    it('permite login por correo una vez asignado', () => {
      importStudentsFromCsv(csvMuestra);
      const loginRes = loginWithKey('erandi@cpi.edu');
      expect(loginRes.success).toBe(true);
      expect(loginRes.user?.username).toBe('erandi.alvarado');
      expect(getCurrentUser()?.nombre).toBe('Erandi Alvarado Morales');
    });

    it('permite sobreescribir correos si se activa la opción overwriteExisting', () => {
      importStudentsFromCsv(csvMuestra);

      const csvSobrescribir = `Matricula,Usuario,Nombre completo,Correo para ingresar,Repite tu correo
SAB-01,erandi.alvarado,Erandi Alvarado Morales,erandi.actualizado@cpi.edu,erandi.actualizado@cpi.edu`;

      const res = importStudentsFromCsv(csvSobrescribir, { overwriteExisting: true });
      expect(res.updated.length).toBe(1);
      expect(getPortalDB().usuarios.find(u => u.username === 'erandi.alvarado')?.email).toBe('erandi.actualizado@cpi.edu');
    });
  });
});
