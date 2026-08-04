import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getCompleted, isCompleted, toggle, getPercent, getNextLesson } from './progress';
import { resetStoreForTesting } from './progress-store';

describe('Progress Helper Utils (src/utils/progress.ts)', () => {
  let storageMap: Record<string, string> = {};

  const slug1 = '01-fundamentos-mantenimiento/01-introduccion-computacion/01-hardware-y-software';
  const slug2 = '01-fundamentos-mantenimiento/01-introduccion-computacion/02-el-sistema-operativo';
  const slug3 = '01-fundamentos-mantenimiento/02-hardware-mantenimiento/01-componentes-internos';
  const slug4 = '01-fundamentos-mantenimiento/02-hardware-mantenimiento/02-mantenimiento-y-formateo';

  const mockLocalStorage = {
    getItem: (key: string) => storageMap[key] ?? null,
    setItem: (key: string, value: string) => {
      storageMap[key] = value;
    },
    removeItem: (key: string) => {
      delete storageMap[key];
    },
    clear: () => {
      storageMap = {};
    },
  };

  beforeEach(() => {
    storageMap = {};
    resetStoreForTesting();
    Object.defineProperty(globalThis, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    storageMap = {};
    resetStoreForTesting();
  });

  it('devuelve una lista vacía cuando no hay progreso guardado', () => {
    expect(getCompleted()).toEqual([]);
  });

  it('verifica si una lección está completada', () => {
    expect(isCompleted(slug1)).toBe(false);
    toggle(slug1);
    expect(isCompleted(slug1)).toBe(true);
  });

  it('alterna el estado de una lección', () => {
    expect(toggle(slug1)).toEqual([slug1]);
    expect(isCompleted(slug1)).toBe(true);
    expect(toggle(slug1)).toEqual([]);
    expect(isCompleted(slug1)).toBe(false);
  });

  it('calcula el porcentaje de progreso', () => {
    const allSlugs = [slug1, slug2, slug3, slug4];
    expect(getPercent(allSlugs)).toBe(0);
    toggle(slug1);
    expect(getPercent(allSlugs)).toBe(25);
    toggle(slug2);
    expect(getPercent(allSlugs)).toBe(50);
  });

  it('encuentra la siguiente lección pendiente', () => {
    const allSlugs = [slug1, slug2, slug3];
    expect(getNextLesson(allSlugs)).toBe(slug1);
    toggle(slug1);
    expect(getNextLesson(allSlugs)).toBe(slug2);
    toggle(slug2);
    toggle(slug3);
    expect(getNextLesson(allSlugs)).toBeNull();
  });
});
