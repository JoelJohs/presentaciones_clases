# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
- **Docente (Joel)**: Único docente que administra la plataforma, imparte clases presenciales en el laboratorio de cómputo y monitorea el avance y calificaciones prácticas de los estudiantes.
- **Estudiantes de Computación y Ofimática**: Alumnos inscritos en cursos presenciales (turnos de fin de semana: Sábado/Domingo) que consultan el temario, siguen la guía técnica paso a paso en vivo desde sus equipos en el laboratorio y realizan autoestudio y práctica autónoma en casa.

## Product Purpose
Proporcionar una plataforma educativa ágil, legible y libre de distracciones para el aprendizaje técnico en laboratorio y autoestudio. El objetivo es estructurar lecciones modulares con retos prácticos verificables mediante una experiencia fluida de documentación técnica de ingeniería (scroll continuo), sustituyendo interfaces de diapositivas artificiales o LMS sobrecargados.

## Positioning
Una plataforma web estática de documentación y guías técnicas hiper-optimizada (Astro + Tailwind CSS + Alpine.js + MDX): lectura fluida con scroll natural, navegación lateral jerárquica con índice de página (TOC scrollspy), bloques interactivos de código con copia en un clic, retos técnicos persistentes ("Modo Ninja"), y un modelo pedagógico centrado 100% en el desempeño práctico.

## Operating Context
- **Laboratorio de cómputo (presencial)**: Equipos de alumnos con monitores de diversas resoluciones siguiendo comandos, procedimientos y diagramas en tiempo real a su propio ritmo de lectura y ejecución.
- **Sesiones de fin de semana**: Bloques de clase intensivos (ej. Sábados 09:00 - 13:00 en Laboratorio A).
- **Autoestudio en casa**: Estudiantes repasando lecciones completas en pantallas de escritorio o portátiles, completando retos técnicos y consultando el plan de estudios sin fricciones de navegación fragmentada.

## Capabilities and Constraints
- **Lectura fluida y continua (Scroll First)**: Sin modo diapositiva ni segmentación artificial de pantalla; navegación natural vertical estilo manual técnico de ingeniería.
- **Interacciones clave de documentación**:
  - Índice flotante contextual "En esta página" (Table of Contents) con detección activa de sección al desplazarse (scrollspy).
  - Bloques de código y comandos de terminal con botón de copiado rápido al portapapeles.
  - Checklists interactivos para retos prácticos ("Modo Ninja") con guardado de estado en almacenamiento local (`localStorage`).
  - Barra sutil de progreso de lectura.
- **Cero ponderación de asistencia**: La asistencia tiene 0% de validez numérica; la evaluación es 100% técnica/práctica (proyectos, retos en máquina, tareas y exámenes).
- **Estructura jerárquica de contenidos**: Módulos (`[00-99]-[modulo]`), Temas (`[00-99]-[tema]`), y Clases (`[00-99]-[clase]/index.mdx`).
- **Tablas estrictamente en HTML**: Prohibido usar tablas Markdown de barras (`|---|`); uso exclusivo de marcado semántico HTML (`<table><thead>...</thead><tbody>...</tbody></table>`).
- **Persistencia y datos**: Almacenamiento local (`localStorage`) para retos y progreso, con respaldo/sincronización vía Supabase para el portal estudiantil y calificaciones.

## Brand Commitments
- **Voz pedagógica directa**: Redacción en 2ª persona imperativo dirigida directamente al estudiante ("Observa", "Prueba", "Crea", "Compara", "Comprueba"). Cero notas o recordatorios para el docente en el cuerpo de las lecciones.
- **Estética de Manual de Ingeniería (Cero Slop IA)**: Tipografía técnica limpia, bordes nítidos de 1px, superficies sobrias con alto contraste (estilo Stripe Docs / Tailwind Docs / Rust Book), descartando gradientes ruidosos, halos brillantes, blobs decorativos o componentes con ornamentos innecesarios.

## Evidence on Hand
- Lecciones reales en `src/content/lecciones/` (Hardware y Sistemas Operativos, Productividad y Ofimática, Multimedia Práctica, Redes, Programación Python).
- Plan de estudios y módulos definidos en `src/data/plan-estudios.ts` y `src/config/curriculum.ts`.
- Componentes funcionales en `src/components/` (Layout, Sidebar, Header, PlanEstudio, Dashboard, Quiz, ChallengeChecklist).
- Pautas técnicas y operativas en `AGENTS.md` y `CLAUDE.md`.

## Product Principles
1. **La práctica es la única métrica**: Si el estudiante no puede ejecutar, demostrar o resolver el reto en la máquina, el concepto no está afianzado. La evaluación es 100% técnica y demostrable.
2. **Lectura técnica ininterrumpida**: El flujo de aprendizaje se experimenta como una guía de referencia continua de alta precisión, sin cortes de diapositivas ni pantallas fragmentadas.
3. **Utilidad sobre decoración (Anti-slop)**: Cada línea, borde, color y espacio cumple una función de jerarquía cognitiva y legibilidad técnica.
4. **Cero bloat, máxima velocidad**: Arquitectura SSG estática ligera, carga instantánea y funcionamiento confiable dentro y fuera del aula.

## Accessibility & Inclusion
- Ratios de contraste conformes a WCAG AA (mínimo 4.5:1 para texto normal, 3:1 para elementos de interfaz y código).
- Soporte para tema claro y tema oscuro con persistencia sin parpadeos (`color-theme`).
- Navegación por teclado fluida y semántica en la tabla de contenidos, enlaces y bloques interactivos.
