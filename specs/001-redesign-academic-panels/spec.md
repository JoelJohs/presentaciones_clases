# Feature Specification: Rediseño de Paneles Académicos y Experiencia de Usuario

**Feature Branch**: `001-redesign-academic-panels`

**Created**: 2026-09-25

**Status**: Draft

**Input**: User description: "Aunque la pagina ya esta casi hecha, se requiere hacer varias cosas: 1. Diseño UX/UI mas humano e intuitivo, dejando los patrones de diseño de IA (Porque si se ve exageradamente slop IA de diseño la pagina) 2. Mejorar el panel de profesor en mayor medida (Al tener dos grupos debe siempre mostrarme la clase que se le presentara a cada grupo, la presentación oficial del programa esta bien en la parte de arriba donde esta solo como un boton, ahi donde esta mas grande, la que dice: 'Presentación Oficial del Programa de Cómputo (54 Semanas)' esa se puede eliminar y sustituir por dos espacios, uno para la clase de la semana actual del grupo del sabado y al otro lado la semana actual del grupo del domingo) 3. mejorar en mejor medida el panel de estudiante, mostrando solamente información util, la tarea, clase de la semana (Que como podras ver se determina desde BD, el profesor ya modifica eso) 4. Aunque es muy sencillo el login y no creo que sea una pagina que termine en manos de desconocidos, revisar en menor medida OWASP de la pagina"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Vista dual de clases activas en Panel del Docente (Priority: P1)

Como profesor del curso que gestiona dos grupos simultáneos (Sábado y Domingo), necesito ver de inmediato en mi panel principal qué clase corresponde impartir a cada grupo en su semana activa actual, para acceder directamente a la presentación de la sesión sin tener que navegar por menús ni tolerar banners de inducción redundantes en el área de trabajo.

**Why this priority**: Es la herramienta operativa diaria del docente. Cada fin de semana el profesor necesita abrir de forma inmediata la clase del grupo correspondiente; sustituir el banner voluminoso de inducción por los dos espacios de trabajo resuelve la fricción pedagógica principal.

**Independent Test**: Iniciar sesión con perfil docente. Verificar que en la zona superior de trabajo ya no existe el banner gigante de inducción ("Presentación Oficial del Programa de Cómputo"), sino dos bloques paralelos o tarjetas dedicadas (Sábado y Domingo) que reflejan el tema, módulo y acceso directo a la presentación de la semana configurada para cada grupo.

**Acceptance Scenarios**:

1. **Given** un docente autenticado con el Grupo Sábado en semana 4 y el Grupo Domingo en semana 1, **When** accede al inicio de su panel, **Then** visualiza dos paneles diferenciados donde el panel de Sábado muestra la clase de semana 4 con botón de proyectar/abrir diapositivas, y el panel de Domingo muestra la clase de semana 1 con su respectivo botón.
2. **Given** la necesidad esporádica de consultar la presentación oficial de inducción del programa, **When** el docente revisa la parte superior del panel, **Then** encuentra un botón o enlace secundario y compacto de inducción sin que este consuma el espacio central de trabajo.
3. **Given** que el profesor incrementa la semana activa de un grupo (o la modifica desde la configuración), **When** se actualiza el registro en la base de datos, **Then** la tarjeta del grupo correspondiente actualiza de inmediato el título de la clase, el módulo y el enlace directo a la presentación.

---

### User Story 2 - Panel de Estudiante con foco exclusivo en contenido útil (Priority: P1)

Como estudiante registrado en uno de los grupos, necesito ingresar a mi panel y ver exclusivamente la información indispensable para mi aprendizaje semanal (la clase que estoy cursando, los materiales de dicha sesión y la tarea asignada vigente), para concentrarme en mis actividades sin sobrecarga cognitiva ni elementos innecesarios.

**Why this priority**: La plataforma existe para los alumnos. Un panel estudiantil saturado distrae al estudiante; presentar de forma destacada y limpia solo la clase de la semana activa y la tarea correspondiente maximiza el cumplimiento académico y la usabilidad.

**Independent Test**: Iniciar sesión como alumno asignado a un grupo. Constatar que la vista de bienvenida presenta claramente la clase en curso de su semana activa, la tarea semanal asignada con su fecha e instrucciones (o un estado claro si no hay tarea pendiente), y acceso rápido a clases previas de repaso, prescindiendo de estadísticas de relleno, tarjetas vacías o botones redundantes.

**Acceptance Scenarios**:

1. **Given** un alumno autenticado cuyo grupo cursa la semana activa $N$, **When** visualiza su panel principal, **Then** observa como foco central la lección correspondiente a la semana $N$ con acceso inmediato a su contenido o presentación.
2. **Given** que el docente asignó una tarea técnica para la semana $N$, **When** el alumno consulta su panel, **Then** visualiza las instrucciones claras de la tarea y la fecha límite de entrega establecida.
3. **Given** que el docente no asignó tarea para la semana en curso, **When** el alumno consulta su panel, **Then** la interfaz no muestra bloques invasivos ni mensajes alarmistas, indicando discretamente que no hay entregable pendiente.
4. **Given** que el alumno desea repasar temas anteriores, **When** consulta la sección de repaso, **Then** puede ver organizadamente solo las clases de las semanas ya cursadas (1 a $N$), manteniendo las futuras sesiones en estado programado o discreto.

---

### User Story 3 - Diseño UX/UI humano, auténtico y libre de patrones IA (Priority: P2)

Como usuario de la plataforma (alumno o profesor), necesito interactuar con una interfaz visual limpia, sobria, con jerarquía tipográfica legible y lenguaje cercano en español, libre de artificios visuales genéricos propios de plantillas de IA (como gradientes morados excesivos, tarjetas idénticas repetidas, micro-badges saturadas y textos impersonales), para sentir una experiencia de software institucional y educativo profesional.

**Why this priority**: La credibilidad pedagógica y la usabilidad dependen de un diseño intencionado y humano. Eliminar el "AI slop" produce una experiencia clara, accesible y duradera.

**Independent Test**: Navegar por la página de bienvenida, formularios de acceso, panel docente y panel de estudiante. Verificar que la paleta respeta la identidad institucional (azul y ámbar institucional), la tipografía tiene contraste adecuado, los espaciados son generosos y lógicos, y el tono de comunicación es natural, directo y en segunda persona.

**Acceptance Scenarios**:

1. **Given** cualquier vista de la plataforma, **When** se examina la estructura visual, **Then** no se observan gradientes artificiales innecesarios, bordes multicolores estridentes ni exceso de insignias decorativas que carezcan de significado funcional.
2. **Given** los textos de ayuda, títulos y botones, **When** el usuario los lee, **Then** la redacción es natural, pedagógica y humana (evitando frases cliché típicas de generación sintética como "Bienvenido a la experiencia de aprendizaje potenciada").
3. **Given** un dispositivo móvil o de escritorio, **When** se redimensiona la pantalla, **Then** los elementos se adaptan ergonómicamente manteniendo un flujo de lectura vertical cómodo y controles táctiles de tamaño apropiado.

---

### User Story 4 - Robustecimiento de seguridad básica bajo directrices OWASP (Priority: P3)

Como administrador y usuario de la plataforma, necesito que las operaciones de autenticación, visualización y captura de datos sigan buenas prácticas de seguridad web básicas (OWASP Top 10 aplicadas a aplicaciones educativas ligeras), para garantizar la integridad de los datos de clase y prevenir manipulaciones indebidas.

**Why this priority**: Aunque el entorno es de uso interno escolar, la protección básica contra inyecciones, XSS, exposición inadvertida de credenciales y controles de acceso débiles previene fallas de integridad académica y pérdida de información.

**Independent Test**: Validar el ingreso de caracteres especiales en campos de texto (tareas, nombres), revisar el almacenamiento de sesiones en el cliente y constatar que un rol no autorizado no puede ejecutar funciones de docente ni modificar estados de semana.

**Acceptance Scenarios**:

1. **Given** un usuario que intenta ingresar contenido con etiquetas o secuencias script en campos de texto (ej. en el título o descripción de una tarea), **When** se guarda y despliega la información, **Then** el contenido se sanitiza y neutraliza sin ejecutar código en el navegador de otros usuarios (Prevención XSS).
2. **Given** un usuario con sesión de estudiante, **When** intenta manipular la interfaz o invocar acciones restringidas del profesor (como modificar semanas activas o alterar notas), **Then** la plataforma restringe la acción y protege el estado real.
3. **Given** el manejo de contraseñas provisionales y accesos, **When** se presentan credenciales en pantalla o se transmiten, **Then** no se dejan expuestas contraseñas reales en texto plano dentro de atributos públicos accesibles por otros roles.

---

### Edge Cases

- ¿Qué ocurre si un grupo avanza a una semana para la cual aún no se ha redactado una presentación interactiva (`.mdx`)?
  - El sistema muestra la ficha descriptiva oficial de la semana (título, módulo, objetivos técnicos) con un indicador de "Sesión práctica en aula / Sin presentación interactiva requerida", permitiendo al docente continuar la clase sin errores 404.
- ¿Qué ocurre si la base de datos remota no responde o hay pérdida momentánea de conexión a internet?
  - El sistema utiliza de manera transparente el estado persistido en el almacenamiento local para no interrumpir la clase presencial, informando con un estado sutil y no intrusivo.
- ¿Qué sucede si el docente aún no ha registrado ninguna tarea para la semana en curso de un grupo?
  - El contenedor de tarea en el panel del alumno se oculta o muestra un estado pasivo limpio ("Esta semana no requiere entrega técnica en libreta"), sin generar confusión.
