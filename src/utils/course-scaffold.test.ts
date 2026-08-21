import { describe, expect, it } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';

const root = path.join(__dirname, '..', 'content', 'lecciones');

describe('esqueleto curricular futuro', () => {
  it('programa PowerPoint como la siguiente clase del 22 de agosto de 2026', () => {
    const file = path.join(
      root,
      '02-ofimatica-en-la-nube/02-presentaciones-proyecto/01-powerpoint/index.mdx',
    );
    const content = fs.readFileSync(file, 'utf8');

    expect(content).toContain('title: "PowerPoint: Presentaciones"');
    expect(content).toContain('fecha: "22-08-2026"');
    expect(content).toContain('moduleTitle: "2 - Ofimática en la Nube"');
  });

  it('mantiene una relación de progreso para PowerPoint', () => {
    const mapping = fs.readFileSync(
      path.join(__dirname, '../features/progress/mapping.ts'),
      'utf8',
    );

    expect(mapping).toContain(
      "lessonSlug: '02-ofimatica-en-la-nube/02-presentaciones-proyecto/01-powerpoint'",
    );
  });
});
