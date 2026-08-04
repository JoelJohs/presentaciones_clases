import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  initializeProgress,
  getCompletedLessons,
  isLessonCompleted,
  setLessonCompleted,
  toggleLessonCompleted,
  subscribeToProgress,
  isValidCanonicalLessonSlug,
  resetStoreForTesting,
} from './progress-store';
import { getLessonSlugForStudyPlanId, getRelationByStudyPlanId } from './progress-mapping';

describe('Progress Store (src/utils/progress-store.ts)', () => {
  let mockStorage: Record<string, string> = {};

  const validLessonSlug =
    '01-fundamentos-mantenimiento/01-introduccion-computacion/01-hardware-y-software';
  const validLessonSlug2 =
    '01-fundamentos-mantenimiento/01-introduccion-computacion/02-el-sistema-operativo';

  beforeEach(() => {
    mockStorage = {};
    resetStoreForTesting();
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

    globalThis.window = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    } as unknown as Window & typeof globalThis;
  });

  afterEach(() => {
    delete (globalThis as unknown as { localStorage?: Storage }).localStorage;
    delete (globalThis as unknown as { window?: Window }).window;
  });

  it('1. Realiza lectura inicial correctamente', () => {
    mockStorage['progress_completed'] = JSON.stringify([validLessonSlug]);
    const completed = initializeProgress();
    expect(completed).toEqual([validLessonSlug]);
  });

  it('2. Escribe una lección canónica válida', () => {
    initializeProgress();
    const result = setLessonCompleted(validLessonSlug, true);
    expect(result).toEqual([validLessonSlug]);
    expect(isLessonCompleted(validLessonSlug)).toBe(true);
  });

  it('3. Rechaza slug de repaso (kind: review) sin modificar estado', () => {
    initializeProgress();
    const reviewSlug =
      '01-fundamentos-mantenimiento/01-introduccion-computacion/01-hardware-y-software/repaso';
    const result = setLessonCompleted(reviewSlug, true);
    expect(result).toEqual([]);
    expect(isLessonCompleted(reviewSlug)).toBe(false);
  });

  it('4. Rechaza slug inexistente o arbitrario', () => {
    initializeProgress();
    const result = setLessonCompleted('slug-inexistente', true);
    expect(result).toEqual([]);
  });

  it('5. Alterna (toggle) el estado completado de una lección', () => {
    initializeProgress();
    toggleLessonCompleted(validLessonSlug);
    expect(isLessonCompleted(validLessonSlug)).toBe(true);

    toggleLessonCompleted(validLessonSlug);
    expect(isLessonCompleted(validLessonSlug)).toBe(false);
  });

  it('6. Evita duplicados al marcar repetidamente una lección', () => {
    initializeProgress();
    setLessonCompleted(validLessonSlug, true);
    setLessonCompleted(validLessonSlug, true);
    expect(getCompletedLessons()).toEqual([validLessonSlug]);
  });

  it('7. Permite desmarcar lección previa', () => {
    mockStorage['progress_completed'] = JSON.stringify([validLessonSlug, validLessonSlug2]);
    initializeProgress();

    setLessonCompleted(validLessonSlug, false);
    expect(getCompletedLessons()).toEqual([validLessonSlug2]);
  });

  it('8. Serializa el estado en localStorage tras cambios', () => {
    initializeProgress();
    setLessonCompleted(validLessonSlug, true);
    expect(mockStorage['progress_completed']).toBe(JSON.stringify([validLessonSlug]));
  });

  it('9. Notifica a suscriptores tras un cambio de lección', () => {
    initializeProgress();
    const listener = vi.fn();
    const unsubscribe = subscribeToProgress(listener);

    setLessonCompleted(validLessonSlug, true);
    expect(listener).toHaveBeenCalledWith([validLessonSlug]);

    unsubscribe();
  });

  it('10. Desuscripción de listeners funciona correctamente', () => {
    initializeProgress();
    const listener = vi.fn();
    const unsubscribe = subscribeToProgress(listener);

    unsubscribe();
    setLessonCompleted(validLessonSlug, true);
    expect(listener).not.toHaveBeenCalled();
  });

  it('11. NO notifica cuando el estado no cambia', () => {
    initializeProgress();
    setLessonCompleted(validLessonSlug, true);

    const listener = vi.fn();
    subscribeToProgress(listener);

    setLessonCompleted(validLessonSlug, true); // Mismo valor
    expect(listener).not.toHaveBeenCalled();
  });

  it('12. Emite evento interno progress:changed', () => {
    initializeProgress();
    let notifiedState: string[] = [];
    subscribeToProgress((state) => {
      notifiedState = state;
    });

    setLessonCompleted(validLessonSlug, true);
    expect(notifiedState).toEqual([validLessonSlug]);
  });

  it('13. Simula evento storage para sincronización entre pestañas', () => {
    let storageHandler: ((e: StorageEvent) => void) | undefined;
    (globalThis.window.addEventListener as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      (type: string, handler: (e: StorageEvent) => void) => {
        if (type === 'storage') storageHandler = handler;
      }
    );

    initializeProgress();
    const listener = vi.fn();
    subscribeToProgress(listener);

    // Simular que otra pestaña actualizó localStorage
    const event = {
      key: 'progress_completed',
      newValue: JSON.stringify([validLessonSlug]),
    } as StorageEvent;

    storageHandler?.(event);
    expect(listener).toHaveBeenCalledWith([validLessonSlug]);
  });

  it('14. Sincronización entre múltiples consumidores', () => {
    initializeProgress();
    const consumer1 = vi.fn();
    const consumer2 = vi.fn();

    subscribeToProgress(consumer1);
    subscribeToProgress(consumer2);

    setLessonCompleted(validLessonSlug, true);
    expect(consumer1).toHaveBeenCalledWith([validLessonSlug]);
    expect(consumer2).toHaveBeenCalledWith([validLessonSlug]);
  });

  it('15. Previene bucles infinitos de notificación', () => {
    initializeProgress();
    let count = 0;
    subscribeToProgress(() => {
      count++;
    });

    setLessonCompleted(validLessonSlug, true);
    expect(count).toBe(1);
  });

  it('16. Se recupera ante JSON corrupto en localStorage', () => {
    mockStorage['progress_completed'] = '{corrupted}';
    const completed = initializeProgress();
    expect(completed).toEqual([]);
  });

  it('17. Retorna estado inicial vacío si localStorage no tiene datos', () => {
    const completed = initializeProgress();
    expect(completed).toEqual([]);
  });

  it('18. Garantiza inmutabilidad de arreglos devueltos por getCompletedLessons', () => {
    initializeProgress();
    setLessonCompleted(validLessonSlug, true);

    const res1 = getCompletedLessons();
    const res2 = getCompletedLessons();

    expect(res1).toEqual(res2);
    expect(res1).not.toBe(res2);
  });

  it('19. Inicialización incluye la migración de datos heredados', () => {
    mockStorage['plan-estudio-progress'] = JSON.stringify({ 'm1-1-1': true });
    const completed = initializeProgress();

    expect(completed).toEqual([validLessonSlug]);
  });

  it('20. Segunda inicialización es idempotente y no repite la migración innecesariamente', () => {
    mockStorage['plan-estudio-progress'] = JSON.stringify({ 'm1-1-1': true });
    const init1 = initializeProgress();
    const init2 = initializeProgress();

    expect(init1).toEqual(init2);
  });
});

