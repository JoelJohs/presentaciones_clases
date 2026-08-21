import { describe, expect, it } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';

const root = path.join(__dirname, '..');
const read = (file: string) => fs.readFileSync(path.join(root, file), 'utf8');

describe('calidad UI estructural', () => {
  it('ofrece un enlace para saltar al contenido principal', () => {
    const layout = read('layouts/Layout.astro');

    expect(layout).toContain('Saltar al contenido');
    expect(layout).toContain('<main id="main-content"');
  });

  it('no serializa datos de módulos extra que el Dashboard no renderiza', () => {
    const dashboard = read('components/Dashboard.astro');

    expect(dashboard).not.toContain('processedExtras');
    expect(dashboard).not.toContain('extras: processedExtras');
  });

  it('usa iconos vectoriales en controles y badges estructurales', () => {
    const files = [
      'components/Dashboard.astro',
      'components/ui/ContentTypeBadge.astro',
      'pages/index.astro',
    ];
    const structuralEmoji = /[📢👋🚀🎉📋📚🔄🛠️📝📂📦📌]/u;

    for (const file of files) {
      expect(read(file), file).not.toMatch(structuralEmoji);
    }
  });

  it('deja que el botón nativo del plan gestione Enter y Espacio', () => {
    const plan = read('components/PlanEstudio.astro');

    expect(plan).not.toContain("wrapper.addEventListener('keydown'");
  });

  it('prepara una pista de scroll de tabla que puede ocultarse al llegar al final', () => {
    const page = read('pages/[...slug].astro');
    const css = read('styles/global.css');

    expect(page).toContain("wrapper.className = 'prose-table-wrapper'");
    expect(page).toContain("wrapper.classList.toggle(");
    expect(page).toContain("'is-at-end'");
    expect(css).toContain('.prose-table-wrapper.is-at-end::after');
  });
});
