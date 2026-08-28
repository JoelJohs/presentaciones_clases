# GitHub Copilot & Codex Instructions

Este proyecto es una plataforma interactiva de presentaciones y material de clase construida con Astro v6, MDX, Tailwind CSS y astro-icon.

## Reglas para Generar o Modificar Lecciones (`src/content/lecciones/`)

1. **Rutas y Archivos:**
   - Ubicación: `src/content/lecciones/[00-99]-[modulo]/[00-99]-[tema]/[00-99]-[clase]/index.mdx`
   - Nombres en minúsculas con guiones medios (`kebab-case`), sin mayúsculas, espacios, tildes ni caracteres como `ñ`.

2. **Frontmatter Requerido:**
   ```yaml
   ---
   title: "Título de la Lección"
   moduleTitle: "1 - Fundamentos y Mantenimiento de Equipos de Cómputo"
   topicTitle: "Tema 1: Introducción a la Computación"
   subtopicTitle: "Subtema Opcional"
   fecha: "DD-MM-YYYY"
   description: "Descripción concisa y atractiva."
   duration: 45
   objectives:
     - "Objetivo 1"
     - "Objetivo 2"
   ---
   ```

3. **Estructura de Diapositivas (Modo Presentación):**
   - Encabezado `#` una sola vez para el título principal.
   - Cada `##` representa una diapositiva independiente.
   - Separar diapositivas con `---`.
   - `###` y `####` solo se usan dentro de la diapositiva en curso.

4. **Tablas exclusivamente en HTML:**
   - Usar `<table><thead><tr><th>...</th></tr></thead><tbody><tr><td>...</td></tr></tbody></table>`.
   - Nunca usar tablas Markdown `|---|`.

5. **Iconos con Astro Icon:**
   - Importar `import { Icon } from "astro-icon/components";`
   - Usar `<Icon name="lucide:nombre" class="inline w-5 h-5 align-text-bottom text-color" />` o `simple-icons:nombre`.

6. **Tono Dirigido al Alumno:**
   - Escribir en segunda persona imperativo directo (**"Observa"**, **"Prueba"**, **"Crea"**, **"Comprueba"**).
   - No incluir notas privadas ni guías de docente ("muestra al grupo", "agenda").
   - Asegurar que el estudiante pueda completar la sesión de manera autónoma.

Consulta `skills/crear-clase/SKILL.md` para la guía completa y plantillas.
