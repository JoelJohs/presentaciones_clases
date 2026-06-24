# Plan de Implementación: Encabezado de Página Estilo Documento (Word) en Lecciones

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Agregar un encabezado visual sutil arriba del contenido de cada lección (con Módulo, Tema y Fecha) estructurado en dos columnas y separado por una línea horizontal del cuerpo de la lección, omitiéndose en páginas de inicio.

**Architecture:** Modificaremos la página de enrutamiento dinámico `src/pages/[...slug].astro` para renderizar el bloque HTML/CSS condicional antes del componente `<article>`.

**Tech Stack:** Astro v6, Tailwind CSS, TypeScript.

## Global Constraints
- No alterar las páginas que no contienen `moduleTitle` (por ejemplo, las del directorio `00-inicio/`).
- El diseño debe adaptarse fluidamente a dispositivos móviles y de escritorio.
- La compilación del proyecto (`npm run build`) y los tests (`npm test`) deben continuar pasando sin errores.

---

### Task 1: Modificación del Enrutamiento Dinámico y Encabezado Visual

**Files:**
- Modify: `src/pages/[...slug].astro:37-41`

- [ ] **Step 1: Modificar `src/pages/[...slug].astro`**
  Insertar el bloque condicional del encabezado visual estilo Word antes de la etiqueta `<article>` que renderiza el contenido de la lección.
  
  ```astro
  ---
  // ... imports y cálculo de navegación
  ---

  <Layout title={leccion.data.title} nav={nav} activeSlug={activeSlug}>
    <!-- Cabecera de Página (Estilo Documento) -->
    {leccion.data.moduleTitle && (
      <div class="mb-8 text-xs font-mono text-slate-400 dark:text-slate-500 border-b border-slate-200 dark:border-slate-800 pb-3 select-none">
        <div class="flex justify-between items-baseline gap-4">
          <span class="font-semibold uppercase tracking-wider">{leccion.data.moduleTitle}</span>
          {leccion.data.fecha && (
            <span class="text-right whitespace-nowrap">{leccion.data.fecha}</span>
          )}
        </div>
        {leccion.data.topicTitle && (
          <div class="mt-1 text-slate-500 dark:text-slate-400 font-medium">
            {leccion.data.topicTitle}
          </div>
        )}
      </div>
    )}

    <article class="prose text-slate-800 dark:text-slate-200">
      <Content />
    </article>

    <!-- Prev/Next Navigation Controls ... -->
  ```

- [ ] **Step 2: Ejecutar compilación del proyecto**
  Verificar que el build estático de Astro complete correctamente.
  Run: `npm run build`
  Expected: Complete! Éxito total sin errores.

- [ ] **Step 3: Ejecutar suite de pruebas unitarias**
  Run: `npx vitest run`
  Expected: 14/14 tests passing.

- [ ] **Step 4: Realizar commit de los cambios**
  Run:
  ```bash
  git add src/pages/[...slug].astro
  git commit -m "feat: add document-style header to lesson pages"
  ```
