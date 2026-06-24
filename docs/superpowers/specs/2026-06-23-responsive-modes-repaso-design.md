# Especificación de Diseño: Responsividad Móvil, Modos de Fuente (Lectura/Presentación) y Sección de Repaso Didáctico

Este documento define la arquitectura, cambios de estilo y contenido para resolver las tres necesidades del temario:
1. **Responsividad Móvil**: Adaptar tablas e imágenes para que no desborden en pantallas pequeñas.
2. **Modos de Visualización en Desktop**: Alternar dinámicamente entre "Modo Lectura" (predeterminado) y "Modo Presentación" (fuente ampliada) en pantallas de escritorio, guardando la preferencia del usuario en `localStorage` y evitando parpadeos de estilo al cargar.
3. **Sección de Repaso Didáctico**: Agregar un bloque de preguntas interactivas tipo "Flashcards" al final del primer subtema (Hardware y Software) para alumnos de 12 a 17 años.

---

## 📱 1. Responsividad Móvil y Ajustes CSS

### Objetivos:
- Evitar que las tablas y elementos de mapa curricular desborden horizontalmente la pantalla del celular.
- Asegurar que las imágenes insertadas en los archivos Markdown tengan un ancho máximo del 100% del contenedor.

### Cambios a realizar en `src/styles/global.css`:
1. **Tablas**: Modificar `.prose table` para usar un contenedor con scroll horizontal cuando la tabla supere el ancho de pantalla móvil.
   ```css
   .prose table {
     display: block;
     width: 100%;
     overflow-x: auto;
     -webkit-overflow-scrolling: touch;
     border-collapse: collapse;
     margin-top: 1.5rem;
     margin-bottom: 1.5rem;
     font-size: 1rem;
     text-align: left;
   }
   ```
2. **Tablas de Mapa Curricular**: Aplicar comportamiento similar a `.plan-estudio-wrapper table`.
   ```css
   .plan-estudio-wrapper table {
     display: block !important;
     width: 100% !important;
     overflow-x: auto !important;
     -webkit-overflow-scrolling: touch !important;
   }
   ```
3. **Imágenes y Videos**: Garantizar escalado de imágenes y videos en Markdown:
   ```css
   .prose img,
   .prose video {
     max-width: 100%;
     height: auto;
     border-radius: 0.75rem;
     margin: 1.5rem auto;
     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
   }
   ```

---

## 💻 2. Modos de Visualización Desktop (Lectura vs. Presentación)

### Objetivos:
- Permitir al profesor alternar a "Modo Presentación" para proyectar la clase, y a los alumnos usar "Modo Lectura" para leer cómodamente en sus computadoras.
- El "Modo Lectura" debe ser el predeterminado para usuarios nuevos.

### Arquitectura de Estado:
- **Almacenamiento**: `localStorage` usando la clave `view-mode` con valores `'reading'` o `'presentation'`.
- **Clase en el DOM**: Añadir `.reading-mode` o `.presentation-mode` a `document.documentElement` (`html`).

### Componentes Involucrados:
1. **`src/layouts/Layout.astro`**:
   - Insertar script inline en el `<head>` para cargar la preferencia inmediatamente antes de renderizar la página:
     ```html
     <script is:inline>
       const viewMode = localStorage.getItem('view-mode') || 'reading';
       document.documentElement.classList.add(`${viewMode}-mode`);
     </script>
     ```
   - Modificar el bloque de scripts del final para enlazar los eventos de clic de los botones del Header y manejar el cambio de clases del DOM y de `localStorage`.
2. **`src/components/Header.astro`**:
   - Añadir el control segmentado (botones para Modo Lectura y Modo Presentación) visible solo en escritorio (`hidden lg:flex`).
3. **`src/styles/global.css`**:
   - Definir los tamaños de texto incrementados para `.presentation-mode` y reducidos para `.reading-mode` bajo la regla de medios desktop `@media (min-width: 1024px)`.

---

## ⚡ 3. Sección de Repaso Didáctico (Lección 1)

### Objetivos:
- Proporcionar un mini-examen verbal interactivo al final de la lección "Hardware y Software" (`01-hardware-y-software.mdx`).
- Lenguaje adaptado a adolescentes de 12 a 17 años (enfocado en analogías y gamificación).

### Contenido de Preguntas:
1. **Periféricos**: Identificar la pantalla táctil como periférico mixto.
2. **Motherboard / RAM vs. SSD**: Diferencia fundamental entre memoria de trabajo rápida y almacenamiento permanente mediante la analogía de "escritorio" vs "mochila".
3. **HDD vs. SSD**: Mecánico lento frente a microchips veloces y resistentes.
4. **Recursos de Software**: Cómo se comporta la computadora y el rendimiento de los juegos cuando se satura la RAM.
5. **Extensiones**: Cómo el sistema operativo determina qué hacer con un archivo según su tipo (ejecutar un `.exe` vs leer datos de un `.mp3`).

### Interacción y Estilos:
- Usaremos `<details>` y `<summary>` nativos con estilos personalizados en `global.css` para actuar como tarjetas reveladoras rápidas.
