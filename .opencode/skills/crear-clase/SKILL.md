---
name: crear-clase
description: Guía, plantilla y reglas obligatorias para crear nuevas clases, lecciones y presentaciones interactivas en formato MDX. Úsalo siempre al preparar, redactar o modificar clases en esta plataforma.
metadata:
  trigger: Crear lección, preparar clase, redactar contenido mdx, generar diapositivas, agregar módulo o tema
---

# Skill: Creación de Clases y Presentaciones Interactivas

Esta skill define el estándar obligatorio y la metodología pedagógica para crear o modificar lecciones en la plataforma interactiva de presentaciones.

---

## 1. Reglas Fundamentales y Filosofía

1. **Dirigido 100% al estudiante:**
   - La lección es la guía de estudio y presentación interactiva que consulta el alumno antes, durante y después de clase.
   - Usa verbos en imperativo directo de 2ª persona: **"Observa"**, **"Prueba"**, **"Crea"**, **"Compara"**, **"Comprueba"**, **"Abre"**, **"Presiona"**.
   - **PROHIBIDO:** Notas o instrucciones para el profesor ("muestra al grupo", "explica a los alumnos", "pregunta al salón", "agenda de la sesión", "propósito de la clase").
   - El contenido debe ser autosuficiente: el alumno debe poder entender la teoría y realizar la práctica sin depender exclusivamente de una explicación oral.

2. **Estructura para el Modo Diapositivas:**
   - `# Título Principal`: Se usa **únicamente una vez** al inicio del documento.
   - `##`: Delimita **cada diapositiva individual**. Cada `##` debe representar una sola idea, explicación con analogía, demostración, atajo/tabla o reto práctico.
   - `---`: Inserta separadores horizontales entre diapositivas (`##`).
   - `###` y `####`: Se usan **solo para subsecciones dentro de una diapositiva**, jamás para dividir diapositivas.

3. **Tablas estrictamente en HTML:**
   - **PROHIBIDO** usar tablas Markdown de barras (`| Col 1 | Col 2 |`).
   - **OBLIGATORIO** usar sintaxis HTML con `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`.
   - No añadir clases CSS personalizadas; los estilos responsivos de Tailwind/Astro `.prose table` se aplican automáticamente.

4. **Uso de Iconos (`astro-icon`):**
   - Siempre importar el componente arriba: `import { Icon } from "astro-icon/components";`
   - Integrar iconos en los encabezados `##` y en listas usando colecciones `lucide:` o `simple-icons:` con clases Tailwind:
     ```html
     <Icon name="lucide:cpu" class="inline w-5 h-5 align-text-bottom text-sky-600" />
     <Icon name="simple-icons:windows" class="inline w-5 h-5 align-text-bottom text-blue-600" />
     ```

5. **Analogías Visuales y Tangibles:**
   - Todo concepto abstracto debe explicarse con una analogía del mundo real (ejemplo: CPU = Chef, RAM = Mesa de trabajo, Disco Duro = Mochila/Alacena).

---

## 2. Estructura de Carpetas y Nomenclatura

Los archivos deben crearse dentro de `src/content/lecciones/`:

```text
src/content/lecciones/
  └── [00-99]-[nombre-modulo]/
       └── [00-99]-[nombre-tema]/
            └── [00-99]-[nombre-clase]/
                 ├── index.mdx       <- Lección principal
                 └── repaso.mdx      <- (Opcional) Actividades de repaso
```

### Reglas de nombres físicos:
- Prefijos numéricos de dos dígitos (`01-`, `02-`, etc.) para controlar el orden en el menú.
- Solo letras minúsculas (`a-z`), números (`0-9`) y guiones medios (`-`).
- **NUNCA** usar espacios, mayúsculas, acentos (`á, é, í, ó, ú`) ni `ñ` en nombres de carpetas o archivos.

---

## 3. Frontmatter Obligatorio

