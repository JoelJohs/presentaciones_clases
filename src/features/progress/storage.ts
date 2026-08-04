import type { CompletedLessonSlugs, StudyPlanProgress } from './types';

/**
 * Parsea y normaliza la cadena almacenada en localStorage para el Dashboard ('progress_completed').
 * Garantiza que el valor retornado sea un arreglo válido de cadenas únicas de texto.
 */
export function parseCompletedLessons(raw: string | null): CompletedLessonSlugs {
  if (!raw || typeof raw !== 'string') {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    const uniqueSlugs = new Set<string>();
    for (let i = 0; i < parsed.length; i++) {
      const item = parsed[i];
      if (typeof item === 'string' && item.trim().length > 0) {
        uniqueSlugs.add(item.trim());
      }
    }

    return Array.from(uniqueSlugs);
  } catch {
    return [];
  }
}

/**
 * Serializa de forma determinista la lista de lecciones completadas para 'progress_completed'.
 */
export function serializeCompletedLessons(completed: CompletedLessonSlugs): string {
  if (!Array.isArray(completed)) {
    return JSON.stringify([]);
  }

  const clean = completed.filter(
    (item) => typeof item === 'string' && item.trim().length > 0
  );
  const unique = Array.from(new Set(clean));
  return JSON.stringify(unique);
}

/**
 * Conmuta inmutablemente un slug dentro del conjunto de lecciones completadas.
 */
export function toggleCompletedLesson(
  completed: CompletedLessonSlugs,
  slug: string
): CompletedLessonSlugs {
  if (!slug || typeof slug !== 'string') {
    return parseCompletedLessons(JSON.stringify(completed));
  }

  const cleanCurrent = parseCompletedLessons(JSON.stringify(completed));
  const set = new Set(cleanCurrent);

  if (set.has(slug)) {
    set.delete(slug);
  } else {
    set.add(slug);
  }

  return Array.from(set);
}

/**
 * Calcula el progreso y conteos para el Dashboard de forma pura.
 */
export function calculateDashboardProgress(
  completed: CompletedLessonSlugs,
  totalLessons: number
): { percent: number; completedCount: number } {
  const cleanCompleted = parseCompletedLessons(JSON.stringify(completed));
  const completedCount = cleanCompleted.length;

  if (typeof totalLessons !== 'number' || totalLessons <= 0) {
    return { percent: 0, completedCount: 0 };
  }

  const percent = Math.min(
    100,
    Math.max(0, Math.round((completedCount / totalLessons) * 100))
  );

  return { percent, completedCount };
}

/**
 * Parsea y normaliza la cadena almacenada en localStorage para 'plan-estudio-progress'.
 */
export function parseStudyPlanProgress(raw: string | null): StudyPlanProgress {
  if (!raw || typeof raw !== 'string') {
    return {};
  }

  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return {};
    }

    const state: StudyPlanProgress = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (typeof key === 'string' && key.trim().length > 0 && typeof value === 'boolean') {
        state[key] = value;
      }
    }

    return state;
  } catch {
    return {};
  }
}

/**
 * Serializa el estado de checkboxes del Plan de Estudio para 'plan-estudio-progress'.
 */
export function serializeStudyPlanProgress(state: StudyPlanProgress): string {
  if (!state || typeof state !== 'object' || Array.isArray(state)) {
    return JSON.stringify({});
  }

  const cleanState: StudyPlanProgress = {};
  for (const [key, value] of Object.entries(state)) {
    if (typeof key === 'string' && key.trim().length > 0 && typeof value === 'boolean') {
      cleanState[key] = value;
    }
  }

  return JSON.stringify(cleanState);
}

/**
 * Conmuta inmutablemente un ítem individual en el estado del Plan de Estudio.
 */
export function setStudyPlanItem(
  state: StudyPlanProgress,
  id: string,
  checked: boolean
): StudyPlanProgress {
  const current = parseStudyPlanProgress(JSON.stringify(state));
  if (!id || typeof id !== 'string') {
    return current;
  }

  if (checked) {
    return { ...current, [id]: true };
  }

  const copy = { ...current };
  delete copy[id];
  return copy;
}

/**
 * Calcula métricas porcentuales para el Plan de Estudio de forma pura.
 */
export function calculateStudyPlanMetrics(
  totalItems: number,
  checkedCount: number
): { percent: number; checkedCount: number; totalItems: number } {
  const validTotal = Math.max(0, typeof totalItems === 'number' ? totalItems : 0);
  const validChecked = Math.min(
    validTotal,
    Math.max(0, typeof checkedCount === 'number' ? checkedCount : 0)
  );

  if (validTotal === 0) {
    return { percent: 0, checkedCount: 0, totalItems: 0 };
  }

  const percent = Math.round((validChecked / validTotal) * 100);
  return { percent, checkedCount: validChecked, totalItems: validTotal };
}
