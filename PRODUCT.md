# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
- **Docente (Joel)**: Único docente que administra la plataforma, imparte las clases presenciales, proyecta diapositivas interactivas en pantalla gigante/proyector en el laboratorio y monitorea el avance y calificaciones de los estudiantes.
- **Estudiantes de Computación y Ofimática**: Alumnos inscritos en cursos presenciales (turnos de fin de semana: Sábado/Domingo) que consultan el temario, siguen la lección en vivo desde sus equipos en el laboratorio y realizan autoestudio y práctica autónoma en casa.

## Product Purpose
Proporcionar un entorno unificado, ágil y libre de distracciones tanto para la proyección interactiva de clases en el laboratorio como para el autoestudio guiado de los estudiantes. El objetivo es maximizar el aprendizaje práctico mediante lecciones modulares con retos técnicos verificables, sin depender de LMS pesados ni de plataformas de terceros.

## Positioning
Una plataforma educativa web estática hiper-optimizada (Astro + Tailwind CSS + Alpine.js + MDX) diseñada específicamente para la dinámica de clase del docente y sus estudiantes de computación: conmutación instantánea entre Modo Presentación para proyector y Modo Lectura individual, lecciones modulares en código/Markdown que funcionan de manera ultra-rápida y con soporte local, y un modelo de evaluación estrictamente meritocrático centrado en el desempeño práctico.

## Operating Context
- **Laboratorio de cómputo (presencial)**: Proyector conectado al equipo del docente (resoluciones 1080p o estándar de proyección de aula), equipos de los alumnos con pantallas variadas (desktop/laptop) siguiendo ejercicios y comandos en vivo.
- **Sesiones de fin de semana**: Grupos organizados en bloques de clase intensivos (ej. Sábados 09:00 - 13:00 en Laboratorio A; Domingos opcional).
- **Autoestudio en casa**: Estudiantes repasando lecciones, ejecutando retos técnicos ("Modo Ninja"), consultando el plan de estudios y verificando su progreso en local o portal de calificaciones.

## Capabilities and Constraints
- **Modo Dual nativo**: Conmutación fluida entre Modo Lectura (prosa continua, navegación vertical) y Modo Presentación (diapositivas automáticas divididas por encabezados `##`, atajos de teclado, pantalla completa, temporizador y vista de proyector).
- **Cero ponderación de asistencia**: La asistencia tiene 0% de validez numérica; la evaluación es 100% técnica/práctica (proyectos, retos de código, tareas y exámenes).
- **Estructura jerárquica obligatoria**: Módulos (`[00-99]-[modulo]`), Temas (`[00-99]-[tema]`), y Clases (`[00-99]-[clase]/index.mdx`).
- **Tablas estrictamente en HTML**: Restricción mandatoria de no usar tablas markdown con barras (`|---|`), únicamente marcado HTML semántico (`<table><thead>...</thead><tbody>...</tbody></table>`).
- **Persistencia y datos**: Seguimiento de progreso en almacenamiento local (`localStorage`) complementado con integración en Supabase para sincronización de calificaciones/portal estudiantil.

## Brand Commitments
- **Voz pedagógica directa**: Redacción en 2ª persona imperativo dirigida directamente al estudiante ("Observa", "Prueba", "Crea", "Compara", "Comprueba"). Cero notas o recordatorios para el docente en el cuerpo de las lecciones.
- **Identidad técnica y sobria**: Estilo visual limpio, moderno y enfocado en la legibilidad técnica, sin adornos superfluos, muletillas corporativas ni ruido visual.

## Evidence on Hand
- Lecciones reales en `src/content/lecciones/` (Hardware y Sistemas Operativos, Productividad y Ofimática, Multimedia Práctica).
- Plan de estudios y módulos definidos en `src/data/plan-estudios.ts` y `src/config/curriculum.ts`.
- Configuración de grupos en `src/config/groups.ts`.
- Componentes funcionales en `src/components/` (Dashboard, Sidebar, Header, PlanEstudio, SlideControls).
- Guías pedagógicas y operativas en `AGENTS.md`, `CLAUDE.md` y `GUIA_CONTENIDO.md`.

## Product Principles
1. **La práctica es la única métrica**: Si el estudiante no puede ejecutar, demostrar o resolver el reto en la máquina, el concepto no está afianzado. La asistencia no califica; la habilidad técnica demostrable sí.
2. **Pedagogía imperativa y autosuficiente**: Cada lección se explica por sí misma y conduce al estudiante a la acción inmediata sin requerir la intervención continua del docente.
3. **Dualidad sin fricción**: La misma fuente de verdad en MDX debe proyectarse impecablemente en pantalla de aula y leerse con máxima comodidad en pantallas personales.
4. **Cero bloat, máxima velocidad**: Arquitectura estática (SSG) ligera, carga instantánea y funcionamiento confiable dentro y fuera del aula.

## Accessibility & Inclusion
- Contraste visual adecuado para visibilidad en proyectores de aula y pantallas con iluminación variable.
- Soporte para tema claro y tema oscuro con persistencia sin parpadeos (`color-theme`).
- Controles accesibles por teclado para la navegación de diapositivas y exploración del contenido.
