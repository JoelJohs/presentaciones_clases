import { describe, it, expect } from 'vitest';
import { getNavigationStructure } from './navigation';

describe('Navigation Logic', () => {
  it('should correctly sort and group entries by hierarchy and filepath', () => {
    const mockEntries = [
      {
        id: '01-modulo-fundamentos/01-conceptos/01-hardware-software.mdx',
        filePath: 'src/content/lecciones/01-modulo-fundamentos/01-conceptos/01-hardware-software.mdx',
        data: {
          title: 'Hardware y Software',
          moduleTitle: 'Módulo 1: Fundamentos',
          topicTitle: 'Tema 1: Conceptos Generales'
        }
      },
      {
        id: '00-inicio/02-plan-de-estudio.mdx',
        filePath: 'src/content/lecciones/00-inicio/02-plan-de-estudio.mdx',
        data: {
          title: 'Plan de Estudio'
        }
      },
      {
        id: '00-inicio/01-presentacion.mdx',
        filePath: 'src/content/lecciones/00-inicio/01-presentacion.mdx',
        data: {
          title: 'Presentación'
        }
      }
    ];

    const result = getNavigationStructure(mockEntries as any);

    // Initial pages (no moduleTitle) should be first, sorted by physical filename
    expect(result.initialPages[0].title).toBe('Presentación');
    expect(result.initialPages[1].title).toBe('Plan de Estudio');

    // Modules should group topics
    expect(result.modules.length).toBe(1);
    expect(result.modules[0].title).toBe('Módulo 1: Fundamentos');
    expect(result.modules[0].topics[0].title).toBe('Tema 1: Conceptos Generales');
    expect(result.modules[0].topics[0].lessons[0].title).toBe('Hardware y Software');
  });
});
