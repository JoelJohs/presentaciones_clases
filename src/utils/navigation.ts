export interface LessonLink {
  id: string;
  slug: string;
  title: string;
  semana?: number;
  releaseDate?: string;
  published?: boolean;
}

export interface TopicGroup {
  title: string;
  lessons: LessonLink[];
}

export interface ModuleGroup {
  title: string;
  topics: TopicGroup[];
}

export interface NavigationResult {
  initialPages: LessonLink[];
  modules: ModuleGroup[];
  extras: ModuleGroup[]; // Presentación, Recursos — shown on home only
  allLessonsOrdered: LessonLink[]; // Flat list to easily calculate Prev/Next links
}

const START_DATE = '2026-06-20T00:00:00-06:00'; // Week 1 date

export function getLessonReleaseDate(index: number): Date {
  const date = new Date(START_DATE);
  date.setDate(date.getDate() + index * 7);
  return date;
}

export function parseDDMMAAAA(dateStr: string): Date | null {
  const parts = dateStr.split('-');
  if (parts.length !== 3) return null;
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // 0-indexed month
  const year = parseInt(parts[2], 10);
  if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
  return new Date(year, month, day, 0, 0, 0, 0);
}

export function getNavigationStructure(entries: any[], currentDate: Date = new Date()): NavigationResult {
  const showAll = (typeof process !== 'undefined' && process.env.SHOW_ALL_LESSONS === 'true') ||
                  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.SHOW_ALL_LESSONS === 'true');

  const sortedEntries = [...entries].sort((a, b) => {
    const aParts = a.id.split('/');
    const bParts = b.id.split('/');
    const aParent = aParts.slice(0, -1).join('/');
    const bParent = bParts.slice(0, -1).join('/');
    
    if (aParent === bParent) {
      const aFile = aParts[aParts.length - 1].replace(/\.(mdx|md)$/, '');
      const bFile = bParts[bParts.length - 1].replace(/\.(mdx|md)$/, '');
      
      if (aFile === 'index') return -1;
      if (bFile === 'index') return 1;
      if (aFile === 'repaso') return 1;
      if (bFile === 'repaso') return -1;
      
      return aFile.localeCompare(bFile, 'es', { numeric: true });
    }
    
    return a.id.localeCompare(b.id, 'es', { numeric: true });
  });

  const initialPages: LessonLink[] = [];
  const modulesMap = new Map<string, ModuleGroup>();
  const allLessonsOrdered: LessonLink[] = [];

  for (const entry of sortedEntries) {
    const slug = entry.id.replace(/\.(mdx|md)$/, '').replace(/\/index$/, '');
    const isInitial = !entry.data.moduleTitle;

    let releaseDateStr: string | undefined = undefined;
    let isReleased = true;

    if (!isInitial) {
      if (typeof entry.data.published === 'boolean') {
        isReleased = showAll || entry.data.published;
      } else if (entry.data.fecha) {
        const fechaStr = entry.data.fecha;
        const releaseDate = parseDDMMAAAA(fechaStr);
        if (releaseDate) {
          releaseDateStr = releaseDate.toISOString();
          const releaseLimit = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
          isReleased = showAll || releaseLimit >= releaseDate;
        } else {
          isReleased = false;
        }
      } else {
        isReleased = true;
      }
    } else if (entry.data.fecha) {
      const releaseDate = parseDDMMAAAA(entry.data.fecha);
      if (releaseDate) {
        releaseDateStr = releaseDate.toISOString();
      }
    }

    if (!isReleased) {
      continue; // Exclude from navigation and dynamic generation
    }

    const lesson: LessonLink = {
      id: entry.id,
      slug,
      title: entry.data.title,
      semana: entry.data.semana,
      releaseDate: releaseDateStr,
      published: entry.data.published,
    };

    allLessonsOrdered.push(lesson);

    if (isInitial) {
      initialPages.push(lesson);
    } else {
      const moduleTitle = entry.data.moduleTitle;
      const topicTitle = entry.data.topicTitle || 'General';

      if (!modulesMap.has(moduleTitle)) {
        modulesMap.set(moduleTitle, {
          title: moduleTitle,
          topics: [],
        });
      }

      const mod = modulesMap.get(moduleTitle)!;
      let topic = mod.topics.find(t => t.title === topicTitle);

      if (!topic) {
        topic = { title: topicTitle, lessons: [] };
        mod.topics.push(topic);
      }

      topic.lessons.push(lesson);
    }
  }

  // Ordenamiento natural (se asegura de que "10 -" y "12 -" vayan después de "9 -")
  const allGroups = Array.from(modulesMap.values()).sort((a, b) =>
    a.title.localeCompare(b.title, 'es', { numeric: true })
  );
  const modules: ModuleGroup[] = [];
  const extras: ModuleGroup[] = [];

  for (const group of allGroups) {
    if (/^\d/.test(group.title)) {
      modules.push(group);
    } else {
      extras.push(group);
    }
  }

  return {
    initialPages,
    modules,
    extras,
    allLessonsOrdered,
  };
}
