export interface PlanClase {
  numero: number;
  titulo: string;
  descripcion: string;
  tipo?: 'evaluacion' | 'proyecto' | 'laboratorio' | 'practica';
}

export interface PlanModulo {
  numero: number;
  numeroStr: string;
  titulo: string;
  semanas: number;
  semanaInicio: number;
  semanaFin: number;
  rangoSemanas: string;
  horasSemana: number;
  colorHex: string;
  icon: string;
  clases: PlanClase[];
}

const RAW_MODULOS = [
  {
    numero: 1,
    numeroStr: '01',
    titulo: 'Hardware, Sistemas Operativos y Software de Base',
    semanas: 5,
    horasSemana: 4,
    colorHex: '#0D9488',
    icon: 'lucide:cpu',
    clases: [
      {
        numero: 1,
        titulo: 'Arquitectura de Hardware y Componentes Físicos',
        descripcion: 'Identifica el procesador (CPU), memoria RAM, almacenamiento (HDD y SSD), placa madre y fuentes de poder. Reconoce y conecta componentes físicos de un equipo en el aula.',
      },
      {
        numero: 2,
        titulo: 'Sistemas Operativos y Software',
        descripcion: 'Analiza la función del sistema operativo como administrador de hardware y aplicaciones. Prepara medios de instalación booteables, particiona almacenamiento e instala un sistema operativo en equipos del laboratorio.',
      },
      {
        numero: 3,
        titulo: 'Línea de Comandos y Terminal (CLI)',
        descripcion: 'Opera la terminal de comandos: navegación de rutas (cd, ls), manipulación de archivos y directorios (mkdir, rm, cp), permisos de acceso y gestión de paquetes con gestores de software.',
      },
      {
        numero: 4,
        titulo: 'Diagnóstico y Mantenimiento del Sistema',
        descripcion: 'Monitorea el uso de procesador, memoria y procesos en ejecución. Diagnostica el estado de salud de unidades de almacenamiento y resuelve errores frecuentes de inicio.',
      },
      {
        numero: 5,
        titulo: 'Configuración del Entorno de Desarrollo y Evaluación 1',
        descripcion: 'Instala editores de código, extensiones de trabajo y atajos de teclado. Resuelve en el aula la evaluación práctica y teórica del módulo.',
      },
    ],
  },
  {
    numero: 2,
    numeroStr: '02',
    titulo: 'Productividad, Ofimática y Colaboración en la Nube',
    semanas: 4,
    horasSemana: 4,
    colorHex: '#D97706',
    icon: 'lucide:file-spreadsheet',
    clases: [
      {
        numero: 6,
        titulo: 'Procesamiento de Texto y Documentación Técnica',
        descripcion: 'Aplica formato formal a documentos: tablas de contenido automáticas, estilos tipográficos estructurados, encabezados, citas bibliográficas y edición colaborativa con control de cambios.',
      },
      {
        numero: 7,
        titulo: 'Hojas de Cálculo I: Lógica y Fórmulas',
        descripcion: 'Organiza datos en celdas, tipos de datos, operaciones aritméticas, fórmulas condicionales (SI / IF), operadores lógicos y reglas de formato condicional.',
      },
      {
        numero: 8,
        titulo: 'Hojas de Cálculo II: Gestión y Análisis de Datos',
        descripcion: 'Aplica funciones de búsqueda y referencia (BUSCARV / VLOOKUP), filtros, ordenamiento multinivel, tablas dinámicas y generación de gráficos estadísticos.',
      },
      {
        numero: 9,
        titulo: 'Presentaciones Técnicas y Proyecto de Productividad',
        descripcion: 'Diseña diapositivas directas con apoyo visual y síntesis de contenido. Desarrolla y expone en clase un proyecto con propuesta formal, presupuesto automatizado y defensa oral.',
      },
    ],
  },
  {
    numero: 3,
    numeroStr: '03',
    titulo: 'Multimedia Práctica: Imagen y Video',
    semanas: 4,
    horasSemana: 4,
    colorHex: '#7C3AED',
    icon: 'lucide:image',
    clases: [
      {
        numero: 10,
        titulo: 'Edición Gráfica I: Capas y Retoque Digital',
        descripcion: 'Trabaja con resoluciones, mapas de bits, capas independientes, herramientas de selección precisa, recorte, remoción de fondos y exportación en formatos PNG, JPG y WebP.',
      },
      {
        numero: 11,
        titulo: 'Edición Gráfica II: Composición y Gráficos Digitales',
        descripcion: 'Combina tipografías, paletas cromáticas y elementos gráficos para diseñar piezas de comunicación visual, miniaturas y material promocional.',
      },
      {
        numero: 12,
        titulo: 'Edición de Video I: Línea de Tiempo y Montaje',
        descripcion: 'Configura proyectos de video atendiendo a resolución y tasa de cuadros (FPS). Realiza cortes de precisión, organiza tomas y sincroniza pistas de audio en el aula.',
      },
      {
        numero: 13,
        titulo: 'Edición de Video II: Títulos, Transiciones y Render',
        descripcion: 'Integra animaciones de texto, transiciones funcionales, balance de niveles de audio y renderizado optimizado para plataformas digitales.',
      },
    ],
  },
  {
    numero: 4,
    numeroStr: '04',
    titulo: 'Redes, Conectividad y Seguridad Informática',
    semanas: 3,
    horasSemana: 4,
    colorHex: '#0891B2',
    icon: 'lucide:wifi',
    clases: [
      {
        numero: 14,
        titulo: 'Fundamentos de Redes y Tráfico en Internet',
        descripcion: 'Analiza el modelo cliente-servidor, direccionamiento IP público y privado, resolución de nombres (DNS), enrutadores y comandos de diagnóstico de red (ping, traceroute).',
      },
      {
        numero: 15,
        titulo: 'Amenazas Digitales y Ciberseguridad',
        descripcion: 'Identifica vectores de ataque: código malicioso, ataques de ingeniería social, suplantación de identidad (phishing) y fraudes en plataformas digitales.',
      },
      {
        numero: 16,
        titulo: 'Privacidad, Autenticación y Evaluación 2',
        descripcion: 'Configura contraseñas seguras, gestores de claves y autenticación de dos factores (2FA). Audita la huella digital personal y resuelve la evaluación del módulo en el aula.',
      },
    ],
  },
  {
    numero: 5,
    numeroStr: '05',
    titulo: 'Programación I: Lógica Algorítmica y Python',
    semanas: 8,
    horasSemana: 4,
    colorHex: '#059669',
    icon: 'lucide:terminal',
    clases: [
      {
        numero: 17,
        titulo: 'Lógica Computacional y Primeros Scripts',
        descripcion: 'Traduce secuencias lógicas a código ejecutable. Utiliza salida de consola (print), captura de datos por teclado (input), variables y tipos primitivos (texto, enteros, flotantes).',
      },
      {
        numero: 18,
        titulo: 'Estructuras de Control Condicional',
        descripcion: 'Implementa evaluaciones booleanas y operadores de comparación mediante bloques if, elif y else para dirigir el flujo de ejecución del programa.',
      },
      {
        numero: 19,
        titulo: 'Estructuras de Repetición (Bucles)',
        descripcion: 'Construye ciclos iterativos con while y for. Maneja rangos numéricos (range), acumuladores, contadores y condiciones de parada para evitar bucles infinitos.',
      },
      {
        numero: 20,
        titulo: 'Estructuras de Datos: Listas',
        descripcion: 'Almacena múltiples elementos en listas indexadas. Modifica listas mediante inserción (append), extracción ordenada y recorrido con bucles.',
      },
      {
        numero: 21,
        titulo: 'Estructuras Clave-Valor: Diccionarios',
        descripcion: 'Modela datos estructurados en diccionarios con pares clave-valor. Construye registros de información, catálogos y consultas organizadas.',
      },
      {
        numero: 22,
        titulo: 'Modularidad: Funciones Reutilizables',
        descripcion: 'Declara funciones con la palabra clave def, parámetros de entrada y retorno de resultados (return). Organiza el código en módulos limpios y legibles.',
      },
      {
        numero: 23,
        titulo: 'Persistencia de Archivos y Control de Errores',
        descripcion: 'Previene detenciones inesperadas mediante bloques try y except. Lee y escribe información persistente en disco en formatos de texto plano y JSON.',
      },
      {
        numero: 24,
        titulo: 'Proyecto de Consola y Evaluación 3',
        descripcion: 'Construye íntegramente en el aula una aplicación interactiva por consola con persistencia de datos, validaciones y menú de navegación.',
      },
    ],
  },
  {
    numero: 6,
    numeroStr: '06',
    titulo: 'Programación II: Interfaces Gráficas y Videojuegos',
    semanas: 7,
    horasSemana: 4,
    colorHex: '#4F46E5',
    icon: 'lucide:gamepad-2',
    clases: [
      {
        numero: 25,
        titulo: 'Interfaces Gráficas de Usuario (GUI)',
        descripcion: 'Construye ventanas de escritorio con controles interactivos: botones, etiquetas de texto, entradas de datos, contenedores y modos visuales claro y oscuro.',
      },
      {
        numero: 26,
        titulo: 'Lógica de Eventos en Aplicaciones de Escritorio',
        descripcion: 'Vincula la interfaz visual con lógica operativa: validación de formularios, captura de clics y respuesta a eventos del usuario en pantalla.',
      },
      {
        numero: 27,
        titulo: 'Empaquetado y Distribución de Software',
        descripcion: 'Convierte programas de código fuente en archivos ejecutables autónomos listos para distribuirse y ejecutarse en equipos del aula mediante memorias USB.',
      },
      {
        numero: 28,
        titulo: 'Arquitectura de Videojuegos y Bucle Principal',
        descripcion: 'Implementa el bucle de juego (game loop), sincronización de cuadros por segundo (FPS), renderizado en lienzo y respuesta a controles de teclado.',
      },
      {
        numero: 29,
        titulo: 'Sprites, Coordenadas y Animación 2D',
        descripcion: 'Carga elementos gráficos bidimensionales con canal alfa. Gestiona posición en ejes cartesianos, animaciones por fotogramas y generación de obstáculos.',
      },
      {
        numero: 30,
        titulo: 'Físicas, Colisiones y Audio',
        descripcion: 'Calcula intersecciones entre áreas de impacto (hitboxes). Programa marcadores de puntuación, sistemas de vidas y reproducción de sonido.',
      },
      {
        numero: 31,
        titulo: 'Proyecto Videojuego Completo y Torneo en Clase',
        descripcion: 'Integra pantalla de inicio, mecánicas de juego y pantalla de finalización. Presenta el software durante una sesión de pruebas colaborativa en el aula.',
      },
    ],
  },
  {
    numero: 7,
    numeroStr: '07',
    titulo: 'Bases de Datos y Persistencia Relacional (SQL)',
    semanas: 4,
    horasSemana: 4,
    colorHex: '#65A30D',
    icon: 'lucide:database',
    clases: [
      {
        numero: 32,
        titulo: 'Modelado y Bases de Datos Relacionales',
        descripcion: 'Compara las limitaciones de archivos de texto frente a bases de datos estructuradas. Define tablas, columnas, tipos de datos, registros y llaves primarias (PK).',
      },
      {
        numero: 33,
        titulo: 'Consultas con Lenguaje SQL',
        descripcion: 'Escribe sentencias SQL para definición y consulta: creación de tablas (CREATE TABLE), inserción de registros (INSERT INTO), selección (SELECT), filtros (WHERE) y ordenamiento (ORDER BY).',
      },
      {
        numero: 34,
        titulo: 'Actualización, Borrado y Relaciones (JOIN)',
        descripcion: 'Modifica datos existentes (UPDATE), elimina registros (DELETE) y vincula tablas independientes mediante llaves foráneas y consultas combinadas (JOIN).',
      },
      {
        numero: 35,
        titulo: 'Integración con Lenguajes de Programación y Evaluación 4',
        descripcion: 'Conecta un motor de base de datos relacional local a un programa desarrollado en el aula. Ejecuta operaciones CRUD completas y realiza la evaluación del módulo.',
      },
    ],
  },
  {
    numero: 8,
    numeroStr: '08',
    titulo: 'Desarrollo Web: Frontend y Maquetación',
    semanas: 6,
    horasSemana: 4,
    colorHex: '#EA580C',
    icon: 'lucide:globe',
    clases: [
      {
        numero: 36,
        titulo: 'Estructura Web con HTML5 Semántico',
        descripcion: 'Maqueta páginas web utilizando elementos semánticos (header, nav, main, section, footer), formularios estructurados, enlaces e inserción de recursos.',
      },
      {
        numero: 37,
        titulo: 'Diseño y Estilos con CSS3',
        descripcion: 'Aplica reglas de estilo, selectores, paletas cromáticas, fuentes tipográficas y el modelo de caja (margin, padding, border) para dar formato a interfaces web.',
      },
      {
        numero: 38,
        titulo: 'Maquetación Adaptable con Flexbox',
        descripcion: 'Distribuye elementos mediante cajas flexibles y reglas adaptables (media queries) para asegurar que la interfaz responda a pantallas de móviles y computadoras.',
      },
      {
        numero: 39,
        titulo: 'Interactividad en el Navegador con JavaScript',
        descripcion: 'Modifica elementos, estilos y clases del árbol DOM en tiempo real. Captura eventos de usuario y programa comportamientos interactivos.',
      },
      {
        numero: 40,
        titulo: 'Aplicaciones Web Interactivas',
        descripcion: 'Manipula colecciones de datos dinámicas en memoria, genera componentes visuales bajo demanda y construye una aplicación interactiva en clase.',
      },
      {
        numero: 41,
        titulo: 'Ecosistema Web Moderno y Frameworks',
        descripcion: 'Examina la evolución técnica que fundamenta el uso de librerías de componentes, empaquetadores y frameworks en el desarrollo web profesional contemporáneo.',
      },
    ],
  },
  {
    numero: 9,
    numeroStr: '09',
    titulo: 'Backend, APIs y Automatización',
    semanas: 4,
    horasSemana: 4,
    colorHex: '#14B8A6',
    icon: 'lucide:server',
    clases: [
      {
        numero: 42,
        titulo: 'Arquitectura Cliente-Servidor y Protocolo HTTP',
        descripcion: 'Examina el flujo de solicitudes web: métodos de petición (GET, POST), cabeceras, cuerpos de datos y códigos de estado del servidor (200, 404, 500).',
      },
      {
        numero: 43,
        titulo: 'Consumo de APIs y Datos Remotos',
        descripcion: 'Procesa respuestas en formato JSON procedentes de servicios web en línea. Extrae datos relevantes y los integra dentro de un programa local.',
      },
      {
        numero: 44,
        titulo: 'Automatización de Tareas del Sistema Operativo',
        descripcion: 'Escribe scripts para automatizar operaciones de archivos: clasificación de directorios, renombrado por lotes y generación programada de respaldos.',
      },
      {
        numero: 45,
        titulo: 'Taller Integrador de Automatización y Evaluación 5',
        descripcion: 'Desarrolla en el aula un proyecto práctico que articula automatización local o consumo de datos remotos con almacenamiento persistente.',
      },
    ],
  },
  {
    numero: 10,
    numeroStr: '10',
    titulo: 'Ingeniería de Software, Metodologías y Seguridad',
    semanas: 3,
    horasSemana: 4,
    colorHex: '#BE123C',
    icon: 'lucide:shield-alert',
    clases: [
      {
        numero: 46,
        titulo: 'Control de Versiones con Git y Repositorios',
        descripcion: 'Registra el historial de cambios de un proyecto: confirmaciones (commits), ramas de trabajo y publicación de repositorios para construir un portafolio técnico.',
      },
      {
        numero: 47,
        titulo: 'Código Limpio y Patrones de Arquitectura',
        descripcion: 'Aplica principios de legibilidad, eliminación de redundancias (DRY), diseño modular y separación entre lógica de datos e interfaz de usuario.',
      },
      {
        numero: 48,
        titulo: 'Seguridad en Aplicaciones y Evaluación 6',
        descripcion: 'Examina riesgos habituales en software: inyecciones de datos, fugas de credenciales y protección de contraseñas con funciones hash. Rinde la evaluación teórica en clase.',
      },
    ],
  },
  {
    numero: 11,
    numeroStr: '11',
    titulo: 'Proyecto Final Integrador y Cierre Profesional',
    semanas: 6,
    horasSemana: 4,
    colorHex: '#D946EF',
    icon: 'lucide:sparkles',
    clases: [
      {
        numero: 49,
        titulo: 'Definición y Alcance del Proyecto (MVP)',
        descripcion: 'Selecciona la propuesta de software a construir (videojuego, aplicación de escritorio con base de datos o portal web). Define requisitos y organiza tareas en un tablero visual de trabajo en el aula.',
      },
      {
        numero: 50,
        titulo: 'Sprint 1: Estructura y Arquitectura Base',
        descripcion: 'Configura el repositorio de código en el laboratorio, organiza los directorios del proyecto y programa los módulos y pantallas iniciales.',
      },
      {
        numero: 51,
        titulo: 'Sprint 2: Implementación de Lógica Central',
        descripcion: 'Programa en el aula las funcionalidades principales del software con retroalimentación y asesoría técnica directa del docente.',
      },
      {
        numero: 52,
        titulo: 'Sprint 3: Interfaz, Pruebas y Documentación',
        descripcion: 'Ejecuta pruebas de funcionamiento para corregir errores imprevistos, afina la presentación visual y redacta el manual de uso del software.',
      },
      {
        numero: 53,
        titulo: 'Técnicas de Exposición y Ensayos de Demostración',
        descripcion: 'Estructura diapositivas de apoyo sintéticas y ensaya la demostración técnica en vivo del software ante el grupo en el aula.',
      },
      {
        numero: 54,
        titulo: 'Demostración Técnica (Demo Day) y Graduación',
        descripcion: 'Expone el proyecto funcional ante el grupo, recibe retroalimentación formativa y culmina el ciclo anual de capacitación técnica.',
      },
    ],
  },
];

