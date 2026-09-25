# Implementation Plan: Rediseño de Paneles Académicos y Experiencia de Usuario

**Branch**: `001-redesign-academic-panels` | **Date**: 2026-09-25 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-redesign-academic-panels/spec.md`

## Summary

Rediseño integral de la experiencia visual y operativa del portal de clases:
1. **Panel del Docente**: Sustitución del banner voluminoso de inducción por una vista dual con dos tarjetas de trabajo principales (Grupo Sábado y Grupo Domingo), mostrando la semana activa, título de clase, módulo y acceso directo en 1 clic para proyectar la presentación interactiva. La presentación de inducción se preserva como acceso compacto en la cabecera.
2. **Panel del Estudiante**: Simplificación radical del área de trabajo para mostrar exclusivamente información útil (clase activa de la semana, tarea técnica vigente e historial de clases cursadas para repaso), eliminando ruido visual y elementos superfluos.
3. **Diseño UX/UI Humano**: Eliminación de patrones genéricos de IA ("AI slop", como gradientes morados ajenos a la marca, saturación de micro-etiquetas decorativas y copias robóticas) en favor de una estética editorial sobria, institucional y funcional.
4. **Seguridad OWASP Básica**: Sanitización de entradas dinámicas (`escapeHtml`) para prevenir XSS en títulos y descripciones de tareas, y validación estricta de roles antes de mutaciones académicas.

## Technical Context

**Language/Version**: TypeScript 5.9+, Astro v6.4+ (Node.js >= 22.12.0)
**Primary Dependencies**: Astro v6, Tailwind CSS v4, Alpine.js v3, `@iconify-json/lucide`, `@astrojs/mdx`
**Storage**: `localStorage` (`cpi_portal_db_v2`, `cpi_portal_session_v1`) con sincronización opcional con Supabase BaaS
**Testing**: Vitest 2.1.8 (`npm test`)
**Target Platform**: Web moderna (navegadores de escritorio y dispositivos móviles)
**Project Type**: Plataforma educativa / Web application
**Performance Goals**: Carga inmediata de vistas locales (<50ms para cambio de rol o semana), cero parpadeos de estilo
**Constraints**: Solución nativa sin instalar librerías externas adicionales; apego estricto a las directrices de diseño y reglas de gobernanza del repositorio

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Principle I: Estándares de Clases y Presentaciones**: El rediseño no altera la estructura de archivos de lecciones (`src/content/lecciones/`). Pasa.
- **Principle II: Tono Pedagógico y Voz**: Todas las etiquetas y textos se redactan en 2ª persona imperativo directo para el estudiante ("Observa", "Prueba", "Consulta") y descriptores claros para el docente. Pasa.
- **Principle III: Evaluación y Reglas de Negocio**: Cero ponderación de asistencia (100% desempeño técnico y entregables prácticos). Pasa.
- **Principle IV: Restricción de Herramientas**: No se instalaron dependencias ni herramientas externas sin autorización expresa. Pasa.

## Project Structure

### Documentation (this feature)

```text
specs/001-redesign-academic-panels/
├── spec.md              # Feature specification
├── plan.md              # This implementation plan
├── research.md          # Phase 0 architectural & design decisions
├── data-model.md        # Phase 1 entities, lifecycle & validation rules
├── quickstart.md        # Phase 1 verification and testing guide
├── contracts/           # Phase 1 interface and UI contracts
│   └── panel-ui-contracts.md
├── checklists/          # Quality checklists
│   └── requirements.md
└── tasks.md             # Phase 2 task breakdown (created by /speckit-tasks)
```

### Source Code (repository layout)

```text
src/
├── pages/
│   ├── index.astro              # Portal de bienvenida, login, panel docente y estudiante
│   └── panel.astro              # Panel avanzado de gestión y credenciales
├── features/
│   └── portal/
│       ├── types.ts             # Definición de tipos de usuario, grupos y tareas
│       ├── db.ts                # Gestión de base de datos local y sincronización
│       └── db.test.ts           # Pruebas unitarias de persistencia y portal
├── utils/
│   └── security.ts              # Utilidad de sanitización XSS y validación de seguridad
└── styles/
    └── global.css               # Tokens de diseño Tailwind v4 institucionales
```

**Structure Decision**: Se mantiene la arquitectura existente basada en Astro + TypeScript. Se actualiza `src/pages/index.astro` para implementar el rediseño dual del docente y la vista enfocada del alumno; se crea una utilidad de sanitización en `src/utils/security.ts` (con su correspondiente suite de pruebas en Vitest) y se aplican los estilos en `src/styles/global.css` para retirar cualquier patrón de degradado artificial.

## Complexity Tracking

> No hay violaciones constitucionales. El diseño utiliza componentes y utilidades nativas sin añadir complejidad innecesaria.
