import { describe, it, expect } from 'vitest';
import { parseViewMode, calculateSlideNavigation } from './presentation';

describe('Re-exportador Backward-Compatible src/utils/presentation.ts', () => {
  it('re-exporta correctamente parseViewMode', () => {
    expect(parseViewMode('presentation')).toBe('presentation-scroll');
  });

  it('re-exporta correctamente calculateSlideNavigation', () => {
    expect(calculateSlideNavigation(0, 4, 'next')).toBe(1);
  });
});
