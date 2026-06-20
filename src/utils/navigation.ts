export interface LessonLink {
  id: string;
  slug: string;
  title: string;
  releaseDate?: string;
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
  allLessonsOrdered: LessonLink[]; // Flat list to easily calculate Prev/Next links
}

const START_DATE = '2026-06-20T00:00:00-06:00'; // Week 1 date

export function getLessonReleaseDate(index: number): Date {
  const date = new Date(START_DATE);
  return new Date(date.getTime() + index * 7 * 24 * 60 * 60 * 1000);
}

export function getNavigationStructure(entries: any[], currentDate: Date = new Date()): NavigationResult {
  const showAll = import.meta.env.DEV || 
                  (typeof process !== 'undefined' && process.env.SHOW_ALL_LESSONS === 'true');

  const sortedEntries = [...entries].sort((a, b) => a.id.localeCompare(b.id));

  const initialPages: LessonLink[] = [];
  const modulesMap = new Map<string, ModuleGroup>();
  const allLessonsOrdered: LessonLink[] = [];

  let moduleLessonIndex = 0;

  for (const entry of sortedEntries) {
    const slug = entry.id.replace(/\.(mdx|md)$/, '');
    const isInitial = !entry.data.moduleTitle;

    let releaseDateStr: string | undefined = undefined;
    let isReleased = true;

    if (!isInitial) {
      const releaseDate = getLessonReleaseDate(moduleLessonIndex);
      releaseDateStr = releaseDate.toISOString();
      isReleased = showAll || currentDate >= releaseDate;
      moduleLessonIndex++;
    }

    if (!isReleased) {
      continue; // Exclude from navigation and dynamic generation
    }

    const lesson: LessonLink = {
      id: entry.id,
      slug,
      title: entry.data.title,
      releaseDate: releaseDateStr,
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

  return {
    initialPages,
    modules: Array.from(modulesMap.values()),
    allLessonsOrdered,
  };
}
