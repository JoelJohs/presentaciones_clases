# Plataforma de Estudios y Presentación de Clases

## Descripción
Esta plataforma es una aplicación web estática (SSG) desarrollada para organizar clases, publicar lecciones interactivas en formato MDX, gestionar el temario por módulos y temas, y permitir el seguimiento del progreso del estudiante. Ofrece modos de lectura y presentación adaptados para proyecciones en el aula y lectura individual.

## Funcionalidades principales
* **Organización modular**: Estructuración jerárquica de lecciones agrupadas por módulos, temas y subtemas.
* **Lecciones interactivas en MDX**: Renderizado dinámico de contenidos educativos con marcado Markdown enriquecido.
* **Modos de visualización**: Alternador entre Modo Lectura (optimizado para pantallas individuales) y Modo Presentación (proyecciones en proyector).
* **Seguimiento de progreso**: Registro del avance del estudiante guardado localmente en el navegador.
* **Avisos del docente**: Sección de anuncios y mensajes de clase renderizados dinámicamente.

## Stack tecnológico
* **Framework Web**: Astro 6 (`astro@^6.4.7`)
* **Formato de Contenido**: MDX (`@astrojs/mdx`)
* **Estilos CSS**: Tailwind CSS 4 (`@tailwindcss/vite`)
* **Reactividad en cliente**: Alpine.js
* **Lenguaje**: TypeScript (`typescript`, `@astrojs/check`)
* **Pruebas automatizadas**: Vitest (`vitest`)
* **Gestor de paquetes**: npm

## Requisitos
* `Node.js >= 22.12.0`
* `npm` compatible con `package-lock.json` v3

## Instalación
Para instalar las dependencias del proyecto de forma reproducible:

```bash
npm install
```

## Desarrollo local
Para iniciar el servidor de desarrollo local:

```bash
npm run dev
```

El servidor local de Astro normalmente se ejecuta en:

```text
http://localhost:4321
```
*(El puerto puede variar si 4321 está en uso por otro proceso).*

## Comandos disponibles

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo de Astro con HMR. |
| `npm run check` | Ejecuta la verificación estática de sintaxis y tipos con `@astrojs/check`. |
| `npm test` | Ejecuta la suite de pruebas unitarias con Vitest. |
| `npm run build` | Compila el sitio estático de producción hacia la carpeta `./dist/`. |
| `npm run preview` | Previsualiza localmente el paquete generado en `./dist/`. |
| `npm run astro ...` | Ejecuta comandos de la CLI de Astro. |

## Estructura general
```text
/
├── public/                     # Archivos estáticos
├── src/
│   ├── assets/                 # Imágenes y recursos optimizables por Astro
│   ├── components/             # Componentes de interfaz (Header, Sidebar, Dashboard, PlanEstudio)
│   ├── content/                # Colecciones de contenido (lecciones y mensajes)
│   ├── layouts/                # Plantilla base (Layout.astro)
│   ├── pages/                  # Rutas dinámicas y páginas (/index.astro, [...slug].astro)
│   ├── styles/                 # Estilos globales (global.css)
│   └── utils/                  # Lógica de navegación, fechas y progreso
├── astro.config.mjs            # Configuración de integraciones de Astro
├── package.json                # Dependencias y scripts
└── tsconfig.json               # Configuración de TypeScript
```

## Gestión de contenido
Las lecciones del curso residen en el directorio:

```text
src/content/lecciones/
```

Para conocer en detalle la convención de nombres, atributos del frontmatter MDX e inclusión de imágenes y recursos, consulta la guía dedicada:

* [GUIA_CONTENIDO.md](GUIA_CONTENIDO.md)

## Validaciones
El proyecto cuenta con tres comandos principales de validación:

```bash
npm run check    # Valida sintaxis y tipos en componentes .astro y archivos TypeScript
npm test         # Valida la lógica utilitaria de navegación y funciones del proyecto
npm run build    # Compila el sitio completo garantizando la integridad de enlaces y recursos
```

## Compilación de producción
Para generar el bundle listo para despliegue:

```bash
npm run build
```

Los archivos resultantes se generarán en la carpeta `./dist/` en formato HTML/CSS/JS estático optimizado.

## Persistencia local
El progreso de lectura y los checkboxes completados por el estudiante:
* se guardan directamente en el `localStorage` del navegador;
* son de ámbito local al navegador utilizado;
* no requieren ni utilizan base de datos remota;
* no se sincronizan automáticamente entre múltiples dispositivos;
* actualmente tienen dos implementaciones de estado en cliente pendientes de unificación.

## Documentación adicional
* [PROJECT_AUDIT_REPORT.md](PROJECT_AUDIT_REPORT.md) — Reporte técnico exhaustivo y plan de refactorización por fases.
* [GUIA_CONTENIDO.md](GUIA_CONTENIDO.md) — Guía para la creación y edición de lecciones MDX.

## Estado actual
* **Servidor de desarrollo**: Funciona correctamente.
* **Pruebas unitarias**: Todas las pruebas actuales se ejecutan y pasan al 100%.
* **Compilación de producción**: Funcional y genera 16 páginas estáticas sin errores.
* **Validación estática**: Configurada mediante `npm run check` (`@astrojs/check` y `typescript`).
* **Deuda técnica**: El proyecto cuenta con hallazgos de refactorización documentados en `PROJECT_AUDIT_REPORT.md`.
