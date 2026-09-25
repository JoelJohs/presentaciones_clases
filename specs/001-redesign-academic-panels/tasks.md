# Tasks: Rediseño de Paneles Académicos y Experiencia de Usuario

**Branch**: `001-redesign-academic-panels` | **Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

Este documento contiene la lista exhaustiva, ordenada y dependiente de tareas para implementar el rediseño de paneles, la eliminación de patrones de IA y el robustecimiento de seguridad OWASP.

---

## Phase 1: Setup (Shared Infrastructure & Utilities)

**Purpose**: Inicialización de utilidades transversales de sanitización y seguridad para toda la aplicación

- [X] T001 Crear utilidad de sanitización y seguridad en `src/utils/security.ts` exportando `escapeHtml(unsafe: string | null | undefined): string`, `sanitizeWeekNumber(week: unknown): number` delimitado a 1..54, y `assertTeacherRole(user: PortalUser | null): boolean`
- [X] T002 [P] Crear suite de pruebas unitarias para utilidades de seguridad en `src/utils/security.test.ts` validando neutralización de etiquetas script, comillas dobles, ampersands y acotación estricta de semanas 1 a 54

---

## Phase 2: Foundational (Prerequisites & Style Tokens)

**Purpose**: Estilos base y tokens institucionales que deben estar listos antes de rediseñar las vistas

- [X] T003 Limpiar y actualizar tokens de diseño en `src/styles/global.css`, suprimiendo clases y fondos de gradientes artificiales no institucionales y consolidando la paleta sobria CPI (azul `#0868A8` y ámbar `#E8A800`)
- [X] T004 [P] Refactorizar la función helper `getBadgeConfig` en `src/pages/index.astro` para utilizar estilos de distintivo sobrios y de alto contraste acordes a la identidad institucional

---

## Phase 3: User Story 1 - Vista dual de clases activas en Panel del Docente (Priority: P1) 🎯 MVP

**Goal**: Sustituir el banner promocional de 54 semanas por dos tarjetas de trabajo activas lado a lado (Grupo Sábado y Grupo Domingo), mostrando la semana activa en curso, módulo, título de la clase y botón directo en 1 clic para proyectar la presentación interactiva, manteniendo el acceso a inducción en la cabecera.

**Independent Test**: Iniciar sesión con rol `profesor` (o clave rápida `profesor`). Comprobar que en el cuerpo del panel no aparece el banner morado de inducción de 54 semanas, sino dos tarjetas dedicadas para Sábado y Domingo que indican la semana activa, el tema actual del plan de estudios y un botón que abre directamente la presentación de clase.

### Tests for User Story 1

- [X] T005 [P] [US1] Añadir pruebas unitarias en `src/features/portal/db.test.ts` para verificar la lectura independiente de semana activa de `sabado` y `domingo` y su asociación con lecciones del plan curricular

### Implementation for User Story 1

- [X] T006 [US1] Reemplazar el banner de inducción al programa de 54 semanas en el template HTML de `src/pages/index.astro` por el contenedor de cuadrícula dual `#teacher-grid-grupos` con tarjetas dedicadas para Grupo Sábado y Grupo Domingo
- [X] T007 [US1] Implementar en el script de cliente de `src/pages/index.astro` la función de renderizado `renderTeacherDualCards(db, allSemanas, allLecciones)` que inyecta en cada tarjeta la semana activa, el módulo, el título de la clase y el botón de acción principal (`/${matchLesson.slug}`)
- [X] T008 [US1] Conectar los controladores de eventos para avance rápido de semana (`btn-quick-advance-sabado` y `btn-quick-advance-domingo`) y selector de semanas en `src/pages/index.astro` con actualización inmediata en el DOM y sincronización en BD
- [X] T009 [US1] Ajustar el botón de acción secundaria de presentación de inducción en la barra superior de `src/pages/index.astro` (`href="/00-inicio"`) asegurando que sea compacto y accesible sin saturar el espacio central

