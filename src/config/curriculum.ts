/**
 * Configuración Central del Currículo (Single Source of Truth)
 * Estructura para 12 módulos y 55 lecciones optimizadas para estudiantes de 12 a 18 años.
 * 
 * Patrón de Diseño: Registry & Value Object
 */

export interface CurriculumLessonMeta {
  id: string; // ej. '01-hardware-y-software'
  title: string;
  kind: 'lesson' | 'activity' | 'assessment' | 'project';
  duration: number; // en minutos
  description: string;
}

export interface CurriculumTopicMeta {
  id: string; // ej. '01-introduccion-computacion'
  title: string;
  description: string;
  lessons: CurriculumLessonMeta[];
}

export interface CurriculumModuleMeta {
  number: number;
  id: string; // ej. '01-fundamentos-mantenimiento'
  title: string;
  shortTitle: string;
  description: string;
  icon: string; // Lucide icon
  colorHex: string;
  badgeClass: string;
  estimatedWeeks: number;
  topics: CurriculumTopicMeta[];
}

export const CURRICULUM_MODULES: CurriculumModuleMeta[] = [
  {
    number: 1,
    id: '01-fundamentos-mantenimiento',
    title: '1 - Fundamentos y Mantenimiento de Equipos de Cómputo',
    shortTitle: 'Fundamentos y Hardware',
    description: 'Descubre qué hay dentro de tu computadora, cómo funciona el hardware y el sistema operativo, y cómo prevenir fallas.',
    icon: 'lucide:cpu',
    colorHex: '#0D9488',
    badgeClass: 'module-badge-m1',
    estimatedWeeks: 5,
    topics: [
      {
        id: '01-introduccion-computacion',
        title: 'Tema 1: Introducción a la Computación',
        description: 'Bases de la informática, arquitectura básica y sistemas operativos.',
        lessons: [
          {
            id: '01-hardware-y-software',
            title: 'Hardware y Software',
            kind: 'lesson',
            duration: 45,
            description: 'Diferencia tangible vs digital, componentes clave y analogía de la cocina.',
          },
          {
            id: '02-el-sistema-operativo',
            title: 'El Sistema Operativo',
            kind: 'lesson',
            duration: 45,
            description: 'Explora cómo Windows/Linux gestionan procesos, archivos y permisos.',
          },
        ],
      },
      {
        id: '02-hardware-mantenimiento',
        title: 'Tema 2: Componentes y Mantenimiento',
        description: 'Identificación de partes físicas, ensamblaje virtual y optimización.',
        lessons: [
          {
            id: '01-componentes-internos',
            title: 'Componentes Internos del PC',
            kind: 'lesson',
            duration: 45,
            description: 'CPU, Memoria RAM, Placa Madre, Almacenamiento SSD/HDD y GPU.',
          },
          {
            id: '02-mantenimiento-y-formateo',
            title: 'Mantenimiento y Diagnóstico',
            kind: 'lesson',
            duration: 45,
            description: 'Limpieza preventiva, gestión térmica y recuperación del sistema.',
          },
        ],
      },
      {
        id: '03-evaluacion-troubleshooting',
        title: 'Tema 3: Resolución de Problemas',
        description: 'Taller práctico de resolución de fallas comunes de hardware y software.',
        lessons: [
          {
            id: '01-evaluacion-resolucion-problemas',
            title: 'Taller de Resolución de Problemas',
            kind: 'assessment',
            duration: 60,
            description: 'Retos de diagnóstico y soluciones a casos reales de soporte técnico.',
          },
        ],
      },
    ],
  },
  {
    number: 2,
    id: '02-ofimatica-en-la-nube',
    title: '2 - Ofimática en la Nube y Productividad',
    shortTitle: 'Ofimática Cloud',
    description: 'Domina el procesamiento de textos, análisis de datos con hojas de cálculo y presentaciones de alto impacto.',
    icon: 'lucide:file-text',
    colorHex: '#D97706',
    badgeClass: 'module-badge-m2',
    estimatedWeeks: 4,
    topics: [
      {
        id: '01-google-docs-y-sheets',
        title: 'Tema 1: Procesamiento de Textos y Datos',
        description: 'Creación de reportes profesionales y tablas dinámicas en la nube.',
        lessons: [
          {
            id: '01-google-docs',
            title: 'Google Docs: Procesamiento de Textos',
            kind: 'lesson',
            duration: 45,
            description: 'Estructuración de documentos, citas, índices y colaboración en tiempo real.',
          },
          {
            id: '02-google-sheets',
            title: 'Google Sheets: Hojas de Cálculo',
            kind: 'lesson',
            duration: 45,
            description: 'Fórmulas esenciales, formatos condicionales y visualización de datos.',
          },
          {
            id: '03-excel-funciones-y-graficos',
            title: 'Excel y Hojas de Cálculo Avanzadas: Funciones y Gráficos',
            kind: 'lesson',
            duration: 45,
            description: 'Tablas dinámicas, funciones condicionales y gráficos estadísticos para toma de decisiones.',
          },
        ],
      },
      {
        id: '02-presentaciones-proyecto',
        title: 'Tema 2: Presentaciones y Proyecto',
        description: 'Diseño visual para exposiciones y proyecto integrador de ofimática.',
        lessons: [
          {
            id: '01-powerpoint',
            title: 'Presentaciones Efectivas con PowerPoint',
            kind: 'lesson',
            duration: 45,
            description: 'Storytelling visual, jerarquía tipográfica y recursos interactivos.',
          },
          {
            id: '02-proyecto-integrador',
            title: 'Proyecto Integrador de Ofimática',
            kind: 'project',
            duration: 60,
            description: 'Crea un informe completo con datos analizados y diapositivas ejecutivas.',
          },
        ],
      },
    ],
  },
  {
    number: 3,
    id: '03-multimedia-edicion-imagen',
    title: '3 - Multimedia: Edición de Imagen y Diseño Digital',
    shortTitle: 'Diseño e Imagen',
    description: 'Aprende composición visual, retoque fotográfico, teoría del color y creación de gráficos digitales.',
    icon: 'lucide:palette',
    colorHex: '#7C3AED',
    badgeClass: 'module-badge-m3',
    estimatedWeeks: 4,
    topics: [
      {
        id: '01-fundamentos-edicion',
        title: 'Tema 1: Fundamentos y Herramientas',
        description: 'Capas, máscaras, selecciones precisas y formatos de imagen.',
        lessons: [
          {
            id: '01-interfaz-y-capas',
            title: 'Interfaz, Capas y Selecciones',
            kind: 'lesson',
            duration: 45,
            description: 'Uso de capas, modos de fusión y herramientas de selección.',
          },
          {
            id: '02-retoque-y-correccion',
            title: 'Retoque y Corrección de Color',
            kind: 'lesson',
            duration: 45,
            description: 'Curvas de luz, balances cromáticos y eliminación de imperfecciones.',
          },
        ],
      },
      {
        id: '02-composicion-y-graficos',
        title: 'Tema 2: Composición y Gráficos',
        description: 'Diseño para redes sociales, montajes y tipografía digital.',
        lessons: [
          {
            id: '01-diseno-grafico-digital',
            title: 'Diseño Gráfico y Composición',
            kind: 'lesson',
            duration: 45,
            description: 'Regla de tercios, paletas armónicas y jerarquía tipográfica.',
          },
          {
            id: '02-efectos-y-fotomontaje',
            title: 'Fotomontajes y Efectos Creativos',
            kind: 'activity',
            duration: 50,
            description: 'Crea un póster cinematográfico o portada combinando múltiples imágenes.',
          },
        ],
      },
    ],
  },
  {
    number: 4,
    id: '04-multimedia-edicion-video',
    title: '4 - Multimedia: Edición de Video y Audio',
    shortTitle: 'Video y Audio',
    description: 'Transforma clips en historias dinámicas: cortes de ritmo, transiciones, diseño sonoro y exportación.',
    icon: 'lucide:video',
    colorHex: '#E11D48',
    badgeClass: 'module-badge-m4',
    estimatedWeeks: 4,
    topics: [
      {
        id: '01-edicion-video-lineal',
        title: 'Tema 1: Línea de Tiempo y Cortes',
        description: 'El lenguaje audiovisual, ritmo narrativo y montaje básico.',
        lessons: [
          {
            id: '01-introduccion-al-video',
            title: 'Introducción al Montaje y Línea de Tiempo',
            kind: 'lesson',
            duration: 45,
            description: 'FPS, resolución, cortes limpios (J-cuts, L-cuts) y organización de tomas.',
          },
          {
            id: '02-transiciones-y-titulos',
            title: 'Transiciones, Títulos y Dinamismo',
            kind: 'lesson',
            duration: 45,
            description: 'Textos animados, transiciones cinemáticas y sincronización musical.',
          },
        ],
      },
      {
        id: '02-audio-y-proyecto',
        title: 'Tema 2: Diseño Sonoro y Proyecto Final de Video',
        description: 'Efectos de sonido, mezcla de voz y exportación para plataformas.',
        lessons: [
          {
            id: '01-diseno-sonoro-y-voz',
            title: 'Diseño Sonoro y Mezcla de Audio',
            kind: 'lesson',
            duration: 45,
            description: 'Limpieza de ruido, ecualización y ambientación sonora.',
          },
          {
            id: '02-trailer-o-cortometraje',
            title: 'Proyecto Audiovisual: Trailer o Mini-Short',
            kind: 'project',
            duration: 60,
            description: 'Edita un reel o trailer completo con música, efectos y subtítulos.',
          },
        ],
      },
    ],
  },
  {
    number: 5,
    id: '05-redes-internet',
    title: '5 - Introducción a Redes e Internet',
    shortTitle: 'Redes y Conectividad',
    description: 'Comprende cómo viajan los datos por el mundo: direcciones IP, routers, Wi-Fi, DNS y cables ethernet.',
    icon: 'lucide:wifi',
    colorHex: '#0891B2',
    badgeClass: 'module-badge-m5',
    estimatedWeeks: 5,
    topics: [
      {
        id: '01-fundamentos-conectividad',
        title: 'Tema 1: Fundamentos de Conectividad',
        description: 'Topologías, protocolos TCP/IP y direccionamiento.',
        lessons: [
          {
            id: '01-fundamentos-de-redes',
            title: 'Fundamentos de Redes y Topologías',
            kind: 'lesson',
            duration: 45,
            description: 'Qué es una red, modelo cliente-servidor y tipos de conexión (LAN/WAN).',
          },
          {
            id: '02-redes-inalambricas-wifi',
            title: 'Redes Inalámbricas y Wi-Fi',
            kind: 'lesson',
            duration: 45,
            description: 'Frecuencias 2.4 vs 5 GHz, canales, antenas y seguridad WPA3.',
          },
        ],
      },
      {
        id: '02-practicas-red-diagnostico',
        title: 'Tema 2: Diagnóstico y Configuración de Red',
        description: 'Comandos de terminal para redes y armado físico.',
        lessons: [
          {
            id: '01-internet-y-servicios-web',
            title: 'Internet, Servidores DNS y Navegación',
            kind: 'lesson',
            duration: 45,
            description: 'Cómo resuelve un nombre de dominio (DNS) hasta la carga del sitio.',
          },
          {
            id: '02-diagnostico-terminal-redes',
            title: 'Diagnóstico de Red en Terminal (ping, traceroute)',
            kind: 'lesson',
            duration: 45,
            description: 'Usa la consola para medir latencia, pérdida de paquetes y rutas de datos.',
          },
          {
            id: '03-taller-cables-y-evaluacion',
            title: 'Taller de Ponchado y Conectores RJ45',
            kind: 'assessment',
            duration: 60,
            description: 'Estándares T568A/B y evaluación de conectividad física.',
          },
        ],
      },
    ],
  },
  {
    number: 6,
    id: '06-seguridad-informatica',
    title: '6 - Seguridad Informática y Ciberseguridad',
    shortTitle: 'Ciberseguridad',
    description: 'Protégete de virus, phishing, ingeniería social y conviértete en un internauta seguro y ético.',
    icon: 'lucide:shield-check',
    colorHex: '#BE123C',
    badgeClass: 'module-badge-m6',
    estimatedWeeks: 4,
    topics: [
      {
        id: '01-amenazas-y-defensa',
        title: 'Tema 1: Amenazas Digitales y Defensas',
        description: 'Identificación de malware y mecanismos de autenticación.',
        lessons: [
          {
            id: '01-amenazas-y-malware',
            title: 'Amenazas, Malware e Ingeniería Social',
            kind: 'lesson',
            duration: 45,
            description: 'Troyanos, ransomware, phishing y cómo reconocer enlaces maliciosos.',
          },
          {
            id: '02-defensa-antivirus-firewall',
            title: 'Antivirus, Cortafuegos y Actualizaciones',
            kind: 'lesson',
            duration: 45,
            description: 'Capas de defensa en tu equipo y buenas prácticas de descarga.',
          },
        ],
      },
      {
        id: '02-privacidad-y-plan-seguridad',
        title: 'Tema 2: Privacidad y Gestión de Identidad',
        description: 'Contraseñas robustas, 2FA y huella digital.',
        lessons: [
          {
            id: '01-privacidad-y-huella-digital',
            title: 'Privacidad en Línea y Huella Digital',
            kind: 'lesson',
            duration: 45,
            description: 'Gestores de contraseñas, autenticación de dos factores (2FA) y cookies.',
          },
          {
            id: '02-auditoria-plan-seguridad',
            title: 'Auditoría y Plan de Seguridad Personal',
            kind: 'assessment',
            duration: 50,
            description: 'Audita la seguridad de tus cuentas y diseña un escudo digital personal.',
          },
        ],
      },
    ],
  },
  {
    number: 7,
    id: '07-programacion-fundamentos',
    title: '7 - Programación: Fundamentos con Python',
    shortTitle: 'Programación I (Python)',
    description: 'Aprende a pensar como un programador resolviendo problemas con variables, condicionales, bucles y funciones.',
    icon: 'lucide:code-2',
    colorHex: '#059669',
    badgeClass: 'module-badge-m7',
    estimatedWeeks: 6,
    topics: [
      {
        id: '01-primeros-pasos-variables',
        title: 'Tema 1: Lógica y Variables',
        description: 'Entorno de ejecución, sintaxis limpia y tipos de datos.',
        lessons: [
          {
            id: '01-primeros-pasos-con-python',
            title: 'Primeros Pasos con Python y print()',
            kind: 'lesson',
            duration: 45,
            description: 'Tu primer script, salida en terminal y cómo piensa un algoritmo.',
          },
          {
            id: '02-variables-y-tipos-datos',
            title: 'Variables, Tipos de Datos y Operaciones',
            kind: 'lesson',
            duration: 45,
            description: 'Strings, ints, floats, booleans y operaciones aritméticas.',
          },
        ],
      },
      {
        id: '02-estructuras-de-control',
        title: 'Tema 2: Decisiones y Bucles',
        description: 'Toma de decisiones con if-else y automatización con bucles.',
        lessons: [
          {
            id: '01-condicionales-y-decisiones',
            title: 'Condicionales (if, elif, else)',
            kind: 'lesson',
            duration: 45,
            description: 'Lógica booleana (and, or, not) y ramificación de decisiones.',
          },
          {
            id: '02-bucles-for-y-while',
            title: 'Bucles e Iteraciones (for y while)',
            kind: 'lesson',
            duration: 45,
            description: 'Repetición controlada, contadores, acumuladores y la función range().',
          },
        ],
      },
      {
        id: '03-colecciones-y-funciones',
        title: 'Tema 3: Listas, Diccionarios y Funciones',
        description: 'Estructuración modular de código para proyectos mayores.',
        lessons: [
          {
            id: '01-listas-y-colecciones',
            title: 'Listas y Diccionarios',
            kind: 'lesson',
            duration: 45,
            description: 'Almacenar y recorrer conjuntos de elementos con índices y claves.',
          },
          {
            id: '02-funciones-y-modularidad',
            title: 'Funciones y Reutilización de Código',
            kind: 'lesson',
            duration: 45,
            description: 'Definición con def, parámetros, retorno (return) y alcance de variables.',
          },
        ],
      },
    ],
  },
  {
    number: 8,
    id: '08-programacion-avanzada-proyectos',
    title: '8 - Programación II: Creación de Videojuegos y POO',
    shortTitle: 'Videojuegos y POO',
    description: 'Crea tu propio videojuego 2D con Pygame aplicando Programación Orientada a Objetos (POO).',
    icon: 'lucide:gamepad-2',
    colorHex: '#4F46E5',
    badgeClass: 'module-badge-m8',
    estimatedWeeks: 5,
    topics: [
      {
        id: '01-fundamentos-poo-y-juegos',
        title: 'Tema 1: Objetos y Motor de Juego',
        description: 'Clases, objetos, ciclo del juego (Game Loop) y eventos.',
        lessons: [
          {
            id: '01-clases-y-objetos-poo',
            title: 'Clases y Objetos en Python',
            kind: 'lesson',
            duration: 45,
            description: 'El plano (clase) y la entidad real (objeto): atributos y métodos.',
          },
          {
            id: '02-game-loop-con-pygame',
            title: 'Introducción a Pygame y el Game Loop',
            kind: 'lesson',
            duration: 45,
            description: 'Ventana de juego, FPS, manejo de eventos de teclado y mouse.',
          },
        ],
      },
      {
        id: '02-mecanicas-sprites-colisiones',
        title: 'Tema 2: Sprites, Física y Puntuación',
        description: 'Movimiento en pantalla, detección de impactos y finalización de juego.',
        lessons: [
          {
            id: '01-sprites-y-animaciones',
            title: 'Manejo de Sprites y Animaciones',
            kind: 'lesson',
            duration: 45,
            description: 'Clase pygame.sprite.Sprite, grupos de sprites y movimiento fluido.',
          },
          {
            id: '02-colisiones-y-sonidos',
            title: 'Detección de Colisiones y Efectos Sonoros',
            kind: 'lesson',
            duration: 45,
            description: 'Cálculo de choques, vida del jugador y disparadores de audio.',
          },
          {
            id: '03-juego-completo-arcade',
            title: 'Proyecto de Videojuego Arcade Completo',
            kind: 'project',
            duration: 60,
            description: 'Publica tu videojuego jugable con menú de inicio y pantalla de Game Over.',
          },
        ],
      },
    ],
  },
  {
    number: 9,
    id: '09-desarrollo-web-fundamentos',
    title: '9 - Desarrollo Web: HTML5, CSS3 y JavaScript',
    shortTitle: 'Desarrollo Web',
    description: 'Construye sitios web modernos, adaptables a celulares y con interactividad en tiempo real.',
    icon: 'lucide:globe',
    colorHex: '#65A30D',
    badgeClass: 'module-badge-m9',
    estimatedWeeks: 5,
    topics: [
      {
        id: '01-estructura-y-estilos',
        title: 'Tema 1: Estructura y Diseño Web',
        description: 'Etiquetas semánticas, cajas CSS, Flexbox y Grid.',
        lessons: [
          {
            id: '01-html5-semantico',
            title: 'Estructura Web Semántica con HTML5',
            kind: 'lesson',
            duration: 45,
            description: 'Encabezados, secciones, artículos, botones y accesibilidad web.',
          },
          {
            id: '02-css3-diseno-moderno',
            title: 'Estilos con CSS3 y Flexbox',
            kind: 'lesson',
            duration: 45,
            description: 'Colores, tipografías, espaciados y diseño de componentes con Flexbox.',
          },
          {
            id: '03-diseno-responsivo-moviles',
            title: 'Diseño Responsivo (Mobile First)',
            kind: 'lesson',
            duration: 45,
            description: 'Media queries, unidades relativas (rem, %, vw) e inspección en navegadores.',
          },
        ],
      },
      {
        id: '02-interactividad-con-js',
        title: 'Tema 2: Interactividad con JavaScript',
        description: 'Manipulación del DOM, eventos de usuario y dinamismo.',
        lessons: [
          {
            id: '01-dom-y-eventos-javascript',
            title: 'Manipulación del DOM y Eventos',
            kind: 'lesson',
            duration: 45,
            description: 'Selecciona elementos con querySelector y responde a clics e inputs.',
          },
          {
            id: '02-mini-app-interactiva',
            title: 'Proyecto Web: Mini-Aplicación Interactiva',
            kind: 'project',
            duration: 60,
            description: 'Crea una calculadora interactiva, juego de trivia o to-do list en la web.',
          },
        ],
      },
    ],
  },
  {
    number: 10,
    id: '10-bases-datos-digitales',
    title: '10 - Bases de Datos y Herramientas Digitales',
    shortTitle: 'Bases de Datos',
    description: 'Aprende cómo las grandes plataformas guardan millones de usuarios: consultas SQL, modelos relacionales y Notion.',
    icon: 'lucide:database',
    colorHex: '#D946EF',
    badgeClass: 'module-badge-m10',
    estimatedWeeks: 4,
    topics: [
      {
        id: '01-modelado-y-tablas',
        title: 'Tema 1: Modelado y Organización de Datos',
        description: 'Estructuración de información sin redundancia.',
        lessons: [
          {
            id: '01-introduccion-bases-de-datos',
            title: '¿Qué es una Base de Datos? Tablas y Claves',
            kind: 'lesson',
            duration: 45,
            description: 'Entidades, atributos, claves primarias y relaciones entre tablas.',
          },
          {
            id: '02-consultas-sql-esenciales',
            title: 'Consultas Esenciales con SQL (SELECT, WHERE)',
            kind: 'lesson',
            duration: 45,
            description: 'Filtra, ordena y extrae información valiosa de una base de datos.',
          },
        ],
      },
      {
        id: '02-herramientas-cloud-productividad',
        title: 'Tema 2: Bases de Datos No-Code y Productividad',
        description: 'Automatización y bases de datos visuales en Notion / Airtable.',
        lessons: [
          {
            id: '01-bases-de-datos-nocode',
            title: 'Bases de Datos No-Code (Notion / Airtable)',
            kind: 'lesson',
            duration: 45,
            description: 'Vistas Kanban, calendarios y fórmulas para gestión de proyectos.',
          },
          {
            id: '02-dashboard-gestion-datos',
            title: 'Taller: Construcción de un Dashboard de Datos',
            kind: 'assessment',
            duration: 50,
            description: 'Conecta registros y genera un panel de control con métricas clave.',
          },
        ],
      },
    ],
  },
  {
    number: 11,
    id: '11-inteligencia-artificial-innovacion',
    title: '11 - Inteligencia Artificial y Tecnologías del Futuro',
    shortTitle: 'Inteligencia Artificial',
    description: 'Aprende cómo funcionan las IA modernas: modelos de lenguaje, visión por computadora, prompting profesional y ética.',
    icon: 'lucide:sparkles',
    colorHex: '#14B8A6',
    badgeClass: 'module-badge-m11',
    estimatedWeeks: 4,
    topics: [
      {
        id: '01-fundamentos-de-la-ia',
        title: 'Tema 1: Fundamentos de la Inteligencia Artificial',
        description: 'Redes neuronales, datos de entrenamiento y modelos generativos.',
        lessons: [
          {
            id: '01-como-aprenden-las-maquinas',
            title: '¿Cómo Aprenden las Máquinas? (Machine Learning)',
            kind: 'lesson',
            duration: 45,
            description: 'Patrones, entrenamiento supervisado y diferencias entre algoritmo e IA.',
          },
          {
            id: '02-ingenieria-de-prompts',
            title: 'Prompting Profesional y Asistentes Virtuales',
            kind: 'lesson',
            duration: 45,
            description: 'Técnicas de contexto, role-play y cadena de pensamiento (CoT).',
          },
        ],
      },
      {
        id: '02-creatividad-y-etica-ia',
        title: 'Tema 2: Creatividad Computacional y Ética',
        description: 'Generación de imágenes, código asistido y responsabilidad digital.',
        lessons: [
          {
            id: '01-generacion-multimedia-ia',
            title: 'Generación de Arte, Audio y Código con IA',
            kind: 'lesson',
            duration: 45,
            description: 'Modelos de difusión, síntesis de voz y copilotos de programación.',
          },
          {
            id: '02-debate-y-retos-eticos',
            title: 'Retos Éticos, Sesgos y Futuro de la IA',
            kind: 'assessment',
            duration: 45,
            description: 'Deepfakes, derechos de autor y uso crítico y responsable de la tecnología.',
          },
        ],
      },
    ],
  },
  {
    number: 12,
    id: '12-proyecto-final-portafolio',
    title: '12 - Proyecto Final Integrador y Portafolio Digital',
    shortTitle: 'Proyecto Final y Portafolio',
    description: 'Integra todo lo aprendido en un proyecto personal real, súbelo a GitHub y crea tu portafolio profesional.',
    icon: 'lucide:rocket',
    colorHex: '#F97316',
    badgeClass: 'module-badge-m12',
    estimatedWeeks: 5,
    topics: [
      {
        id: '01-herramientas-profesionales',
        title: 'Tema 1: Control de Versiones con Git y GitHub',
        description: 'El flujo de trabajo de la industria tecnológica.',
        lessons: [
          {
            id: '01-git-y-github-esencial',
            title: 'Control de Versiones con Git y GitHub',
            kind: 'lesson',
            duration: 45,
            description: 'Repositorios, commits, ramas (branches) y publicación en la nube.',
          },
          {
            id: '02-portafolio-web-personal',
            title: 'Diseño y Publicación de tu Portafolio Web',
            kind: 'lesson',
            duration: 45,
            description: 'Presenta tus proyectos con capturas, enlaces funcionales y biografía técnica.',
          },
        ],
      },
      {
        id: '02-sprint-y-presentacion-final',
        title: 'Tema 2: Sprint de Desarrollo y Graduación',
        description: 'Planificación ágil, demo en vivo y retroalimentación.',
        lessons: [
          {
            id: '01-sprint-de-desarrollo',
            title: 'Sprint de Desarrollo del Proyecto Integrador',
            kind: 'project',
            duration: 60,
            description: 'Construcción guiada resolviendo bugs y puliendo la experiencia de usuario.',
          },
          {
            id: '02-pitch-y-demostracion',
            title: 'Pitch y Demostración en Vivo',
            kind: 'activity',
            duration: 60,
            description: 'Presenta tu solución en 3 minutos ante tus compañeros y profesor.',
          },
          {
            id: '03-graduacion-y-certificacion',
            title: 'Graduación y Hoja de Ruta Tecnológica',
            kind: 'assessment',
            duration: 45,
            description: 'Evaluación final de competencias, entrega de reconocimientos y próximos pasos.',
          },
        ],
      },
    ],
  },
];