function detectClaseTipo(titulo: string): 'evaluacion' | 'proyecto' | 'laboratorio' | 'practica' {
  const t = titulo.toLowerCase();
  if (t.includes('evaluación') || t.includes('examen')) return 'evaluacion';
  if (t.includes('proyecto') || t.includes('demo day') || t.includes('sprint') || t.includes('mvp')) return 'proyecto';
  if (t.includes('instalación') || t.includes('taller') || t.includes('aula') || t.includes('torneo')) return 'laboratorio';
  return 'practica';
}

export const PLAN_DE_ESTUDIOS: PlanModulo[] = RAW_MODULOS.map(m => {
  const inicio = m.clases[0].numero;
  const fin = m.clases[m.clases.length - 1].numero;
  return {
    ...m,
    semanaInicio: inicio,
    semanaFin: fin,
    rangoSemanas: `Semanas ${inicio} a ${fin}`,
    clases: m.clases.map(c => ({
      numero: c.numero,
      titulo: c.titulo,
      descripcion: c.descripcion,
      tipo: detectClaseTipo(c.titulo),
    })),
  };
});

export const TOTAL_SEMANAS = PLAN_DE_ESTUDIOS.reduce((acc, m) => acc + m.semanas, 0);
export const TOTAL_MODULOS = PLAN_DE_ESTUDIOS.length;
export const TOTAL_CLASES = PLAN_DE_ESTUDIOS.reduce((acc, m) => acc + m.clases.length, 0);
export const TOTAL_HORAS = TOTAL_SEMANAS * 4;

