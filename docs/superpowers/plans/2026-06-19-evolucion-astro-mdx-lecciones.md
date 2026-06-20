# Plan de Implementación: Evolución de Plataforma Astro + MDX

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the basic Astro project into a structured, highly responsive educational content platform using MDX for writing lessons, Tailwind CSS v4 for styles, and Vanilla JS for interactions (sidebar drawer and dark mode).

**Architecture:** We use Astro's static site generation and the native Content Collections (Content Layer). A custom dynamic route (`src/pages/[...slug].astro`) will fetch and render all MDX files, while a navigation utility sorts the folder structure based on physical file paths.

**Tech Stack:** Astro 6, `@astrojs/mdx`, Tailwind CSS v4 (`@tailwindcss/vite`), and Vitest for testing the sorting/navigation logic.

## Global Constraints

*   No React: Use Vanilla JS scripts in Astro components for sidebar toggle and dark mode.
*   No standard card boxes (except minimal boxes with simple borders if necessary).
*   Clean typography (Outfit for Headings, Inter for body).
*   Full light/dark mode support using tailwind dark class on HTML.
*   Ergonomic bottom navigation for mobile/desktop (Prev / Next buttons minimum height 52px).

---

### Task 1: Setup Dependencies and Testing Framework

**Files:**
*   Modify: `package.json`
*   Modify: `astro.config.mjs`
*   Create: `vite.config.ts`

**Interfaces:**
*   Produces: Tailwind CSS v4 integration, MDX integration, Vitest testing setup.

- [ ] **Step 1: Update dependencies in `package.json`**

Edit `package.json` to include `@astrojs/mdx`, `@tailwindcss/vite`, and testing tools (`vitest`).

```json
{
  "name": "presentaciones",
  "type": "module",
  "version": "0.0.1",
  "engines": {
    "node": ">=22.12.0"
  },
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro",
    "test": "vitest run"
  },
  "dependencies": {
    "@astrojs/mdx": "^4.0.8",
    "astro": "^6.4.7"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.0.0",
    "tailwindcss": "^4.0.0",
    "vitest": "^2.1.8"
  }
}
```

- [ ] **Step 2: Run npm install**

Run: `npm install`
Expected: Installation completes successfully with no resolution errors.

- [ ] **Step 3: Update `astro.config.mjs`**

Integrate MDX and the Tailwind CSS v4 Vite plugin.

```javascript
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  }
});
```

- [ ] **Step 4: Create a basic test configuration for Vitest**

Create `vite.config.ts` to ensure Vitest knows how to run tests.

```typescript
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  },
});
```

- [ ] **Step 5: Write a sanity check test to verify Vitest**

Create `src/utils/sanity.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';

describe('Sanity Check', () => {
  it('should work', () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 6: Run tests to verify the test setup**

Run: `npx vitest run`
Expected: 1 pass, 0 fail.

- [ ] **Step 7: Commit changes**

```bash
git add package.json package-lock.json astro.config.mjs vite.config.ts src/utils/sanity.test.ts
git commit -m "chore: setup mdx, tailwind v4, and vitest testing framework"
```

---

### Task 2: Content Collection Schema Configuration

**Files:**
*   Create: `src/content/config.ts`
*   Create: `src/content/lecciones/00-inicio/01-presentacion.mdx`
*   Create: `src/content/lecciones/01-modulo-fundamentos/01-conceptos/01-hardware-software.mdx`

**Interfaces:**
*   Produces: Validated `lecciones` collection schema using Astro's content layer.

- [ ] **Step 1: Create the Content Collections configuration**

Create `src/content/config.ts` to define the collection and specify the validation schema.

```typescript
import { defineCollection, z } from 'astro:content';

const lecciones = defineCollection({
  schema: z.object({
    title: z.string(),
    moduleTitle: z.string().optional(),
    topicTitle: z.string().optional(),
  }),
});

export const collections = { lecciones };
```

- [ ] **Step 2: Create mock file 1 (Presentación - Root level page)**

Create `src/content/lecciones/00-inicio/01-presentacion.mdx`:

```mdx
---
title: "Presentación"
---

