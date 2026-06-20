# Plataforma de Estudios Ajustes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Evolve the education platform with new color palettes, a collapsible sidebar for projection, larger text sizes, and a weekly release schedule for lessons.

**Architecture:** Use Tailwind CSS v4 custom theme classes and components, Vanilla JS in layout script to toggle local-storage-persisted sidebar state, and build-time date math in Astro Collections to filter future lessons in production.

**Tech Stack:** Astro 6, `@astrojs/mdx`, Tailwind CSS v4, Vitest.

## Global Constraints

*   No React: Use Vanilla JS for the collapsible sidebar state.
*   Release schedule starting 2026-06-20 weekly (7 days spacing) for module lessons.
*   Development/Preview mode: Show all lessons when in dev mode (`import.meta.env.DEV`) or when env `SHOW_ALL_LESSONS=true`.
*   Typography: Keep Outfit for headings and Inter for body, styled using the exact colors and contrast specs.

---

### Task 1: Global Identity and Color Palette

**Files:**
*   Modify: `src/components/Sidebar.astro`
*   Modify: `src/layouts/Layout.astro`
*   Modify: `src/styles/global.css`

**Interfaces:**
*   Produces: Visual identity changed to "Plataforma de Estudios", background contrast, and styled blockquotes/alerts.

- [ ] **Step 1: Update identity strings in Sidebar and Layout**

Change name in `src/components/Sidebar.astro` (around lines 9-13) and default title in `src/layouts/Layout.astro` (around line 236) to "Plataforma de Estudios".

```html
<!-- In src/components/Sidebar.astro -->
<a href="/" class="text-xl font-bold tracking-tight text-[#1A5FA8] dark:text-[#60A5FA]">
  Plataforma de Estudios
</a>
```

- [ ] **Step 2: Update Layout background and text styling**

Update `src/layouts/Layout.astro` body classes to use the exact palette colors:
- Light: `bg-[#FFFFFF] text-[#2D3748]`
- Dark: `bg-[#0B0F19] text-[#E2E8F0]`
Update sidebar container in `src/components/Sidebar.astro` to use:
- Light: `bg-[#F5F7FA] border-r border-[#CBD5E0]`
- Dark: `bg-[#0D1B3E] border-r border-[#1E293B]`
Update active link and hover states in `src/components/Sidebar.astro`:
- Active link: `bg-[#DCE8F5] text-[#1A5FA8] border-l-2 border-[#1A5FA8] dark:bg-[#1565C0]/30 dark:text-[#FFFFFF] dark:border-[#60A5FA]`
- Hover link: `hover:bg-[#E8F0FA] hover:text-[#1A5FA8] dark:hover:bg-[#1A5FA8]/20 dark:hover:text-[#FFFFFF]`

- [ ] **Step 3: Update custom global styles in `src/styles/global.css`**

Add the custom color variables and styles for prose elements.

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap');

:root {
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-display: 'Outfit', sans-serif;
}

body {
  font-family: var(--font-sans);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
}

/* Custom styles for MDX/markdown contents */
.prose {
  line-height: 1.75;
}

.prose h1 {
  color: #0D1B3E;
  font-weight: 800;
  margin-top: 2rem;
  margin-bottom: 1rem;
}
.dark .prose h1 {
  color: #FFFFFF;
}

.prose h2 {
  color: #1A5FA8;
  font-weight: 700;
  margin-top: 1.75rem;
  margin-bottom: 0.75rem;
}
.dark .prose h2 {
  color: #60A5FA;
}