export interface SemanaData {
  semana: number;
  moduloNumero: number;
  moduloNumeroStr: string;
  moduloTitulo: string;
  moduloColor: string;
  moduloIcon: string;
  claseTitulo: string;
  claseDescripcion: string;
  claseTipo: 'evaluacion' | 'proyecto' | 'laboratorio' | 'practica';
}

export function getSemanaInfo(semana: number): SemanaData | null {
  for (const m of PLAN_DE_ESTUDIOS) {
    const c = m.clases.find(cl => cl.numero === semana);
    if (c) {
      return {
        semana: c.numero,
        moduloNumero: m.numero,
        moduloNumeroStr: m.numeroStr,
        moduloTitulo: m.titulo,
        moduloColor: m.colorHex,
        moduloIcon: m.icon,
        claseTitulo: c.titulo,
        claseDescripcion: c.descripcion,
        claseTipo: c.tipo || 'practica',
      };
    }
  }
  return null;
}

export function getTodasLasSemanas(): SemanaData[] {
  const result: SemanaData[] = [];
  for (const m of PLAN_DE_ESTUDIOS) {
    for (const c of m.clases) {
      result.push({
        semana: c.numero,
        moduloNumero: m.numero,
        moduloNumeroStr: m.numeroStr,
        moduloTitulo: m.titulo,
        moduloColor: m.colorHex,
        moduloIcon: m.icon,
        claseTitulo: c.titulo,
        claseDescripcion: c.descripcion,
        claseTipo: c.tipo || 'practica',
      });
    }
  }
  return result;
}
