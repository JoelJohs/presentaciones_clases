# Universal Agent Guidelines (AGENTS.md)

Este repositorio contiene una plataforma interactiva de presentaciones y clases para estudiantes, desarrollada con **Astro v6**, **MDX**, **Tailwind CSS v4**, **Alpine.js** y **astro-icon**.

## Estándar Mandatorio para la Creación de Clases y Lecciones

Cualquier agente que genere, modifique o revise clases en `src/content/lecciones/` DEBE cumplir con las siguientes reglas:

### 1. Convención de Archivos y Rutas
- Ruta estándar: `src/content/lecciones/[00-99]-[modulo]/[00-99]-[tema]/[00-99]-[clase]/index.mdx`
- Los prefijos numéricos (`01-`, `02-`) determinan el ordenamiento en la barra de navegación.
- Solo nombres en minúsculas, números y guiones medios. **Sin mayúsculas, espacios, tildes ni 'ñ'**.

### 2. Metadatos Obligatorios (Frontmatter)
```yaml
---
title: "Título de la Lección"
moduleTitle: "1 - Fundamentos y Mantenimiento de Equipos de Cómputo"
topicTitle: "Tema 1: Introducción a la Computación"
subtopicTitle: "Nombre del Subtema"
fecha: "DD-MM-YYYY"
description: "Descripción concisa y atractiva de los aprendizajes."
duration: 45
objectives:
  - "Verbo infinitivo + concepto"
  - "Verbo infinitivo + habilidad"
---
```

### 3. Modo Presentación (Diapositivas)
- `# Título Principal`: Únicamente una vez al inicio del documento.
- `##`: Cada encabezado de nivel 2 define una **diapositiva independiente**.
- `---`: Separador horizontal obligatorio entre cada sección `##`.
- Cada diapositiva debe contener una sola idea clara, analogía, demostración o reto práctico.
- `###` y `####`: Exclusivamente para subtítulos internos de la diapositiva en curso.

### 4. Tablas en HTML (Regla Estricta)
- **NUNCA** usar tablas Markdown de barras (`|---|`).
- **SIEMPRE** usar HTML estándar: `<table><thead><tr><th>...</th></tr></thead><tbody><tr><td>...</td></tr></tbody></table>`.

### 5. Tono Pedagógico y Voz
- Redactar en 2ª persona imperativo dirigido directamente al estudiante (**"Observa"**, **"Prueba"**, **"Crea"**, **"Compara"**, **"Comprueba"**).
- **Prohibido** incluir instrucciones para el docente ("explica al grupo", "muestra en pantalla", "agenda de la sesión").
- La lección debe ser autosuficiente para el autoestudio del alumno.

### 6. Iconos e Imágenes
- Importar componente de iconos: `import { Icon } from "astro-icon/components";`
- Iconos de `lucide:*` y `simple-icons:*` con clases Tailwind: `<Icon name="lucide:cpu" class="inline w-5 h-5 align-text-bottom text-sky-600" />`.
- Imágenes referenciadas con `@assets/images/...` o `/images/...`.

## Skills del Proyecto
- `skills/crear-clase/SKILL.md`: Guía exhaustiva, checklist y plantilla para la creación de clases.
- `skills/stop-slop/SKILL.md`: Directrices para eliminar patrones y muletillas de IA en la redacción.

## Comandos del Proyecto
- `npm run dev`: Iniciar servidor de desarrollo en local.
- `npm test`: Ejecutar suite de pruebas con Vitest.
- `npm run check`: Validar tipos y sintaxis de Astro.