/**
 * Total global calculado de lecciones del plan curricular
 */
export const TOTAL_CURRICULUM_LESSONS = CURRICULUM_MODULES.reduce((acc, mod) => {
  return acc + mod.topics.reduce((tAcc, topic) => tAcc + topic.lessons.length, 0);
}, 0);

export interface FlatCurriculumLesson extends CurriculumLessonMeta {
  moduleNumber: number;
  moduleTitle: string;
  moduleShortTitle: string;
  topicTitle: string;
  slug: string;
}

export function getAllCurriculumLessons(): FlatCurriculumLesson[] {
  const list: FlatCurriculumLesson[] = [];
  for (const mod of CURRICULUM_MODULES) {
    for (const topic of mod.topics) {
      for (const lesson of topic.lessons) {
        list.push({
          ...lesson,
          moduleNumber: mod.number,
          moduleTitle: mod.title,
          moduleShortTitle: mod.shortTitle,
          topicTitle: topic.title,
          slug: `${mod.id}/${topic.id}/${lesson.id}`,
        });
      }
    }
  }
  return list;
}

export function findLessonBySlug(slug: string): FlatCurriculumLesson | undefined {
  const normalized = slug.replace(/^\//, "").replace(/\/index$/, "");
  return getAllCurriculumLessons().find(l => l.slug === normalized);
}

export function findModuleByNumber(num: number): CurriculumModuleMeta | undefined {
  return CURRICULUM_MODULES.find(m => m.number === num);
}