**Checkpoint**: User Story 1 completamente operativa de forma independiente como MVP. El profesor ya puede consultar y proyectar las clases de ambos grupos en 1 clic.

---

## Phase 4: User Story 2 - Panel de Estudiante con foco exclusivo en contenido útil (Priority: P1)

**Goal**: Limpiar el panel del estudiante eliminando ruido visual, textos de relleno y tarjetas vacías, concentrándose únicamente en la lección activa del grupo, la tarea semanal asignada (instrucciones y fecha de entrega) y el historial de clases de repaso.

**Independent Test**: Iniciar sesión como alumno (`erandi.alvarado` o clave rápida `sabado`). Verificar que la vista principal presenta de forma prominente la clase en curso de su semana activa, las indicaciones de la tarea técnica (o se oculta si no hay tarea), y el historial de repaso de clases 1 a N-1.

### Tests for User Story 2

- [X] T010 [P] [US2] Añadir pruebas unitarias en `src/features/portal/db.test.ts` para validar la recuperación de tareas vigentes por semana y grupo (`getTaskForWeek`) y el manejo de semanas sin tarea

### Implementation for User Story 2

- [X] T011 [US2] Reestructurar el encabezado y estructura visual del contenedor `#view-student` en `src/pages/index.astro` eliminando explicaciones redundantes y resaltando la tarjeta principal de la clase activa (`#student-active-week-container`)
- [X] T012 [US2] Optimizar el renderizado del contenedor de tarea semanal (`#student-task-container`) en `src/pages/index.astro` para que se oculte limpiamente cuando no existe tarea y muestre formato de investigación técnica en libreta cuando esté configurada
- [X] T013 [US2] Limpiar y condensar la sección de clases de repaso (`#student-unlocked-list`) y la lista colapsada de próximas sesiones en `src/pages/index.astro` para ofrecer una navegación ágil y libre de distracciones

**Checkpoint**: User Stories 1 y 2 funcionan de manera independiente y coordinada.

---

## Phase 5: User Story 3 - Diseño UX/UI humano, auténtico y libre de patrones IA (Priority: P2)

**Goal**: Eliminar todos los patrones visuales y de redacción propios de plantillas de IA ("AI slop") en la página de inicio, panel y modales, adoptando una tipografía sobria, lenguaje en segunda persona pedagógico y la paleta institucional CPI.

**Independent Test**: Navegar por la página de inicio (sin autenticar), el selector de roles y los paneles. Comprobar la ausencia de gradientes decorativos genéricos, el empleo de redacción en segunda persona ("Consulta tu clase", "Tu tarea de la semana") y consistencia visual en modo claro y oscuro.

### Implementation for User Story 3

- [X] T014 [P] [US3] Rediseñar la vista no autenticada (`#view-unauthenticated`) en `src/pages/index.astro`, transformando el formulario de acceso de alumnos y docentes en una tarjeta limpia, sobria e intuitiva
- [X] T015 [US3] Reescribir títulos, descripciones y microcopia en `src/pages/index.astro` aplicando tono pedagógico humano en 2ª persona imperativo ("Consulta", "Revisa", "Proyectar"), eliminando formulaciones sintéticas de IA
- [X] T016 [US3] Ajustar los estilos del panel administrativo en `src/pages/panel.astro` para armonizar la tabla de alumnos y credenciales con la nueva línea de diseño sobria e institucional

**Checkpoint**: La plataforma cuenta con una identidad visual humana, coherente y profesional.

---

## Phase 6: User Story 4 - Robustecimiento de seguridad básica bajo directrices OWASP (Priority: P3)

**Goal**: Mitigar riesgos de seguridad web esenciales mediante sanitización estricta de entradas para evitar XSS en el renderizado dinámico del DOM y validación de permisos de rol antes de modificaciones de estado.

