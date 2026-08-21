import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  migrateLegacyProgress,
  runProgressMigration,
  MIGRATION_KEY,
} from './progress-migration';

describe('Progress Migration (src/utils/progress-migration.ts)', () => {
  const initialCompleted = [
    '01-fundamentos-mantenimiento/01-introduccion-computacion/01-hardware-y-software',
  ];

  it('1. Maneja plan-estudio-progress inexistente (null)', () => {
    const result = migrateLegacyProgress(initialCompleted, null);
    expect(result).toEqual(initialCompleted);
  });

  it('2. Maneja estado heredado vacío', () => {
    const result = migrateLegacyProgress(initialCompleted, '{}');
    expect(result).toEqual(initialCompleted);
  });

  it('3. Maneja JSON inválido/corrupto sin lanzar error', () => {
    const result = migrateLegacyProgress(initialCompleted, '{invalid json}');
    expect(result).toEqual(initialCompleted);
  });

  it('4. Maneja estructura incorrecta (ej. arreglo o primitivo)', () => {
    const result = migrateLegacyProgress(initialCompleted, '["invalid"]');
    expect(result).toEqual(initialCompleted);
  });

  it('5. Migra ID heredado conocido (m1-1-1) con valor true', () => {
    const rawPlan = JSON.stringify({ 'm1-1-1': true });
    const result = migrateLegacyProgress([], rawPlan);
    expect(result).toEqual([
      '01-fundamentos-mantenimiento/01-introduccion-computacion/01-hardware-y-software',
    ]);
  });

  it('6. Ignora ID heredado conocido con valor false', () => {
    const rawPlan = JSON.stringify({ 'm1-1-1': false });
    const result = migrateLegacyProgress([], rawPlan);
    expect(result).toEqual([]);
  });

  it('7. Ignora ID heredado desconocido', () => {
    const rawPlan = JSON.stringify({ 'desconocido-123': true });
    const result = migrateLegacyProgress([], rawPlan);
    expect(result).toEqual([]);
  });

  it('8. Migra correctamente ID de lección principal (kind: lesson)', () => {
    const rawPlan = JSON.stringify({ 'mod-01.intro.sistema-operativo': true });
    const result = migrateLegacyProgress([], rawPlan);
    expect(result).toEqual([
      '01-fundamentos-mantenimiento/01-introduccion-computacion/02-el-sistema-operativo',
    ]);
  });

  it('9. NO migra elementos de tipo repaso (kind: review)', () => {
    const rawPlan = JSON.stringify({ 'mod-01.intro.hardware-software.repaso': true });
    const result = migrateLegacyProgress([], rawPlan);
    expect(result).toEqual([]);
  });

  it('10. NO migra elementos de tipo actividad (kind: activity)', () => {
    const rawPlan = JSON.stringify({ 'mod-02.presentaciones.proyecto-integrador': true });
    const result = migrateLegacyProgress([], rawPlan);
    expect(result).toEqual([]);
  });

  it('11. NO migra elementos de tipo evaluación (kind: assessment)', () => {
    const rawPlan = JSON.stringify({ 'mod-01.evaluacion.resolucion-problemas': true });
    const result = migrateLegacyProgress([], rawPlan);
    expect(result).toEqual([]);
  });

  it('12. Filtra correctamente una mezcla de tipos (solo conserva lesson)', () => {
    const rawPlan = JSON.stringify({
      'm1-1-1': true, // lesson -> hardware-y-software
      'm1-1-2': true, // lesson -> el-sistema-operativo
      'mod-02.presentaciones.proyecto-integrador': true, // activity -> ignora
      'mod-01.evaluacion.resolucion-problemas': true, // assessment -> ignora
      'id-desconocido': true, // ignora
    });
    const result = migrateLegacyProgress([], rawPlan);
    expect(result).toEqual([
      '01-fundamentos-mantenimiento/01-introduccion-computacion/01-hardware-y-software',
      '01-fundamentos-mantenimiento/01-introduccion-computacion/02-el-sistema-operativo',
    ]);
  });

  it('13 y 14. Realiza merge con progreso canónico previamente existente sin pérdidas', () => {
    const current = [
      '01-fundamentos-mantenimiento/01-introduccion-computacion/01-hardware-y-software',
    ];
    const rawPlan = JSON.stringify({ 'm1-1-2': true });
    const result = migrateLegacyProgress(current, rawPlan);
    expect(result).toEqual([
      '01-fundamentos-mantenimiento/01-introduccion-computacion/01-hardware-y-software',
      '01-fundamentos-mantenimiento/01-introduccion-computacion/02-el-sistema-operativo',
    ]);
  });

  it('15. Elimina duplicados si el slug ya existía en progress_completed', () => {
    const current = [
      '01-fundamentos-mantenimiento/01-introduccion-computacion/01-hardware-y-software',
    ];
    const rawPlan = JSON.stringify({ 'm1-1-1': true });
    const result = migrateLegacyProgress(current, rawPlan);
    expect(result).toEqual(current);
  });

  it('16. Mantiene un arreglo inmutable de entrada', () => {
    const current = [
      '01-fundamentos-mantenimiento/01-introduccion-computacion/01-hardware-y-software',
    ];
    const frozenCurrent = [...current];
    migrateLegacyProgress(current, JSON.stringify({ 'm1-1-2': true }));
    expect(current).toEqual(frozenCurrent);
  });

  it('17. Garantiza idempotencia tras múltiples ejecuciones', () => {
    const rawPlan = JSON.stringify({ 'm1-1-1': true, 'm1-1-2': true });
    const pass1 = migrateLegacyProgress([], rawPlan);
    const pass2 = migrateLegacyProgress(pass1, rawPlan);
    const pass3 = migrateLegacyProgress(pass2, rawPlan);
    expect(pass1).toEqual(pass2);
    expect(pass2).toEqual(pass3);
  });

  it('18. No muta los argumentos pasados', () => {
    const current: string[] = [];
    const rawPlan = JSON.stringify({ 'm1-1-1': true });
    migrateLegacyProgress(current, rawPlan);
    expect(current).toEqual([]);
  });

  it('19. Migra una entrada del plan cuando ya tiene una lección declarada', () => {
    const rawPlan = JSON.stringify({ 'mod-02.docs-sheets.google-sheets': true });
    const result = migrateLegacyProgress([], rawPlan);
    expect(result).toEqual([
      '02-ofimatica-en-la-nube/01-google-docs-y-sheets/02-google-sheets',
    ]);
  });

  it('20. Soporta múltiples IDs heredados apuntando al mismo slug sin duplicados', () => {
    const rawPlan = JSON.stringify({
      'm1-1-1': true,
      'st-1-1-1': true,
    });
    const result = migrateLegacyProgress([], rawPlan);
    expect(result).toEqual([
      '01-fundamentos-mantenimiento/01-introduccion-computacion/01-hardware-y-software',
    ]);
  });
});

describe('runProgressMigration in LocalStorage Stub', () => {
  let mockStorage: Record<string, string> = {};

  beforeEach(() => {
    mockStorage = {};
    globalThis.localStorage = {
      getItem: (key: string) => mockStorage[key] ?? null,
      setItem: (key: string, value: string) => {
        mockStorage[key] = value;
      },
      removeItem: (key: string) => {
        delete mockStorage[key];
      },
      clear: () => {
        mockStorage = {};
      },
      length: 0,
      key: () => null,
    } as Storage;
  });

  afterEach(() => {
    delete (globalThis as unknown as { localStorage?: Storage }).localStorage;
  });

  it('Ejecuta runProgressMigration y guarda en localStorage', () => {
    mockStorage['plan-estudio-progress'] = JSON.stringify({ 'm1-1-1': true });
    const migrated = runProgressMigration();

    expect(migrated).toEqual([
      '01-fundamentos-mantenimiento/01-introduccion-computacion/01-hardware-y-software',
    ]);
    expect(mockStorage['progress_completed']).toBe(
      JSON.stringify([
        '01-fundamentos-mantenimiento/01-introduccion-computacion/01-hardware-y-software',
      ])
    );
    expect(mockStorage[MIGRATION_KEY]).toBe('true');
  });
});