# Bienvenidos a la Clase
Esta es la presentación del profesor y alumnos.
```

- [ ] **Step 3: Create mock file 2 (Hardware y Software - Module level page)**

Create `src/content/lecciones/01-modulo-fundamentos/01-conceptos/01-hardware-software.mdx`:

```mdx
---
title: "Hardware y Software"
moduleTitle: "Módulo 1: Fundamentos, Soporte y Mantenimiento de Equipos"
topicTitle: "Tema 1: Conceptos Generales y Sistemas Operativos"
---

# Hardware y Software
Conceptos fundamentales de computación.
```

- [ ] **Step 4: Verify schema validation using Astro CLI**

Run: `npx astro sync`
Expected: Astro sync completes successfully, generating `.astro/types.d.ts` file without validation errors.

- [ ] **Step 5: Commit changes**

```bash
git add src/content/config.ts src/content/lecciones/00-inicio/01-presentacion.mdx src/content/lecciones/01-modulo-fundamentos/01-conceptos/01-hardware-software.mdx
git commit -m "feat: define content collection schema and add basic mock content"
```

---

### Task 3: Navigation and Sidebar Utility

**Files:**
*   Create: `src/utils/navigation.ts`
*   Create: `src/utils/navigation.test.ts`

**Interfaces:**
*   Produces: `getNavigationStructure(entries: any[])` which formats list of collection items into sorted Modules, Topics, and Subthemes/Lessons.

- [ ] **Step 1: Write navigation sorting test**

Create `src/utils/navigation.test.ts` to write failing tests for navigation sorting.

```typescript
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/utils/navigation.test.ts`
Expected: FAIL due to missing `getNavigationStructure` import.

- [ ] **Step 3: Implement `getNavigationStructure`**

Create `src/utils/navigation.ts`:

```typescript
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/utils/navigation.test.ts`
Expected: PASS.

- [ ] **Step 5: Clean up sanity test**

Run: `rm src/utils/sanity.test.ts`
Expected: File is deleted.

- [ ] **Step 6: Commit changes**

```bash
git add src/utils/navigation.ts src/utils/navigation.test.ts
git commit -m "feat: implement navigation structure builder with tests"
```

---

### Task 4: Stylesheet and Dark Mode Script

**Files:**
*   Create: `src/styles/global.css`
*   Create: `src/layouts/Layout.astro`
*   Create: `src/components/Sidebar.astro`
*   Create: `src/components/Header.astro`

**Interfaces:**
*   Produces: Beautiful layout, dark mode persistence, and typography settings (Outfit for Titles, Inter for body).

- [ ] **Step 1: Create global CSS file**

Create `src/styles/global.css`. Load Tailwind CSS v4 and Google Fonts.

```css
@import "tailwindcss";

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
  font-size: 2.25rem;
  font-weight: 800;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.prose h2 {
  font-size: 1.75rem;
  font-weight: 700;
  margin-top: 1.75rem;
  margin-bottom: 0.75rem;
}

