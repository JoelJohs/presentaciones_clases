# Plan de Implementación: Metadatos de Subtema (subtopicTitle) en MDX

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Agregar la propiedad `subtopicTitle` a todos los archivos MDX correspondientes a las lecciones de la plataforma (excluyendo la sección de inicio) para tener un metadato claro y unificado del Subtema.

**Architecture:** Modificaremos el esquema de Content Collections de Astro para registrar `subtopicTitle` como un campo opcional de tipo string, y utilizaremos un script de automatización en Node.js para insertar dinámicamente este campo en el frontmatter de todos los archivos MDX existentes.

**Tech Stack:** Astro v6, TypeScript, Node.js.

## Global Constraints
- No alterar el contenido didáctico de las lecciones.
- Las páginas en `00-inicio/` no deben recibir `subtopicTitle`.
- Todos los tests de la suite (`npm test`) y la compilación (`npm run build`) deben pasar sin errores al finalizar el proceso.

---

### Task 1: Actualización del Esquema de Astro

**Files:**
- Modify: `src/content.config.ts:6-12`

**Interfaces:**
- Produces: Nueva propiedad `subtopicTitle` opcional de tipo string en el esquema de lecciones.

- [ ] **Step 1: Modificar `src/content.config.ts`**
  Añadir `subtopicTitle` como un esquema opcional de Zod.
  
  ```typescript
  import { defineCollection, z } from 'astro:content';
  import { glob } from 'astro/loaders';

  const lecciones = defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/lecciones" }),
    schema: z.object({
      title: z.string(),
      moduleTitle: z.string().optional(),
      topicTitle: z.string().optional(),
      subtopicTitle: z.string().optional(), // Nueva propiedad para el Subtema
      fecha: z.string().optional(),
    }),
  });

  export const collections = { lecciones };
  ```

- [ ] **Step 2: Probar compilación inicial de Astro**
  Ejecutar el comando de validación rápida.
  Run: `npm run build`
  Expected: PASS/Éxito sin errores.

- [ ] **Step 3: Guardar cambios y realizar commit de Task 1**
  Run:
  ```bash
  git add src/content.config.ts
  git commit -m "schema: add subtopicTitle to content schema"
  ```

---

### Task 2: Script de Automatización e Inyección de Metadatos

**Files:**
- Create: `src/utils/add-subtopic-metadata.js`
- Modify: Todos los archivos `.mdx` y `.md` bajo `src/content/lecciones/` (excepto en `00-inicio/`)

