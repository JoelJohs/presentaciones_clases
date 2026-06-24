import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Visual Text Scaling for Projections Validation', () => {
  it('should have the updated larger typography sizes and margins in global.css', () => {
    const globalCssPath = path.join(__dirname, '../styles/global.css');

    // 1. Verify global.css exists
    expect(fs.existsSync(globalCssPath)).toBe(true);
    const cssContent = fs.readFileSync(globalCssPath, 'utf-8');

    // 2. Verify .prose line-height and base font-size
    expect(cssContent).toContain('line-height: 1.8;');
    expect(cssContent).toContain('font-size: 1.125rem; /* text-lg (~18px) */');

    // 3. Verify media query for desktop projection size
    expect(cssContent).toContain('@media (min-width: 1024px)');
    expect(cssContent).toContain('font-size: 1.25rem; /* text-xl (~20px) */');

    // 4. Verify .prose h1 scaled font size, weights, and margins
    expect(cssContent).toContain('.prose h1 {');
    expect(cssContent).toContain('font-size: 2.50rem; /* h1: 40px */');
    expect(cssContent).toContain('margin-top: 2.5rem;');
    expect(cssContent).toContain('margin-bottom: 1.25rem;');

    // 5. Verify .prose h2 scaled font size, weights, and margins
    expect(cssContent).toContain('.prose h2 {');
    expect(cssContent).toContain('font-size: 2.00rem; /* h2: 32px */');
    expect(cssContent).toContain('margin-top: 2.25rem;');
    expect(cssContent).toContain('margin-bottom: 1.00rem;');

    // 6. Verify .prose h3 scaled font size, weights, and margins
    expect(cssContent).toContain('.prose h3 {');
    expect(cssContent).toContain('font-size: 1.50rem; /* h3: 24px */');
    expect(cssContent).toContain('margin-top: 1.75rem;');
    expect(cssContent).toContain('margin-bottom: 0.75rem;');
  });

  it('should contain CSS classes for reading and presentation mode scaling overrides', () => {
    const globalCssPath = path.join(__dirname, '../styles/global.css');
    const cssContent = fs.readFileSync(globalCssPath, 'utf-8');

    // Reading mode checks
    expect(cssContent).toContain('.reading-mode .prose');
    expect(cssContent).toMatch(/\.reading-mode\s+\.prose\s*\{[^}]*font-size:\s*1\.0625rem/);

    // Presentation mode checks
    expect(cssContent).toContain('.presentation-mode .prose');
    expect(cssContent).toMatch(/\.presentation-mode\s+\.prose\s*\{[^}]*font-size:\s*1\.375rem/);
  });
});