Cada archivo `.mdx` debe comenzar con los metadatos delimitados por `---`:

```yaml
---
title: "Título Claro de la Lección"
moduleTitle: "N - Nombre Completo del Módulo"
topicTitle: "Tema N: Nombre del Tema"
subtopicTitle: "Subtema o Título Corto"
fecha: "DD-MM-YYYY"
description: "Descripción atractiva y concisa (1-2 oraciones) de lo que el estudiante aprenderá y creará."
duration: 45
objectives:
  - "Verbo en infinitivo + concepto 1"
  - "Verbo en infinitivo + concepto 2"
  - "Verbo en infinitivo + habilidad práctica"
---
```

---

## 4. Estructura Pedagógica de la Clase (Paso a Paso)

Una clase estándar debe organizarse con las siguientes diapositivas (`##`):

1. **Portada / Cabecera:**
   - `# Título de la Lección`
   - Imagen representativa o diagrama conceptual: `![Descripción](@assets/images/.../portada.jpg)`
2. **Concepto 1 (Explicación + Analogía):**
   - `## 1. ¿Qué es [Concepto]? <Icon name="..." ... />`
   - Explicación breve, analogía cotidiana, viñetas con iconos y cita destacada `>`.
3. **Concepto 2 (Contraste o Complemento):**
   - `## 2. ¿Qué es [Concepto Relacionado]? <Icon name="..." ... />`
   - Diferencias clave, clasificaciones y ejemplos reales.
4. **Primera Práctica Guiada (Descubrimiento en vivo):**
   - `## <Icon name="lucide:wrench" ... /> Actividad Práctica: "[Nombre Atractivo]"`
   - Pasos numerados rápidos para comprobar la teoría en el equipo (ej. Administrador de Tareas, inspección).
5. **Profundización / Evolución / Detalle Técnico:**
   - `## 3. [Concepto Central / Sistema / Reglas] <Icon name="..." ... />`
   - Explicación detallada con ejemplos prácticos.
6. **Hoja de Trucos / Tabla Comparativa:**
   - `## <Icon name="lucide:table" ... /> Hoja de Trucos: [Atajos / Extensiones / Comandos]`
   - Tabla HTML `<table>` de 2 a 4 columnas con datos concretos.
7. **Reto Práctico Individual ("Modo Ninja" o Misión):**
   - `## <Icon name="lucide:wand-2" ... /> Actividad Práctica: "[Misión / Reto]"`
   - Reto con objetivo claro y resultado verificable por el propio estudiante.
8. **Alertas de Errores Comunes / Advertencias:**
   - Uso de `> [!IMPORTANT]` o `> [!WARNING]` para evitar equivocaciones habituales.

---

## 5. Plantilla Base MDX

Consulta [references/plantilla.mdx](references/plantilla.mdx) para la plantilla lista para copiar.

---

## 6. Lista de Verificación (Checklist) antes de Terminar

- [ ] ¿El archivo está en `src/content/lecciones/` con formato `index.mdx` y nombres en minúsculas sin acentos?
- [ ] ¿El `frontmatter` contiene `title`, `moduleTitle`, `topicTitle`, `description`, `duration` y `objectives`?
- [ ] ¿Se importó `Icon` de `astro-icon/components`?
- [ ] ¿Se usa `#` únicamente en el título superior?
- [ ] ¿Cada diapositiva empieza con `##` y están separadas por `---`?
- [ ] ¿Todas las tablas están escritas en HTML (`<table>...</table>`) y NO con pipes de Markdown?
- [ ] ¿La redacción está dirigida al estudiante en segunda persona ("Observa", "Prueba", "Crea")?
- [ ] ¿Se eliminaron notas para el profesor ("muestra al grupo", "agenda", "objetivos de sesión")?
- [ ] ¿Incluye al menos una analogía clara y una actividad práctica verificable?
- [ ] ¿Pasan los tests con `npm test`?