- ¿Qué sucede si un alumno pertenece al grupo del Domingo pero intenta consultar la semana activa del Sábado?
  - El panel del estudiante se sintoniza estrictamente con el grupo asignado a su matrícula/usuario, mostrando únicamente la semana en curso que le corresponde.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sistema DEBE sustituir el banner principal de inducción ("Presentación Oficial del Programa de Cómputo (54 Semanas)") en la vista del profesor por dos contenedores dedicados: uno para la clase en curso del Grupo Sábado y otro para la clase en curso del Grupo Domingo.
- **FR-002**: Cada contenedor de grupo en la vista del docente DEBE indicar el número de semana activa, el módulo al que pertenece, el título de la lección y un botón de acción principal para abrir o proyectar la clase correspondiente.
- **FR-003**: El sistema DEBE conservar el acceso a la presentación oficial de inducción del programa como un botón compacto de acción en el encabezado superior, sin competir visualmente con el área de trabajo activa.
- **FR-004**: En la vista de estudiante, el sistema DEBE mostrar de forma prioritaria y destacada únicamente: (a) la clase de la semana activa correspondiente a su grupo, (b) la tarea asignada para esa semana si existe, y (c) un historial de consulta ordenado con las clases previas ya desbloqueadas.
- **FR-005**: El sistema DEBE obtener la semana activa de cada grupo y la tarea asociada directamente del repositorio de datos sincronizado (base de datos / almacenamiento persistente configurado por el profesor).
- **FR-006**: La interfaz DEBE seguir una estética humana e institucional: tipografía clara, paleta de colores coherente con la identidad institucional, eliminación de fondos degradados de IA superfluos y reducción de insignias decorativas redundantes.
- **FR-007**: Los textos de la interfaz DEBEN emplear lenguaje pedagógico natural, redactado en segunda persona hacia el estudiante ("Observa", "Prueba", "Consulta") y descriptores directos para el docente.
- **FR-008**: El sistema DEBE sanitizar y codificar de forma segura cualquier entrada de texto (títulos de tareas, instrucciones, descripciones) antes de su renderizado en el DOM para mitigar riesgos de XSS (Cross-Site Scripting).
- **FR-009**: El sistema DEBE validar de forma consistente el rol del usuario activo antes de habilitar controles de edición de semanas, asignación de tareas o consulta de credenciales.
- **FR-010**: El sistema DEBE aislar de la vista pública las credenciales y datos de acceso de otros alumnos, mostrándolos únicamente al docente en su sección administrativa.

### Key Entities

- **Grupo Académico**: Representa una cohorte de estudiantes (Sábado o Domingo) con un horario asignado (09:00 a 13:00 h) y un puntero a su semana de avance actual (1 a 54).
- **Clase Semanal**: Unidad temática correspondiente a una semana específica del plan formativo de 54 semanas, compuesta por módulo, título de clase, descripción, tipo de sesión (laboratorio, proyecto, evaluación o práctica) y opcionalmente un archivo interactivo de presentación.
- **Tarea Semanal**: Asignación de investigación teórica o ejercicio asignado por el docente para una semana y grupo determinados, con título, descripción técnica y fecha de entrega.
- **Usuario del Portal**: Perfil con rol (`profesor` o `alumno`), asignación de grupo (en caso de alumnos), nombre, matrícula o identificador único y estado de sesión.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: El docente puede acceder a la presentación de la clase activa de cualquiera de sus dos grupos con un máximo de 1 clic desde su pantalla de inicio tras ingresar a la plataforma.
- **SC-002**: El 100% de la información visible en el primer scroll del panel de estudiante corresponde a contenido académico directo (clase de la semana y tarea asignada), sin elementos decorativos de relleno.
- **SC-003**: Se elimina por completo el banner de inducción de 54 semanas del cuerpo central del panel docente, reduciendo la altura vertical ocupada por elementos promocionales en más del 60%.
- **SC-004**: Cero vulnerabilidades de inyección o ejecución de scripts en las áreas donde se despliegan contenidos dinámicos (título y descripción de tareas, nombres de alumnos).
- **SC-005**: Reducción medible del ruido visual mediante la unificación de estilos y eliminación de componentes de diseño asociados a plantillas artificiales de IA.

## Assumptions

- Los dos grupos formativos oficiales son Sábado y Domingo, ambos con horario de 09:00 a 13:00 horas y duración de 54 semanas.
- El avance de semanas para cada grupo es independiente y continuará siendo administrado por el profesor.
- El mecanismo de persistencia utiliza sincronización con backend en la nube (Supabase) cuando las credenciales están presentes en el entorno, manteniendo compatibilidad con almacenamiento local persistente como mecanismo de respaldo.
- No se requieren roles adicionales más allá de `profesor` y `alumno`.
