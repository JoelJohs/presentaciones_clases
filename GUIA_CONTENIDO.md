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
