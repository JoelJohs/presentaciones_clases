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

### 3.1 Estructura para el modo Diapositivas

El modo **Diapositivas** divide cada lección por encabezados `##`. Esta regla es obligatoria para que el contenido se muestre correctamente al avanzar con las flechas:

- `#` se usa una sola vez para el título principal de la lección.
- `##` marca cada bloque que debe funcionar como una diapositiva.
- `###` y `####` no deben usarse para separar diapositivas; se reservan para texto secundario dentro del bloque actual.
- Cada `##` debe contener una sola idea, explicación, demostración, actividad o cierre.
- No acumules una explicación completa, una tabla y una actividad dentro del mismo `##` si deben presentarse por separado.

Ejemplo recomendado:

```mdx
# Hardware y Software

## 1. ¿Qué es Hardware?

Explicación breve y ejemplo.

## 2. ¿Qué es Software?

Explicación breve y ejemplo.

## 3. Actividad práctica

Pasos y resultado que debe producir el estudiante.
```

La estructura de las clases más completas del módulo 1 sirve como referencia: cada sección principal inicia con `##`, combina explicación con un ejemplo concreto y termina antes de comenzar el siguiente bloque.

### 3.2 Tablas

Las tablas de las lecciones deben escribirse con HTML, no con la sintaxis Markdown de barras verticales. El estilo visual y el comportamiento responsive de la plataforma ya están preparados para elementos `<table>`:

```html
<table>
  <thead>
    <tr>
      <th>Concepto</th>
      <th>Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Ejemplo</strong></td>
      <td>Información concreta y fácil de comparar.</td>
    </tr>
  </tbody>
</table>
```

Usa `<thead>` para los encabezados y `<tbody>` para los datos. No agregues clases nuevas a cada tabla: el estilo compartido de `.prose table`, `.prose th` y `.prose td` se aplica automáticamente.

### 3.3 Contenido de una clase

Cada clase debe priorizar el contenido que se utilizará durante la sesión:

1. Explicación directa del concepto.
2. Ejemplo que pueda mostrarse o reproducirse.
3. Procedimiento paso a paso.
4. Actividad con producto o resultado verificable.
5. Errores comunes y cierre.

No agregues secciones genéricas como “Propósito de la clase”, “Resultados de aprendizaje” o “Agenda de la sesión” si no son necesarias para impartir esa clase. Los objetivos pueden conservarse en el `frontmatter` para los metadatos internos.

### 3.4 La página está dirigida al estudiante

La lección publicada es la presentación web que consulta el estudiante antes, durante y después de la práctica. Escribe directamente para él o ella:

- Usa instrucciones como **“Observa”**, **“Prueba”**, **“Crea”**, **“Compara”** y **“Comprueba”**.
- Explica el concepto y el procedimiento en la misma página para que pueda estudiar sin depender de una explicación oral.
- Incluye ejemplos completos, datos concretos, pasos reproducibles y un resultado que pueda verificar.
- Evita frases dirigidas a quien imparte la clase: “muestra”, “demuestra”, “aclara”, “pregunta al grupo”, “advierte” o “explica al grupo”.
- No agregues notas privadas, instrucciones para el docente ni recordatorios de lo que debe decir durante la clase.
- Las etiquetas “Ejemplo” y “Comprueba” sí son útiles porque ayudan al estudiante a distinguir una demostración de una verificación.

---

## 4. Agregar Imágenes y Recursos

Para incluir imágenes, esquemas o diagramas en tus lecciones, tienes dos opciones:

### Opción A: Usando la carpeta `public/` (Recomendado por simplicidad)
Cualquier archivo colocado dentro de `public/` se sirve de manera directa desde la raíz del sitio web.

1. Guarda la imagen en la siguiente ruta (crea carpetas si no existen):
   `public/images/lecciones/[nombre-del-modulo]/[nombre-del-tema]/imagen.png`
2. En tu archivo `.mdx`, haz referencia con una ruta absoluta:
   ```markdown
   ![Texto alternativo](/images/lecciones/01-fundamentos-mantenimiento/01-introduccion-computacion/imagen.png)
   ```

### Opción B: Usando el alias `@assets/` (Recomendado con optimización automática)
Astro procesará y optimizará las imágenes automáticamente. Para evitar escribir rutas relativas largas como `../../../../`, puedes usar el alias `@assets` (que apunta directamente a la carpeta `src/assets/`).

1. Guarda la imagen en la siguiente ruta:
   `src/assets/images/lecciones/[nombre-del-modulo]/[nombre-del-tema]/imagen.png`
2. En tu archivo `.mdx`, haz referencia usando el alias:
   ```markdown
   ![Texto alternativo](@assets/images/lecciones/01-fundamentos-mantenimiento/01-introduccion-computacion/imagen.png)
   ```

---

## 5. Publicar Cambios

Una vez que guardes tu nuevo archivo `.mdx` en la carpeta correspondiente:
1. Sube tus cambios a GitHub (`git add .`, `git commit -m "Lección agregada"`, `git push`).
2. Vercel detectará los cambios automáticamente y reconstruirá el sitio web en menos de 1 minuto, actualizando el menú y las páginas al instante.
