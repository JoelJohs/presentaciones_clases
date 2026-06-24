# Responsive Layouts, Text Modes, and Review Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement mobile responsiveness for tables/images, a desktop-only text-scaling mode switcher (Reading vs. Presentation Mode) with localStorage persistence, and a gamified "Repaso" (Review) section at the end of the "Hardware y Software" lesson.

**Architecture:** Use CSS rules (block display with overflow-x scroll) to make tables responsive on mobile. Use an inline script in Astro's `<head>` to immediately read the text scale preference from localStorage to prevent style flashing. Use media queries in `global.css` targeting `.reading-mode` and `.presentation-mode` classes on `<html>`. Use details/summary HTML elements styled with custom CSS for interactive card-based review questions in MDX.

**Tech Stack:** Astro, Tailwind CSS v4, Vitest for test assertions.

## Global Constraints
- Do not modify existing core styles that are explicitly verified by Vitest tests (like the default prose classes and dimensions in `src/styles/global.test.ts` and `src/utils/projection-scaling.test.ts`). Only append class-based overrides.
- Save view-mode state in localStorage using the key `'view-mode'`.
- "Reading mode" (`reading-mode`) must be the default view state on desktop.
- Interactive question cards must be built with standard HTML `<details>` and `<summary>` tags inside MDX.

---

