import {
  getCompletedLessons,
  isLessonCompleted,
  toggleLessonCompleted,
  calculateDashboardProgress,
} from '../features/progress';

export function getCompleted(): string[] {
  return getCompletedLessons();
}

export function isCompleted(slug: string): boolean {
  return isLessonCompleted(slug);
}

export function toggle(slug: string): string[] {
  return toggleLessonCompleted(slug);
}

export function getPercent(allSlugs: string[]): number {
  if (!Array.isArray(allSlugs) || allSlugs.length === 0) return 0;
  const completed = getCompleted();
  const validCompleted = completed.filter((s) => allSlugs.includes(s));
  return calculateDashboardProgress(validCompleted, allSlugs.length).percent;
}

export function getNextLesson(allSlugs: string[]): string | null {
  if (!Array.isArray(allSlugs)) return null;
  const completed = getCompleted();
  return allSlugs.find((s) => !completed.includes(s)) || null;
}
