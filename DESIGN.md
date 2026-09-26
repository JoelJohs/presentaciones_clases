---
name: Plataforma de Estudios y Presentación de Clases
description: Sistema de diseño técnico y educativo dual para laboratorio y proyección
colors:
  primary: "#0868A8"
  primary-hover: "#075886"
  navy: "#0E2A44"
  accent: "#E8A800"
  amber-bright: "#F8C808"
  surface: "#F3F8FC"
  surface-elevated: "#FFFFFF"
  surface-muted: "#E9F0F7"
  border-subtle: "#D8E4EE"
  border-strong: "#B7CBDA"
  text-main: "#12293E"
  text-muted: "#5B6B7C"
  text-inverse: "#FFFFFF"
  success: "#107C41"
  success-hover: "#0D6334"
typography:
  display:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "2.5rem"
    fontWeight: 800
    lineHeight: 1.2
  headline:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "2.0rem"
    fontWeight: 700
    lineHeight: 1.25
  title:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    letterSpacing: "0.06em"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-inverse}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-download:
    backgroundColor: "{colors.success}"
    textColor: "{colors.text-inverse}"
    rounded: "{rounded.lg}"
    padding: "12px 22px"
  card-elevated:
    backgroundColor: "{colors.surface-elevated}"
    rounded: "{rounded.xl}"
    padding: "20px 24px"
  badge-tag:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: "3px 8px"
---

# Design System: Plataforma de Estudios y Presentación de Clases

## Overview

**Creative North Star: "El Manual de Taller Digital"**

Este sistema de diseño fue concebido para eliminar la fricción entre la explicación técnica proyectada en un aula de cómputo y el autoestudio individual frente al monitor. Inspirado en la precisión de los manuales de ingeniería y guías de taller práctico, la interfaz prioriza el contenido técnico, la jerarquía limpia y la legibilidad inmediata sobre cualquier adorno decorativo. Cada componente visual existe para facilitar la comprensión de conceptos y la ejecución de comandos.

Rechaza categóricamente la estética de los "LMS corporativos obsoletos" (estructuras sobrecargadas, paneles densos de menús laberínticos) y las distracciones de gamificación infantil (confeti, animaciones innecesarias, recompensas ruidosas). En su lugar, proyecta una atmósfera de concentración profesional: fondos pulcros color hielo, tipografía técnica de alto contraste, acentos de color deliberados vinculados a la identidad CPI y micro-interacciones ágiles que responden al instante.