.prose h3 {
  color: #1E4D8C;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}
.dark .prose h3 {
  color: #93C5FD;
}

.prose p {
  margin-top: 0;
  margin-bottom: 1.25rem;
}

.prose ul, .prose ol {
  margin-top: 0;
  margin-bottom: 1.25rem;
  padding-left: 1.50rem;
}

.prose li {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}

/* Callouts/Alerts */
.prose blockquote {
  border-left: 4px solid #1A5FA8;
  background-color: #DCE8F5;
  color: #2D3748;
  padding-left: 1.5rem;
  padding-right: 1rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 0 8px 8px 0;
  font-style: normal;
}
.dark .prose blockquote {
  border-left-color: #60A5FA;
  background-color: #1E293B;
  color: #E2E8F0;
}

.prose :not(pre) > code {
  font-family: monospace;
  font-size: 0.875rem;
  padding-left: 0.375rem;
  padding-right: 0.375rem;
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
  color: #1A5FA8;
  background-color: #E8F0FA;
  border-radius: 0.25rem;
  white-space: nowrap;
}
.dark .prose :not(pre) > code {
  color: #60A5FA;
  background-color: #1E293B;
}

.prose a {
  color: #1A5FA8;
  text-decoration: underline;
  transition: color 0.2s ease-in-out;
}
.prose a:hover {
  color: #0D1B3E;
}
.dark .prose a {
  color: #60A5FA;
}
.dark .prose a:hover {
  color: #FFFFFF;
}

.prose pre {
  background-color: #0D1B3E;
  color: #E8F0FA;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}
.prose pre code {
  background-color: transparent !important;
  color: inherit !important;
  padding: 0 !important;
  font-size: 0.875rem;
  white-space: pre;
}
```

- [ ] **Step 4: Run build to verify changes**

Run: `npm run build`
Expected: Passes with no syntax errors.

- [ ] **Step 5: Commit changes**

```bash
git add src/components/Sidebar.astro src/layouts/Layout.astro src/styles/global.css
git commit -m "style: rename to Plataforma de Estudios and apply custom color palette"
```

---

### Task 2: Collapsible Sidebar on Desktop

**Files:**
*   Modify: `src/components/Header.astro`
*   Modify: `src/layouts/Layout.astro`

**Interfaces:**
*   Produces: Toggle button in Header, persistent `sidebar-collapsed` body class, and CSS overrides to collapse sidebar and expand main content.

- [ ] **Step 1: Add collapse button to Header**

Edit `src/components/Header.astro` to add a collapse button visible on desktop.

```html
<!-- Modify src/components/Header.astro to include this button beside the mobile one -->
<div class="flex items-center gap-4">
  <!-- Mobile toggle -->
  <button
    id="menu-toggle"
    type="button"
    class="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 lg:hidden"
    aria-label="Abrir Menú"
  >
    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  </button>
  
  <!-- Desktop toggle -->
  <button
    id="sidebar-toggle"
    type="button"
    class="hidden lg:inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    aria-label="Alternar Temario"
  >
    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-9a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 004.5 21h9a2.25 2.25 0 002.25-2.25V15M21 12H9m12 0l-3-3m3 3l-3 3" />
    </svg>
  </button>
  <span class="font-semibold text-slate-800 dark:text-slate-200 lg:hidden">Temario</span>
</div>
```

- [ ] **Step 2: Add inline layout transition classes and persistence logic**

Edit `src/layouts/Layout.astro`.
1. Add custom CSS styles for `.sidebar-collapsed` state in `<style>` tag or Tailwind classes.
   ```css
   <style is:global>
     /* Collapsed state adjustments */
     .sidebar-collapsed #sidebar {
       transform: translateX(-100%);
     }
     .sidebar-collapsed #main-content-wrapper {
       padding-left: 0 !important;
     }
   </style>
   ```
2. In `<head>`, add inline check to avoid layout shift when reloading page with collapsed state:
   ```html
   <script is:inline>
     if (localStorage.getItem('sidebar-collapsed') === 'true') {
       document.documentElement.classList.add('sidebar-collapsed');
     }
   </script>
   ```
3. Update `<script>` tag inside Layout to bind the button to toggle the class on `document.documentElement` and persist in `localStorage`.
   ```typescript
   // 3. Desktop Sidebar Collapse Toggle
   const sidebarToggle = document.getElementById('sidebar-toggle');
   sidebarToggle?.addEventListener('click', () => {
     document.documentElement.classList.toggle('sidebar-collapsed');
     const isCollapsed = document.documentElement.classList.contains('sidebar-collapsed');
     localStorage.setItem('sidebar-collapsed', String(isCollapsed));
   });
   ```
4. Add id `main-content-wrapper` to the div surrounding `Header` and `<main>` (the `lg:pl-80` container).
   ```html
   <div id="main-content-wrapper" class="lg:pl-80 flex flex-col min-h-screen transition-all duration-300">
   ```

- [ ] **Step 3: Test that Sidebar collapses on desktop**

Run: `npm run build`
Expected: Build passes.

- [ ] **Step 4: Commit changes**

```bash
git add src/components/Header.astro src/layouts/Layout.astro
git commit -m "feat: add collapsible sidebar toggle on desktop with state persistence"
```

---

### Task 3: Visual Text Scaling for Projection

**Files:**
*   Modify: `src/styles/global.css`

**Interfaces:**
*   Produces: Larger typography tags within `.prose` containers.

- [ ] **Step 1: Increase typography scale in global.css**

Update the font sizes inside `.prose` in `src/styles/global.css` for better classroom readability:
- Text: Change paragraph font size from base to `text-lg lg:text-xl leading-relaxed` (or write CSS rules).
- Headings: Scale H1, H2, H3 up.

```css
/* In src/styles/global.css */
/* Custom styles for MDX/markdown contents */
.prose {
  line-height: 1.8;
  font-size: 1.125rem; /* text-lg (~18px) */
}
@media (min-width: 1024px) {
  .prose {
    font-size: 1.25rem; /* text-xl (~20px) */
  }
}

