/**
 * Tipos centralizados del dominio de progreso.
 */

export type CompletedLessonSlugs = string[];

export type StudyPlanProgress = Record<string, boolean>;

export type StudyPlanItemKind =
  | 'lesson'
  | 'topic'
  | 'module'
  | 'activity'
  | 'review'
  | 'assessment'
  | 'informational';

export type RelationConfidence =
  | 'EXACTA'
  | 'PROBABLE'
  | 'AMBIGUA'
  | 'SIN CORRESPONDENCIA'
  | 'AGRUPADOR';

export interface ProgressRelation {
  studyPlanId: string;
  kind: StudyPlanItemKind;
  title: string;
  lessonSlug?: string;
  confidence: RelationConfidence;
}

export type ProgressSubscriber = (state: CompletedLessonSlugs) => void;
