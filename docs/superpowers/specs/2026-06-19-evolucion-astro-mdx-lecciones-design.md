# Diseño Técnico: Evolución de Plataforma Astro + MDX para Clases Dinámicas

Este documento detalla la especificación de diseño para la evolución del proyecto de Astro en una plataforma de contenido educativo minimalista y dinámica para alumnos de secundaria y adultos.

---

## 1. Arquitectura y Pila Tecnológica

La plataforma se construirá sobre una arquitectura de sitio estático (SSG) súper rápida, escalable y con un mantenimiento mínimo centrado exclusivamente en el contenido.

*   **Framework principal:** [Astro v6](https://astro.build) (generación estática).
*   **Gestión de Contenido:** [Astro MDX](https://docs.astro.build/en/guides/integrations-guide/mdx/) para redactar las lecciones como archivos de texto enriquecidos con elementos interactivos.
*   **Estilos:** [Tailwind CSS v4](https://tailwindcss.com) utilizando la nueva integración nativa de Vite sin archivo `tailwind.config.js` heredado.
*   **Interactividad:** JavaScript Nativo (Vanilla JS) para el menú lateral en móvil y el Modo Oscuro. Se evita el uso de React/Preact para reducir el peso de la página y simplificar el código.
*   **Aseguramiento de Tipado:** TypeScript para validar la estructura de los metadatos (Frontmatter) a través de las Colecciones de Contenido de Astro (Content Collections).

---

## 2. Estructura de Carpetas de Contenido

La plataforma organizará su temario utilizando la estructura física del sistema de archivos. Cada carpeta representará un Módulo o un Tema, y las lecciones individuales serán archivos `.mdx` con prefijo numérico para indicar el orden de visualización.

```text
src/content/lecciones/
  ├── 00-inicio/
  │    ├── 01-presentacion.mdx
  │    ├── 02-plan-de-estudio.mdx
  │    └── 03-introduccion.mdx
  ├── 01-modulo-fundamentos/
  │    ├── 01-conceptos/
  │    │    ├── 01-hardware-software.mdx
  │    │    └── 02-exploracion-so.mdx
  │    ├── 02-arquitectura/
  │    │    ├── 01-componentes-internos.mdx
  │    │    └── 02-ensamble-desensamble.mdx
  │    ├── 03-mantenimiento/
  │    │    ├── 01-limpieza-fisica.mdx
  │    │    └── 02-diagnostico-hardware.mdx
  │    └── 04-diagnostico-software/
  │         ├── 01-optimizacion-sistema.mdx
  │         └── 02-antivirus-respaldos.mdx
  ├── 02-modulo-ofimatica/
  │    ├── 01-procesador-textos/
  │    │    ├── 01-estructura-formato.mdx
  │    │    └── 02-elementos-atajos.mdx
  │    ├── 02-hojas-calculo/
  │    │    ├── 01-formulas-esenciales.mdx
  │    │    └── 02-formato-graficos.mdx
  │    └── 03-presentaciones-colaboracion/
  │         ├── 01-diseno-efectivo.mdx
  │         └── 02-herramientas-nube.mdx
  ├── 03-modulo-programacion/
  │    ├── 01-logica-algoritmia/
  │    │    ├── 01-algoritmos-diarios.mdx
  │    │    └── 02-diagramas-pseudocodigo.mdx
  │    ├── 02-sintaxis-python/
  │    │    ├── 01-variables-datos.mdx
  │    │    └── 02-operadores-io.mdx
  │    ├── 03-estructuras-control/
  │    │    ├── 01-condicionales.mdx
  │    │    └── 02-bucles-ciclos.mdx
  │    └── 04-modularidad-proyecto/
  │         ├── 01-funciones.mdx
  │         └── 02-proyecto-final.mdx
  ├── 04-modulo-multimedia/
  │    ├── 01-edicion-video/
  │    │    ├── 01-linea-tiempo-cortes.mdx
  │    │    └── 02-efectos-exportacion.mdx
  │    ├── 02-edicion-audio/
  │    │    ├── 01-grabacion-acustica.mdx
  │    │    └── 02-mezcla-multicanal.mdx
  │    └── 03-integracion-render/
  │         ├── 01-sincronizacion-av.mdx
  │         └── 02-proyecto-multimedia.mdx
  └── 05-modulo-redes-movil/
       ├── 01-redes-conexion/
       │    ├── 01-direcciones-ip.mdx
       │    └── 02-escritorio-remoto.mdx
       ├── 02-seguridad-vpn/
       │    ├── 01-huella-phishing.mdx
       │    └── 02-vpn.mdx
       └── 03-desarrollo-movil/
            ├── 01-interfaz-movil.mdx
            └── 02-bloques-sensores.mdx
```

---

## 3. Esquema de Validación del Frontmatter

Las lecciones se definirán como una colección de contenido en `src/content/config.ts`. El esquema validará los siguientes campos:

```typescript
import { defineCollection, z } from 'astro:content';

const lecciones = defineCollection({
  // No se especifica loader externo para usar el comportamiento clásico de lectura de archivos locales
  schema: z.object({
    title: z.string(), // Título de la lección
    moduleTitle: z.string().optional(), // Nombre del Módulo (ej. "Módulo 1: Fundamentos...")
    topicTitle: z.string().optional(), // Nombre del Tema (ej. "Tema 1: Conceptos...")
  }),
});

export const collections = { lecciones };
```

*Nota: Para las páginas iniciales (Presentación, Plan de estudio, Introducción), se omiten `moduleTitle` y `topicTitle` para que el sistema las coloque en la raíz del menú.*

---

## 4. Diseño Visual y UX (Minimalismo sin Cards)

Para lograr un diseño moderno adaptado a adolescentes y adultos sin el aspecto genérico de "cards", aplicaremos las siguientes pautas:

### A. Paleta de Colores y Modo Oscuro
*   **Modo Claro:**
    *   Fondo principal: `#F8FAFC` (Slate 50)
    *   Fondo de lectura (cuerpo del texto): `#FFFFFF`
    *   Texto principal: `#1E293B` (Slate 800)
    *   Bordes divisorios y guías: `#E2E8F0` (Slate 200)
    *   Color de Acento: `#4F46E5` (Índigo 600)
*   **Modo Oscuro:**
    *   Fondo principal: `#0F172A` (Slate 900)
    *   Fondo de lectura (cuerpo del texto): `#0B0F19` (o Slate 950)
    *   Texto principal: `#F1F5F9` (Slate 100)
    *   Bordes divisorios y guías: `#1E293B` (Slate 800)
    *   Color de Acento: `#818CF8` (Índigo 400)

### B. Elementos Tipográficos y Layout (Pantalla Dividida)
*   **Tipografías:**
    *   Títulos: *Outfit* (vía `@fontsource/outfit` o Google Fonts)
    *   Cuerpo del texto: *Inter* (vía `@fontsource/inter` o Google Fonts)
*   **Escritorio:**
    *   Barra lateral izquierda (Sidebar): Ancho fijo (`20rem` / `320px`), fondo ligeramente diferente al fondo de lectura, línea vertical derecha de separación de `1px`.
    *   Área de lectura central: Centrada con `max-w-3xl` (aproximadamente `768px`) y relleno generoso.
*   **Móvil:**
    *   La barra lateral está oculta por defecto. Un botón flotante ("Índice" o "Ver temario") abre un panel deslizable (drawer) desde la izquierda.
    *   El texto ocupa el 100% de la pantalla útil con tipografía ajustada en tamaño.

### C. Alternativa a los "Cards"
*   **Líneas y márgenes:** En lugar de envolver todo en cajas con sombras, los temas y subtemas fluyen verticalmente sobre el fondo liso. Las secciones del MDX se delimitan por espaciados generosos (`py-12`) y líneas divisorias horizontales tenues (`border-slate-200` / `border-slate-800`).
*   **Citas y Notas Destacadas (Alertas):**
    Un bloque con un borde izquierdo grueso y un fondo sutilmente tintado, sin bordes en los otros lados:
    ```html
    <div class="border-l-4 border-indigo-600 bg-indigo-50/30 dark:bg-indigo-950/20 px-6 py-4 my-6">
      ... contenido ...
    </div>
    ```
*   **Navegación entre lecciones:** Al final de la lección, habrá dos botones planos grandes (Anterior y Siguiente) que abarcan el ancho disponible o se alinean lado a lado, con bordes outline finos (`border border-slate-300 dark:border-slate-700`) y con texto visible de la lección a la que se avanza. Altura mínima de clic: `52px` para mayor ergonomía móvil.

---

## 5. Lógica del Menú de Navegación y Enrutamiento

### A. Rutas Dinámicas
Usaremos `src/pages/[...slug].astro` para capturar todos los archivos de la colección `lecciones` y renderizarlos dinámicamente.

### B. Algoritmo de Generación de la Estructura del Menú
El archivo `src/utils/navigation.ts` leerá las entradas de la colección y las agrupará basándose en su ruta física de archivo (la propiedad `id` de Astro) y su Frontmatter:
1.  Ordenará todas las lecciones alfabéticamente según su ruta de archivo (por ejemplo, `00-inicio/01-presentacion.mdx` precede a `01-modulo-fundamentos/...`).
2.  Agrupará las lecciones por Módulos (detectados por `moduleTitle`).
3.  Dentro de cada Módulo, agrupará por Temas (detectados por `topicTitle`).
4.  Cada entrada mantendrá su referencia al `slug` para generar los enlaces correctos en el menú.

---

## 6. Interactividad con Vanilla JS
*   **Menú Móvil:** Un botón en la cabecera móvil alternará una clase `translate-x-0` / `-translate-x-full` en el Sidebar para mostrarlo u ocultarlo.
*   **Modo Oscuro:** Un botón en el header cambiará la clase `dark` en la etiqueta `<html>` y guardará la preferencia del usuario en `localStorage` mediante un script en línea en el `<head>` para evitar parpadeos de color durante la carga del sitio.
