import { describe, it, expect } from 'vitest';
import {
  parseCompletedLessons,
  serializeCompletedLessons,
  toggleCompletedLesson,
  calculateDashboardProgress,
  parseStudyPlanProgress,
  serializeStudyPlanProgress,
  setStudyPlanItem,
  calculateStudyPlanMetrics,
} from './progress-storage';

describe('Progress Storage - Dashboard (progress_completed)', () => {
  it('1. Maneja estado inexistente (null o vacio)', () => {
    expect(parseCompletedLessons(null)).toEqual([]);
    expect(parseCompletedLessons('')).toEqual([]);
  });

  it('2. Maneja un arreglo vacio en JSON', () => {
    expect(parseCompletedLessons('[]')).toEqual([]);
  });

  it('3. Parsea un arreglo con slugs validos', () => {
    const input = JSON.stringify(['modulo-1/leccion-1', 'modulo-1/leccion-2']);
    expect(parseCompletedLessons(input)).toEqual(['modulo-1/leccion-1', 'modulo-1/leccion-2']);
  });

  it('4. Maneja JSON invalido o corrupto sin lanzar excepciones', () => {
    expect(parseCompletedLessons('{ invalid json')).toEqual([]);
    expect(parseCompletedLessons('undefined')).toEqual([]);
  });

  it('5. Maneja JSON valido con estructura incorrecta (ej. objeto en vez de arreglo)', () => {
    expect(parseCompletedLessons('{"slug": "leccion-1"}')).toEqual([]);
    expect(parseCompletedLessons('12345')).toEqual([]);
    expect(parseCompletedLessons('"just a string"')).toEqual([]);
  });

  it('6. Filtra valores no-string o vacios dentro del arreglo', () => {
    const input = JSON.stringify(['leccion-1', 123, null, true, '', '  ', 'leccion-2']);
    expect(parseCompletedLessons(input)).toEqual(['leccion-1', 'leccion-2']);
  });

  it('7. Elimina duplicados en el arreglo almacenado', () => {
    const input = JSON.stringify(['leccion-1', 'leccion-2', 'leccion-1', 'leccion-1']);
    expect(parseCompletedLessons(input)).toEqual(['leccion-1', 'leccion-2']);
  });

  it('8. Alterna (toggle) agregando una leccion no completada', () => {
    const initial = ['leccion-1'];
    const updated = toggleCompletedLesson(initial, 'leccion-2');
    expect(updated).toEqual(['leccion-1', 'leccion-2']);
  });

  it('9. Alterna (toggle) removiendo una leccion ya completada', () => {
    const initial = ['leccion-1', 'leccion-2'];
    const updated = toggleCompletedLesson(initial, 'leccion-1');
    expect(updated).toEqual(['leccion-2']);
  });

  it('10. Garantiza inmutabilidad al alternar lecciones', () => {
    const initial = ['leccion-1'];
    const updated = toggleCompletedLesson(initial, 'leccion-2');
    expect(initial).toEqual(['leccion-1']);
    expect(updated).not.toBe(initial);
  });

  it('11. Calcula porcentaje de avance del Dashboard correctamente', () => {
    expect(calculateDashboardProgress([], 0)).toEqual({ percent: 0, completedCount: 0 });
    expect(calculateDashboardProgress([], 10)).toEqual({ percent: 0, completedCount: 0 });
    expect(calculateDashboardProgress(['l-1', 'l-2', 'l-3'], 10)).toEqual({ percent: 30, completedCount: 3 });
    expect(calculateDashboardProgress(['l-1', 'l-2'], 3)).toEqual({ percent: 67, completedCount: 2 });
    expect(calculateDashboardProgress(['l-1', 'l-2', 'l-3'], 3)).toEqual({ percent: 100, completedCount: 3 });
  });

  it('12. Realiza ciclo completo de serializacion y parseo (round-trip)', () => {
    const state = ['leccion-1', 'leccion-2'];
    const serialized = serializeCompletedLessons(state);
    const parsed = parseCompletedLessons(serialized);
    expect(parsed).toEqual(state);
  });
});

describe('Progress Storage - Plan de Estudio (plan-estudio-progress)', () => {
  it('1. Maneja estado inexistente (null o vacio)', () => {
    expect(parseStudyPlanProgress(null)).toEqual({});
    expect(parseStudyPlanProgress('')).toEqual({});
  });

  it('2. Maneja un objeto vacio en JSON', () => {
    expect(parseStudyPlanProgress('{}')).toEqual({});
  });

  it('3. Parsea un estado valido con booleanos', () => {
    const input = JSON.stringify({ 'st-1-1-1': true, 'st-1-1-2': false });
    expect(parseStudyPlanProgress(input)).toEqual({ 'st-1-1-1': true, 'st-1-1-2': false });
  });

  it('4. Maneja JSON invalido sin lanzar excepciones', () => {
    expect(parseStudyPlanProgress('corrupted json {')).toEqual({});
  });

  it('5. Maneja JSON valido con estructura incorrecta (ej. arreglo en vez de objeto)', () => {
    expect(parseStudyPlanProgress('["st-1", "st-2"]')).toEqual({});
    expect(parseStudyPlanProgress('true')).toEqual({});
  });

  it('6. Filtra llaves o valores que no sean booleanos', () => {
    const input = JSON.stringify({ 'st-1': true, 'st-2': 'string-val', 'st-3': 1, 'st-4': false });
    expect(parseStudyPlanProgress(input)).toEqual({ 'st-1': true, 'st-4': false });
  });

  it('7. Activa un elemento en el Plan de Estudio', () => {
    const initial = {};
    const updated = setStudyPlanItem(initial, 'st-1-1-1', true);
    expect(updated).toEqual({ 'st-1-1-1': true });
  });

  it('8. Desactiva un elemento en el Plan de Estudio', () => {
    const initial = { 'st-1-1-1': true, 'st-1-1-2': true };
    const updated = setStudyPlanItem(initial, 'st-1-1-1', false);
    expect(updated).toEqual({ 'st-1-1-2': true });
  });

  it('9. Garantiza inmutabilidad al modificar elementos', () => {
    const initial = { 'st-1-1-1': true };
    const updated = setStudyPlanItem(initial, 'st-1-1-2', true);
    expect(initial).toEqual({ 'st-1-1-1': true });
    expect(updated).not.toBe(initial);
  });

  it('10. Calcula metricas agregadas del Plan de Estudio', () => {
    expect(calculateStudyPlanMetrics(0, 0)).toEqual({ percent: 0, checkedCount: 0, totalItems: 0 });
    expect(calculateStudyPlanMetrics(10, 0)).toEqual({ percent: 0, checkedCount: 0, totalItems: 10 });
    expect(calculateStudyPlanMetrics(10, 5)).toEqual({ percent: 50, checkedCount: 5, totalItems: 10 });
    expect(calculateStudyPlanMetrics(3, 1)).toEqual({ percent: 33, checkedCount: 1, totalItems: 3 });
    expect(calculateStudyPlanMetrics(10, 10)).toEqual({ percent: 100, checkedCount: 10, totalItems: 10 });
  });

  it('11. Realiza ciclo completo de serializacion y parseo (round-trip)', () => {
    const state = { 'st-1-1-1': true, 'st-1-1-2': true };
    const serialized = serializeStudyPlanProgress(state);
    const parsed = parseStudyPlanProgress(serialized);
    expect(parsed).toEqual(state);
  });
});
