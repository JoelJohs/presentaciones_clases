# Diseño Técnico: Expansión de S.O. (Linux), Evolución de Interfaces y Estilos de Tablas

Este documento detalla la especificación de diseño para expandir la información de sistemas operativos (enfoque en Linux), relatar la evolución histórica de las interfaces (de terminal a ratón) y corregir/embellecer los estilos de tablas de forma global en la plataforma.

---

## 1. Expansión de la Sección de Sistemas Operativos (Lección 1)

En la sección `## 3. El Sistema Operativo (S.O.) 🧠` de [01-hardware-y-software.mdx](file:///home/jojo/Proyectos/clases/presentaciones/src/content/lecciones/01-fundamentos-mantenimiento/01-introduccion-informatica/01-hardware-y-software.mdx), se realizarán las siguientes adiciones y reestructuraciones para facilitar la explicación docente:

### A. Concepto de Distribuciones (Sabores)
*   Explicar de forma directa y conceptual que Linux no es un sistema único, sino un "núcleo" a partir del cual se crean diferentes versiones llamadas **Distribuciones (Distros)** o "sabores", adaptadas a distintos usuarios.
*   **Imagen representativa:** Insertar la imagen `@assets/images/lecciones/01-fundamentos-mantenimiento/01-introduccion-informatica/distros_linux.png` con la descripción *"Esquema de las principales distribuciones de Linux"*.

### B. La Libertad de Personalización
*   Describir cómo, a diferencia de Windows o macOS, Linux otorga control absoluto sobre el aspecto visual del escritorio, los paneles y el consumo de recursos.
*   **Imágenes demostrativas:** Insertar de manera secuencial los tres ejemplos provistos con descripciones académicas:
    1.  `linux_extra_1.jpg`: *"Ejemplo 1: Escritorio minimalista personalizado (basado en Arch Linux)"*
    2.  `linux_extra_2.jpg`: *"Ejemplo 2: Interfaz avanzada con widgets multimedia y paneles interactivos"*
    3.  `linux_extra_3.jpg`: *"Ejemplo 3: Entorno de terminal pura y monitores de rendimiento del sistema en tiempo real"*

### C. Evolución Histórica de las Interfaces
*   Añadir un bloque explicativo titulado **"De la Terminal al Ratón: La Evolución del S.O."**.
*   Explicar que originalmente no existían ventanas ni ratón (mouse). Los sistemas eran de línea de comandos (como MS-DOS o UNIX antiguos), donde el usuario interactuaba exclusivamente escribiendo texto y usando **atajos de teclado**.
*   Concluir que, aunque hoy usamos ratones y pantallas táctiles, los atajos de teclado siguen siendo la herramienta más rápida para los profesionales.

---

## 2. Hoja de Trucos de Atajos de Teclado

Se expandirá y corregirá la tabla de atajos en la lección 1 para hacerla más útil y organizada, incluyendo atajos agrupados de la siguiente forma:

| Categoría | Atajo | ¿Qué hace? |
| :--- | :--- | :--- |
| **Control de Ventanas** | `Win + E` | Abre el Explorador de Archivos. |
| | `Win + D` | Muestra el Escritorio (esconde todo). |
| | `Alt + Tab` | Cambia entre ventanas abiertas. |
| | `Win + Flechas` | Ajusta la ventana a la mitad de la pantalla. |
| | `Alt + F4` | Cierra la ventana o programa actual. |
| **Edición y Texto** | `Ctrl + C` / `Ctrl + V` | Copiar y Pegar. |
| | `Ctrl + X` | Cortar (mueve el archivo/texto). |
| | `Ctrl + Z` / `Ctrl + Y` | Deshacer y Rehacer. |
| | `Ctrl + A` | Selecciona todo el texto o archivos. |
| | `F2` | Cambia el nombre al archivo seleccionado. |
| **Navegador y Web** | `Ctrl + T` / `Ctrl + W` | Abre / Cierra una pestaña. |
| | `Ctrl + Shift + T` | Reabre la última pestaña cerrada por error. |
| **Herramientas** | `Ctrl + Shift + Esc` | Abre el Administrador de Tareas. |
| | `Win + Shift + S` | Captura/recorte de pantalla directo. |

---

## 3. Diseño y Estilos de las Tablas (`global.css`)

Para corregir la visualización deficiente de la tabla de atajos de teclado y asegurar que se vea impecable en proyecciones (tanto en modo claro como en modo oscuro), agregaremos estilos globales en [global.css](file:///home/jojo/Proyectos/clases/presentaciones/src/styles/global.css) para el contenedor `.prose table`:

*   **Ancho y Alineación:** `width: 100%`, `border-collapse: collapse`, margen superior/inferior cómodo (`1.5rem`).
*   **Encabezados (`th`):**
    *   Fondo sutil: `var(--color-brand-sidebar-bg)` (se adapta automáticamente al modo claro y oscuro).
    *   Color de texto: `var(--color-brand-navy)`.
    *   Borde inferior: `2px solid var(--color-brand-border)`.
    *   Relleno amplio: `0.75rem 1rem`.
*   **Celdas (`td`):**
    *   Borde inferior: `1px solid var(--color-brand-border)`.
    *   Color de texto: `var(--color-brand-text)`.
    *   Relleno cómodo: `0.75rem 1rem`.
*   **Interactividad:**
    *   Efecto hover en las filas (`tr:hover td`): `background-color: var(--color-brand-hover-bg)` para resaltar visualmente el atajo que se está leyendo o explicando.