.prose h1 {
  font-size: 2.50rem; /* h1: 40px */
  font-weight: 800;
  margin-top: 2.5rem;
  margin-bottom: 1.25rem;
}

.prose h2 {
  font-size: 2.00rem; /* h2: 32px */
  font-weight: 700;
  margin-top: 2.25rem;
  margin-bottom: 1.00rem;
}

.prose h3 {
  font-size: 1.50rem; /* h3: 24px */
  font-weight: 600;
  margin-top: 1.75rem;
  margin-bottom: 0.75rem;
}
```

- [ ] **Step 2: Verify compilation**

Run: `npm run build`
Expected: Completes with no errors.

- [ ] **Step 3: Commit changes**

```bash
git add src/styles/global.css
git commit -m "style: scale up typography font sizes in prose for better projection readability"
```

---

### Task 4: Weekly Release Calendar Logic

**Files:**
*   Modify: `src/utils/navigation.ts`
*   Modify: `src/utils/navigation.test.ts`

**Interfaces:**
*   Produces: Automated release dates assignment and filters future lessons.

- [ ] **Step 1: Implement release date calculations in navigation utility**

Modify `src/utils/navigation.ts` to assign release dates and filter future lessons unless `showAll` is active.

```typescript
export interface LessonLink {
  id: string;
  slug: string;
  title: string;
  releaseDate?: string; // ISO string representation
}

// ... TopicGroup, ModuleGroup interfaces remain unchanged

const START_DATE = '2026-06-20T00:00:00-06:00'; // Week 1 date

export function getLessonReleaseDate(index: number): Date {
  const date = new Date(START_DATE);
  date.setDate(date.getDate() + index * 7);
  return date;
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
```

- [ ] **Step 2: Update unit tests for weekly release logic**

Edit `src/utils/navigation.test.ts` to assert correct behavior.

```typescript
import { describe, it, expect } from 'vitest';
import { getNavigationStructure, getLessonReleaseDate } from './navigation';

describe('Navigation Logic', () => {
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
          topicTitle: 'Tema 1: Conceptos Generales'
        }
      },
      {
        id: '01-modulo-fundamentos/01-conceptos/02-exploracion-so.mdx',
        data: {
          title: 'Exploración del SO',
          moduleTitle: 'Módulo 1: Fundamentos',
          topicTitle: 'Tema 1: Conceptos Generales'
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
  });
});
```

- [ ] **Step 3: Run Vitest unit tests**

Run: `npm run test`
Expected: All tests pass.

- [ ] **Step 4: Commit changes**

```bash
git add src/utils/navigation.ts src/utils/navigation.test.ts
git commit -m "feat: implement release date math and filters in navigation utility with tests"
```

---

### Task 5: Dynamic Route Filtration

**Files:**
*   Modify: `src/pages/[...slug].astro`

**Interfaces:**
*   Produces: Builds only released pages in production.

- [ ] **Step 1: Apply release filter to static paths in [...slug].astro**

Update `src/pages/[...slug].astro` so future lessons are not compiled in production.

```astro
---
// Modify src/pages/[...slug].astro dynamic paths resolver
export async function getStaticPaths() {
  const lecciones = await getCollection('lecciones');
  
  // Use getNavigationStructure to get the list of lessons that are currently released
  // at build time. This filters out future entries in production.
  const nav = getNavigationStructure(lecciones);

  return nav.allLessonsOrdered.map((lessonLink) => {
    // Find the original collection entry
    const leccion = lecciones.find(l => l.id === lessonLink.id)!;
    return {
      params: { slug: lessonLink.slug },
      props: { leccion, lecciones },
    };
  });
}
```

- [ ] **Step 2: Verify production build outputs only released lessons**

Run: `npm run build`
Expected: Compiles with 4 files generated (1 index + 3 always visible intro pages).
If `SHOW_ALL_LESSONS=true npm run build` is run:
Expected: Builds 13 routes successfully.

- [ ] **Step 3: Commit changes**

```bash
git add src/pages/\[...slug\].astro
git commit -m "feat: filter dynamic routes in production so future classes are not compiled"
```
