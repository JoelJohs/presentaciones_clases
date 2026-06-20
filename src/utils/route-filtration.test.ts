import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Dynamic Route Filtration Validation', () => {
  it('should filter getStaticPaths using getNavigationStructure', () => {
    const slugAstroPath = path.join(__dirname, '../pages/[...slug].astro');

    // 1. Verify file exists
    expect(fs.existsSync(slugAstroPath)).toBe(true);
    const content = fs.readFileSync(slugAstroPath, 'utf-8');

    // 2. Verify getStaticPaths exists
    expect(content).toContain('export async function getStaticPaths()');

    // 3. Verify getNavigationStructure is imported and called inside getStaticPaths
    expect(content).toContain("import { getNavigationStructure } from '../utils/navigation';");
    expect(content).toContain('const nav = getNavigationStructure(lecciones);');

    // 4. Verify that it maps nav.allLessonsOrdered instead of a raw sorted collection
    expect(content).toContain('return nav.allLessonsOrdered.map((lessonLink) => {');
    expect(content).toContain('const leccion = lecciones.find(l => l.id === lessonLink.id)!;');
    expect(content).toContain('params: { slug: lessonLink.slug },');
  });
});
