import { describe, it, expect } from 'vitest';
import { getNavigationStructure, getLessonReleaseDate } from './navigation';

describe('Navigation Logic', () => {
  it('should correctly sort and group entries by hierarchy and filepath', () => {
    const mockEntries = [
      {
        id: '01-modulo-fundamentos/01-conceptos/01-hardware-software.mdx',
        filePath: 'src/content/lecciones/01-modulo-fundamentos/01-conceptos/01-hardware-software.mdx',
        data: {
          title: 'Hardware y Software',
          moduleTitle: 'Módulo 1: Fundamentos',
          topicTitle: 'Tema 1: Conceptos Generales',
          fecha: '20-06-2026'
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

    // Flat ordered list check for prev/next calculations
    expect(result.allLessonsOrdered.length).toBe(3);
    expect(result.allLessonsOrdered[0].title).toBe('Presentación');
    expect(result.allLessonsOrdered[1].title).toBe('Plan de Estudio');
    expect(result.allLessonsOrdered[2].title).toBe('Hardware y Software');

    // Simulating the prev/next calculation from dynamic page router
    const activeSlug = '00-inicio/02-plan-de-estudio';
    const currentIndex = result.allLessonsOrdered.findIndex(l => l.slug === activeSlug);
    expect(currentIndex).toBe(1);

    const prevLesson = currentIndex > 0 ? result.allLessonsOrdered[currentIndex - 1] : null;
    const nextLesson = currentIndex < result.allLessonsOrdered.length - 1 ? result.allLessonsOrdered[currentIndex + 1] : null;

    expect(prevLesson).not.toBeNull();
    expect(prevLesson!.title).toBe('Presentación');
    expect(nextLesson).not.toBeNull();
    expect(nextLesson!.title).toBe('Hardware y Software');
  });

  it('should calculate correct weekly dates', () => {
    const w1 = getLessonReleaseDate(0);
    expect(w1.toISOString()).toContain('2026-06-20');
    
    const w2 = getLessonReleaseDate(1);
    expect(w2.toISOString()).toContain('2026-06-27');
  });

  it('should correctly filter and sort entries by release date', () => {
    const mockEntries = [
      {
        id: '01-modulo-fundamentos/01-conceptos/01-hardware-software.mdx',
        data: {
          title: 'Hardware y Software',
          moduleTitle: 'Módulo 1: Fundamentos',
          topicTitle: 'Tema 1: Conceptos Generales',
          fecha: '20-06-2026'
        }
      },
      {
        id: '01-modulo-fundamentos/01-conceptos/02-exploracion-so.mdx',
        data: {
          title: 'Exploración del SO',
          moduleTitle: 'Módulo 1: Fundamentos',
          topicTitle: 'Tema 1: Conceptos Generales',
          fecha: '27-06-2026'
        }
      },
      {
        id: '00-inicio/01-presentacion.mdx',
        data: {
          title: 'Presentación'
        }
      }
    ];

    // Force process.env.SHOW_ALL_LESSONS to empty to test filter behavior
    process.env.SHOW_ALL_LESSONS = 'false';
    const originalDev = import.meta.env.DEV;
    // @ts-ignore
    import.meta.env.DEV = false;

    try {
      // Mock build time as 2026-06-20 (only Lesson 1 released)
      const testDate = new Date('2026-06-20T12:00:00-06:00');
      const result = getNavigationStructure(mockEntries as any, testDate);

      // Presentación is always visible
      expect(result.initialPages.length).toBe(1);
      expect(result.initialPages[0].title).toBe('Presentación');

      // Lesson 1 is visible
      expect(result.modules.length).toBe(1);
      expect(result.modules[0].topics[0].lessons.length).toBe(1);
      expect(result.modules[0].topics[0].lessons[0].title).toBe('Hardware y Software');
      
      // Lesson 2 is hidden because it releases on 2026-06-27
      const hasLesson2 = result.allLessonsOrdered.some(l => l.title === 'Exploración del SO');
      expect(hasLesson2).toBe(false);
    } finally {
      // @ts-ignore
      import.meta.env.DEV = originalDev;
    }
  });

  it('should strip /index suffix from entry IDs to generate clean slugs', () => {
    const mockEntries = [
      {
        id: '01-fundamentos-mantenimiento/01-introduccion-informatica/01-hardware-y-software/index.mdx',
        data: {
          title: 'Hardware y Software',
          moduleTitle: 'Módulo 1: Fundamentos',
          topicTitle: 'Tema 1: Introducción a la Informática',
          fecha: '20-06-2026'
        }
      },
      {
        id: '01-fundamentos-mantenimiento/01-introduccion-informatica/01-hardware-y-software/repaso.mdx',
        data: {
          title: 'Repaso: Hardware y Software',
          moduleTitle: 'Módulo 1: Fundamentos',
          topicTitle: 'Tema 1: Introducción a la Informática',
          fecha: '20-06-2026'
        }
      }
    ];

    const result = getNavigationStructure(mockEntries as any);
    expect(result.allLessonsOrdered[0].slug).toBe('01-fundamentos-mantenimiento/01-introduccion-informatica/01-hardware-y-software');
    expect(result.allLessonsOrdered[1].slug).toBe('01-fundamentos-mantenimiento/01-introduccion-informatica/01-hardware-y-software/repaso');
  });

  it('should sort entries within the same folder placing index first, repaso last, and others alphabetically', () => {
    const mockEntries = [
      {
        id: '01-fundamentos-mantenimiento/01-introduccion-informatica/01-hardware-y-software/repaso.mdx',
        data: {
          title: 'Repaso: Hardware y Software',
          moduleTitle: 'Módulo 1: Fundamentos',
          topicTitle: 'Tema 1: Introducción a la Informática',
          fecha: '20-06-2026'
        }
      },
      {
        id: '01-fundamentos-mantenimiento/01-introduccion-informatica/01-hardware-y-software/detalles.mdx',
        data: {
          title: 'Detalles de la práctica',
          moduleTitle: 'Módulo 1: Fundamentos',
          topicTitle: 'Tema 1: Introducción a la Informática',
          fecha: '20-06-2026'
        }
      },
      {
        id: '01-fundamentos-mantenimiento/01-introduccion-informatica/01-hardware-y-software/index.mdx',
        data: {
          title: 'Hardware y Software',
          moduleTitle: 'Módulo 1: Fundamentos',
          topicTitle: 'Tema 1: Introducción a la Informática',
          fecha: '20-06-2026'
        }
      },
      {
        id: '01-fundamentos-mantenimiento/01-introduccion-informatica/01-hardware-y-software/contenido-audiovisual.mdx',
        data: {
          title: 'Contenido Audiovisual',
          moduleTitle: 'Módulo 1: Fundamentos',
          topicTitle: 'Tema 1: Introducción a la Informática',
          fecha: '20-06-2026'
        }
      }
    ];

    const result = getNavigationStructure(mockEntries as any);
    expect(result.allLessonsOrdered[0].title).toBe('Hardware y Software');
    expect(result.allLessonsOrdered[1].title).toBe('Contenido Audiovisual');
    expect(result.allLessonsOrdered[2].title).toBe('Detalles de la práctica');
    expect(result.allLessonsOrdered[3].title).toBe('Repaso: Hardware y Software');
  });
});


