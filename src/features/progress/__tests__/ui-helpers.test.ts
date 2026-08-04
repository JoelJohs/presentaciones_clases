import { describe, it, expect } from 'vitest';
import { getContentKindMetadata, formatLessonCountBadge } from '../ui-helpers';

describe('Utilidades de Clasificación Visual y UI (Fase 4B)', () => {
  it('1. Retorna los metadatos correctos para tipo lesson (canónico)', () => {
    const meta = getContentKindMetadata('lesson');
    expect(meta.label).toBe('Lección');
    expect(meta.isCanonical).toBe(true);
    expect(meta.icon).toBe('📚');
  });

  it('2. Retorna metadatos correctos para repasos (no canónico)', () => {
    const meta = getContentKindMetadata('review');
    expect(meta.label).toBe('Repaso');
    expect(meta.isCanonical).toBe(false);
    expect(meta.icon).toBe('🔄');
  });

  it('3. Retorna metadatos correctos para actividades y evaluaciones', () => {
    const activity = getContentKindMetadata('activity');
    const assessment = getContentKindMetadata('assessment');

    expect(activity.label).toBe('Práctica');
    expect(activity.isCanonical).toBe(false);

    expect(assessment.label).toBe('Evaluación');
    expect(assessment.isCanonical).toBe(false);
  });

  it('4. Formatea correctamente el contador de lecciones', () => {
    expect(formatLessonCountBadge(3, 6)).toBe('3/6');
    expect(formatLessonCountBadge(0, 5)).toBe('0/5');
    expect(formatLessonCountBadge(10, 5)).toBe('5/5');
    expect(formatLessonCountBadge(-1, 5)).toBe('0/5');
  });
});
