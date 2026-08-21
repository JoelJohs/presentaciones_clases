import type { ProgressRelation } from './types';

/** Mapa centralizado de correspondencias semánticas de todos los checkboxes del Plan de Estudio */
export const PROGRESS_RELATIONS: ProgressRelation[] = [
  // Módulo 1: Fundamentos y Mantenimiento de Equipos de Cómputo
  {
    studyPlanId: 'mod-01.intro.hardware-software',
    kind: 'lesson',
    title: 'Hardware y Software',
    lessonSlug: '01-fundamentos-mantenimiento/01-introduccion-computacion/01-hardware-y-software',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-01.intro.sistema-operativo',
    kind: 'lesson',
    title: 'El Sistema Operativo',
    lessonSlug: '01-fundamentos-mantenimiento/01-introduccion-computacion/02-el-sistema-operativo',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-01.hardware.componentes-internos',
    kind: 'lesson',
    title: 'Componentes Internos',
    lessonSlug: '01-fundamentos-mantenimiento/02-hardware-mantenimiento/01-componentes-internos',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-01.hardware.mantenimiento-formateo',
    kind: 'lesson',
    title: 'Mantenimiento y Formateo',
    lessonSlug: '01-fundamentos-mantenimiento/02-hardware-mantenimiento/02-mantenimiento-y-formateo',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-01.evaluacion.resolucion-problemas',
    kind: 'assessment',
    title: 'Evaluación y Resolución de Problemas',
    lessonSlug: '01-fundamentos-mantenimiento/03-evaluacion-troubleshooting/01-evaluacion-resolucion-problemas',
    confidence: 'EXACTA',
  },

  // Módulo 2: Ofimática en la Nube
  {
    studyPlanId: 'mod-02.docs-sheets.google-docs',
    kind: 'lesson',
    title: 'Google Docs: Procesamiento de Textos',
    lessonSlug: '02-ofimatica-en-la-nube/01-google-docs-y-sheets/01-google-docs',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-02.docs-sheets.google-sheets',
    kind: 'lesson',
    title: 'Google Sheets: Hojas de Cálculo',
    lessonSlug: '02-ofimatica-en-la-nube/01-google-docs-y-sheets/02-google-sheets',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-02.presentaciones.google-slides',
    kind: 'lesson',
    title: 'PowerPoint: Presentaciones',
    lessonSlug: '02-ofimatica-en-la-nube/02-presentaciones-proyecto/01-powerpoint',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-02.presentaciones.proyecto-integrador',
    kind: 'activity',
    title: 'Proyecto Integrador de Ofimática',
    lessonSlug: '02-ofimatica-en-la-nube/02-presentaciones-proyecto/02-proyecto-integrador',
    confidence: 'EXACTA',
  },

  // Módulo 3: Multimedia — Edición de Imagen
  {
    studyPlanId: 'mod-03.gimp.interfaz-herramientas',
    kind: 'lesson',
    title: 'Interfaz y Herramientas Básicas',
    lessonSlug: '03-multimedia-edicion-imagen/01-fundamentos-gimp/01-interfaz-herramientas',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-03.gimp.retoque-correccion',
    kind: 'lesson',
    title: 'Retoque y Corrección',
    lessonSlug: '03-multimedia-edicion-imagen/01-fundamentos-gimp/02-retoque-correccion',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-03.diseno.diseno-grafico-basico',
    kind: 'lesson',
    title: 'Diseño Gráfico Básico',
    lessonSlug: '03-multimedia-edicion-imagen/02-diseno-efectos/01-diseno-grafico-basico',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-03.diseno.efectos-montajes',
    kind: 'lesson',
    title: 'Efectos Especiales y Montajes',
    lessonSlug: '03-multimedia-edicion-imagen/02-diseno-efectos/02-efectos-montajes',
    confidence: 'EXACTA',
  },

  // Módulo 4: Multimedia — Edición de Video
  {
    studyPlanId: 'mod-04.video.introduccion-edicion',
    kind: 'lesson',
    title: 'Introducción a la Edición de Video',
    lessonSlug: '04-multimedia-edicion-video/01-edicion-basica-video/01-introduccion-edicion',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-04.video.transiciones-efectos',
    kind: 'lesson',
    title: 'Transiciones y Efectos',
    lessonSlug: '04-multimedia-edicion-video/01-edicion-basica-video/02-transiciones-efectos',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-04.audio.audio-en-video',
    kind: 'lesson',
    title: 'Audio en Video',
    lessonSlug: '04-multimedia-edicion-video/02-audio-proyecto-final/01-audio-en-video',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-04.audio.proyecto-final-video',
    kind: 'activity',
    title: 'Proyecto Final de Video',
    lessonSlug: '04-multimedia-edicion-video/02-audio-proyecto-final/02-proyecto-final-video',
    confidence: 'EXACTA',
  },

  // Módulo 5: Introducción a Redes e Internet
  {
    studyPlanId: 'mod-05.redes.fundamentos-redes',
    kind: 'lesson',
    title: 'Fundamentos de Redes',
    lessonSlug: '05-redes-internet/01-fundamentos-redes/01-fundamentos-redes',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-05.redes.redes-inalambricas',
    kind: 'lesson',
    title: 'Redes Inalámbricas y Conectividad',
    lessonSlug: '05-redes-internet/01-fundamentos-redes/02-redes-inalambricas',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-05.internet.internet-servicios',
    kind: 'lesson',
    title: 'Internet y Servicios en Línea',
    lessonSlug: '05-redes-internet/02-internet-practicas/01-internet-servicios',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-05.internet.configuracion-practica',
    kind: 'lesson',
    title: 'Configuración de Red Práctica',
    lessonSlug: '05-redes-internet/02-internet-practicas/02-configuracion-red',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-05.internet.ponchado-cables-evaluacion',
    kind: 'assessment',
    title: 'Ponchado de Cables y Evaluación',
    lessonSlug: '05-redes-internet/02-internet-practicas/03-ponchado-cables-evaluacion',
    confidence: 'EXACTA',
  },

  // Módulo 6: Seguridad Informática
  {
    studyPlanId: 'mod-06.amenazas.amenazas-vulnerabilidades',
    kind: 'lesson',
    title: 'Amenazas y Vulnerabilidades',
    lessonSlug: '06-seguridad-informatica/01-amenazas-proteccion/01-amenazas-vulnerabilidades',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-06.amenazas.proteccion-antivirus',
    kind: 'lesson',
    title: 'Protección y Antivirus',
    lessonSlug: '06-seguridad-informatica/01-amenazas-proteccion/02-proteccion-antivirus',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-06.privacidad.seguridad-linea-privacidad',
    kind: 'lesson',
    title: 'Seguridad en Línea y Privacidad',
    lessonSlug: '06-seguridad-informatica/02-privacidad-evaluacion/01-seguridad-linea-privacidad',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-06.privacidad.evaluacion-plan-seguridad',
    kind: 'assessment',
    title: 'Evaluación y Plan de Seguridad',
    lessonSlug: '06-seguridad-informatica/02-privacidad-evaluacion/02-evaluacion-plan-seguridad',
    confidence: 'EXACTA',
  },

  // Módulo 7: Programación — Fundamentos
  {
    studyPlanId: 'mod-07.intro.introduccion-programacion',
    kind: 'lesson',
    title: 'Introducción a la Programación',
    lessonSlug: '07-programacion-fundamentos/01-introduccion-variables/01-introduccion-programacion',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-07.intro.variables-tipos-datos',
    kind: 'lesson',
    title: 'Variables y Tipos de Datos',
    lessonSlug: '07-programacion-fundamentos/01-introduccion-variables/02-variables-tipos-datos',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-07.control.entrada-datos-condicionales',
    kind: 'lesson',
    title: 'Entrada de Datos y Condicionales',
    lessonSlug: '07-programacion-fundamentos/02-estructuras-control/01-entrada-condicionales',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-07.control.bucles-iteraciones',
    kind: 'lesson',
    title: 'Bucles e Iteraciones',
    lessonSlug: '07-programacion-fundamentos/02-estructuras-control/02-bucles-iteraciones',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-07.colecciones.listas-colecciones',
    kind: 'lesson',
    title: 'Listas y Colecciones',
    lessonSlug: '07-programacion-fundamentos/03-colecciones-funciones/01-listas-colecciones',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-07.colecciones.funciones',
    kind: 'lesson',
    title: 'Funciones',
    lessonSlug: '07-programacion-fundamentos/03-colecciones-funciones/02-funciones',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-07.archivos.manejo-errores-archivos',
    kind: 'lesson',
    title: 'Manejo de Errores y Archivos',
    lessonSlug: '07-programacion-fundamentos/04-archivos-proyecto/01-errores-archivos',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-07.archivos.proyecto-integrador-programacion',
    kind: 'activity',
    title: 'Proyecto Integrador de Programación',
    lessonSlug: '07-programacion-fundamentos/04-archivos-proyecto/02-proyecto-integrador',
    confidence: 'EXACTA',
  },

  // Módulo 8: Programación Avanzada y Proyectos
  {
    studyPlanId: 'mod-08.pygame.introduccion-pygame',
    kind: 'lesson',
    title: 'Introducción a Pygame',
    lessonSlug: '08-programacion-avanzada-proyectos/01-pygame-juegos/01-introduccion-pygame',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-08.pygame.sprites-colisiones',
    kind: 'lesson',
    title: 'Sprites y Colisiones',
    lessonSlug: '08-programacion-avanzada-proyectos/01-pygame-juegos/02-sprites-colisiones',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-08.pygame.proyecto-juego-completo',
    kind: 'activity',
    title: 'Proyecto de Juego Completo',
    lessonSlug: '08-programacion-avanzada-proyectos/01-pygame-juegos/03-proyecto-juego',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-08.web.introduccion-html-css',
    kind: 'lesson',
    title: 'Introducción a HTML y CSS',
    lessonSlug: '08-programacion-avanzada-proyectos/02-desarrollo-web/01-html-css',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-08.web.desarrollo-web-intermedio',
    kind: 'lesson',
    title: 'Desarrollo Web Intermedio',
    lessonSlug: '08-programacion-avanzada-proyectos/02-desarrollo-web/02-web-intermedio',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-08.web.proyecto-web-final',
    kind: 'activity',
    title: 'Proyecto Web Final',
    lessonSlug: '08-programacion-avanzada-proyectos/02-desarrollo-web/03-proyecto-web',
    confidence: 'EXACTA',
  },

  // Módulo 9: Herramientas Digitales Avanzadas
  {
    studyPlanId: 'mod-09.productividad.productividad-digital',
    kind: 'lesson',
    title: 'Productividad Digital',
    lessonSlug: '09-herramientas-digitales-avanzadas/01-productividad-colaboracion/01-productividad-digital',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-09.productividad.herramientas-colaborativas',
    kind: 'lesson',
    title: 'Herramientas Colaborativas',
    lessonSlug: '09-herramientas-digitales-avanzadas/01-productividad-colaboracion/02-herramientas-colaborativas',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-09.bd.introduccion-bases-datos',
    kind: 'lesson',
    title: 'Introducción a Bases de Datos',
    lessonSlug: '09-herramientas-digitales-avanzadas/02-bases-datos-evaluacion/01-bases-datos',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-09.bd.evaluacion-sistema-productividad',
    kind: 'assessment',
    title: 'Evaluación y Sistema de Productividad',
    lessonSlug: '09-herramientas-digitales-avanzadas/02-bases-datos-evaluacion/02-evaluacion-productividad',
    confidence: 'EXACTA',
  },

  // Módulo 10: Proyecto Final Integrador
  {
    studyPlanId: 'mod-10.planificacion.planificacion-proyecto',
    kind: 'activity',
    title: 'Planificación del Proyecto',
    lessonSlug: '10-proyecto-final-integrador/01-planificacion-desarrollo/01-planificacion',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-10.planificacion.desarrollo-fase-1',
    kind: 'activity',
    title: 'Desarrollo — Fase 1',
    lessonSlug: '10-proyecto-final-integrador/01-planificacion-desarrollo/02-desarrollo-fase-1',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-10.planificacion.desarrollo-fase-2',
    kind: 'activity',
    title: 'Desarrollo — Fase 2',
    lessonSlug: '10-proyecto-final-integrador/01-planificacion-desarrollo/03-desarrollo-fase-2',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-10.planificacion.desarrollo-fase-3',
    kind: 'activity',
    title: 'Desarrollo — Fase 3',
    lessonSlug: '10-proyecto-final-integrador/01-planificacion-desarrollo/04-desarrollo-fase-3',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-10.cierre.presentacion-proyectos',
    kind: 'activity',
    title: 'Presentación de Proyectos',
    lessonSlug: '10-proyecto-final-integrador/02-presentacion-cierre/01-presentacion-proyectos',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-10.cierre.evaluacion-final-cierre',
    kind: 'assessment',
    title: 'Evaluación Final y Cierre',
    lessonSlug: '10-proyecto-final-integrador/02-presentacion-cierre/02-evaluacion-final',
    confidence: 'EXACTA',
  },

  // Módulo 11: Herramientas Profesionales y Portfolio
  {
    studyPlanId: 'mod-11.herramientas.git-github',
    kind: 'lesson',
    title: 'Git y GitHub',
    lessonSlug: '11-herramientas-profesionales-portfolio/01-herramientas-profesionales/01-git-github',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-11.herramientas.automatizacion-python',
    kind: 'lesson',
    title: 'Automatización con Python',
    lessonSlug: '11-herramientas-profesionales-portfolio/01-herramientas-profesionales/02-automatizacion-python',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-11.herramientas.apis-servicios-web',
    kind: 'lesson',
    title: 'APIs y Servicios Web',
    lessonSlug: '11-herramientas-profesionales-portfolio/01-herramientas-profesionales/03-apis-servicios',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-11.proyecto.build-sprint-integracion',
    kind: 'activity',
    title: 'Build Sprint — Integración',
    lessonSlug: '11-herramientas-profesionales-portfolio/02-proyecto-cierre/01-build-sprint',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-11.proyecto.proyecto-personal',
    kind: 'activity',
    title: 'Proyecto Personal',
    lessonSlug: '11-herramientas-profesionales-portfolio/02-proyecto-cierre/02-proyecto-personal',
    confidence: 'EXACTA',
  },
  {
    studyPlanId: 'mod-11.proyecto.presentacion-final-graduacion',
    kind: 'informational',
    title: 'Presentación Final y Graduación',
    lessonSlug: '11-herramientas-profesionales-portfolio/02-proyecto-cierre/03-presentacion-graduacion',
    confidence: 'EXACTA',
  },
];

