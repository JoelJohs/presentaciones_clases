/**
 * API pública explícita del dominio de progreso.
 */

// Store Reactivo y Consulta de Progreso Canónico
export {
  initializeProgress,
  getCompletedLessons,
  isLessonCompleted,
  setLessonCompleted,
  toggleLessonCompleted,
  subscribeToProgress,
  isValidCanonicalLessonSlug,
  resetStoreForTesting,
} from './store';

// Mapeo Semántico e Identidad Estables
export {
  PROGRESS_RELATIONS,
  LEGACY_PROGRESS_ID_MAP,
  getRelationByStudyPlanId,
  getLessonSlugForStudyPlanId,
  getStudyPlanIdsForLessonSlug,
  isLessonBackedItem,
  translateLegacyId,
} from './mapping';

// Operaciones Puras de Almacenamiento y Métricas
export {
  parseCompletedLessons,
  serializeCompletedLessons,
  toggleCompletedLesson,
  calculateDashboardProgress,
  parseStudyPlanProgress,
  serializeStudyPlanProgress,
  setStudyPlanItem,
  calculateStudyPlanMetrics,
} from './storage';

// Lógica de Migración
export {
  migrateLegacyProgress,
  runProgressMigration,
} from './migration';

// Adaptador Legacy de Elementos No Canónicos
export {
  getLegacyNonCanonicalState,
  saveLegacyNonCanonicalState,
  setLegacyNonCanonicalItem,
} from './legacy';

// Constantes
export {
  PROGRESS_STORAGE_KEY,
  LEGACY_STUDY_PLAN_STORAGE_KEY,
  PROGRESS_MIGRATION_KEY,
  PROGRESS_CHANGED_EVENT,
} from './constants';

// Utilidades UI
export {
  getContentKindMetadata,
  formatLessonCountBadge,
} from './ui-helpers';

// Tipos
export type {
  CompletedLessonSlugs,
  StudyPlanProgress,
  StudyPlanItemKind,
  RelationConfidence,
  ProgressRelation,
  ProgressSubscriber,
} from './types';
