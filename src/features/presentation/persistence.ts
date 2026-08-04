import { SLIDE_INDEX_STORAGE_PREFIX } from './constants';

export function getSavedSlideIndex(slug: string, maxSlides: number): number {
  if (!slug || maxSlides <= 0 || typeof localStorage === 'undefined') return 0;
  try {
    const raw = localStorage.getItem(`${SLIDE_INDEX_STORAGE_PREFIX}${slug}`);
    if (!raw) return 0;
    const parsed = parseInt(raw, 10);
    if (isNaN(parsed) || parsed < 0 || parsed >= maxSlides) return 0;
    return parsed;
  } catch {
    return 0;
  }
}

export function saveSlideIndex(slug: string, index: number): void {
  if (!slug || index < 0 || typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(`${SLIDE_INDEX_STORAGE_PREFIX}${slug}`, String(index));
  } catch {}
}
