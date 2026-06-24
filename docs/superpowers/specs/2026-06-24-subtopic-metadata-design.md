# Especificación de Diseño: Introducción de Metadatos de Subtema (subtopicTitle) en MDX

Este documento detalla la especificación para agregar el campo `subtopicTitle` (Subtema) en la metadata (frontmatter) de los archivos MDX en la plataforma de presentaciones. Esto permitirá agrupar y organizar las lecciones de forma coherente con la jerarquía existente (Módulo > Tema > Subtema).

---

## 1. Motivación y Contexto

Actualmente, las lecciones se definen usando los campos de frontmatter:
*   `moduleTitle` (Módulo)
*   `topicTitle` (Tema)
*   `title` (Título específico del archivo/lección, ej. "Hardware y Software" o "Repaso: Hardware y Software")

Sin embargo, no existe un campo explícito para designar el **Subtema** al que pertenecen las lecciones. Cuando se subdividen lecciones en múltiples archivos (como la teoría en `index.mdx` y el repaso en `repaso.mdx`), ambos pertenecen al mismo Subtema ("Hardware y Software"), pero tienen títulos diferentes. Agregar la propiedad `subtopicTitle` proporciona un metadato unificado para agrupar y contextualizar estos archivos.

---

## 2. Cambios de Arquitectura y Configuración

### 2.1 Esquema de Contenido (`src/content.config.ts`)

Actualizaremos el esquema Zod en `src/content.config.ts` para incluir la propiedad opcional `subtopicTitle`:

```typescript
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
```

---

## 3. Reglas de Mapeo de Metadatos para Archivos Existentes

Para actualizar de forma segura y correcta los archivos MDX existentes sin modificar su contenido didáctico, se aplicarán las siguientes reglas:

1.  **Páginas Especiales / Iniciales (en `00-inicio/`)**:
    *   No tienen `moduleTitle` ni `topicTitle`.
    *   No se les agregará `subtopicTitle`.
2.  **Archivos Agrupados en Directorios de Subtema (ej. `01-hardware-y-software/`)**:
    *   Los archivos `index.mdx` y `repaso.mdx` compartirán el mismo `subtopicTitle` correspondiente al subtema general (ej. `"Hardware y Software"`).
3.  **Archivos Standalone (individuales)**:
    *   El `subtopicTitle` será igual al título de la lección (`title`), omitiendo detalles de "Parte 1", "Parte 2", etc., si es necesario, o coincidiendo exactamente para mantener la consistencia. Por simplicidad e integridad, por defecto el `subtopicTitle` heredará el `title` limpio.

### Ejemplo de Bloque Frontmatter Final (`index.mdx`):
```yaml
---
title: "Hardware y Software"
moduleTitle: "Módulo 1: Fundamentos y Mantenimiento"
topicTitle: "Tema 1: Introducción a la Informática"
subtopicTitle: "Hardware y Software"
fecha: "20-06-2026"
---
```

### Ejemplo de Bloque Frontmatter Final (`repaso.mdx`):
```yaml
---
title: "Repaso: Hardware y Software"
moduleTitle: "Módulo 1: Fundamentos y Mantenimiento"
topicTitle: "Tema 1: Introducción a la Informática"
subtopicTitle: "Hardware y Software"
fecha: "20-06-2026"
---
```

---

## 4. Estrategia de Implementación Automatizada

Dado que existen más de 60 archivos MDX, realizaremos la inyección mediante un script temporal en Python u Node.js (`src/utils/add-subtopic-metadata.js` o similar) que:
1. Lea cada archivo en `src/content/lecciones/`.
2. Omita los archivos en `00-inicio/`.
3. Analice el frontmatter de YAML.
4. Deduzca el `subtopicTitle` de la siguiente manera:
    * Si el archivo se encuentra en una carpeta que contiene un `index.mdx` (como `01-hardware-y-software/repaso.mdx`), lee el `title` de ese `index.mdx` y lo usa como `subtopicTitle`.
    * Si es un archivo standalone, usa su propio `title` como `subtopicTitle` (removiendo partes como ` (Parte 1)` o ` - Parte 1` si se quiere agrupar, aunque por consistencia con el título principal es seguro usar el `title` base).
5. Inserte la clave `subtopicTitle` después de `topicTitle` (o al final del frontmatter) de forma limpia.
6. Valide la compilación mediante `npm run build` y ejecute los tests con `npm test`.

---

## 5. Criterios de Aceptación y Validación
*   Todos los archivos en `src/content/lecciones/` (excepto `00-inicio/*`) deben incluir la propiedad `subtopicTitle` en su frontmatter.
*   El esquema en `src/content.config.ts` debe validar correctamente los nuevos campos.
*   `npm run build` debe completarse con éxito sin errores de validación de colecciones de contenido.
*   `npm test` debe ejecutarse y pasar correctamente.
