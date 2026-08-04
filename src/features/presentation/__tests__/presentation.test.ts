import { describe, it, expect } from 'vitest';
import {
  parseViewMode,
  segmentNodeList,
  shouldIgnoreKeyboardEvent,
  getKeyboardAction,
  calculateSlideNavigation,
} from '../index';

describe('Motor de Presentación por Diapositivas - Fase 4C', () => {
  describe('1. Parsing de Modos y Migración Legacy', () => {
    it('migra el valor legacy "presentation" a "presentation-scroll"', () => {
      expect(parseViewMode('presentation')).toBe('presentation-scroll');
    });

    it('respeta los modos válidos', () => {
      expect(parseViewMode('reading')).toBe('reading');
      expect(parseViewMode('presentation-scroll')).toBe('presentation-scroll');
      expect(parseViewMode('presentation-slides')).toBe('presentation-slides');
    });

    it('aplica fallback "reading" para valores desconocidos o nulos', () => {
      expect(parseViewMode(null)).toBe('reading');
      expect(parseViewMode(undefined)).toBe('reading');
      expect(parseViewMode('modo-invalido')).toBe('reading');
    });
  });

  describe('2. Segmentación de Contenido por H2', () => {
    it('divide nodos con contenido previo al primer H2', () => {
      const nodes = [
        { type: 'content' as const, text: 'Párrafo introductorio' },
        { type: 'h2' as const, text: 'Primer Tema', id: 'primer-tema' },
        { type: 'content' as const, text: 'Contenido tema 1' },
        { type: 'h2' as const, text: 'Segundo Tema', id: 'segundo-tema' },
        { type: 'content' as const, text: 'Contenido tema 2' },
      ];

      const slides = segmentNodeList(nodes);
      expect(slides.length).toBe(3);
      expect(slides[0].title).toBe('Introducción');
      expect(slides[1].title).toBe('Primer Tema');
      expect(slides[2].title).toBe('Segundo Tema');
    });

    it('crea una sola diapositiva si la lección no contiene H2', () => {
      const nodes = [
        { type: 'content' as const, text: 'Párrafo 1' },
        { type: 'content' as const, text: 'Párrafo 2' },
      ];

      const slides = segmentNodeList(nodes);
      expect(slides.length).toBe(1);
      expect(slides[0].title).toBe('Introducción');
    });

    it('maneja una lección con un solo H2', () => {
      const nodes = [
        { type: 'h2' as const, text: 'Tema Único' },
        { type: 'content' as const, text: 'Explicación' },
      ];

      const slides = segmentNodeList(nodes);
      expect(slides.length).toBe(1);
      expect(slides[0].title).toBe('Tema Único');
    });
  });

  describe('3. Teclado y Selección de Acciones', () => {
    it('mapea correctamente las teclas de avance y retroceso', () => {
      expect(getKeyboardAction('ArrowRight')).toBe('next');
      expect(getKeyboardAction('ArrowDown')).toBe('next');
      expect(getKeyboardAction('PageDown')).toBe('next');
      expect(getKeyboardAction(' ')).toBe('next');

      expect(getKeyboardAction('ArrowLeft')).toBe('prev');
      expect(getKeyboardAction('ArrowUp')).toBe('prev');
      expect(getKeyboardAction('PageUp')).toBe('prev');

      expect(getKeyboardAction('Home')).toBe('first');
      expect(getKeyboardAction('End')).toBe('last');
      expect(getKeyboardAction('F')).toBe('fullscreen');
      expect(getKeyboardAction('Escape')).toBe('exit');
    });

    it('ignora eventos en elementos interactivos de entrada', () => {
      expect(shouldIgnoreKeyboardEvent({ tagName: 'INPUT' })).toBe(true);
      expect(shouldIgnoreKeyboardEvent({ tagName: 'TEXTAREA' })).toBe(true);
      expect(shouldIgnoreKeyboardEvent({ tagName: 'BUTTON' })).toBe(true);
      expect(shouldIgnoreKeyboardEvent({ tagName: 'A' })).toBe(true);
      expect(shouldIgnoreKeyboardEvent({ isContentEditable: true })).toBe(true);
      expect(shouldIgnoreKeyboardEvent({ tagName: 'DIV' })).toBe(false);
    });
  });

  describe('4. Cálculo de Navegación y Límites', () => {
    it('no permite avanzar más allá del total de diapositivas', () => {
      expect(calculateSlideNavigation(2, 3, 'next')).toBe(2);
      expect(calculateSlideNavigation(0, 3, 'next')).toBe(1);
    });

    it('no permite retroceder más allá de la primera diapositiva', () => {
      expect(calculateSlideNavigation(0, 3, 'prev')).toBe(0);
      expect(calculateSlideNavigation(2, 3, 'prev')).toBe(1);
    });

    it('soporta navegación a primera y última diapositiva', () => {
      expect(calculateSlideNavigation(2, 5, 'first')).toBe(0);
      expect(calculateSlideNavigation(0, 5, 'last')).toBe(4);
    });

    it('valida asignación de índice numérico dentro de rango', () => {
      expect(calculateSlideNavigation(0, 5, 3)).toBe(3);
      expect(calculateSlideNavigation(0, 5, 10)).toBe(4);
      expect(calculateSlideNavigation(0, 5, -2)).toBe(0);
    });
  });
});
