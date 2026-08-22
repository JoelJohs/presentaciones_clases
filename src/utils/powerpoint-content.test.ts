import { describe, expect, it } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

const lessonPath = path.join(
  __dirname,
  '../content/lecciones/02-ofimatica-en-la-nube/02-presentaciones-proyecto/01-powerpoint/index.mdx',
);
const homePath = path.join(__dirname, '../pages/index.astro');

describe('PowerPoint lesson content', () => {
  it('keeps the class focused and gives concrete examples', () => {
    const content = fs.readFileSync(lessonPath, 'utf-8');

    expect(content).not.toContain('Nota para mí');
    expect(content).not.toContain('Mensaje para docente');
    expect(content).not.toContain('## Propósito de la clase');
    expect(content).not.toContain('## Resultados de aprendizaje');
    expect(content).not.toContain('## Agenda de la sesión');
    expect(content).toContain('Ejemplo');
    expect(content).toContain('Revisa');
    expect(content).toContain('Observa una mala presentación');
    expect(content).toContain('Del documento a la presentación');
    expect(content).not.toContain('Minecraft');
    expect(content).toContain('documento de investigación de la clase anterior');
    expect(content).toContain('## 3. Elige la herramienta para tu presentación');
    expect(content).toContain('## 7. Presenta tu investigación');
    expect(content).not.toContain('## Cierre y verificación');
    expect(content).not.toContain('## 8.1 Lista de cotejo final');
  });

  it('uses h2 headings as slide boundaries', () => {
    const content = fs.readFileSync(lessonPath, 'utf-8');

    expect((content.match(/^## /gm) || []).length).toBeGreaterThan(20);
    expect(content).not.toMatch(/^### /m);
    expect(content).not.toMatch(/^#### /m);
  });

  it('keeps lesson tables inside the shared responsive table treatment', () => {
    const content = fs.readFileSync(lessonPath, 'utf-8');

    expect(content).toContain('<table>');
    expect(content).toContain('<thead>');
    expect(content).toContain('<tbody>');
    expect(content).not.toMatch(/^\|.+\|$/m);
  });
});

describe('home page messaging', () => {
  it('does not render the retired exam notice', () => {
    const content = fs.readFileSync(homePath, 'utf-8');

    expect(content).not.toContain("getCollection('mensajes')");
    expect(content).not.toContain('Mensaje semanal');
    expect(content).not.toContain('MensajeContent');
  });
});
