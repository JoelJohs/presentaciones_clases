import type { ViewMode } from './types';
import { VIEW_MODE_STORAGE_KEY, DEFAULT_VIEW_MODE } from './constants';

export function parseViewMode(val: unknown): ViewMode {
  if (val === 'reading') return 'reading';
  if (val === 'presentation-scroll') return 'presentation-scroll';
  if (val === 'presentation-slides') return 'presentation-slides';
  if (val === 'presentation') return 'presentation-scroll'; // Migración legacy
  return DEFAULT_VIEW_MODE;
}

export function getStoredViewMode(): ViewMode {
  if (typeof localStorage === 'undefined') return DEFAULT_VIEW_MODE;
  try {
    const stored = localStorage.getItem(VIEW_MODE_STORAGE_KEY);
    return parseViewMode(stored);
  } catch {
    return DEFAULT_VIEW_MODE;
  }
}

export function setStoredViewMode(mode: ViewMode): ViewMode {
  const validMode = parseViewMode(mode);
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(VIEW_MODE_STORAGE_KEY, validMode);
    } catch {}
  }
  return validMode;
}
