import { describe, expect, it } from 'vitest';
import {
  CURRICULUM_MODULES,
  TOTAL_CURRICULUM_LESSONS,
  getAllCurriculumLessons,
  findLessonBySlug,
  findModuleByNumber,
} from './curriculum';
import { STUDENT_GROUPS, getActiveGroups, getGroupById } from './groups';

describe('Arquitectura Curricular de 12 Módulos y 56 Lecciones (Sin Gamificación)', () => {
  it('contiene exactamente 12 módulos ordenados numéricamente del 1 al 12', () => {
    expect(CURRICULUM_MODULES).toHaveLength(12);
    CURRICULUM_MODULES.forEach((mod, index) => {
      expect(mod.number).toBe(index + 1);
      expect(mod.id).toMatch(/^\d{2}-/);
      expect(mod.title).toContain(`${index + 1} - `);
    });
  });

  it('suma exactamente 56 lecciones en el total curricular (rango 54-56)', () => {
    expect(TOTAL_CURRICULUM_LESSONS).toBe(56);
    expect(TOTAL_CURRICULUM_LESSONS).toBeGreaterThanOrEqual(54);
    expect(TOTAL_CURRICULUM_LESSONS).toBeLessThanOrEqual(56);
  });

  it('cada módulo tiene temas y lecciones estructuradas con duración y tipo pedagógico', () => {
    for (const mod of CURRICULUM_MODULES) {
      expect(mod.topics.length).toBeGreaterThan(0);
      for (const topic of mod.topics) {
        expect(topic.lessons.length).toBeGreaterThan(0);
        for (const lesson of topic.lessons) {
          expect(lesson.title).toBeTruthy();
          expect(lesson.duration).toBeGreaterThanOrEqual(30);
          expect(['lesson', 'activity', 'assessment', 'project']).toContain(lesson.kind);
        }
      }
    }
  });

  it('permite buscar módulos por su número', () => {
    const mod1 = findModuleByNumber(1);
    expect(mod1).toBeDefined();
    expect(mod1?.shortTitle).toBe('Fundamentos y Hardware');

    const mod12 = findModuleByNumber(12);
    expect(mod12).toBeDefined();
    expect(mod12?.shortTitle).toBe('Proyecto Final y Portafolio');
  });

  it('permite buscar lecciones por slug mediante findLessonBySlug', () => {
    const lesson = findLessonBySlug('01-fundamentos-mantenimiento/01-introduccion-computacion/01-hardware-y-software');
    expect(lesson).toBeDefined();
    expect(lesson?.title).toBe('Hardware y Software');
    expect(lesson?.moduleNumber).toBe(1);
  });

  it('gestiona la configuración de grupos con Grupo 2 en estado pendiente', () => {
    const active = getActiveGroups();
    expect(active.length).toBe(1);
    expect(active[0].id).toBe('sabado');

    expect(STUDENT_GROUPS.sabado.active).toBe(true);
    expect(STUDENT_GROUPS.domingo.active).toBe(false);

    const group1 = getGroupById('sabado');
    expect(group1.name).toContain('Sábado');
  });
});
