const STORAGE_KEY = 'progress_completed';

export function getCompleted(): string[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function isCompleted(slug: string): boolean {
  return getCompleted().includes(slug);
}

export function toggle(slug: string): string[] {
  const set = getCompleted();
  const idx = set.indexOf(slug);
  if (idx === -1) set.push(slug);
  else set.splice(idx, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(set));
  return set;
}

export function getPercent(allSlugs: string[]): number {
  if (allSlugs.length === 0) return 0;
  const done = getCompleted().filter(s => allSlugs.includes(s)).length;
  return Math.round((done / allSlugs.length) * 100);
}

export function getNextLesson(allSlugs: string[]): string | null {
  return allSlugs.find(s => !isCompleted(s)) || null;
}
