# Phase 0 Research: Rediseño de Paneles Académicos y Seguridad OWASP

Este documento consolida las decisiones de diseño arquitectónico, experiencia de usuario y seguridad para la implementación del rediseño de paneles y mitigaciones de seguridad.

---

## 1. Humanización de UI/UX y Eliminación de "AI Slop"

### Contexto del Problema
La interfaz actual presenta patrones arquetípicos de interfaces generadas por modelos de lenguaje ("AI slop"):
- Exceso de fondos con gradientes diagonales y colores desalineados con la identidad escolar (ej. gradientes en morados/violetas translúcidos sobre fondo blanco).
- Saturación de micro-etiquetas (*pills* o *badges*) con bordes dobles, puntos parpadeantes (`animate-pulse`) e iconografía redundante sin valor semántico.
- Banners promocionales de gran tamaño en vistas privadas autenticadas (como el bloque de "Presentación Oficial del Programa de Cómputo (54 Semanas)"), que desplazan el trabajo operativo real fuera del primer pantallazo (*above the fold*).
- Copia y textos robóticos ("Bienvenido a la experiencia de aprendizaje...", "Control Académico y Grupos BaaS").

### Decisión
- **Identidad sobria e institucional**: Adoptar un estilo editorial limpio basado en los tokens de marca oficiales de CPI: Azul principal (`#0868A8`), Ámbar institucional (`#E8A800`), superficies limpias (`#FFFFFF` en modo claro, `#0B1620` en modo oscuro) y bordes sutiles sin efectos de brillo artificiales.
- **Reducción de ruido**: Eliminar insignias redundantes; mantener únicamente aquellas que expresan estado operativo real (ej. "En curso", "Tarea activa", tipo de clase).
- **Lenguaje cercano y pedagógico**: Redacción en 2ª persona imperativo directo ("Consulta tu clase", "Tu tarea de la semana", "Proyectar sesión"), eliminando jerga técnica innecesaria para el estudiante.

### Alternativas Consideradas
- *Mantener el banner morado pero hacerlo plegable*: Rechazado porque añade interactividad superflua y el docente ya tiene el botón de inducción en la cabecera superior.
- *Rediseño completo con una librería de componentes externa*: Rechazado por YAGNI y para mantener la compatibilidad con el stack nativo Astro + Tailwind v4 + Alpine.js sin agregar dependencias pesadas.

---

## 2. Arquitectura del Panel del Docente: Espacios Duales (Sábado y Domingo)

### Contexto del Problema
El profesor atiende dos cohortes distintas (Grupo Sábado y Grupo Domingo). Ambos grupos avanzan a ritmos diferentes en el programa de 54 semanas. Actualmente, para proyectar la clase, el docente debe navegar a través de múltiples opciones o buscar la lección manualmente porque el área principal estaba ocupada por el banner de inducción.

### Decisión
- Sustituir el banner central de inducción por un contenedor de dos columnas/tarjetas de trabajo destacadas:
  1. **Tarjeta Grupo Sábado**:
     - Encabezado con distintivo del grupo y horario (`09:00 – 13:00 h`).
     - Semana activa actual ($N$ de 54) con título de la clase y módulo temático correspondiente según el plan de estudios.
     - Botón de acción principal: **"Proyectar / Abrir Clase"** que enlaza directamente a la ruta de la presentación MDX (o indica práctica en aula si no tiene diapositiva).
     - Resumen de tarea activa con botón para editar/asignar tarea.
     - Controles rápidos: botón `+1 Finalizar semana` y selector numérico de semana.
  2. **Tarjeta Grupo Domingo**:
     - Estructura análoga para el grupo de domingo, reflejando su semana independiente ($M$ de 54).
- Preservar el acceso a la presentación oficial de inducción mediante un botón compacto y claro en la barra de acciones superior del encabezado docente (`/00-inicio`).

