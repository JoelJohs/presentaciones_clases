# Plan de Implementación: Expansión de S.O. (Linux), Evolución de Interfaces y Estilos de Tablas

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand operating system content (specifically Linux customization and distro structure), detail interface evolution history, and style and expand markdown tables globally in CSS.

**Architecture:** Define global tables `.prose table` styling rules in the global CSS file (`src/styles/global.css`) matching theme variables, copy all image files to the Astro assets directory, and update the MDX content in `01-hardware-y-software.mdx` using the `@assets` path alias for image resolution.

**Tech Stack:** Astro 6, MDX, Tailwind CSS v4.

## Global Constraints
* Maintain clean typography: Outfit for headings, Inter for body.
* No React inside client bundles. Use Vanilla JS scripts in Astro layout/components.
* Use relative/alias paths (`@assets/...`) for assets inside MDX. Do not use absolute paths.
* Do not use standard HTML comments `<!-- ... -->` in MDX files as they will fail the Astro compiler; use `{/* ... */}` block comments instead.

---

### Task 1: Estilos de Tablas en CSS Global

**Files:**
- Modify: `src/styles/global.css`

**Interfaces:**
- Consumes: Theme variables (`--color-brand-sidebar-bg`, `--color-brand-navy`, `--color-brand-border`, `--color-brand-text`, `--color-brand-hover-bg`) defined in `global.css`.
- Produces: CSS class styling for `.prose table` elements.

- [ ] **Step 1: Write CSS rules for markdown tables inside .prose**
  Add the following table styles at the end of the markdown prose custom styles section in `src/styles/global.css`:
  ```css
  /* Markdown Tables inside .prose */
  .prose table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    font-size: 1rem;
    text-align: left;
  }
  .prose th {
    background-color: var(--color-brand-sidebar-bg);
    color: var(--color-brand-navy);
    font-weight: 700;
    padding: 0.75rem 1rem;
    border-bottom: 2px solid var(--color-brand-border);
  }
  .prose td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--color-brand-border);
    color: var(--color-brand-text);
    vertical-align: middle;
  }
  .prose tr:hover td {
    background-color: var(--color-brand-hover-bg);
  }
  ```

- [ ] **Step 2: Verify global compilation**
  Run: `npm run build`
  Expected: Builds successfully with no errors or style warnings.

- [ ] **Step 3: Commit changes**
  Run:
  ```bash
  git add src/styles/global.css
  git commit -m "style: add global styling for tables inside .prose"
  ```

---

### Task 2: Expansión de Sistemas Operativos y Evolución de Interfaces

**Files:**
- Modify: `src/content/lecciones/01-fundamentos-mantenimiento/01-introduccion-informatica/01-hardware-y-software.mdx`

**Interfaces:**
- Consumes: Image files `distros_linux.png`, `linux_extra_1.jpg`, `linux_extra_2.jpg`, and `linux_extra_3.jpg` copied in `src/assets/images/lecciones/01-fundamentos-mantenimiento/01-introduccion-informatica/`.
- Produces: Updated markdown/MDX section `## 3. El Sistema Operativo (S.O.) 🧠` and new interface evolution sub-section.

- [ ] **Step 1: Expand the Linux sub-item and add Evolution sub-section**
  Replace lines 65-67 in `src/content/lecciones/01-fundamentos-mantenimiento/01-introduccion-informatica/01-hardware-y-software.mdx` with the expanded Linux information, distribution image, customization details, and the historical interface evolution section.
  Target code block:
  ```mdx
  - 🐧 **Linux:** El favorito de los programadores, servidores y quienes buscan control total.
    ![Interfaz de Linux](@assets/images/lecciones/01-fundamentos-mantenimiento/01-introduccion-informatica/linux.jpg)
  ```
  Replacement content:
  ```mdx
  - 🐧 **Linux:** El favorito de los programadores, servidores y quienes buscan control total.
    ![Interfaz de Linux](@assets/images/lecciones/01-fundamentos-mantenimiento/01-introduccion-informatica/linux.jpg)

    * **Distribuciones (Sabores):** Linux no es un sistema único. Se distribuye en diferentes versiones llamadas "distribuciones" (o distros) adaptadas a cada necesidad: Ubuntu (fácil de usar), Fedora (innovadora), Linux Mint (similar a Windows) o Arch Linux (para expertos).
      ![Distribuciones de Linux](@assets/images/lecciones/01-fundamentos-mantenimiento/01-introduccion-informatica/distros_linux.png)

    * **La Libertad de Personalización:** A diferencia de Windows o macOS, en Linux puedes cambiar por completo el aspecto visual (los paneles, iconos, ventanas y widgets) y controlar al 100% los recursos de tu computadora.
      
      ![Ejemplo 1: Escritorio minimalista personalizado (Arch Linux)](@assets/images/lecciones/01-fundamentos-mantenimiento/01-introduccion-informatica/linux_extra_1.jpg)
      
      ![Ejemplo 2: Interfaz avanzada con widgets multimedia y paneles interactivos](@assets/images/lecciones/01-fundamentos-mantenimiento/01-introduccion-informatica/linux_extra_2.jpg)
      
      ![Ejemplo 3: Entorno de terminal pura y monitores de rendimiento del sistema en tiempo real](@assets/images/lecciones/01-fundamentos-mantenimiento/01-introduccion-informatica/linux_extra_3.jpg)

  ---

  ### ⏳ De la Terminal al Ratón: La Evolución del S.O.

  Hoy en día usamos ratones, pantallas táctiles y menús llenos de colores. Pero no siempre fue así:

  1. **La Era del Texto:** En los inicios (sistemas como MS-DOS o los primeros UNIX), el ratón no existía. Las pantallas eran completamente negras y la única forma de interactuar era escribiendo texto mediante comandos.
  2. **La Llegada del Ratón:** La introducción de la Interfaz Gráfica de Usuario (GUI) y el mouse revolucionó la computación, permitiendo hacer "clic" en iconos visuales.
  3. **El Regreso a los Atajos:** Aunque el ratón es muy intuitivo, los profesionales y programadores siguen prefiriendo usar el teclado. ¿Por qué? Porque tus manos no tienen que dejar el teclado, lo que hace el trabajo hasta 3 veces más rápido.
  ```

