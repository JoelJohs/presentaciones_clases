import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('global.css prose table styles', () => {
  it('should contain the specific CSS styles for tables within .prose', () => {
    const cssPath = path.join(__dirname, 'global.css');
    expect(fs.existsSync(cssPath)).toBe(true);

    const cssContent = fs.readFileSync(cssPath, 'utf-8');

    // 1. Verify existence of the table selectors inside .prose
    expect(cssContent).toContain('.prose table');
    expect(cssContent).toContain('.prose th');
    expect(cssContent).toContain('.prose td');
    expect(cssContent).toContain('.prose tr:hover td');

    // 2. Verify specific styling properties are defined for each selector
    // Check .prose table properties
    expect(cssContent).toMatch(/\.prose\s+table\s*\{[^}]*width:\s*100%/);
    expect(cssContent).toMatch(/\.prose\s+table\s*\{[^}]*border-collapse:\s*collapse/);
    
    // Check .prose th properties
    expect(cssContent).toMatch(/\.prose\s+th\s*\{[^}]*background-color:\s*var\(--color-brand-sidebar-bg\)/);
    expect(cssContent).toMatch(/\.prose\s+th\s*\{[^}]*color:\s*var\(--color-brand-navy\)/);
    expect(cssContent).toMatch(/\.prose\s+th\s*\{[^}]*font-weight:\s*700/);

    // Check .prose td properties
    expect(cssContent).toMatch(/\.prose\s+td\s*\{[^}]*border-bottom:\s*1px\s+solid\s+var\(--color-brand-border\)/);
    expect(cssContent).toMatch(/\.prose\s+td\s*\{[^}]*color:\s*var\(--color-brand-text\)/);

    // Check .prose tr:hover td properties
    expect(cssContent).toMatch(/\.prose\s+tr:hover\s+td\s*\{[^}]*background-color:\s*var\(--color-brand-hover-bg\)/);
  });

  it('should contain mobile responsiveness rules for images and table container overflow', () => {
    const cssPath = path.join(__dirname, 'global.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');

    // Assert img and video constraints in prose
    expect(cssContent).toContain('.prose img,');
    expect(cssContent).toContain('.prose video');
    expect(cssContent).toMatch(/\.prose\s+img,\s*\.prose\s+video\s*\{[^}]*max-width:\s*100%/);

    // Assert table scroll rules
    expect(cssContent).toMatch(/\.prose\s+table\s*\{[^}]*display:\s*block/);
    expect(cssContent).toMatch(/\.prose\s+table\s*\{[^}]*overflow-x:\s*auto/);
    
  });

  it('should contain CSS styles for details summary toggle elements in prose', () => {
    const cssPath = path.join(__dirname, 'global.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');

    expect(cssContent).toContain('.prose details');
    expect(cssContent).toContain('.prose details[open]');
    expect(cssContent).toContain('.prose details summary');
    expect(cssContent).toContain('.prose details blockquote');
  });

  it('should contain CSS overrides for terminal code blocks in prose', () => {
    const cssPath = path.join(__dirname, 'global.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');

    expect(cssContent).toContain('.prose pre.bg-gray-950');
    expect(cssContent).toContain('.prose pre.text-gray-200');
    expect(cssContent).toMatch(/\.prose\s+pre\.bg-gray-950\s*\{[^}]*background-color:\s*var\(--color-gray-950,\s*#030712\)\s*!important/);
    expect(cssContent).toMatch(/\.prose\s+pre\.text-gray-200\s*\{[^}]*color:\s*var\(--color-gray-200,\s*#e5e7eb\)\s*!important/);
  });
});