.prose h3 {
  font-size: 1.35rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
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

.prose blockquote {
  border-left-width: 4px;
  padding-left: 1.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  font-style: italic;
}
```

- [ ] **Step 2: Create Sidebar component**

Create `src/components/Sidebar.astro`. It accepts `nav` (NavigationResult) and `activeSlug`.

```astro
---
import type { NavigationResult } from '../utils/navigation';

interface Props {
  nav: NavigationResult;
  activeSlug: string;
}

const { nav, activeSlug } = Astro.props;
---

<aside id="sidebar" class="fixed inset-y-0 left-0 z-40 w-80 -translate-x-full border-r border-slate-200 bg-slate-50 p-6 transition-transform duration-300 dark:border-slate-800 dark:bg-slate-950 lg:translate-x-0 overflow-y-auto">
  <div class="mb-8 flex items-center justify-between">
    <a href="/" class="text-xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
      Clases DigitalPlat
    </a>
  </div>

  <nav class="space-y-6">
    <!-- Initial Pages -->
    <ul class="space-y-2">
      {nav.initialPages.map((page) => (
        <li>
          <a
            href={`/${page.slug}`}
            class={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              activeSlug === page.slug
                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 border-l-2 border-indigo-600 dark:border-indigo-400'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100'
            }`}
          >
            {page.title}
          </a>
        </li>
      ))}
    </ul>

    <!-- Modules -->
    {nav.modules.map((mod) => (
      <div class="space-y-3">
        <h3 class="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {mod.title}
        </h3>
        
        {mod.topics.map((topic) => (
          <div class="space-y-1">
            <h4 class="px-3 text-xs font-medium text-slate-500 dark:text-slate-400">
              {topic.title}
            </h4>
            <ul class="space-y-1 pl-3">
              {topic.lessons.map((lesson) => (
                <li>
                  <a
                    href={`/${lesson.slug}`}
                    class={`block rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                      activeSlug === lesson.slug
                        ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 border-l-2 border-indigo-600 dark:border-indigo-400'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100'
                    }`}
                  >
                    {lesson.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    ))}
  </nav>
</aside>
```

- [ ] **Step 3: Create Header component**

Create `src/components/Header.astro`. It provides mobile burger menu and Dark Mode controls.

```astro
---
---

<header class="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/80 px-6 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
  <div class="flex items-center gap-4">
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
    <span class="font-semibold text-slate-800 dark:text-slate-200 lg:hidden">Temario</span>
  </div>

  <div class="flex items-center gap-4">
    <!-- Dark Mode Button -->
    <button
      id="theme-toggle"
      type="button"
      class="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800"
      aria-label="Alternar Tema"
    >
      <!-- Sun Icon -->
      <svg id="theme-toggle-light-icon" class="hidden h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m0 13.5V21M4.22 4.22l1.636 1.636m12.294 12.294l1.636 1.636M3 12h2.25m13.5 0H21m-16.22 6.22l1.636-1.636m12.294-12.294l1.636-1.636M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
      </svg>
      <!-- Moon Icon -->
      <svg id="theme-toggle-dark-icon" class="hidden h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
      </svg>
    </button>
  </div>
</header>
```

- [ ] **Step 4: Create Layout component**

Create `src/layouts/Layout.astro`. Include standard layout wrapper, global CSS file import, inline anti-flash script for dark mode, and sidebar toggle script.

```astro
---
import '../styles/global.css';
import Sidebar from '../components/Sidebar.astro';
import Header from '../components/Header.astro';
import type { NavigationResult } from '../utils/navigation';

interface Props {
  title: string;
  nav: NavigationResult;
  activeSlug: string;
}

const { title, nav, activeSlug } = Astro.props;
---

<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="generator" content={Astro.generator} />
    <title>{title} | Clases</title>

    <!-- Dark Mode Initial Script to Prevent Flashing -->
    <script is:inline>
      if (
        localStorage.getItem('color-theme') === 'dark' ||
        (!('color-theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    </script>
  </head>
  <body class="bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-200">
    <div class="min-h-screen">
      <!-- Sidebar -->
      <Sidebar nav={nav} activeSlug={activeSlug} />

      <!-- Main Panel container -->
      <div class="lg:pl-80 flex flex-col min-h-screen">
        <Header />

        <main class="flex-1 px-6 py-12 max-w-3xl mx-auto w-full">
          <slot />
        </main>
      </div>
    </div>

    <!-- Script for Sidebar Drawer Toggle & Theme Toggle -->
    <script>
      // 1. Sidebar Toggle
      const menuToggle = document.getElementById('menu-toggle');
      const sidebar = document.getElementById('sidebar');

      if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', (e) => {
          e.stopPropagation();
          sidebar.classList.toggle('-translate-x-full');
        });

        // Close sidebar when clicking outside
        document.addEventListener('click', (e) => {
          if (sidebar && !sidebar.contains(e.target as Node) && !sidebar.classList.contains('-translate-x-full')) {
            sidebar.classList.add('-translate-x-full');
          }
        });
      }

      // 2. Dark/Light Theme Switcher
      const themeToggle = document.getElementById('theme-toggle');
      const lightIcon = document.getElementById('theme-toggle-light-icon');
      const darkIcon = document.getElementById('theme-toggle-dark-icon');

      function updateIcons() {
        if (document.documentElement.classList.contains('dark')) {
          lightIcon?.classList.remove('hidden');
          darkIcon?.classList.add('hidden');
        } else {
          lightIcon?.classList.add('hidden');
          darkIcon?.classList.remove('hidden');
        }
      }

      // Run on page load
      updateIcons();

      themeToggle?.addEventListener('click', () => {
        if (document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('color-theme', 'light');
        } else {
          document.documentElement.classList.add('dark');
          localStorage.setItem('color-theme', 'dark');
        }
        updateIcons();
      });
    </script>
  </body>
</html>
```

- [ ] **Step 3: Commit changes**

```bash
git add src/styles/global.css src/components/Sidebar.astro src/components/Header.astro src/layouts/Layout.astro
git commit -m "feat: implement styles, global layout, responsive sidebar and dark mode switch using vanilla JS"
```

---

### Task 5: Dynamic Page Router & Pagination

**Files:**
*   Create: `src/pages/[...slug].astro`
*   Modify: `src/pages/index.astro`

**Interfaces:**
*   Produces: Dynamically resolved pages for all files under `/src/content/lecciones/` with thumb-friendly Prev/Next buttons at the bottom.

- [ ] **Step 1: Create dynamic page router file**

Create `src/pages/[...slug].astro` to resolve MDX pages, load navigation helper, and render MDX component content dynamically.

```astro
---
import { getCollection, render } from 'astro:content';
import Layout from '../layouts/Layout.astro';
import { getNavigationStructure } from '../utils/navigation';

export async function getStaticPaths() {
  const lecciones = await getCollection('lecciones');
  
  // Sort them physically first
  const sorted = [...lecciones].sort((a, b) => a.id.localeCompare(b.id));

  return sorted.map((leccion) => {
    const slug = leccion.id.replace(/\.(mdx|md)$/, '');
    return {
      params: { slug },
      props: { leccion, lecciones },
    };
  });
}

const { leccion, lecciones } = Astro.props;
const { Content } = await render(leccion);

// Build navigation
const nav = getNavigationStructure(lecciones);

// Find index of active lesson to generate Prev / Next
const activeSlug = leccion.id.replace(/\.(mdx|md)$/, '');
const currentIndex = nav.allLessonsOrdered.findIndex(l => l.slug === activeSlug);

const prevLesson = currentIndex > 0 ? nav.allLessonsOrdered[currentIndex - 1] : null;
const nextLesson = currentIndex < nav.allLessonsOrdered.length - 1 ? nav.allLessonsOrdered[currentIndex + 1] : null;
---

<Layout title={leccion.data.title} nav={nav} activeSlug={activeSlug}>
  <article class="prose dark:prose-invert text-slate-800 dark:text-slate-200">
    <Content />
  </article>

  <!-- Prev/Next Navigation Controls -->
  <div class="mt-16 flex flex-col sm:flex-row gap-4 border-t border-slate-200 pt-8 dark:border-slate-800">
    {prevLesson ? (
      <a
        href={`/${prevLesson.slug}`}
        class="flex-1 inline-flex items-center gap-3 justify-start rounded-lg border border-slate-200 px-5 py-4.5 text-sm font-semibold transition-all hover:bg-slate-100 hover:text-indigo-600 dark:border-slate-800 dark:hover:bg-slate-900/60 dark:hover:text-indigo-400 min-h-[52px]"
      >
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        <div class="text-left">
          <span class="block text-xs font-normal text-slate-400 dark:text-slate-500 uppercase tracking-wider">Anterior</span>
          <span class="truncate max-w-[200px] block">{prevLesson.title}</span>
        </div>
      </a>
    ) : <div class="flex-1"></div>}

    {nextLesson ? (
      <a
        href={`/${nextLesson.slug}`}
        class="flex-1 inline-flex items-center gap-3 justify-end rounded-lg border border-slate-200 px-5 py-4.5 text-sm font-semibold transition-all hover:bg-slate-100 hover:text-indigo-600 dark:border-slate-800 dark:hover:bg-slate-900/60 dark:hover:text-indigo-400 min-h-[52px] text-right"
      >
        <div class="text-right">
          <span class="block text-xs font-normal text-slate-400 dark:text-slate-500 uppercase tracking-wider">Siguiente</span>
          <span class="truncate max-w-[200px] block">{nextLesson.title}</span>
        </div>
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </a>
    ) : <div class="flex-1"></div>}
  </div>
</Layout>
```

- [ ] **Step 2: Update index.astro to redirect to the first lesson**

Modify `src/pages/index.astro` to perform a client-side or server-side redirect to the first page (Presentación) automatically, so the landing page loads the content immediately.

```astro
---
import { getCollection } from 'astro:content';

const lecciones = await getCollection('lecciones');
const sorted = [...lecciones].sort((a, b) => a.id.localeCompare(b.id));
const firstSlug = sorted.length > 0 ? sorted[0].id.replace(/\.(mdx|md)$/, '') : '00-inicio/01-presentacion';
---

<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content={`0;url=/${firstSlug}`} />
    <title>Cargando lecciones...</title>
  </head>
  <body>
    <p class="p-6 text-center text-slate-500">
      Redireccionando al temario... <a href={`/${firstSlug}`} class="text-indigo-600 underline">Haz clic aquí si no redirige automáticamente</a>.
    </p>
  </body>
</html>
```

- [ ] **Step 3: Test that build works successfully with router**

Run: `npm run build`
Expected: Output generated successfully into `dist/`. No router compilation errors.

- [ ] **Step 4: Commit changes**

```bash
git add src/pages/\[...slug\].astro src/pages/index.astro
git commit -m "feat: configure dynamic router and automatic index redirect to first lesson"
```

---

### Task 6: Populate Course Content Outline

**Files:**
*   Create: `src/content/lecciones/00-inicio/02-plan-de-estudio.mdx`
*   Create: `src/content/lecciones/00-inicio/03-introduccion.mdx`
*   Create: `src/content/lecciones/01-modulo-fundamentos/01-conceptos/02-exploracion-so.mdx`
*   Create: `src/content/lecciones/01-modulo-fundamentos/02-arquitectura/01-componentes-internos.mdx`
*   Create: `src/content/lecciones/01-modulo-fundamentos/02-arquitectura/02-ensamble-desensamble.mdx`
*   Create: `src/content/lecciones/01-modulo-fundamentos/03-mantenimiento/01-limpieza-fisica.mdx`
*   Create: `src/content/lecciones/01-modulo-fundamentos/03-mantenimiento/02-diagnostico-hardware.mdx`
*   Create: `src/content/lecciones/01-modulo-fundamentos/04-diagnostico-software/01-optimizacion-sistema.mdx`
*   Create: `src/content/lecciones/01-modulo-fundamentos/04-diagnostico-software/02-antivirus-respaldos.mdx`
*   Create: `src/content/lecciones/02-modulo-ofimatica/01-procesador-textos/01-estructura-formato.mdx`

**Interfaces:**
*   Produces: First set of MDX files outlining modules 1 and 2, which acts as study material and syllabus outline.

- [ ] **Step 1: Create Plan de Estudio page**

Create `src/content/lecciones/00-inicio/02-plan-de-estudio.mdx`:

```mdx
---
title: "Plan de Estudio"
---

# Plan de Estudio

Este plan está diseñado para guiarte en el aprendizaje de la computación e informática de manera práctica y directa.

## Estructura General
1. **Módulo 1:** Fundamentos, Soporte y Mantenimiento de Equipos.
2. **Módulo 2:** Ofimática y Productividad Digital.
3. **Módulo 3:** Pensamiento Computacional y Programación (Python).
4. **Módulo 4:** Creación de Contenido Multimedia.
5. **Módulo 5:** Sistemas, Redes y Entorno Móvil.
```

- [ ] **Step 2: Create Introducción page**

Create `src/content/lecciones/00-inicio/03-introduccion.mdx`:

```mdx
---
title: "Introducción"
---

# Introducción al Curso

Bienvenido al material interactivo para las clases. En este curso aprenderás desde qué es el hardware interno de una computadora hasta cómo programar y diseñar aplicaciones móviles.

> **Objetivo:** Adquirir destreza tecnológica e informática tanto teórica como empírica a través de prácticas reales en clase.
```

- [ ] **Step 3: Create Exploración de Sistema Operativo page**

Create `src/content/lecciones/01-modulo-fundamentos/01-conceptos/02-exploracion-so.mdx`:

```mdx
---
title: "Exploración del Sistema Operativo"
moduleTitle: "Módulo 1: Fundamentos, Soporte y Mantenimiento de Equipos"
topicTitle: "Tema 1: Conceptos Generales y Sistemas Operativos"
---

# Exploración del Sistema Operativo

Aprenderemos a navegar de manera ágil por nuestro sistema de archivos, gestionar carpetas e identificar extensiones de archivos de uso diario.

## Conceptos Clave
* **Interfaz Gráfica (GUI):** Ventanas, escritorios y punteros que facilitan la interacción con la máquina.
* **Sistema de Archivos:** La jerarquía física donde se almacenan tus datos.
* **Extensiones comunes:**
  * Documentos: `.docx`, `.pdf`, `.txt`
  * Imágenes: `.jpg`, `.png`, `.svg`
  * Multimedia: `.mp4`, `.mp3`
```

- [ ] **Step 4: Create Componentes Internos page**

Create `src/content/lecciones/01-modulo-fundamentos/02-arquitectura/01-componentes-internos.mdx`:

```mdx
---
title: "Componentes Internos"
moduleTitle: "Módulo 1: Fundamentos, Soporte y Mantenimiento de Equipos"
topicTitle: "Tema 2: Arquitectura y Ensamble de Equipos"
---

# Componentes Internos de la Computadora

Vamos a desglosar las partes internas fundamentales que permiten a tu equipo arrancar y ejecutar instrucciones.

## Componentes Clave
1. **Tarjeta Madre (Motherboard):** La placa central de circuitos a la que se conectan todos los componentes.
2. **Procesador (CPU):** El cerebro lógico de la computadora.
3. **Memoria RAM:** Almacenamiento rápido y temporal de datos en ejecución.
4. **Fuente de Poder (PSU):** Convierte y suministra corriente eléctrica.
5. **Almacenamiento (HDD vs SSD):** Almacenamiento mecánico lento frente al estado sólido ultra rápido.
```

- [ ] **Step 5: Create Ensamble y Desensamble page**

Create `src/content/lecciones/01-modulo-fundamentos/02-arquitectura/02-ensamble-desensamble.mdx`:

```mdx
---
title: "Práctica de Ensamble y Desensamble"
moduleTitle: "Módulo 1: Fundamentos, Soporte y Mantenimiento de Equipos"
topicTitle: "Tema 2: Arquitectura y Ensamble de Equipos"
---

# Práctica de Ensamble y Desensamble

Una guía práctica para desconectar y volver a ensamblar componentes internos sin riesgos.

> **Regla de oro de seguridad:** Desconectar siempre el cable de corriente y presionar el botón de encendido de la computadora apagada por 5 segundos para liberar la carga estática almacenada en los condensadores.
```

- [ ] **Step 6: Create Limpieza Física page**

Create `src/content/lecciones/01-modulo-fundamentos/03-mantenimiento/01-limpieza-fisica.mdx`:

```mdx
---
title: "Limpieza Física de Equipos"
moduleTitle: "Módulo 1: Fundamentos, Soporte y Mantenimiento de Equipos"
topicTitle: "Tema 3: Mantenimiento Preventivo y Correctivo"
---

# Limpieza Física de Equipos

Procedimientos correctos para retirar suciedad y prolongar la vida útil de los ventiladores y procesadores.

## Herramientas Necesarias
* Aire comprimido / Sopladora
* Alcohol isopropílico (99% pureza)
* Brochas antiestáticas
* Pasta térmica de alta calidad
```

- [ ] **Step 7: Create Diagnóstico de Hardware page**

Create `src/content/lecciones/01-modulo-fundamentos/03-mantenimiento/02-diagnostico-hardware.mdx`:

```mdx
---
title: "Diagnóstico de Fallas de Hardware"
moduleTitle: "Módulo 1: Fundamentos, Soporte y Mantenimiento de Equipos"
topicTitle: "Tema 3: Mantenimiento Preventivo y Correctivo"
---

# Diagnóstico de Fallas de Hardware

Cómo identificar si el problema radica en componentes físicos mediante códigos de sonido (pitidos POST) e indicadores visuales de la tarjeta madre.
```

- [ ] **Step 8: Create Optimización de Sistema page**

Create `src/content/lecciones/01-modulo-fundamentos/04-diagnostico-software/01-optimizacion-sistema.mdx`:

```mdx
---
title: "Optimización del Sistema"
moduleTitle: "Módulo 1: Fundamentos, Soporte y Mantenimiento de Equipos"
topicTitle: "Tema 4: Diagnóstico y Solución de Problemas de Software"
---

# Optimización del Sistema Operativo

Mantenimiento de software para restaurar la velocidad del equipo: gestión de aplicaciones al inicio y desinstalación profunda.
```

- [ ] **Step 9: Create Antivirus y Respaldos page**

Create `src/content/lecciones/01-modulo-fundamentos/04-diagnostico-software/02-antivirus-respaldos.mdx`:

```mdx
---
title: "Antivirus y Respaldo de Datos"
moduleTitle: "Módulo 1: Fundamentos, Soporte y Mantenimiento de Equipos"
topicTitle: "Tema 4: Diagnóstico y Solución de Problemas de Software"
---

# Antivirus y Respaldo de Datos

Cómo utilizar herramientas de seguridad del sistema y respaldar archivos críticos en la nube o discos duros externos.
```

- [ ] **Step 10: Create Procesamiento de Texto page**

Create `src/content/lecciones/02-modulo-ofimatica/01-procesador-textos/01-estructura-formato.mdx`:

```mdx
---
title: "Estructura y Formato Rápido"
moduleTitle: "Módulo 2: Ofimática y Productividad Digital"
topicTitle: "Tema 1: Procesamiento de Textos Moderno"
---

# Estructura y Formato Rápido en Procesadores de Texto

Uso correcto de estilos jerárquicos (Título 1, Título 2, Cuerpo) para automatizar la creación de tablas de contenido e índices en documentos.
```

- [ ] **Step 11: Run build verification**

Run: `npm run build`
Expected: Astro project builds 13 routes successfully.

- [ ] **Step 12: Commit files**

```bash
git add src/content/lecciones/
git commit -m "feat: add course initial pages and module outline structure in MDX"
```

---

### Task 7: Guide Document for Adding Material

**Files:**
*   Create: `GUIA_CONTENIDO.md`

**Interfaces:**
*   Produces: Clear documentation at the root of the project explaining the content structure and markdown frontmatter formatting guidelines.

- [ ] **Step 1: Create content creation guide**

Create `GUIA_CONTENIDO.md` in the workspace root directory.

```markdown
# Guía de Creación de Contenido

Esta guía explica detalladamente cómo agregar nuevos Módulos, Temas y Lecciones a esta plataforma interactiva.

---

## 1. Estructura de Carpetas

Todo el temario vive en la ruta `src/content/lecciones/`. Se utiliza la estructura física del sistema de archivos para definir el orden en el menú lateral:

```text
src/content/lecciones/
  ├── [NRO]-nombre-del-modulo/
  │    └── [NRO]-nombre-del-tema/
  │         ├── [NRO]-leccion-a.mdx
  │         └── [NRO]-leccion-b.mdx
```

### Reglas importantes para los nombres físicos:
1. **Los prefijos numéricos (`00-`, `01-`, `02-`)** controlan la ordenación en el menú lateral. Utilízalos para decidir qué se lee primero.
2. Utiliza letras minúsculas, números y guiones medios. Evita usar espacios, acentos y la letra `ñ` en los nombres físicos de archivos y carpetas.

---

## 2. Metadatos (Frontmatter)

Al inicio de cada archivo `.mdx`, debes definir la estructura de datos obligatoria encerrada entre triple guion `---`:

```yaml
---
title: "Título de la Lección"
moduleTitle: "Nombre del Módulo (Visible en el menú)"
topicTitle: "Nombre del Tema (Visible en el menú)"
---
```

### Páginas Especiales de Inicio
Si vas a crear una lección introductoria general (como una presentación o plan de estudio) que no pertenece a ningún módulo, omite `moduleTitle` y `topicTitle`:

```yaml
---
title: "Mi Presentación"
---
```

---

## 3. Formato del Texto (Markdown y MDX)

Puedes usar marcas de texto estándar para dar estilo:

*   `# Título` para el título principal.
*   `## Subtítulo` para secciones secundarias.
*   `**texto**` para **negritas**.
*   `* item` para listas no ordenadas.
*   `1. item` para listas numeradas.
*   `> texto` para citas y notas destacadas.

### Ejemplo de archivo completo:

```markdown
---
title: "Hardware y Software"
moduleTitle: "Módulo 1: Fundamentos"
topicTitle: "Tema 1: Conceptos Generales"
---

# Introducción al Hardware

El hardware representa los componentes físicos que podemos tocar.

> **Importante:** Recuerda apagar y desconectar el equipo antes de tocar el hardware interno.
```

---

## 4. Publicar Cambios

Una vez que guardes tu nuevo archivo `.mdx` en la carpeta correspondiente:
1. Sube tus cambios a GitHub (`git add .`, `git commit -m "Lección agregada"`, `git push`).
2. Vercel detectará los cambios automáticamente y reconstruirá el sitio web en menos de 1 minuto, actualizando el menú y las páginas al instante.
```

- [ ] **Step 2: Commit Guide**

```bash
git add GUIA_CONTENIDO.md
git commit -m "docs: create content generation guide"
```