### Alternativas Consideradas
- *Pestañas (Tabs) para alternar entre Sábado y Domingo*: Rechazado porque obliga al docente a hacer clics adicionales para ver el estado de ambos grupos. La vista lado a lado permite un monitoreo simultáneo inmediato.
- *Una sola tarjeta genérica con selector de grupo desplegable*: Rechazado por fricción innecesaria; son exactamente dos grupos conocidos y fijos.

---

## 3. Optimización del Panel del Estudiante: Información Esencial

### Contexto del Problema
El estudiante ingresa a la plataforma principalmente los fines de semana durante la clase o durante la semana para consultar su tarea. La vista anterior incluía bloques informativos de bienvenida extensos, avisos de horario repetitivos y múltiples niveles de listas colapsables que restaban foco al entregable inmediato.

### Decisión
- Estructurar el panel del alumno en tres niveles de prioridad visual:
  1. **Foco 1: Clase de la semana en curso**:
     - Tarjeta destacada con el tema que se está viendo hoy (módulo, título de la sesión, objetivos breves).
     - Botón directo para abrir la presentación interactiva.
  2. **Foco 2: Tarea semanal vigente (solo si existe)**:
     - Si el profesor asignó una tarea para la semana activa, se muestra un contenedor claro con el título del tema a investigar, instrucciones puntuales y fecha límite.
     - Si no hay tarea asignada, se oculta o se presenta un mensaje sutil de una línea, sin cajas vacías ni alertas alarmistas.
  3. **Foco 3: Repaso de clases previas**:
     - Lista organizada y limpia de las clases correspondientes a las semanas $1$ hasta $N-1$ que el alumno ya cursó, facilitando el repaso de conceptos.

### Alternativas Consideradas
- *Ocultar completamente las clases anteriores*: Rechazado porque los alumnos necesitan repasar comandos y presentaciones de semanas previas para proyectos y exámenes.
- *Permitir al alumno ver las presentaciones de semanas futuras*: Rechazado porque el avance debe estar coordinado con el ritmo pedagógico de la clase en aula.

---

## 4. Mitigaciones de Seguridad OWASP (Pragmáticas y Esenciales)

### Contexto del Problema
La plataforma utiliza renderizado dinámico en el cliente mediante plantillas de texto e interpolación en `innerHTML` (en `src/pages/index.astro`). Esto genera riesgos potenciales de XSS si datos de entrada (como títulos o descripciones de tareas, o nombres de alumnos) contienen caracteres no escapados como `<script>` o atributos `onerror`.

### Decisión
- **A03:2021 - Inyecciones y XSS**:
  - Implementar una función utilitaria de escape HTML (`escapeHtml` / `sanitizeText`) para codificar de forma segura cualquier cadena de texto proveniente de la base de datos o almacenamiento local antes de concatenarla en cadenas HTML.
  - Alternativamente, manipular directamente propiedades seguras como `textContent` e `innerText` en nodos del DOM para datos de texto plano.
- **A01:2021 - Control de Acceso Roto (Broken Access Control)**:
  - Validar consistentemente el rol en cliente antes de procesar operaciones que modifiquen semanas (`updateWeek`), tareas (`saveTask`, `deleteTask`) o calificaciones (`updateGrade`).
  - Restringir la exposición del directorio de credenciales en el DOM: solo renderizar la tabla de alumnos si la sesión actual corresponde a `profesor`.
- **A07:2021 - Identificación y Autenticación**:
  - Validar rangos numéricos de entrada (semanas entre 1 y 54).
  - Mantener aislamiento de credenciales provisionales sin exponer contraseñas de otros alumnos a usuarios con rol `alumno`.

### Alternativas Consideradas
- *Instalar una biblioteca pesada de sanitización como DOMPurify*: No se requiere agregar una dependencia externa cuando los campos dinámicos son textos planos (título, descripción, fecha de entrega) que pueden ser escapados de manera nativa y robusta con una función de 5 líneas o asignación vía `textContent`. Cumple el principio YAGNI y las reglas del proyecto sobre no instalar herramientas sin autorización.