/** Mapa de equivalencias entre IDs posicionales legados (mX-Y-Z o st-X-Y-Z) e IDs semánticos estables */
export const LEGACY_PROGRESS_ID_MAP: Record<string, string> = {
  'm1-1-1': 'mod-01.intro.hardware-software',
  'st-1-1-1': 'mod-01.intro.hardware-software',
  'm1-1-2': 'mod-01.intro.sistema-operativo',
  'st-1-1-2': 'mod-01.intro.sistema-operativo',
  'm1-2-1': 'mod-01.hardware.componentes-internos',
  'st-1-2-1': 'mod-01.hardware.componentes-internos',
  'm1-2-2': 'mod-01.hardware.mantenimiento-formateo',
  'st-1-2-2': 'mod-01.hardware.mantenimiento-formateo',
  'm1-3-1': 'mod-01.evaluacion.resolucion-problemas',
  'st-1-3-1': 'mod-01.evaluacion.resolucion-problemas',

  'm2-1-1': 'mod-02.docs-sheets.google-docs',
  'st-2-1-1': 'mod-02.docs-sheets.google-docs',
  'm2-1-2': 'mod-02.docs-sheets.google-sheets',
  'st-2-1-2': 'mod-02.docs-sheets.google-sheets',
  'm2-2-1': 'mod-02.presentaciones.google-slides',
  'st-2-2-1': 'mod-02.presentaciones.google-slides',
  'm2-2-2': 'mod-02.presentaciones.proyecto-integrador',
  'st-2-2-2': 'mod-02.presentaciones.proyecto-integrador',

  'm3-1-1': 'mod-03.gimp.interfaz-herramientas',
  'st-3-1-1': 'mod-03.gimp.interfaz-herramientas',
  'm3-1-2': 'mod-03.gimp.retoque-correccion',
  'st-3-1-2': 'mod-03.gimp.retoque-correccion',
  'm3-2-1': 'mod-03.diseno.diseno-grafico-basico',
  'st-3-2-1': 'mod-03.diseno.diseno-grafico-basico',
  'm3-2-2': 'mod-03.diseno.efectos-montajes',
  'st-3-2-2': 'mod-03.diseno.efectos-montajes',

  'm4-1-1': 'mod-04.video.introduccion-edicion',
  'st-4-1-1': 'mod-04.video.introduccion-edicion',
  'm4-1-2': 'mod-04.video.transiciones-efectos',
  'st-4-1-2': 'mod-04.video.transiciones-efectos',
  'm4-2-1': 'mod-04.audio.audio-en-video',
  'st-4-2-1': 'mod-04.audio.audio-en-video',
  'm4-2-2': 'mod-04.audio.proyecto-final-video',
  'st-4-2-2': 'mod-04.audio.proyecto-final-video',

  'm5-1-1': 'mod-05.redes.fundamentos-redes',
  'st-5-1-1': 'mod-05.redes.fundamentos-redes',
  'm5-1-2': 'mod-05.redes.redes-inalambricas',
  'st-5-1-2': 'mod-05.redes.redes-inalambricas',
  'm5-2-1': 'mod-05.internet.internet-servicios',
  'st-5-2-1': 'mod-05.internet.internet-servicios',
  'm5-2-2': 'mod-05.internet.configuracion-practica',
  'st-5-2-2': 'mod-05.internet.configuracion-practica',
  'm5-2-3': 'mod-05.internet.ponchado-cables-evaluacion',
  'st-5-2-3': 'mod-05.internet.ponchado-cables-evaluacion',

  'm6-1-1': 'mod-06.amenazas.amenazas-vulnerabilidades',
  'st-6-1-1': 'mod-06.amenazas.amenazas-vulnerabilidades',
  'm6-1-2': 'mod-06.amenazas.proteccion-antivirus',
  'st-6-1-2': 'mod-06.amenazas.proteccion-antivirus',
  'm6-2-1': 'mod-06.privacidad.seguridad-linea-privacidad',
  'st-6-2-1': 'mod-06.privacidad.seguridad-linea-privacidad',
  'm6-2-2': 'mod-06.privacidad.evaluacion-plan-seguridad',
  'st-6-2-2': 'mod-06.privacidad.evaluacion-plan-seguridad',

  'm7-1-1': 'mod-07.intro.introduccion-programacion',
  'st-7-1-1': 'mod-07.intro.introduccion-programacion',
  'm7-1-2': 'mod-07.intro.variables-tipos-datos',
  'st-7-1-2': 'mod-07.intro.variables-tipos-datos',
  'm7-2-1': 'mod-07.control.entrada-datos-condicionales',
  'st-7-2-1': 'mod-07.control.entrada-datos-condicionales',
  'm7-2-2': 'mod-07.control.bucles-iteraciones',
  'st-7-2-2': 'mod-07.control.bucles-iteraciones',
  'm7-3-1': 'mod-07.colecciones.listas-colecciones',
  'st-7-3-1': 'mod-07.colecciones.listas-colecciones',
  'm7-3-2': 'mod-07.colecciones.funciones',
  'st-7-3-2': 'mod-07.colecciones.funciones',
  'm7-4-1': 'mod-07.archivos.manejo-errores-archivos',
  'st-7-4-1': 'mod-07.archivos.manejo-errores-archivos',
  'm7-4-2': 'mod-07.archivos.proyecto-integrador-programacion',
  'st-7-4-2': 'mod-07.archivos.proyecto-integrador-programacion',

  'm8-1-1': 'mod-08.pygame.introduccion-pygame',
  'st-8-1-1': 'mod-08.pygame.introduccion-pygame',
  'm8-1-2': 'mod-08.pygame.sprites-colisiones',
  'st-8-1-2': 'mod-08.pygame.sprites-colisiones',
  'm8-1-3': 'mod-08.pygame.proyecto-juego-completo',
  'st-8-1-3': 'mod-08.pygame.proyecto-juego-completo',
  'm8-2-1': 'mod-08.web.introduccion-html-css',
  'st-8-2-1': 'mod-08.web.introduccion-html-css',
  'm8-2-2': 'mod-08.web.desarrollo-web-intermedio',
  'st-8-2-2': 'mod-08.web.desarrollo-web-intermedio',
  'm8-2-3': 'mod-08.web.proyecto-web-final',
  'st-8-2-3': 'mod-08.web.proyecto-web-final',

  'm9-1-1': 'mod-09.productividad.productividad-digital',
  'st-9-1-1': 'mod-09.productividad.productividad-digital',
  'm9-1-2': 'mod-09.productividad.herramientas-colaborativas',
  'st-9-1-2': 'mod-09.productividad.herramientas-colaborativas',
  'm9-2-1': 'mod-09.bd.introduccion-bases-datos',
  'st-9-2-1': 'mod-09.bd.introduccion-bases-datos',
  'm9-2-2': 'mod-09.bd.evaluacion-sistema-productividad',
  'st-9-2-2': 'mod-09.bd.evaluacion-sistema-productividad',

  'm10-1-1': 'mod-10.planificacion.planificacion-proyecto',
  'st-10-1-1': 'mod-10.planificacion.planificacion-proyecto',
  'm10-1-2': 'mod-10.planificacion.desarrollo-fase-1',
  'st-10-1-2': 'mod-10.planificacion.desarrollo-fase-1',
  'm10-1-3': 'mod-10.planificacion.desarrollo-fase-2',
  'st-10-1-3': 'mod-10.planificacion.desarrollo-fase-2',
  'm10-1-4': 'mod-10.planificacion.desarrollo-fase-3',
  'st-10-1-4': 'mod-10.planificacion.desarrollo-fase-3',
  'm10-2-1': 'mod-10.cierre.presentacion-proyectos',
  'st-10-2-1': 'mod-10.cierre.presentacion-proyectos',
  'm10-2-2': 'mod-10.cierre.evaluacion-final-cierre',
  'st-10-2-2': 'mod-10.cierre.evaluacion-final-cierre',

  'm11-1-1': 'mod-11.herramientas.git-github',
  'st-11-1-1': 'mod-11.herramientas.git-github',
  'm11-1-2': 'mod-11.herramientas.automatizacion-python',
  'st-11-1-2': 'mod-11.herramientas.automatizacion-python',
  'm11-1-3': 'mod-11.herramientas.apis-servicios-web',
  'st-11-1-3': 'mod-11.herramientas.apis-servicios-web',
  'm11-2-1': 'mod-11.proyecto.build-sprint-integracion',
  'st-11-2-1': 'mod-11.proyecto.build-sprint-integracion',
  'm11-2-2': 'mod-11.proyecto.proyecto-personal',
  'st-11-2-2': 'mod-11.proyecto.proyecto-personal',
  'm11-2-3': 'mod-11.proyecto.presentacion-final-graduacion',
  'st-11-2-3': 'mod-11.proyecto.presentacion-final-graduacion',
};

