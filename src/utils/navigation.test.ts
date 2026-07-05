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
          moduleTitle: '2 - Fundamentos y Mantenimiento',
          topicTitle: 'Tema 1: Conceptos Generales',
          fecha: '20-06-2026'
        }
      },
      {
        id: '00-inicio/02-plan-de-estudio.mdx',
        filePath: 'src/content/lecciones/00-inicio/02-plan-de-estudio.mdx',
        data: {
          title: 'Plan de Estudio',
          moduleTitle: '0 - Recursos',
          topicTitle: 'Plan de Estudio'
        }
      },
      {
        id: '00-inicio/01-presentacion.mdx',
        filePath: 'src/content/lecciones/00-inicio/01-presentacion.mdx',
        data: {
          title: 'Presentación',
          moduleTitle: '1 - Presentación',
          topicTitle: 'General'
        }
      }
    ];

    const result = getNavigationStructure(mockEntries as any);

    // All entries have moduleTitle, so initialPages is empty
    expect(result.initialPages.length).toBe(0);

    // Modules should group by moduleTitle
    expect(result.modules.length).toBe(3);
    expect(result.modules[0].title).toBe('0 - Recursos');
    expect(result.modules[1].title).toBe('1 - Presentación');
    expect(result.modules[2].title).toBe('2 - Fundamentos y Mantenimiento');

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
          moduleTitle: '2 - Fundamentos y Mantenimiento',
          topicTitle: 'Tema 1: Conceptos Generales',
          fecha: '20-06-2026'
        }
      },
      {
        id: '01-modulo-fundamentos/01-conceptos/02-exploracion-so.mdx',
        data: {
          title: 'Exploración del SO',
          moduleTitle: '2 - Fundamentos y Mantenimiento',
          topicTitle: 'Tema 1: Conceptos Generales',
          fecha: '27-06-2026'
        }
      },
      {
        id: '00-inicio/01-presentacion.mdx',
        data: {
          title: 'Presentación',
          moduleTitle: '1 - Presentación',
          topicTitle: 'General'
        }
      }
    ];

    process.env.SHOW_ALL_LESSONS = 'false';
    const originalDev = import.meta.env.DEV;
    // @ts-ignore
    import.meta.env.DEV = false;

    try {
      const testDate = new Date('2026-06-20T12:00:00-06:00');
      const result = getNavigationStructure(mockEntries as any, testDate);

      // Presentación is always visible (no fecha = no date gating)
      expect(result.modules.find(m => m.title === '1 - Presentación')).toBeDefined();

      // Module 2 has 1 visible lesson (L1 released, L2 future)
      const mod2 = result.modules.find(m => m.title === '2 - Fundamentos y Mantenimiento')!;
      expect(mod2.topics[0].lessons.length).toBe(1);
      expect(mod2.topics[0].lessons[0].title).toBe('Hardware y Software');
      
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
          moduleTitle: '2 - Fundamentos y Mantenimiento',
          topicTitle: 'Tema 1: Introducción a la Informática',
          fecha: '20-06-2026'
        }
      },
      {
        id: '01-fundamentos-mantenimiento/01-introduccion-informatica/01-hardware-y-software/repaso.mdx',
        data: {
          title: 'Repaso: Hardware y Software',
          moduleTitle: '2 - Fundamentos y Mantenimiento',
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
          moduleTitle: '2 - Fundamentos y Mantenimiento',
          topicTitle: 'Tema 1: Introducción a la Informática',
          fecha: '20-06-2026'
        }
      },
      {
        id: '01-fundamentos-mantenimiento/01-introduccion-informatica/01-hardware-y-software/detalles.mdx',
        data: {
          title: 'Detalles de la práctica',
          moduleTitle: '2 - Fundamentos y Mantenimiento',
          topicTitle: 'Tema 1: Introducción a la Informática',
          fecha: '20-06-2026'
        }
      },
      {
        id: '01-fundamentos-mantenimiento/01-introduccion-informatica/01-hardware-y-software/index.mdx',
        data: {
          title: 'Hardware y Software',
          moduleTitle: '2 - Fundamentos y Mantenimiento',
          topicTitle: 'Tema 1: Introducción a la Informática',
          fecha: '20-06-2026'
        }
      },
      {
        id: '01-fundamentos-mantenimiento/01-introduccion-informatica/01-hardware-y-software/contenido-audiovisual.mdx',
        data: {
          title: 'Contenido Audiovisual',
          moduleTitle: '2 - Fundamentos y Mantenimiento',
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
