import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  parseViewMode,
  getStoredViewMode,
  setStoredViewMode,
  segmentNodeList,
  shouldIgnoreKeyboardEvent,
  getKeyboardAction,
  calculateSlideNavigation,
  getSavedSlideIndex,
  saveSlideIndex,
  presentationStore,
} from '../index';

describe('Fase 4D / 4E — Pruebas Exhaustivas de Validación del Motor de Presentación', () => {
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

  describe('1. Pruebas Avanzadas de Segmentación', () => {
    it('1.1 Segmenta correctamente un contenido mixto realista con 10 secciones H2', () => {
      const nodes = Array.from({ length: 10 }, (_, i) => [
        { type: 'h2' as const, text: `Sección ${i + 1}`, id: `sec-${i + 1}` },
        { type: 'content' as const, text: `Párrafo ${i + 1}.1` },
        { type: 'content' as const, text: `Párrafo ${i + 1}.2` },
      ]).flat();

      const slides = segmentNodeList(nodes);
      expect(slides.length).toBe(10);
      expect(slides[0].title).toBe('Sección 1');
      expect(slides[9].title).toBe('Sección 10');
      expect(slides[0].id).toBe('sec-1');
    });

    it('1.2 Conserva títulos con caracteres acentuados y caracteres especiales', () => {
      const nodes = [
        { type: 'h2' as const, text: 'Visión General y Evaluación', id: 'eval' },
        { type: 'content' as const, text: 'Detalles' },
      ];
      const slides = segmentNodeList(nodes);
      expect(slides[0].title).toBe('Visión General y Evaluación');
    });

    it('1.3 No destruye el orden ni pierde nodos en segmentación pura de lista de nodos', () => {
      const nodes = [
        { type: 'content' as const, text: 'Intro' },
        { type: 'h2' as const, text: 'Tema 1', id: 't1' },
        { type: 'content' as const, text: 'Detalle 1' },
      ];

      const slides = segmentNodeList(nodes);
      expect(slides.length).toBe(2);
      expect(slides[0].title).toBe('Introducción');
      expect(slides[1].title).toBe('Tema 1');
    });
  });

  describe('2. Pruebas de Teclado, Foco e Ignorado de Entradas', () => {
    it('2.1 Ignora eventos cuando el foco está en elementos interactivos o editables', () => {
      expect(shouldIgnoreKeyboardEvent({ tagName: 'INPUT' })).toBe(true);
      expect(shouldIgnoreKeyboardEvent({ tagName: 'TEXTAREA' })).toBe(true);
      expect(shouldIgnoreKeyboardEvent({ tagName: 'SELECT' })).toBe(true);
      expect(shouldIgnoreKeyboardEvent({ tagName: 'BUTTON' })).toBe(true);
      expect(shouldIgnoreKeyboardEvent({ tagName: 'A' })).toBe(true);
      expect(shouldIgnoreKeyboardEvent({ isContentEditable: true })).toBe(true);
      expect(shouldIgnoreKeyboardEvent({ tagName: 'SECTION' })).toBe(false);
      expect(shouldIgnoreKeyboardEvent(null)).toBe(false);
    });

    it('2.2 Mapea correctamente las teclas especiales Home, End, PageUp, PageDown, F, Escape', () => {
      expect(getKeyboardAction('Home')).toBe('first');
      expect(getKeyboardAction('End')).toBe('last');
      expect(getKeyboardAction('PageUp')).toBe('prev');
      expect(getKeyboardAction('PageDown')).toBe('next');
      expect(getKeyboardAction('f')).toBe('fullscreen');
      expect(getKeyboardAction('F')).toBe('fullscreen');
      expect(getKeyboardAction('Escape')).toBe('exit');
    });
  });

  describe('3. Pruebas de Persistencia y Migración de Modos', () => {
    it('3.1 Recupera de forma segura índices guardados y valida límites', () => {
      saveSlideIndex('leccion-1', 3);
      expect(getSavedSlideIndex('leccion-1', 5)).toBe(3);
      expect(getSavedSlideIndex('leccion-1', 2)).toBe(0); // Fuera de límite -> fallback 0
    });

    it('3.2 Maneja valores corruptos o no numéricos en localStorage', () => {
      mockStorage['slide-index-test'] = 'invalido';
      expect(getSavedSlideIndex('test', 5)).toBe(0);
    });

    it('3.3 Migra transparente el valor legacy "presentation" a "presentation-scroll"', () => {
      expect(parseViewMode('presentation')).toBe('presentation-scroll');
      mockStorage['view-mode'] = 'presentation';
      expect(getStoredViewMode()).toBe('presentation-scroll');
    });
  });

  describe('4. Ciclo de Vida y Seguridad del Store de Presentación', () => {
    it('4.1 Permite alternar de modo repetidamente sin lanzar errores ni duplicar suscriptores', () => {
      const subscriber = vi.fn();
      const unsubscribe = presentationStore.subscribe(subscriber);

      presentationStore.setMode('presentation-slides');
      presentationStore.setMode('presentation-scroll');
      presentationStore.setMode('reading');

      expect(subscriber).toHaveBeenCalled();

      unsubscribe();
      expect(() => {
        presentationStore.setMode('presentation-slides');
      }).not.toThrow();
    });

    it('4.2 Mantiene el cálculo de navegación acotado y seguro', () => {
      expect(calculateSlideNavigation(0, 5, 'next')).toBe(1);
      expect(calculateSlideNavigation(4, 5, 'next')).toBe(4);
      expect(calculateSlideNavigation(0, 5, 'prev')).toBe(0);
      expect(calculateSlideNavigation(3, 5, 'prev')).toBe(2);
      expect(calculateSlideNavigation(2, 5, 'first')).toBe(0);
      expect(calculateSlideNavigation(2, 5, 'last')).toBe(4);
    });
  });

  describe('5. Pruebas de Resiliencia SSR y Manejo de Excepciones de Almacenamiento', () => {
    it('5.1 Retorna modo por defecto si localStorage no existe (SSR)', () => {
      delete (globalThis as unknown as { localStorage?: Storage }).localStorage;
      expect(getStoredViewMode()).toBe('reading');
      expect(setStoredViewMode('presentation-slides')).toBe('presentation-slides');
    });

    it('5.2 Soporta excepciones SecurityError/QuotaExceededError de localStorage', () => {
      globalThis.localStorage = {
        getItem: () => {
          throw new Error('SecurityError: Cookies/Storage descativados');
        },
        setItem: () => {
          throw new Error('QuotaExceededError');
        },
      } as unknown as Storage;

      expect(getStoredViewMode()).toBe('reading');
      expect(getSavedSlideIndex('slug-1', 5)).toBe(0);
      expect(() => setStoredViewMode('presentation-scroll')).not.toThrow();
      expect(() => saveSlideIndex('slug-1', 2)).not.toThrow();
    });
  });
});
