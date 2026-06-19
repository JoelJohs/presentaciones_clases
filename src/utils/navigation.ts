export interface LessonLink {
  id: string;
  slug: string;
  title: string;
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

export function getNavigationStructure(entries: any[]): NavigationResult {
  // 1. Sort entries physically by id (which mirrors filepath order, e.g. 00-..., 01-...)
  const sortedEntries = [...entries].sort((a, b) => a.id.localeCompare(b.id));

  const initialPages: LessonLink[] = [];
  const modulesMap = new Map<string, ModuleGroup>();
  const allLessonsOrdered: LessonLink[] = [];

  for (const entry of sortedEntries) {
    // Generate slug by removing extensions (e.g. mdx) from entry.id or use default slug
    const slug = entry.id.replace(/\.(mdx|md)$/, '');
    const lesson: LessonLink = {
      id: entry.id,
      slug,
      title: entry.data.title,
    };

    allLessonsOrdered.push(lesson);

    if (!entry.data.moduleTitle) {
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
