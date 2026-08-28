# Instrucciones del Proyecto: Presentaciones y Clases Interactivas

Este repositorio contiene una plataforma educativa interactiva construida con **Astro**, **MDX**, **Tailwind CSS**, **Alpine.js** y **astro-icon**.

## Reglas Obligatorias para la Creación de Clases y Lecciones

Al preparar, redactar o modificar cualquier clase o lección (`src/content/lecciones/`), debes cumplir estrictamente con las siguientes directrices:

### 1. Ubicación y Nombres de Archivo
- Rutas: `src/content/lecciones/[00-99]-[modulo]/[00-99]-[tema]/[00-99]-[clase]/index.mdx` (o `[NRO]-leccion.mdx`).
- Usa siempre nombres en minúsculas, números y guiones medios (`-`).
- **PROHIBIDO:** Mayúsculas, espacios, tildes y la letra `ñ` en nombres de carpetas o archivos.

### 2. Metadatos (Frontmatter)
Obligatorio al inicio del archivo `.mdx`:
```yaml
---
title: "Título de la Lección"
moduleTitle: "1 - Fundamentos y Mantenimiento de Equipos de Cómputo"
topicTitle: "Tema 1: Introducción a la Computación"
subtopicTitle: "Subtema Opcional"
fecha: "DD-MM-YYYY"
description: "Descripción concisa orientada al estudiante."
duration: 45
objectives:
  - "Objetivo en infinitivo 1"
  - "Objetivo en infinitivo 2"
  - "Objetivo en infinitivo 3"
---
```

### 3. Modo Diapositivas y Jerarquía de Encabezados
- `# Título Principal`: Úsalo **una sola vez** al inicio de la página.
- `##`: Delimita **cada diapositiva individual**. Cada `##` representa una única idea, explicación con analogía, demostración, atajo o actividad práctica.
- `---`: Separador horizontal obligatorio entre diapositivas (`##`).
- `###` y `####`: Se usan únicamente para subsecciones dentro de una diapositiva.

### 4. Tablas estrictamente en HTML
- **PROHIBIDO:** Tablas de Markdown (`| a | b |`).
- **OBLIGATORIO:** Sintaxis HTML (`<table><thead><tr><th>...</th></tr></thead><tbody><tr><td>...</td></tr></tbody></table>`).
- No agregar clases CSS; `.prose table` estiliza automáticamente.

### 5. Enfoque y Tono Dirigido al Estudiante
- La página web es la guía de estudio del estudiante. Escribe directamente para él/ella en 2ª persona imperativo: **"Observa"**, **"Prueba"**, **"Crea"**, **"Compara"**, **"Comprueba"**.
- **PROHIBIDO:** Notas o recordatorios para el profesor ("muestra al grupo", "explica a los alumnos", "agenda de la sesión").
- Explica conceptos con analogías cotidianas y proporciona retos con resultados verificables.

### 6. Iconos
- Importar siempre: `import { Icon } from "astro-icon/components";`
- Usar iconos de `@iconify-json/lucide` (`lucide:*`) y `@iconify-json/simple-icons` (`simple-icons:*`).

### Skill de Referencia
Para consultar la guía detallada, checklist y plantilla completa, activa la skill: `skills/crear-clase/SKILL.md`.