### Task 1: Mobile Responsiveness styling for Tables and Media
Modify the stylesheet to make tables horizontally scrollable on small screens and to prevent images/videos from overflowing their containers.

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/styles/global.test.ts`

**Interfaces:**
- Consumes: None
- Produces: CSS rules making tables/media responsive.

- [ ] **Step 1: Write the failing test**
  Add assertions in `src/styles/global.test.ts` to ensure `global.css` contains the responsive definitions.
  Open [src/styles/global.test.ts](file:///home/jojo/Proyectos/clases/presentaciones/src/styles/global.test.ts) and add the following test case at the end of the `describe` block:
  ```typescript
  it('should contain mobile responsiveness rules for images and table container overflow', () => {
    const cssPath = path.join(__dirname, 'global.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');

    // Assert img and video constraints in prose
    expect(cssContent).toContain('.prose img,');
    expect(cssContent).toContain('.prose video');
    expect(cssContent).toMatch(/\.prose\s+img,\s*\.prose\s+video\s*\{[^}]*max-width:\s*100%/);

    // Assert table scroll rules
    expect(cssContent).toMatch(/\.prose\s+table\s*\{[^}]*display:\s*block/);
    expect(cssContent).toMatch(/\.prose\s+table\s*\{[^}]*overflow-x:\s*auto/);
    
    // Assert curricular study plan table scroll rules
    expect(cssContent).toMatch(/\.plan-estudio-wrapper\s+table\s*\{[^}]*display:\s*block\s*!important/);
    expect(cssContent).toMatch(/\.plan-estudio-wrapper\s+table\s*\{[^}]*overflow-x:\s*auto\s*!important/);
  });
  ```

- [ ] **Step 2: Run test to verify it fails**
  Run: `npm run test`
  Expected: FAIL with "should contain mobile responsiveness rules for images and table container overflow" failures.

- [ ] **Step 3: Write minimal implementation**
  Open [src/styles/global.css](file:///home/jojo/Proyectos/clases/presentaciones/src/styles/global.css).
  Replace `.prose table` rule (around lines 163-170) with:
  ```css
  .prose table {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    border-collapse: collapse;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    font-size: 1rem;
    text-align: left;
  }
  ```
  Replace `.plan-estudio-wrapper table` rule (around lines 279-285) with:
  ```css
  .plan-estudio-wrapper table {
    border-collapse: collapse;
    width: 100% !important;
    margin-bottom: 1.5rem !important;
    margin-top: 0.5rem !important;
    background: transparent !important;
    display: block !important;
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch !important;
  }
  ```
  Add responsive images and video rules right below the table rules in [src/styles/global.css](file:///home/jojo/Proyectos/clases/presentaciones/src/styles/global.css):
  ```css
  .prose img,
  .prose video {
    max-width: 100%;
    height: auto;
    border-radius: 0.75rem;
    margin: 1.5rem auto;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
  ```

- [ ] **Step 4: Run test to verify it passes**
  Run: `npm run test`
  Expected: PASS

- [ ] **Step 5: Commit**
  ```bash
  git add src/styles/global.css src/styles/global.test.ts
  git commit -m "feat: add mobile responsive styling rules for tables and media content"
  ```

---

### Task 2: Layout Initialization and Text Scaling Mode Toggle Setup
Add a desktop-only switcher in the header to alternate between Reading Mode (smaller text, default) and Presentation Mode (larger text) with state persistence.

**Files:**
- Modify: `src/layouts/Layout.astro`
- Modify: `src/components/Header.astro`
- Modify: `src/styles/global.css`
- Modify: `src/utils/projection-scaling.test.ts`

**Interfaces:**
- Consumes: CSS layout.
- Produces: Persistent text scale modes toggleable via UI buttons.

- [ ] **Step 1: Write the failing test**
  Add assertions in `src/utils/projection-scaling.test.ts` to ensure `global.css` has rules for `.reading-mode` and `.presentation-mode` overrides.
  Open [src/utils/projection-scaling.test.ts](file:///home/jojo/Proyectos/clases/presentaciones/src/utils/projection-scaling.test.ts) and add the following tests:
  ```typescript
  it('should contain CSS classes for reading and presentation mode scaling overrides', () => {
    const globalCssPath = path.join(__dirname, '../styles/global.css');
    const cssContent = fs.readFileSync(globalCssPath, 'utf-8');

    // Reading mode checks
    expect(cssContent).toContain('.reading-mode .prose');
    expect(cssContent).toMatch(/\.reading-mode\s+\.prose\s*\{[^}]*font-size:\s*1\.0625rem/);

    // Presentation mode checks
    expect(cssContent).toContain('.presentation-mode .prose');
    expect(cssContent).toMatch(/\.presentation-mode\s+\.prose\s*\{[^}]*font-size:\s*1\.375rem/);
  });
  ```

- [ ] **Step 2: Run test to verify it fails**
  Run: `npm run test`
  Expected: FAIL with "should contain CSS classes for reading and presentation mode scaling overrides" failures.

- [ ] **Step 3: Write minimal implementation**
  Add the CSS classes at the bottom of [src/styles/global.css](file:///home/jojo/Proyectos/clases/presentaciones/src/styles/global.css):
  ```css
  /* Visual Mode overrides for Desktop size */
  @media (min-width: 1024px) {
    /* Reading Mode: reduced base sizing for monitor reading */
    .reading-mode .prose {
      font-size: 1.0625rem; /* ~17px */
    }
    .reading-mode .prose h1 {
      font-size: 2.125rem; /* ~34px */
    }
    .reading-mode .prose h2 {
      font-size: 1.75rem; /* ~28px */
    }
    .reading-mode .prose h3 {
      font-size: 1.375rem; /* ~22px */
    }

    /* Presentation Mode: enlarged text for projector */
    .presentation-mode .prose {
      font-size: 1.375rem; /* ~22px */
    }
    .presentation-mode .prose h1 {
      font-size: 2.875rem; /* ~46px */
    }
    .presentation-mode .prose h2 {
      font-size: 2.25rem; /* ~36px */
    }
    .presentation-mode .prose h3 {
      font-size: 1.75rem; /* ~28px */
    }
  }
  ```
  Open [src/layouts/Layout.astro](file:///home/jojo/Proyectos/clases/presentaciones/src/layouts/Layout.astro) and insert the non-flash script inside the `<head>` tag around line 41:
  ```html
    <script is:inline>
      const viewMode = localStorage.getItem('view-mode') || 'reading';
      document.documentElement.classList.add(`${viewMode}-mode`);
    </script>
  ```
  Open [src/components/Header.astro](file:///home/jojo/Proyectos/clases/presentaciones/src/components/Header.astro) and add the control segment elements next to `#theme-toggle` button around line 33:
  ```html
    <!-- Desktop Font Sizing Modes Switcher -->
    <div class="hidden lg:flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
      <button
        id="btn-reading-mode"
        type="button"
        class="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all hover:text-brand-primary"
        aria-label="Modo Lectura"
      >
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
        Lectura
      </button>

      <button
        id="btn-presentation-mode"
        type="button"
        class="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all hover:text-brand-primary"
        aria-label="Modo Presentación"
      >
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
        </svg>
        Presentación
      </button>
    </div>
  ```
  Now, add the toggle script in the `<script>` tag inside [src/layouts/Layout.astro](file:///home/jojo/Proyectos/clases/presentaciones/src/layouts/Layout.astro) around line 123:
  ```javascript
      // 4. Reading vs Presentation Mode Switcher
      const btnReading = document.getElementById('btn-reading-mode');
      const btnPresentation = document.getElementById('btn-presentation-mode');

      function updateModeUI(mode) {
        if (mode === 'presentation') {
          document.documentElement.classList.remove('reading-mode');
          document.documentElement.classList.add('presentation-mode');
          btnPresentation?.classList.add('bg-white', 'dark:bg-slate-700', 'text-brand-primary', 'shadow-sm');
          btnReading?.classList.remove('bg-white', 'dark:bg-slate-700', 'text-brand-primary', 'shadow-sm');
          btnReading?.classList.add('text-slate-500', 'dark:text-slate-400');
        } else {
          document.documentElement.classList.remove('presentation-mode');
          document.documentElement.classList.add('reading-mode');
          btnReading?.classList.add('bg-white', 'dark:bg-slate-700', 'text-brand-primary', 'shadow-sm');
          btnPresentation?.classList.remove('bg-white', 'dark:bg-slate-700', 'text-brand-primary', 'shadow-sm');
          btnPresentation?.classList.add('text-slate-500', 'dark:text-slate-400');
        }
      }

      // Read preference on load
      const currentMode = document.documentElement.classList.contains('presentation-mode') ? 'presentation' : 'reading';
      updateModeUI(currentMode);

      btnReading?.addEventListener('click', () => {
        localStorage.setItem('view-mode', 'reading');
        updateModeUI('reading');
      });

      btnPresentation?.addEventListener('click', () => {
        localStorage.setItem('view-mode', 'presentation');
        updateModeUI('presentation');
      });
  ```

- [ ] **Step 4: Run test to verify it passes**
  Run: `npm run test`
  Expected: PASS

- [ ] **Step 5: Commit**
  ```bash
  git add src/layouts/Layout.astro src/components/Header.astro src/styles/global.css src/utils/projection-scaling.test.ts
  git commit -m "feat: implement persistent Reading vs Presentation Mode text size toggle"
  ```

---

### Task 3: Interactive Review (Repaso) Section in MDX Lesson 1
Add a stylized interactive details/summary flashcard block to review hardware, motherboard connections, RAM/SSD operation, system resources, and file extensions at the end of Lesson 1.

**Files:**
- Modify: `src/content/lecciones/01-fundamentos-mantenimiento/01-introduccion-informatica/01-hardware-y-software.mdx`
- Modify: `src/styles/global.css`
- Modify: `src/styles/global.test.ts`

**Interfaces:**
- Consumes: None
- Produces: Gamified details/summary components under a "Repaso" section.

- [ ] **Step 1: Write the failing test**
  Add assertions in `src/styles/global.test.ts` to ensure `global.css` styling for `<details>` exists.
  Open [src/styles/global.test.ts](file:///home/jojo/Proyectos/clases/presentaciones/src/styles/global.test.ts) and add:
  ```typescript
  it('should contain CSS styles for details summary toggle elements in prose', () => {
    const cssPath = path.join(__dirname, 'global.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');

    expect(cssContent).toContain('.prose details');
    expect(cssContent).toContain('.prose details[open]');
    expect(cssContent).toContain('.prose details summary');
    expect(cssContent).toContain('.prose details blockquote');
  });
  ```

- [ ] **Step 2: Run test to verify it fails**
  Run: `npm run test`
  Expected: FAIL with "should contain CSS styles for details summary toggle elements in prose" failures.

- [ ] **Step 3: Write minimal implementation**
  Add the CSS definitions to the end of [src/styles/global.css](file:///home/jojo/Proyectos/clases/presentaciones/src/styles/global.css):
  ```css
  /* Interactive Review details/summary styling */
  .prose details {
    background-color: var(--color-brand-sidebar-bg);
    border: 1px solid var(--color-brand-border);
    border-radius: 8px;
    padding: 0.75rem 1rem;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    transition: all 0.2s ease-in-out;
  }
  .prose details[open] {
    border-color: var(--color-brand-primary);
    box-shadow: 0 4px 12px rgba(26, 95, 168, 0.08);
  }
  .prose details summary {
    font-weight: 600;
    cursor: pointer;
    color: var(--color-brand-primary);
    outline: none;
  }
  .prose details summary:hover {
    color: var(--color-brand-accent);
  }
  .prose details blockquote {
    border-left: 3px solid var(--color-brand-primary);
    margin-top: 0.75rem;
    margin-bottom: 0;
    padding-left: 1rem;
    background-color: rgba(26, 95, 168, 0.03);
    font-size: 0.95rem;
    line-height: 1.6;
  }
  ```
  Open [src/content/lecciones/01-fundamentos-mantenimiento/01-introduccion-informatica/01-hardware-y-software.mdx](file:///home/jojo/Proyectos/clases/presentaciones/src/content/lecciones/01-fundamentos-mantenimiento/01-introduccion-informatica/01-hardware-y-software.mdx).
  Append the Review section to the bottom of the file (after line 280):
  ```markdown
  
  ---

  ## ⚡ Repaso Ninja: ¿Cuánto recuerdas de la clase anterior? 🥷

  ¡Es hora de poner a prueba tus conocimientos antes de que el servidor se caiga! Aquí tienes un **mini examen verbal** rápido para repasar lo que comentamos en clase. Haz clic en cada tarjeta para revelar la respuesta y ver si eres un verdadero maestro del Hardware y Software.

  ### 🔌 Desafío 1: El Universo de los Periféricos
  ¿Qué tipo de periférico (Entrada, Salida o Mixto) es una **pantalla táctil** de celular y por qué?
  <details>
    <summary>🔍 Revelar respuesta y explicación</summary>
    <blockquote>
      ¡Es un periférico **Mixto (Entrada y Salida)**!
      * **Entrada:** Porque cuando tocas la pantalla con tu dedo, le envías señales a la CPU (clics, gestos, escribir).
      * **Salida:** Porque al mismo tiempo te muestra luz, imágenes y la interfaz de tu juego favorito. 
      * *Otros ejemplos:* Auriculares con micrófono integrado.
    </blockquote>
  </details>

  ### 🧠 Desafío 2: La Placa Madre y sus Conexiones
  ¿Cuál es la diferencia real entre la **Memoria RAM** y el disco **SSD/HDD** usando la analogía de hacer la tarea escolar?
  <details>
    <summary>🔍 Revelar respuesta y explicación</summary>
    <blockquote>
      ¡Imagina que estás haciendo un dibujo escolar!
      * **La Memoria RAM es tu escritorio:** Aquí pones las hojas, lápices y colores que estás usando *justo en este momento*. Es súper rápida para agarrar cosas, pero si te vas a dormir y apagas la luz (apagas la PC), el escritorio queda vacío.
      * **El SSD/HDD es tu mochila:** Es donde guardas tus libretas ordenadas. Tarda un poquito más en abrirse y sacar el libro, pero todo se queda guardado de forma permanente aunque apagues la computadora.
    </blockquote>
  </details>

  ### ⚙️ Desafío 3: El Dilema del Almacenamiento (HDD vs. SSD)
  Si tuvieras que armar una computadora para jugar o programar, ¿por qué elegirías un **SSD** en lugar de un **HDD** para instalar el sistema operativo?
  <details>
    <summary>🔍 Revelar respuesta y explicación</summary>
    <blockquote>
      * **El HDD (Disco Duro Mecánico)** funciona como un tocadiscos antiguo: tiene un disco de metal que gira físicamente y una aguja que busca los datos. Si se mueve la PC, puede dañarse, y es lento porque tiene partes móviles.
      * **El SSD (Unidad de Estado Sólido)** es como una memoria USB gigante: no tiene partes móviles, guarda todo en microchips de memoria flash. ¡Es hasta 10 veces más rápido y resistente a golpes! El SSD hará que tu sistema y aplicaciones arranquen en segundos.
    </blockquote>
  </details>

  ### 📊 Desafío 4: El Control de los Recursos (Software)
  Estás jugando a 120 FPS y de repente todo empieza a ir lento ("laguearse"). Abres el **Administrador de Tareas** y ves que el uso de la memoria RAM está en el **99%**. ¿Qué está pasando físicamente en tu computadora?
  <details>
    <summary>🔍 Revelar respuesta y explicación</summary>
    <blockquote>
      ¡Te quedaste sin espacio en el "escritorio"! Cuando abres demasiadas aplicaciones de fondo (como Discord, Spotify, y 20 pestañas de Chrome) junto con tu juego, consumen toda la RAM. 
      Como la RAM no tiene más espacio físico, el procesador (CPU) tiene que empezar a usar parte del SSD/HDD como RAM de emergencia. Y como el almacenamiento es mucho más lento que la RAM, tu juego empieza a perder fotogramas ("lags").
    </blockquote>
  </details>

  ### 🧩 Desafío 5: El Código Secreto de las Extensiones
  ¿Por qué una computadora ejecuta y abre de manera diferente un archivo llamado `cancion.mp3` y otro llamado `instalador.exe` si ambos están en tu carpeta de descargas?
  <details>
    <summary>🔍 Revelar respuesta y explicación</summary>
    <blockquote>
      ¡Por la extensión del archivo! El "apellido" del archivo le dice al sistema qué hacer:
      * **`.mp3`** es un archivo de **datos (multimedia)**. La PC sabe que debe abrir un reproductor de música y leer la pista de audio sin alterar nada más.
      * **`.exe`** es un archivo **ejecutable**. Contiene una serie de instrucciones directas escritas en código de programación para que la CPU las ejecute directamente en el hardware. ¡Por eso instalar programas nuevos requiere un archivo `.exe`!
    </blockquote>
  </details>
  ```

- [ ] **Step 4: Run test to verify it passes**
  Run: `npm run test`
  Expected: PASS

- [ ] **Step 5: Commit**
  ```bash
  git add src/content/lecciones/01-fundamentos-mantenimiento/01-introduccion-informatica/01-hardware-y-software.mdx src/styles/global.css src/styles/global.test.ts
  git commit -m "feat: add interactive review section to Hardware y Software lesson"
  ```
