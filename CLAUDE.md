# CLAUDE.md - Guía de Proyecto para Claude Code

Plataforma educativa de presentaciones y clases interactivas desarrollada con Astro, MDX, Tailwind CSS, Alpine.js y astro-icon.

## Comandos Principales
- `npm run dev`: Inicia el servidor de desarrollo en `http://localhost:4321`
- `npm test`: Ejecuta la suite de pruebas unitarias con Vitest
- `npm run check`: Ejecuta el chequeo de tipos y esquemas de Astro
- `npm run build`: Genera la versión estática de producción

## Estándar Mandatorio para Crear Clases y Lecciones (.mdx)

Al crear o modificar lecciones en `src/content/lecciones/`, sigue estrictamente este estándar:

### 1. Estructura de Directorios
```text
src/content/lecciones/
  └── [00-99]-[nombre-modulo]/
       └── [00-99]-[nombre-tema]/
            └── [00-99]-[nombre-clase]/
                 ├── index.mdx
                 └── repaso.mdx (opcional)
```
- Nombres de carpetas y archivos en minúsculas, separados con guiones medios, sin espacios ni caracteres especiales (`á, é, í, ó, ú, ñ`).
- Los prefijos numéricos (`01-`, `02-`) definen el orden de navegación.

### 2. Frontmatter Obligatorio
```yaml
---
title: "Título de la Lección"
moduleTitle: "1 - Fundamentos y Mantenimiento de Equipos de Cómputo"
topicTitle: "Tema 1: Introducción a la Computación"
subtopicTitle: "Subtema Opcional"
fecha: "DD-MM-YYYY"
description: "Descripción atractiva y orientada a los resultados del estudiante."
duration: 45
objectives:
  - "Definir los conceptos esenciales de ..."
  - "Aplicar la técnica en ..."
---
```

### 3. Modo Presentación (Diapositivas)
- `# Título Principal`: Una sola vez al principio.
- `##`: Cada encabezado H2 marca una diapositiva individual.
- `---`: Separador horizontal entre cada sección `##`.
- Cada `##` aborda una única idea, analogía, demostración o reto.
- `###` y `####`: Solo para subdivisiones internas dentro de una diapositiva.

### 4. Tablas en HTML
- **Prohibido:** Tablas Markdown (`| a | b |`).
- **Obligatorio:** Sintaxis HTML estándar:
```html
<table>
  <thead>
    <tr>
      <th>Columna 1</th>
      <th>Columna 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Dato</strong></td>
      <td>Descripción</td>
    </tr>
  </tbody>
</table>
```

### 5. Tono y Pedagogía
- Escrito en 2ª persona para el alumno: **"Observa"**, **"Prueba"**, **"Crea"**, **"Compara"**, **"Comprueba"**.
- Cero notas para el docente ("explica al grupo", "muestra", "agenda").
- Incluye analogías cotidianas y actividades prácticas con resultado verificable ("Modo Ninja", retos en vivo).

### 6. Iconos
```mdx
import { Icon } from "astro-icon/components";

## 1. Concepto <Icon name="lucide:cpu" class="inline w-6 h-6 align-text-bottom text-sky-600" />
```

## Skills Disponibles
- `skills/crear-clase/SKILL.md`: Guía exhaustiva, checklist y plantilla de clase.
- `skills/stop-slop/SKILL.md`: Reglas de estilo para evitar prosa artificial de IA.
