import {
  parseCompletedLessons,
  parseStudyPlanProgress,
  serializeCompletedLessons,
} from './storage';
import type { CompletedLessonSlugs } from './types';
import {
  translateLegacyId,
  getRelationByStudyPlanId,
} from './mapping';
import {
  PROGRESS_STORAGE_KEY,
  LEGACY_STUDY_PLAN_STORAGE_KEY,
  PROGRESS_MIGRATION_KEY,
} from './constants';

export const MIGRATION_KEY = PROGRESS_MIGRATION_KEY;

/**
 * Realiza la migración de datos heredados desde 'plan-estudio-progress' hacia
 * la fuente canónica 'progress_completed'.
 *
 * Filtra únicamente elementos válidos de tipo 'lesson' con lessonSlug existente.
 * Es una función pura e idempotente.
 */
export function migrateLegacyProgress(
  currentCompleted: CompletedLessonSlugs,
  rawPlanEstudioProgress: string | null
): CompletedLessonSlugs {
  const planState = parseStudyPlanProgress(rawPlanEstudioProgress);
  const migratedSlugs = new Set<string>(currentCompleted);

  for (const [key, checked] of Object.entries(planState)) {
    if (!checked) continue;
    const semanticId = translateLegacyId(key);
    const relation = getRelationByStudyPlanId(semanticId);

    // Solo migrar si es una lección canónica ('lesson') con slug explícito
    if (relation && relation.kind === 'lesson' && relation.lessonSlug) {
      migratedSlugs.add(relation.lessonSlug);
    }
  }

  return Array.from(migratedSlugs);
}

/**
 * Ejecuta la migración en localStorage de forma segura e idempotente con SSR guard.
 * Retorna la lista canónica resultante de lecciones completadas.
 */
export function runProgressMigration(): CompletedLessonSlugs {
  if (typeof localStorage === 'undefined') {
    return [];
  }

  try {
    const rawCompleted = localStorage.getItem(PROGRESS_STORAGE_KEY);
    const currentCompleted = parseCompletedLessons(rawCompleted);
    const rawPlan = localStorage.getItem(LEGACY_STUDY_PLAN_STORAGE_KEY);

    const result = migrateLegacyProgress(currentCompleted, rawPlan);

    localStorage.setItem(PROGRESS_STORAGE_KEY, serializeCompletedLessons(result));
    localStorage.setItem(PROGRESS_MIGRATION_KEY, 'true');

    return result;
  } catch {
    return [];
  }
}
