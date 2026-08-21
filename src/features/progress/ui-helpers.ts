import type { StudyPlanItemKind } from './types';

export function getContentKindMetadata(kind: StudyPlanItemKind): {
  label: string;
  isCanonical: boolean;
  icon: string;
} {
  switch (kind) {
    case 'lesson':
      return { label: 'Lección', isCanonical: true, icon: 'lucide:book-open' };
    case 'review':
      return { label: 'Repaso', isCanonical: false, icon: 'lucide:rotate-ccw' };
    case 'activity':
      return { label: 'Práctica', isCanonical: false, icon: 'lucide:wrench' };
    case 'assessment':
      return { label: 'Evaluación', isCanonical: false, icon: 'lucide:clipboard-pen-line' };
    case 'topic':
      return { label: 'Tema', isCanonical: false, icon: 'lucide:folder-open' };
    case 'module':
      return { label: 'Módulo', isCanonical: false, icon: 'lucide:package' };
    case 'informational':
    default:
      return { label: 'Recurso', isCanonical: false, icon: 'lucide:pin' };
  }
}

export function formatLessonCountBadge(completed: number, total: number): string {
  if (total <= 0) return '0/0';
  const safeCompleted = Math.max(0, Math.min(completed, total));
  return `${safeCompleted}/${total}`;
}
