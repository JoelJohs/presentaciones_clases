import type { StudyPlanItemKind } from './types';

export function getContentKindMetadata(kind: StudyPlanItemKind): {
  label: string;
  isCanonical: boolean;
  icon: string;
} {
  switch (kind) {
    case 'lesson':
      return { label: 'Lección', isCanonical: true, icon: '📚' };
    case 'review':
      return { label: 'Repaso', isCanonical: false, icon: '🔄' };
    case 'activity':
      return { label: 'Práctica', isCanonical: false, icon: '🛠️' };
    case 'assessment':
      return { label: 'Evaluación', isCanonical: false, icon: '📝' };
    case 'topic':
      return { label: 'Tema', isCanonical: false, icon: '📂' };
    case 'module':
      return { label: 'Módulo', isCanonical: false, icon: '📦' };
    case 'informational':
    default:
      return { label: 'Recurso', isCanonical: false, icon: '📌' };
  }
}

export function formatLessonCountBadge(completed: number, total: number): string {
  if (total <= 0) return '0/0';
  const safeCompleted = Math.max(0, Math.min(completed, total));
  return `${safeCompleted}/${total}`;
}