**Independent Test**: Ingresar cadenas de prueba con etiquetas `<script>` y atributos `onerror` en títulos y descripciones de tareas; verificar que se rendericen como texto plano escapado sin provocar ejecución de scripts.

### Implementation for User Story 4

- [X] T017 [P] [US4] Integrar la función `escapeHtml` en todas las plantillas dinámicas de `src/pages/index.astro` para sanitizar títulos de tareas, descripciones, fechas de entrega y nombres antes de asignarlos a `innerHTML`
- [X] T018 [US4] Aplicar sanitización con `escapeHtml` en la tabla dinámica del directorio de alumnos en `src/pages/panel.astro`
- [X] T019 [US4] Incorporar validación de rol `assertTeacherRole` y acotación de semana `sanitizeWeekNumber` en `updateWeek`, `saveTask` y `deleteTask` dentro de `src/features/portal/db.ts`

**Checkpoint**: Mitigación de XSS y control de acceso funcional completados.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Verificación integral de calidad, cobertura de pruebas y validación funcional

- [X] T020 [P] Ejecutar la suite completa de pruebas unitarias con Vitest (`npm test`) y verificar que todos los archivos de prueba pasen al 100%
- [X] T021 Validar tipos y sintaxis de Astro con `npm run check` sin advertencias críticas
- [X] T022 Ejecutar la validación funcional de extremo a extremo siguiendo la guía en `specs/001-redesign-academic-panels/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

```mermaid
graph TD
    P1[Phase 1: Setup - Security Utils] --> P2[Phase 2: Foundational - Style Tokens]
    P2 --> P3[Phase 3: US1 - Dual Teacher Cards (MVP)]
    P2 --> P4[Phase 4: US2 - Clean Student Hub]
    P2 --> P5[Phase 5: US3 - Human UX/UI & Anti-Slop]
    P1 --> P6[Phase 6: US4 - OWASP Hardening]
    P3 --> P7[Phase 7: Polish & Verification]
    P4 --> P7
    P5 --> P7
    P6 --> P7
```

### User Story Dependencies

- **User Story 1 (P1)**: Depende de Phase 1 y Phase 2. Constituye el **MVP principal**.
- **User Story 2 (P1)**: Depende de Phase 1 y Phase 2. Se puede implementar en paralelo o inmediatamente después de US1.
- **User Story 3 (P2)**: Depende de Phase 2. Refina el diseño visual de US1 y US2.
- **User Story 4 (P3)**: Depende de las utilidades de Phase 1 (`escapeHtml`). Asegura los puntos dinámicos de US1, US2 y US3.

---

## Parallel Execution Opportunities

- **T001** y **T002**: Pueden desarrollarse de forma paralela en la Fase de Setup.
- **T003** y **T004**: Tareas de estilos y badges paralelizables en la Fase Foundational.
- **T005**, **T010**, **T014**, **T017**: Tareas marcadas con `[P]` en diferentes archivos que pueden ejecutarse simultáneamente sin conflicto de merge.

---

## Implementation Strategy & MVP

1. **Paso 1 (Fundación)**: Completar `src/utils/security.ts` y tokens en `src/styles/global.css` (T001-T004).
2. **Paso 2 (MVP Operativo)**: Completar la vista dual de profesor (US1, T005-T009). **Validar de forma independiente: el docente ya ve sus dos grupos y proyecta clases en 1 clic.**
3. **Paso 3 (Experiencia Estudiante)**: Completar la limpieza del panel de alumnos (US2, T010-T013).
4. **Paso 4 (Humanización UI)**: Ajustar login, microcopia y coherencia visual anti-slop (US3, T014-T016).
5. **Paso 5 (Seguridad)**: Sanitizar inserciones dinámicas y controles de rol (US4, T017-T019).
6. **Paso 6 (Cierre y Validación)**: Ejecutar `npm test`, `npm run check` y `quickstart.md` (T020-T022).