// ==========================================
// Índices Derivados Privados para O(1)
// ==========================================

const relationMap = new Map<string, ProgressRelation>();
const reverseSlugMap = new Map<string, string[]>();

for (const relation of PROGRESS_RELATIONS) {
  relationMap.set(relation.studyPlanId, relation);
  if (relation.lessonSlug) {
    const list = reverseSlugMap.get(relation.lessonSlug) ?? [];
    list.push(relation.studyPlanId);
    reverseSlugMap.set(relation.lessonSlug, list);
  }
}

// ==========================================
// Consultas y Utilidades del Mapa Semántico
// ==========================================

/** Busca una relación semántica por su ID estable de Plan de Estudio */
export function getRelationByStudyPlanId(id: string): ProgressRelation | undefined {
  if (!id || typeof id !== 'string') return undefined;
  const canonicalId = translateLegacyId(id);
  return relationMap.get(canonicalId);
}

/** Devuelve el slug de lección asociado a un ID del Plan de Estudio si existe */
export function getLessonSlugForStudyPlanId(id: string): string | undefined {
  const rel = getRelationByStudyPlanId(id);
  return rel?.lessonSlug;
}

/** Devuelve todos los IDs del Plan de Estudio asociados a un slug de lección determinado (Búsqueda Inversa) */
export function getStudyPlanIdsForLessonSlug(slug: string): string[] {
  if (!slug || typeof slug !== 'string') return [];
  const matches = reverseSlugMap.get(slug);
  return matches ? [...matches] : [];
}

/** Indica si un elemento del Plan de Estudio tiene respaldo en una lección MDX real */
export function isLessonBackedItem(id: string): boolean {
  const rel = getRelationByStudyPlanId(id);
  return Boolean(rel && rel.lessonSlug && rel.confidence === 'EXACTA');
}

/** Traduce un ID posicional heredado (ej. 'm1-1-1' o 'st-1-1-1') a su ID semántico estable ('mod-01.intro.hardware-software') */
export function translateLegacyId(id: string): string {
  if (!id || typeof id !== 'string') return id;
  return LEGACY_PROGRESS_ID_MAP[id] ?? id;
}
