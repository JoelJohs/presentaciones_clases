# Diseño Técnico: Ajustes a la Plataforma de Estudios

Este documento detalla la especificación de diseño para incorporar la nueva identidad visual, el visor de proyección (sidebar colapsable y tipografía ampliada) y el sistema de liberación programada semanal de lecciones.

---

## 1. Identidad Visual y Paleta de Colores

Se actualizará la paleta de colores del sitio para cumplir con los estándares corporativos/educativos proporcionados:

### A. Paleta de Colores (Claro)
*   **Fondo de lectura principal:** `#FFFFFF` (Blanco)
*   **Fondo de secciones secundarias / Sidebar:** `#F5F7FA` (Gris Humo)
*   **Texto principal:** `#2D3748` (Gris Pizarra)
*   **Títulos principales (H1):** `#0D1B3E` (Azul Navy Profundo)
*   **Subtítulos (H2) y Enlaces:** `#1A5FA8` (Azul Institucional)
*   **Botones y elementos activos:** `#1565C0` (Azul Acento)
*   **Fondo de Notas (Alertas):** `#DCE8F5` (Azul Cielo Suave) con borde izquierdo `#1A5FA8`
*   **Estados hover y focus:** `#E8F0FA` (Azul Lavado)
*   **Bordes y divisores:** `#CBD5E0` (Gris Borde)

### B. Paleta de Colores (Oscuro)
Para mantener un contraste y legibilidad óptimos en entornos oscuros:
*   **Fondo de lectura principal:** `#0B0F19` (Gris Azulado muy oscuro)
*   **Fondo del Sidebar:** `#0D1B3E` (Azul Navy Profundo)
*   **Texto principal:** `#E2E8F0` (Gris claro)
*   **Títulos:** `#FFFFFF`
*   **Subtítulos y Enlaces:** `#60A5FA` (Azul claro)
*   **Fondo de Notas (Alertas):** `#1E293B` con borde izquierdo `#60A5FA`
*   **Bordes:** `#1E293B`

---

## 2. Visor de Proyección (UX/UI)

### A. Sidebar Colapsable en Escritorio
*   **Botón de alternancia:** Se agregará un botón con un ícono representativo (como una barra lateral o unas flechas de expandir/contraer) en la cabecera (`Header.astro`).
*   **Funcionamiento:**
    *   Al hacer clic, alternará una clase `sidebar-collapsed` en la etiqueta `<body>` o en el contenedor general del layout.
    *   Cuando esté colapsado, el Sidebar se ocultará (`-translate-x-full`) y el contenedor principal eliminará su margen izquierdo (`lg:pl-0`).
    *   Este estado se mantendrá persistente en la sesión del navegador para que no se reinicie al cambiar de lección.

### B. Tipografía Ampliada para Lectura y Proyección
*   El tamaño de la tipografía dentro del contenedor `.prose` se ajustará para que sea cómodo de ver en pantallas grandes y proyectores:
    *   Texto base: `text-lg` (aprox. 18px) en móviles/laptops y `xl:text-xl` (aprox. 20px) en resoluciones superiores.
    *   Line-height: `leading-relaxed` (1.75) para evitar fatiga visual.
    *   Ancho máximo del artículo: `max-w-3xl` (aprox. 72 caracteres por línea).

---

## 3. Calendario de Liberación Semanal (56 Semanas)

### A. Lógica de Fechas
*   **Fecha de Inicio (Clase 1 / Semana 1):** `2026-06-20T00:00:00-06:00`.
*   **Lanzamientos subsiguientes:** Cada semana se liberará una nueva clase.
    *   Lección física de Módulo `i` (indexada desde 0) se libera en: `FechaInicio + (i * 7 días)`.
*   **Páginas siempre visibles:** Los archivos en `src/content/lecciones/00-inicio/` (Presentación, Plan de Estudio, Introducción) no tienen restricciones y están siempre visibles.

### B. Filtrado en Producción frente a Modo Profesor
*   **Fórmula de filtrado:** `fechaActual >= fechaLiberacion`.
*   **Bypass de desarrollo:** Si el proyecto está corriendo en modo desarrollo (`npm run dev`) o si se define la variable de entorno `SHOW_ALL_LESSONS=true`, el filtro se desactiva por completo para permitir que el profesor previsualice todo el temario.
*   **Implementación:**
    *   El enrutador dinámico (`src/pages/[...slug].astro`) no generará las rutas estáticas de las páginas futuras en producción.
    *   El generador de menú lateral (`src/utils/navigation.ts`) filtrará y excluirá los enlaces de las lecciones futuras del temario visible en producción.
