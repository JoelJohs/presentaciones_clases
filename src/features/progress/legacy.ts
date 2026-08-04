/**
 * Adaptador aislado para la gestión de estado de elementos no canónicos
 * (actividades, evaluaciones) en el Plan de Estudio mediante la llave heredada 'plan-estudio-progress'.
 */

import { parseStudyPlanProgress, serializeStudyPlanProgress } from './storage';
import type { StudyPlanProgress } from './types';
import { LEGACY_STUDY_PLAN_STORAGE_KEY } from './constants';

/**
 * Lee el estado guardado de elementos no canónicos en localStorage.
 */
export function getLegacyNonCanonicalState(): StudyPlanProgress {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return {};
  }
  try {
    const raw = localStorage.getItem(LEGACY_STUDY_PLAN_STORAGE_KEY);
    return parseStudyPlanProgress(raw);
  } catch {
    return {};
  }
}

/**
 * Guarda el estado de elementos no canónicos en localStorage.
 */
export function saveLegacyNonCanonicalState(state: StudyPlanProgress): void {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return;
  }
  try {
    localStorage.setItem(LEGACY_STUDY_PLAN_STORAGE_KEY, serializeStudyPlanProgress(state));
  } catch {
    // Guard
  }
}

/**
 * Establece el estado de un elemento no canónico específico por su ID de DOM.
 */
export function setLegacyNonCanonicalItem(id: string, checked: boolean): StudyPlanProgress {
  const current = getLegacyNonCanonicalState();
  if (!id || typeof id !== 'string') return current;

  const next = {
    ...current,
    [id]: Boolean(checked),
  };

  saveLegacyNonCanonicalState(next);
  return next;
}
