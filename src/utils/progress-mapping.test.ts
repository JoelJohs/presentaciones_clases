import { describe, it, expect } from 'vitest';
import {
  PROGRESS_RELATIONS,
  LEGACY_PROGRESS_ID_MAP,
  getRelationByStudyPlanId,
  getLessonSlugForStudyPlanId,
  getStudyPlanIdsForLessonSlug,
  isLessonBackedItem,
  translateLegacyId,
} from './progress-mapping';

describe('Progress Semantic Mapping (src/utils/progress-mapping.ts)', () => {
  it('1. Obtiene relación semántica por ID estable', () => {
    const rel = getRelationByStudyPlanId('mod-01.intro.hardware-software');
    expect(rel).toBeDefined();
    expect(rel?.title).toBe('Hardware y Software');
    expect(rel?.kind).toBe('lesson');
  });

  it('2. Obtiene el slug de lección para un elemento de tipo lesson', () => {
    const slug = getLessonSlugForStudyPlanId('mod-01.intro.hardware-software');
    expect(slug).toBe('01-fundamentos-mantenimiento/01-introduccion-computacion/01-hardware-y-software');
  });

  it('3. Obtiene el slug para una evaluación (assessment) con lección asignada', () => {
    const slug = getLessonSlugForStudyPlanId('mod-01.evaluacion.resolucion-problemas');
    expect(slug).toBe('01-fundamentos-mantenimiento/03-evaluacion-troubleshooting/01-evaluacion-resolucion-problemas');
  });

  it('4. Obtiene el slug de una lección generada posteriormente', () => {
    const slug = getLessonSlugForStudyPlanId('mod-02.docs-sheets.google-sheets');
    expect(slug).toBe('02-ofimatica-en-la-nube/01-google-docs-y-sheets/02-google-sheets');
  });

  it('5. Maneja ID inexistente o no válido', () => {
    expect(getRelationByStudyPlanId('id-inexistente')).toBeUndefined();
    expect(getLessonSlugForStudyPlanId('id-inexistente')).toBeUndefined();
  });

  it('6. Verifica relación uno a uno entre ID y lección', () => {
    expect(isLessonBackedItem('mod-01.intro.hardware-software')).toBe(true);
    expect(isLessonBackedItem('mod-02.docs-sheets.google-sheets')).toBe(true);
  });

  it('7. Realiza búsqueda inversa de IDs del Plan por slug de lección', () => {
    const slug = '01-fundamentos-mantenimiento/01-introduccion-computacion/01-hardware-y-software';
    const ids = getStudyPlanIdsForLessonSlug(slug);
    expect(ids).toEqual(['mod-01.intro.hardware-software']);
  });

  it('8. Maneja búsqueda inversa para slugs no asignados', () => {
    expect(getStudyPlanIdsForLessonSlug('slug-inexistente')).toEqual([]);
  });

  it('9. Traduce IDs heredados válidos (mX-Y-Z y st-X-Y-Z)', () => {
    expect(translateLegacyId('m1-1-1')).toBe('mod-01.intro.hardware-software');
    expect(translateLegacyId('st-1-1-1')).toBe('mod-01.intro.hardware-software');
    expect(translateLegacyId('m2-1-1')).toBe('mod-02.docs-sheets.google-docs');
  });

  it('10. Retorna el mismo ID si no se encuentra en el mapa heredado', () => {
    expect(translateLegacyId('mod-01.intro.hardware-software')).toBe('mod-01.intro.hardware-software');
    expect(translateLegacyId('desconocido')).toBe('desconocido');
  });

  it('11. Garantiza traducción determinista por alias heredado', () => {
    const relFromLegacy = getRelationByStudyPlanId('m1-1-2');
    const relFromSemantic = getRelationByStudyPlanId('mod-01.intro.sistema-operativo');
    expect(relFromLegacy).toEqual(relFromSemantic);
  });

  it('12. Verifica que NO existan IDs semánticos duplicados en PROGRESS_RELATIONS', () => {
    const ids = PROGRESS_RELATIONS.map((r) => r.studyPlanId);
    const uniqueIds = new Set(ids);
    expect(ids.length).toBe(uniqueIds.size);
  });

  it('13. Maneja slug vacío o no string en búsqueda inversa', () => {
    expect(getStudyPlanIdsForLessonSlug('')).toEqual([]);
    expect(getStudyPlanIdsForLessonSlug(null as unknown as string)).toEqual([]);
  });

  it('14. Maneja ID semántico vacío o nulo', () => {
    expect(getRelationByStudyPlanId('')).toBeUndefined();
    expect(getRelationByStudyPlanId(null as unknown as string)).toBeUndefined();
  });

  it('15. Garantiza inmutabilidad en búsquedas inversas', () => {
    const slug = '01-fundamentos-mantenimiento/01-introduccion-computacion/01-hardware-y-software';
    const res1 = getStudyPlanIdsForLessonSlug(slug);
    const res2 = getStudyPlanIdsForLessonSlug(slug);
    expect(res1).toEqual(res2);
    expect(res1).not.toBe(res2);
  });

  it('16. Verifica consistencia general del mapa de relaciones', () => {
    for (const rel of PROGRESS_RELATIONS) {
      expect(rel.studyPlanId).toBeTruthy();
      expect(rel.kind).toBeTruthy();
      expect(rel.title).toBeTruthy();
      expect(rel.confidence).toBeTruthy();
    }
  });

  it('17. Verifica que todas las relaciones con confianza EXACTA especifiquen un lessonSlug', () => {
    const exactRelations = PROGRESS_RELATIONS.filter((r) => r.confidence === 'EXACTA');
    for (const rel of exactRelations) {
      expect(rel.lessonSlug).toBeDefined();
      expect(typeof rel.lessonSlug).toBe('string');
      expect(rel.lessonSlug?.length).toBeGreaterThan(0);
    }
  });

  it('18. Verifica que todos los elementos del Plan tengan una clasificación semántica válida', () => {
    const validKinds = ['lesson', 'topic', 'module', 'activity', 'review', 'assessment', 'informational'];
    for (const rel of PROGRESS_RELATIONS) {
      expect(validKinds).toContain(rel.kind);
    }
  });

  it('19. Verifica que ningún ID en LEGACY_PROGRESS_ID_MAP apunte a un ID semántico inexistente', () => {
    const validSemanticIds = new Set(PROGRESS_RELATIONS.map((r) => r.studyPlanId));
    for (const targetSemanticId of Object.values(LEGACY_PROGRESS_ID_MAP)) {
      expect(validSemanticIds.has(targetSemanticId)).toBe(true);
    }
  });

  it('20. Verifica la correspondencia de slugs reales conocidos de Módulo 1 y Módulo 2', () => {
    const knownSlugs = [
      '01-fundamentos-mantenimiento/01-introduccion-computacion/01-hardware-y-software',
      '01-fundamentos-mantenimiento/01-introduccion-computacion/02-el-sistema-operativo',
      '01-fundamentos-mantenimiento/02-hardware-mantenimiento/01-componentes-internos',
      '01-fundamentos-mantenimiento/02-hardware-mantenimiento/02-mantenimiento-y-formateo',
      '01-fundamentos-mantenimiento/03-evaluacion-troubleshooting/01-evaluacion-resolucion-problemas',
      '02-ofimatica-en-la-nube/01-google-docs-y-sheets/01-google-docs',
    ];

    for (const slug of knownSlugs) {
      const matchedIds = getStudyPlanIdsForLessonSlug(slug);
      expect(matchedIds.length).toBeGreaterThan(0);
    }
  });
});