**Key Characteristics:**
- **Dualidad de Escala Dinámica**: Tamaño estándar y compacto para lectura personal frente al monitor, y escala ampliada de alto impacto para proyección en proyector de laboratorio.
- **Jerarquía Tonal Estructurada**: Superficies diferenciadas por tono y bordes nítidos de 1px en lugar de sombras pesadas o elevaciones falsas.
- **Enfoque Técnico Funcional**: Bloques de código con marcado semántico, tablas HTML nítidas y retos prácticos destacados como puntos focales.
- **Eficiencia y Calma Visual**: Fondos hielo azulado (#F3F8FC) que reducen la fatiga visual frente a pantallas durante sesiones intensivas de laboratorio.

## Colors

La paleta cromática se ancla en los colores institucionales de CPI: un azul técnico balanceado (#0868A8) complementado por el contraste sobrio del azul naval (#0E2A44) y acentos ámbar (#E8A800 / #F8C808).

### Primary
- **Azul Técnico CPI** (`#0868A8` / Dark: `#3FA2E8`): Identidad principal, botones de acción primaria, enlaces activos, bordes de enfoque y barras de llamado editorial.
- **Navy Naval Profundo** (`#0E2A44` / Dark: `#081725`): Fondo permanente de la barra lateral de navegación, encabezados H1 y texto de máxima jerarquía.

### Secondary
- **Ámbar Acento** (`#E8A800` / `#8F5D00` en texto claro / Dark: `#FFB300`): Indicadores de advertencia, estados pendientes, acento de interacción hover en enlaces y elementos secundarios.
- **Ámbar Logo Brillante** (`#F8C808` / Dark: `#FFC81A`): Detalle del logo CPI e indicadores sobre fondos oscuros naval.

### Tertiary
- **Verde Descarga / Práctico** (`#107C41` / Hover: `#0D6334` / Dark: `#059669`): Botones de recursos descargables, estados completados y retos resueltos con éxito.

### Neutral
- **Superficie Hielo** (`#F3F8FC` / Dark: `#0B1620`): Fondo general de la aplicación y lectura.
- **Superficie Elevada** (`#FFFFFF` / Dark: `#16283A`): Tarjetas de contenido, modales y bloques de interactividad.
- **Superficie Secundaria Muted** (`#E9F0F7` / Dark: `#101E2B`): Fondos de botones secundarios, tags y áreas agrupadas.
- **Borde Sutil** (`#D8E4EE` / Dark: `#1E3346`): Separador de 1px entre paneles, tarjetas y filas de tablas.
- **Borde Fuerte** (`#B7CBDA` / Dark: `#33506A`): Bordes de contenedores activos o con foco.
- **Texto Principal** (`#12293E` / Dark: `#E7EEF4`): Texto base de alta legibilidad técnica.
- **Texto Atenuado** (`#5B6B7C` / Dark: `#A8BCCB`): Metadatos, etiquetas secundarias y descripciones cortas.

### Named Rules
**The High-Contrast Legibility Rule.** Ningún texto de contenido ni bloque de código puede quedar por debajo del ratio WCAG AA (4.5:1). En proyector, los títulos y comandos deben ser legibles desde el fondo del laboratorio sin forzar la vista.

## Typography

**Display Font:** `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
**Body Font:** `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
**Mono Font:** `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace`

**Character:** Tipografía de sistema neutral, ágil y de renderizado instantáneo sin cargas externas de fuentes que provoquen parpadeos (FOUC). Rigurosa en la prosa y técnica en los fragmentos de código.

### Hierarchy
- **Display / H1** (800 weight, `2.5rem` [40px] en lectura / `2.875rem` [46px] en presentación, line-height 1.2): Título único de lección. Color Azul Navy.
- **Headline / H2** (700 weight, `2.0rem` [32px] en lectura / `2.25rem` [36px] en presentación, line-height 1.25): Delimitador de diapositiva o sección temática. Color Azul Técnico.
- **Title / H3** (600 weight, `1.5rem` [24px] en lectura / `1.75rem` [28px] en presentación, line-height 1.3): Subsección o reto interno dentro de una diapositiva.
- **Body** (400 weight, `1.125rem` [18px] en lectura / `1.375rem` [22px] en presentación, line-height 1.8, max-width 75ch): Prosa pedagógica imperativa para el estudiante.
- **Label / Tag** (700-800 weight, `0.72rem - 0.75rem`, letter-spacing 0.06em - 0.1em, uppercase): Etiquetas de módulos, pasos numerados y badges de estado.
- **Code Inline** (monospace, `0.85em`, padding `2px 6px`, radius 4px): Comandos, atajos de teclado y rutas.

### Named Rules
**The Dual-Scale Projection Rule.** En Modo Presentación (`.presentation-mode`), el cuerpo del texto escala obligatoriamente a 22px y los títulos a 46px para garantizar visibilidad nítida en proyectores de baja resolución o iluminación ambiental difusa.

## Layout

- **Modelo Espacial**: Barra lateral fija (`w-72` / 288px) con navegación jerárquica de módulos y temas; cabecera fija superior (`h-14` / 56px) con conmutador de modos, alternador de tema claro/oscuro y estado de sesión.
- **Área de Contenido Principal**: Contenedor fluido con restricción tipográfica a `75ch` en prosa para evitar fatiga ocular.
- **Comportamiento en Móvil**: Barra lateral colapsable mediante menú tipo cajón lateral; el modo de lectura vertical fluido es el único activo (sin modo diapositivas en pantallas táctiles pequeñas).
- **Modo Presentación (Escritorio)**: `scroll-snap-type: y proximity` por cada encabezado `##`, expandiendo el ancho del contenedor al 100% y anclando el muelle de controles de diapositiva al borde inferior centrado.

## Elevation & Depth

La interfaz adopta una filosofía **tonal y estructurada**: la jerarquía se establece mediante el contraste entre la superficie hielo (#F3F8FC), las tarjetas blancas puras (#FFFFFF) y el panel oscuro naval (#0E2A44), delimitados por bordes precisos de 1px.

### Shadow Vocabulary
- **Sombra Ambiental Base** (`box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03)`): Aplicada en tarjetas de recursos y contenedores interactivos en reposo.
- **Elevación de Interacción** (`box-shadow: 0 4px 16px rgba(13, 148, 136, 0.10)` / `transform: translateY(-2px)`): Aplicada durante el hover en tarjetas de navegación, lecciones y botones destacados.
- **Muelle Flotante de Presentación** (`box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25)`): Aplicada en la barra de controles de diapositivas (`SlideControls`) con fondo `rgba(28, 25, 23, 0.90)` y desenfoque `backdrop-blur-md`.

### Named Rules
**The Rest-Is-Flat Rule.** En estado de reposo las superficies son predominantemente planas con bordes de 1px. La elevación tridimensional y sombras se reservan exclusivamente para indicar interactividad (hover) o elementos flotantes de control global.

## Shapes

- **Esquinas Redondeadas**:
  - `4px` (rounded-sm): Badges de código inline, tags pequeños y píldoras de atajos de teclado.
  - `8px` (rounded-md / rounded-lg): Botones de acción, acordeones `details`, contenedores de llamada editorial e ítems de navegación en la barra lateral.
  - `12px - 16px` (rounded-xl / rounded-2xl): Tarjetas de recursos descargables, tarjetas de cuestionario interactivo y muelle de controles de presentación.
  - `9999px` (rounded-full): Indicadores de progreso circular y viñetas de estado.
- **Bordes y Trazos**: Bordes limpios de 1px sólido (`--color-brand-border`), con línea de acento izquierda de 3px a 4px en citas y avisos editoriales (`.lesson-callout`, `blockquote`).

## Components

### Buttons
- **Shape**: Redondeo moderado de 8px (`rounded-lg`).
- **Primary**: Fondo Azul Técnico (`#0868A8`), texto blanco, padding `8px 16px`, font-weight 600.
- **Hover / Focus**: Oscurecimiento suave a `#075886`, micro-elevación `translateY(-1px)` y anillo de foco visible `outline: 2px solid var(--color-focus)`.
- **Download / Resource Button**: Fondo verde degradado (`linear-gradient(135deg, #107C41 0%, #059669 100%)`), texto blanco, padding `12px 22px`, radio 12px, con sombra `0 4px 14px rgba(16, 124, 65, 0.35)`.

### Mode Toggle (Scroll / Diapositivas)
- **Container**: Contenedor píldora de 4px de padding con borde sutil y fondo neutro suave (`bg-slate-100` / dark: `bg-brand-sidebar-bg`).
- **Buttons**: Botones con icono y etiqueta, radio de 8px. El modo activo recibe fondo blanco (#FFFFFF) en claro, texto azul técnico y sombra leve (`shadow-xs`).

### Cards / Containers
- **Download Card**: Tarjeta destacada con borde de 1px, icono de archivo en caja de 52x52px con fondo verde esmeralda degradado, título H3 en azul naval y botón de acción directa.
- **Challenge Card**: Contenedor de reto práctico con borde cian/teal de 1px, fondo degradado suave y checklist de verificación de habilidades del estudiante.
- **Interactive Quiz**: Tarjeta de preguntas interactivas con borde sutil, fondo elevado y botones de selección con retroalimentación inmediata.

### Navigation (Sidebar)
- **Barra Lateral**: Fondo Azul Naval Oscuro (`#0E2A44`), texto claro (`text-slate-100`), enlaces de navegación con padding `8px 12px` y redondeo de 8px.
- **Active Lesson Indicator**: Marcador vertical de 3px a la izquierda con color azul técnico y fondo con opacidad sutil (`bg-white/10`).

### Signature Component: SlideControls (Muelle de Presentación)
- **Descripción**: Muelle flotante centrado en la parte inferior de la pantalla durante el Modo Presentación.
- **Visual**: Fondo oscuro semitransparente (`bg-stone-900/90`), desenfoque `backdrop-blur-md`, borde `border-stone-700/60` y sombra 2XL. Contiene botón anterior, contador mono (`3 / 12`), botón siguiente y botón de pantalla completa (F).

## Do's and Don'ts

### Do:
- **Do** redactar todas las lecciones en 2ª persona imperativo dirigida directamente al estudiante ("Observa", "Prueba", "Crea", "Compara", "Comprueba").
- **Do** utilizar exclusivamente tablas semánticas en HTML estándar (`<table><thead>...</thead><tbody>...</tbody></table>`) dentro de contenedores con scroll horizontal adaptativo.
- **Do** verificar que las combinaciones de color en texto, bloques de código y llamadas editoriales cumplan con un ratio mínimo de contraste de 4.5:1 (WCAG AA).
- **Do** separar cada diapositiva con un encabezado `##` y una línea divisoria `---`.
- **Do** mantener el tiempo de respuesta de las micro-interacciones en 150-200ms con transiciones fluidas.

### Don't:
- **Don't** utilizar tablas de Markdown con barras pipes (`|---|`), ya que quiebran el formateo y la adaptabilidad móvil de la plataforma.
- **Don't** incluir notas, recordatorios ni instrucciones dirigidas al profesor ("agenda de la clase", "explica al grupo", "muestra en la pantalla").
- **Don't** introducir animaciones intrusivas, gamificación con confeti ni temporizadores estresantes que distraigan de la concentración en el laboratorio.
- **Don't** alterar la paleta hacia tonos fluorescentes o neón saturados que deslumbren en proyectores de aula.
- **Don't** calcular o ponderar la asistencia del alumno en ninguna tabla de notas (la asistencia tiene 0% de validez numérica).