- [ ] **Step 1: Crear el script de automatización `src/utils/add-subtopic-metadata.js`**
  Escribir el código en Node.js para inyectar de manera segura `subtopicTitle` en el frontmatter basándose en las reglas especificadas.
  
  ```javascript
  const fs = require('fs');
  const path = require('path');

  const BASE_DIR = path.join(__dirname, '../content/lecciones');

  function getFilesRecursively(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat && stat.isDirectory()) {
        results = results.concat(getFilesRecursively(filePath));
      } else if (file.endsWith('.mdx') || file.endsWith('.md')) {
        results.push(filePath);
      }
    });
    return results;
  }

  function cleanSubtopicTitle(title) {
    let clean = title;
    // Remueve prefijo "Repaso: "
    clean = clean.replace(/^Repaso:\s*/i, '');
    // Remueve sufijos tipo " (Parte 1)", " - Parte 2", " parte 3", " (Parte 1/2)", etc.
    clean = clean.replace(/\s*[\(\-]?\s*parte\s*\d+(\/\d+)?\s*\)?/i, '');
    return clean.trim();
  }

  function processFiles() {
    const files = getFilesRecursively(BASE_DIR);
    let count = 0;

    // Primero construimos un mapa de carpetas que contienen index.mdx para heredar su título
    const folderIndexTitles = {};
    files.forEach((filePath) => {
      const relative = path.relative(BASE_DIR, filePath);
      if (relative.startsWith('00-inicio/')) return;

      const fileName = path.basename(filePath);
      if (fileName === 'index.mdx' || fileName === 'index.md') {
        const folder = path.dirname(filePath);
        const content = fs.readFileSync(filePath, 'utf8');
        const match = content.match(/^---([\s\S]*?)---/);
        if (match) {
          const titleMatch = match[1].match(/title:\s*["'](.*?)["']/);
          if (titleMatch) {
            folderIndexTitles[folder] = titleMatch[1];
          }
        }
      }
    });

    files.forEach((filePath) => {
      const relative = path.relative(BASE_DIR, filePath);
      // Omitir sección de inicio
      if (relative.startsWith('00-inicio/')) return;

      const content = fs.readFileSync(filePath, 'utf8');
      const match = content.match(/^---([\s\S]*?)---/);
      if (!match) return;

      const frontmatter = match[1];
      const body = content.slice(match[0].length);

      // Verificar si ya tiene subtopicTitle
      if (frontmatter.includes('subtopicTitle:')) return;

      // Obtener el title del frontmatter
      const titleMatch = frontmatter.match(/title:\s*["'](.*?)["']/);
      if (!titleMatch) return;
      const title = titleMatch[1];

      // Determinar subtopicTitle
      const folder = path.dirname(filePath);
      let subtopicTitle = '';

      if (folderIndexTitles[folder]) {
        // Si está en una carpeta con index, usamos el título del index limpio
        subtopicTitle = cleanSubtopicTitle(folderIndexTitles[folder]);
      } else {
        // Si es standalone, usamos el propio título de la lección limpio
        subtopicTitle = cleanSubtopicTitle(title);
      }

      // Reconstruir frontmatter insertando subtopicTitle después de topicTitle (o antes de fecha)
      let newFrontmatter = frontmatter;
      if (frontmatter.includes('topicTitle:')) {
        newFrontmatter = frontmatter.replace(/(topicTitle:\s*.*?\n)/, `$1subtopicTitle: "${subtopicTitle}"\n`);
      } else {
        // En caso de que no tenga topicTitle (fallback)
        newFrontmatter = frontmatter + `subtopicTitle: "${subtopicTitle}"\n`;
      }

      fs.writeFileSync(filePath, `---${newFrontmatter}---${body}`, 'utf8');
      count++;
    });

    console.log(`Proceso completado. Se actualizaron ${count} archivos.`);
  }

  processFiles();
  ```

- [ ] **Step 2: Ejecutar el script de inyección**
  Ejecutar el script usando Node.js.
  Run: `node src/utils/add-subtopic-metadata.js`
  Expected: Mensaje de éxito indicando la cantidad de archivos actualizados.

- [ ] **Step 3: Ejecutar compilación de validación**
  Verificar que las Content Collections de Astro validen el frontmatter de todos los archivos y compilen sin errores.
  Run: `npm run build`
  Expected: PASS/Éxito total sin errores de tipos o validación Zod.

- [ ] **Step 4: Comprobar la suite de pruebas unitarias**
  Run: `npm test`
  Expected: PASS/Todos los tests pasan con éxito.

- [ ] **Step 5: Realizar commit de los archivos modificados**
  Añadir todos los archivos modificados y hacer commit.
  Run:
  ```bash
  git add src/content/lecciones/
  git commit -m "feat: add subtopicTitle metadata to all lessons using automation script"
  ```

---

### Task 3: Limpieza y Validación Final

**Files:**
- Modify: `src/utils/add-subtopic-metadata.js` (Eliminar o documentar para mantener limpio el repositorio)

- [ ] **Step 1: Eliminar el script de automatización temporal**
  Para evitar dejar scripts huérfanos innecesarios en producción, eliminamos el script ejecutado.
  Run: `rm src/utils/add-subtopic-metadata.js`

- [ ] **Step 2: Ejecutar última prueba de compilación**
  Run: `npm run build`
  Expected: Éxito total.

- [ ] **Step 3: Realizar commit de la limpieza**
  Run:
  ```bash
  git add src/utils/add-subtopic-metadata.js
  git commit -m "chore: cleanup temporary metadata migration script"
  ```