- [ ] **Step 2: Verify compilation**
  Run: `npm run build`
  Expected: Successfully compiles with no compiler issues regarding MDX comments or imports.

- [ ] **Step 3: Commit changes**
  Run:
  ```bash
  git add src/content/lecciones/01-fundamentos-mantenimiento/01-introduccion-informatica/01-hardware-y-software.mdx
  git commit -m "feat: expand Linux OS details with distros and customization screens, add interface evolution history"
  ```

---

### Task 3: Tabla de Atajos de Teclado Ampliada

**Files:**
- Modify: `src/content/lecciones/01-fundamentos-mantenimiento/01-introduccion-informatica/01-hardware-y-software.mdx`

**Interfaces:**
- Consumes: None.
- Produces: Expanded Markdown table under `## ⌨️ Hoja de Trucos: Atajos de Teclado`.

- [ ] **Step 1: Replace basic table with the expanded table**
  Replace lines 74-81 (or the relevant lines containing the old table) in `src/content/lecciones/01-fundamentos-mantenimiento/01-introduccion-informatica/01-hardware-y-software.mdx` with the expanded table.
  Target code block:
  ```mdx
  | Atajo                  | ¿Qué hace?                                           |
  | :--------------------- | :--------------------------------------------------- |
  | **Win + E**            | Abre el Explorador de Archivos.                      |
  | **Win + D**            | Muestra el Escritorio (esconde todo).                |
  | **Alt + Tab**          | Cambia rápidamente entre ventanas abiertas.          |
  | **Win + Flechas**      | Mueve y ajusta la ventana a la mitad de la pantalla. |
  | **Ctrl + Shift + Esc** | Abre el Administrador de Tareas (tu salvavidas).     |
  | **Alt + F4**           | Cierra la ventana o programa actual.                 |
  ```
  Replacement content:
  ```mdx
  | Categoría | Atajo | ¿Qué hace? |
  | :--- | :--- | :--- |
  | **Control de Ventanas** | **Win + E** | Abre el Explorador de Archivos. |
  | | **Win + D** | Muestra el Escritorio (esconde todo). |
  | | **Alt + Tab** | Cambia rápidamente entre ventanas abiertas. |
  | | **Win + Flechas** | Mueve y ajusta la ventana a la mitad de la pantalla. |
  | | **Alt + F4** | Cierra la ventana o programa actual. |
  | **Edición y Texto** | **Ctrl + C** / **Ctrl + V** | Copiar y Pegar texto o archivos. |
  | | **Ctrl + X** | Cortar (mueve el texto o archivo de lugar). |
  | | **Ctrl + Z** / **Ctrl + Y** | Deshacer y Rehacer la última acción. |
  | | **Ctrl + A** | Seleccionar todo el texto o archivos del directorio. |
  | | **F2** | Cambiar el nombre al archivo seleccionado. |
  | **Navegador y Web** | **Ctrl + T** / **Ctrl + W** | Abre una nueva pestaña / Cierra la pestaña actual. |
  | | **Ctrl + Shift + T** | Reabre la última pestaña que cerraste por error. |
  | **Herramientas** | **Ctrl + Shift + Esc** | Abre el Administrador de Tareas (tu salvavidas). |
  | | **Win + Shift + S** | Captura de pantalla directa (Herramienta de Recortes). |
  ```

- [ ] **Step 2: Run all tests and build**
  Run: `npm run build && npm run test`
  Expected: All tests pass successfully and output builds clean.

- [ ] **Step 3: Commit changes**
  Run:
  ```bash
  git add src/content/lecciones/01-fundamentos-mantenimiento/01-introduccion-informatica/01-hardware-y-software.mdx
  git commit -m "feat: expand and categorize keyboard shortcuts table"
  ```
