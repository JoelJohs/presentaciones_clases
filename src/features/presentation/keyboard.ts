export type KeyboardAction =
  | 'next'
  | 'prev'
  | 'first'
  | 'last'
  | 'fullscreen'
  | 'exit'
  | null;

export function shouldIgnoreKeyboardEvent(target: unknown): boolean {
  if (!target || typeof target !== 'object') return false;
  const el = target as { tagName?: string; isContentEditable?: boolean };
  const tag = el.tagName?.toUpperCase() || '';
  if (
    tag === 'INPUT' ||
    tag === 'TEXTAREA' ||
    tag === 'SELECT' ||
    tag === 'BUTTON' ||
    tag === 'A' ||
    el.isContentEditable === true
  ) {
    return true;
  }
  return false;
}

export function getKeyboardAction(key: string, code?: string): KeyboardAction {
  switch (key) {
    case 'ArrowRight':
    case 'ArrowDown':
    case 'PageDown':
    case ' ':
      return 'next';
    case 'ArrowLeft':
    case 'ArrowUp':
    case 'PageUp':
      return 'prev';
    case 'Home':
      return 'first';
    case 'End':
      return 'last';
    case 'f':
    case 'F':
      return 'fullscreen';
    case 'Escape':
      return 'exit';
    default:
      if (code === 'Space') return 'next';
      return null;
  }
}