describe('Semántica estricta de repasos (Prompt Secc. 17)', () => {
  const reviewSlug =
    '01-fundamentos-mantenimiento/01-introduccion-computacion/01-hardware-y-software/repaso';
  const primarySlug =
    '01-fundamentos-mantenimiento/01-introduccion-computacion/01-hardware-y-software';

  beforeEach(() => {
    resetStoreForTesting();
  });

  it('1. Un repaso no aparece en progress_completed ni se considera lección canónica', () => {
    expect(isValidCanonicalLessonSlug(reviewSlug)).toBe(false);
  });

  it('2. Marcar o intentar setear un repaso no altera progress_completed', () => {
    const result = setLessonCompleted(reviewSlug, true);
    expect(result).toEqual([]);
  });

  it('3. Desmarcar un repaso no altera progress_completed', () => {
    const result = setLessonCompleted(reviewSlug, false);
    expect(result).toEqual([]);
  });

  it('4. Completar la lección principal no agrega el slug del repaso a progress_completed', () => {
    setLessonCompleted(primarySlug, true);
    const completed = getCompletedLessons();
    expect(completed).toContain(primarySlug);
    expect(completed).not.toContain(reviewSlug);
  });

  it('5. Un repaso puede resolver su lección principal asociada mediante el mapa', () => {
    const primarySlugFound = getLessonSlugForStudyPlanId('mod-01.intro.hardware-software');
    expect(primarySlugFound).toBe(primarySlug);
  });

  it('6. El repaso sigue siendo localizable y clasificado en el mapa semántico', () => {
    const rel = getRelationByStudyPlanId('mod-01.intro.hardware-software');
    expect(rel).toBeDefined();
    expect(rel?.confidence).toBe('EXACTA');
  });

  it('7. Solo las relaciones de tipo lesson entran al cómputo del total canónico', () => {
    expect(isValidCanonicalLessonSlug(primarySlug)).toBe(true);
    expect(isValidCanonicalLessonSlug(reviewSlug)).toBe(false);
  });
});

describe('Pruebas de seguridad SSR y ciclo de vida (Fase 3A)', () => {
  beforeEach(() => {
    resetStoreForTesting();
  });

  it('1. Es seguro ejecutar initializeProgress en entornos SSR (sin window ni localStorage)', () => {
    const origWindow = globalThis.window;
    const origLocalStorage = globalThis.localStorage;

    delete (globalThis as unknown as { window?: Window }).window;
    delete (globalThis as unknown as { localStorage?: Storage }).localStorage;

    expect(() => initializeProgress()).not.toThrow();
    expect(getCompletedLessons()).toEqual([]);

    globalThis.window = origWindow;
    globalThis.localStorage = origLocalStorage;
  });

  it('2. Desuscribir un listener dos veces es seguro e idempotente', () => {
    const listener = vi.fn();
    const unsubscribe = subscribeToProgress(listener);

    expect(() => {
      unsubscribe();
      unsubscribe();
    }).not.toThrow();
  });

  it('3. Si un listener lanza una excepción, otros suscriptores reciben la notificación normalmente', () => {
    const faultyListener = () => {
      throw new Error('Subscriber error');
    };
    const safeListener = vi.fn();

    subscribeToProgress(faultyListener);
    subscribeToProgress(safeListener);

    expect(() => setLessonCompleted('01-fundamentos-mantenimiento/01-introduccion-computacion/01-hardware-y-software', true)).not.toThrow();
    expect(safeListener).toHaveBeenCalledWith([
      '01-fundamentos-mantenimiento/01-introduccion-computacion/01-hardware-y-software',
    ]);
  });
});
