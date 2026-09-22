import * as fs from 'node:fs';
import * as path from 'node:path';

interface ClaseContenido {
  semana: number;
  moduloFolder: string;
  moduloTitle: string;
  temaFolder: string;
  temaTitle: string;
  claseFolder: string;
  title: string;
  subtopicTitle: string;
  fecha: string;
  description: string;
  objectives: string[];
  slides: Array<{
    title: string;
    icon: string;
    body: string;
  }>;
}

const CLASES: ClaseContenido[] = [
  // SEMANA 1
  {
    semana: 1,
    moduloFolder: '01-hardware-sistemas-operativos',
    moduloTitle: '1 - Hardware, Sistemas Operativos y Software de Base',
    temaFolder: '01-arquitectura',
    temaTitle: 'Tema 1: Arquitectura y Componentes',
    claseFolder: '01-componentes-fisicos',
    title: 'Arquitectura de Hardware y Componentes Físicos',
    subtopicTitle: 'Partes Internas del Equipo',
    fecha: '20-06-2026',
    description: 'Identifica el procesador, memoria RAM, almacenamiento y placa madre. Conecta componentes físicos de forma segura en el laboratorio.',
    objectives: [
      'Identificar la función del procesador, memoria RAM y almacenamiento en un equipo',
      'Reconocer los conectores principales de la tarjeta madre y la fuente de poder',
      'Manipular componentes físicos en el aula aplicando normas de seguridad antiestática',
    ],
    slides: [
      {
        title: '1. El Procesador y la Tarjeta Madre',
        icon: 'lucide:cpu',
        body: `
El procesador ejecuta las instrucciones de los programas y coordina cada tarea del sistema. La tarjeta madre conecta todos los componentes mediante pistas eléctricas y buses de datos.

Piensa en una cocina: el procesador es el cocinero principal y la tarjeta madre es la cocina completa con sus estufas, tuberías y contactos de energía.

> **Regla de taller:** Nunca toques los pines dorados del procesador ni la base del socket en la placa madre con los dedos desnudos.
`,
      },
      {
        title: '2. Memoria de Trabajo y Almacenamiento',
        icon: 'lucide:hard-drive',
        body: `
La memoria RAM almacena datos temporales de los programas que tienes abiertos en este momento. Al apagar el equipo, su contenido desaparece.

El disco de almacenamiento (SSD o HDD) guarda tus archivos, el sistema operativo y las aplicaciones de forma permanente.

* **RAM:** Mesa de trabajo inmediata. Entre más amplia, más proyectos abres al mismo tiempo sin lentitud.
* **Almacenamiento:** Alacena o librero donde guardas cajas y libros cerrados.
`,
      },
      {
        title: '3. Especificaciones y Conectores Principales',
        icon: 'lucide:cable',
        body: `
Examina las conexiones físicas en los equipos del laboratorio:

<table>
  <thead>
    <tr>
      <th>Componente</th>
      <th>Tipo de Conexión</th>
      <th>Velocidad / Característica</th>
      <th>Precaución en Aula</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Memoria RAM</td>
      <td>Ranuras DIMM DDR4/DDR5</td>
      <td>Volátil, alta tasa de transferencia</td>
      <td>Abre los seguros laterales antes de insertar</td>
    </tr>
    <tr>
      <td>SSD M.2 NVMe</td>
      <td>Puerto PCIe M.2</td>
      <td>Hasta 7,000 MB/s de lectura</td>
      <td>Fija con el tornillo milimétrico sin barrer la rosca</td>
    </tr>
    <tr>
      <td>Almacenamiento SATA</td>
      <td>Cable de datos SATA + Cable de poder</td>
      <td>Hasta 600 MB/s</td>
      <td>Conector con pestaña en forma de L</td>
    </tr>
    <tr>
      <td>Fuente de Poder (ATX)</td>
      <td>Conector principal de 24 pines</td>
      <td>Distribuye 12V, 5V y 3.3V</td>
      <td>Desconecta de la toma eléctrica antes de manipular</td>
    </tr>
  </tbody>
</table>
`,
      },
      {
        title: '4. Práctica en Aula: Identificación Física',
        icon: 'lucide:wrench',
        body: `
Sigue estos pasos en la mesa de trabajo de tu estación:

1. Retira la tapa lateral del gabinete usando el destornillador de cruz provisto.
2. Descarga la electricidad estática de tu cuerpo tocando una parte metálica sin pintar del gabinete.
3. Ubica visualmente el disipador del procesador, los módulos de memoria RAM y los puertos SATA.
4. Anota en tu libreta el modelo de la tarjeta madre y la cantidad de ranuras de memoria libres.
`,
      },
      {
        title: '5. Reto de Verificación Técnica',
        icon: 'lucide:check-circle-2',
        body: `
Responde y comprueba con tu compañero de banca:

* Si un equipo enciende ventiladores pero no muestra imagen en el monitor y emite tres pitidos cortos, ¿qué componente inspeccionas primero?
* Muestra al docente tu equipo con los seguros de memoria RAM alineados y el cable de corriente desconectado.
`,
      },
    ],
  },

  // SEMANA 2
  {
    semana: 2,
    moduloFolder: '01-hardware-sistemas-operativos',
    moduloTitle: '1 - Hardware, Sistemas Operativos y Software de Base',
    temaFolder: '01-arquitectura',
    temaTitle: 'Tema 1: Arquitectura y Componentes',
    claseFolder: '02-sistemas-operativos',
    title: 'Sistemas Operativos y Software',
    subtopicTitle: 'El Puente Entre Máquina y Usuario',
    fecha: '27-06-2026',
    description: 'Analiza la función del sistema operativo, prepara unidades de arranque, gestiona particiones e instala software en los equipos del laboratorio.',
    objectives: [
      'Diferenciar las capas de software de base, software de aplicación y controladores',
      'Configurar una memoria USB booteable para instalación de sistemas',
      'Gestionar particiones en almacenamiento secundario con tablas GPT y MBR',
    ],
    slides: [
      {
        title: '1. El Rol del Sistema Operativo',
        icon: 'lucide:layers',
        body: `
El sistema operativo controla los recursos de hardware y ofrece una plataforma uniforme para que funcionen las aplicaciones.

Sin sistema operativo, cada programa tendría que comunicarse directamente con los circuitos de la tarjeta de red, la pantalla y el procesador. El sistema operativo actúa como el árbitro de los recursos del equipo.

* **Administrador de procesos:** Asigna tiempo de procesador a cada tarea.
* **Administrador de memoria:** Impide que un programa invada los datos de otro.
* **Sistema de archivos:** Organiza bytes en carpetas legibles.
`,
      },
      {
        title: '2. Arquitectura de Arranque: BIOS, UEFI y Medios Booteables',
        icon: 'lucide:power',
        body: `
Al presionar el botón de encendido, el chip de firmware (UEFI o BIOS) realiza una prueba básica de componentes (POST) y busca un sector de arranque en las unidades conectadas.

* **UEFI:** Estándar moderno. Soporta unidades mayores a 2 TB con tabla de partición GPT y arranque seguro.
* **Legacy BIOS:** Modo clásico con tabla de partición MBR (máximo 4 particiones primarias).
* **Medio booteable:** Memoria USB con una imagen ISO grabada para arrancar un instalador del sistema.
`,
      },
      {
        title: '3. Comparativa de Sistemas de Archivos',
        icon: 'lucide:database',
        body: `
Observa la compatibilidad entre formatos de disco:

<table>
  <thead>
    <tr>
      <th>Sistema de Archivos</th>
      <th>Plataforma Nativa</th>
      <th>Límite por Archivo</th>
      <th>Uso Recomendado</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>NTFS</td>
      <td>Windows</td>
      <td>16 TB</td>
      <td>Instalación principal de Windows</td>
    </tr>
    <tr>
      <td>EXT4</td>
      <td>Linux</td>
      <td>16 TB</td>
      <td>Instalación de distribuciones Linux</td>
    </tr>
    <tr>
      <td>FAT32</td>
      <td>Universal</td>
      <td>4 GB</td>
      <td>Unidades USB pequeñas y compatibilidad BIOS</td>
    </tr>
    <tr>
      <td>exFAT</td>
      <td>Windows, Linux, macOS</td>
      <td>16 EB (virtualmente sin límite)</td>
      <td>Memorias USB grandes para transferir entre plataformas</td>
    </tr>
  </tbody>
</table>
`,
      },
      {
        title: '4. Práctica en Laboratorio: Preparación de Medio Booteable',
        icon: 'lucide:usb',
        body: `
Crea tu unidad de instalación en el aula:

1. Conecta la memoria USB de prácticas de 8 GB o superior en tu equipo.
2. Abre la herramienta de creación de medios indicada por el docente.
3. Selecciona la imagen ISO oficial del sistema operativo.
4. Elige el esquema de partición **GPT** con destino **UEFI (no CSM)**.
5. Inicia el proceso y espera la confirmación de escritura completa.
`,
      },
      {
        title: '5. Reto de Laboratorio: Arranque UEFI',
        icon: 'lucide:check-circle-2',
        body: `
Comprueba tu instalación:

1. Reinicia el equipo e ingresa al menú de arranque presionando la tecla de función asignada (F12, F11 o Supr).
2. Selecciona la memoria USB con prefijo **UEFI**.
3. Confirma que aparece la pantalla de bienvenida del instalador. Toma nota del tipo de partición detectada.
`,
      },
    ],
  },

  // SEMANA 3
  {
    semana: 3,
    moduloFolder: '01-hardware-sistemas-operativos',
    moduloTitle: '1 - Hardware, Sistemas Operativos y Software de Base',
    temaFolder: '02-terminal',
    temaTitle: 'Tema 2: Administración y Terminal',
    claseFolder: '01-linea-de-comandos',
    title: 'Línea de Comandos y Terminal (CLI)',
    subtopicTitle: 'Navegación y Operaciones de Archivos',
    fecha: '04-07-2026',
    description: 'Opera la terminal de comandos: navegación de rutas, creación y manipulación de archivos, permisos de acceso y automatización de tareas.',
    objectives: [
      'Navegar por el árbol de directorios usando rutas relativas y absolutas',
      'Crear, copiar, mover y eliminar archivos y carpetas desde la terminal',
      'Interpretar y modificar permisos de usuario en sistemas tipo Unix',
    ],
    slides: [
      {
        title: '1. ¿Por Qué Usar la Terminal?',
        icon: 'lucide:terminal',
        body: `
La interfaz gráfica oculta detalles y consume recursos. La línea de comandos te da acceso directo y repetible a las funciones internas de la máquina.

Los servidores en internet, los contenedores y los sistemas automatizados no tienen ratón ni ventanas gráficas: se administran exclusivamente mediante comandos de texto.

* **Shell:** El intérprete que lee tus comandos (ej. Bash, Zsh, PowerShell).
* **Prompt:** La línea que espera tu instrucción indicando usuario, equipo y ruta actual.
`,
      },
      {
        title: '2. El Árbol de Rutas: Absolutas vs Relativas',
        icon: 'lucide:folder-tree',
        body: `
Todo archivo tiene una ubicación exacta en la estructura de almacenamiento.

* **Ruta absoluta:** Inicia desde la raíz del sistema (/ en Linux o C:\\ en Windows). Funciona desde cualquier lugar donde estés parado.
* **Ruta relativa:** Inicia desde tu carpeta actual. Ahorra tiempo al moverte entre subdirectorios cercanos.
* **Atajos clave:**
  * \`.\` representa el directorio actual.
  * \`..\` representa el directorio padre (un nivel arriba).
  * \`~\` representa la carpeta personal del usuario (home).
`,
      },
      {
        title: '3. Comandos de Navegación y Manipulación',
        icon: 'lucide:command',
        body: `
Aprende estos comandos indispensables:

<table>
  <thead>
    <tr>
      <th>Comando</th>
      <th>Parámetros Comunes</th>
      <th>Función Directa</th>
      <th>Ejemplo en Clase</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>pwd</code></td>
      <td>Ninguno</td>
      <td>Imprime la ruta absoluta del directorio actual</td>
      <td><code>pwd</code></td>
    </tr>
    <tr>
      <td><code>ls</code></td>
      <td><code>-la</code></td>
      <td>Lista archivos con permisos, tamaño y ocultos</td>
      <td><code>ls -la</code></td>
    </tr>
    <tr>
      <td><code>cd</code></td>
      <td><code>[ruta]</code></td>
      <td>Cambia de directorio de trabajo</td>
      <td><code>cd proyectos/clase-03</code></td>
    </tr>
    <tr>
      <td><code>mkdir</code></td>
      <td><code>-p</code></td>
      <td>Crea carpetas (con padres recursivos)</td>
      <td><code>mkdir -p mod1/lab/assets</code></td>
    </tr>
    <tr>
      <td><code>cp</code></td>
      <td><code>-r</code></td>
      <td>Copia archivos o directorios completos</td>
      <td><code>cp archivo.txt copia.txt</code></td>
    </tr>
    <tr>
      <td><code>rm</code></td>
      <td><code>-r -i</code></td>
      <td>Elimina archivos o carpetas</td>
      <td><code>rm -i prueba.tmp</code></td>
    </tr>
  </tbody>
</table>
`,
      },
      {
        title: '4. Práctica en el Laboratorio: Construcción de Estructura',
        icon: 'lucide:code-2',
        body: `
Ejecuta la siguiente secuencia de comandos en tu terminal:

1. Ve a tu carpeta personal: \`cd ~\`
2. Crea el directorio de trabajo del curso: \`mkdir -p cpi/modulo-01/semana-03\`
3. Entra en la carpeta recién creada: \`cd cpi/modulo-01/semana-03\`
4. Crea tres archivos vacíos: \`touch notas.txt comandos.md bitacora.log\`
5. Lista los archivos con detalle: \`ls -lh\`
`,
      },
      {
        title: '5. Reto de Terminal: El Desafío de Archivos',
        icon: 'lucide:check-circle-2',
        body: `
Resuelve sin usar el explorador de archivos con ratón:

1. Crea una carpeta llamada \`respaldo\` dentro de tu directorio actual.
2. Copia \`notas.txt\` dentro de \`respaldo\`.
3. Renombra \`comandos.md\` a \`guia-comandos.md\` usando el comando \`mv\`.
4. Muestra al docente la salida final del comando \`ls -R\` en tu terminal.
`,
      },
    ],
  },

  // SEMANA 4
  {
    semana: 4,
    moduloFolder: '01-hardware-sistemas-operativos',
    moduloTitle: '1 - Hardware, Sistemas Operativos y Software de Base',
    temaFolder: '02-terminal',
    temaTitle: 'Tema 2: Administración y Terminal',
    claseFolder: '02-mantenimiento-sistema',
    title: 'Diagnóstico y Mantenimiento del Sistema',
    subtopicTitle: 'Monitoreo de Recursos y Salud del Equipo',
    fecha: '11-07-2026',
    description: 'Monitorea el uso de CPU, memoria y almacenamiento. Identifica fallas de rendimiento y aplica mantenimiento preventivo en el laboratorio.',
    objectives: [
      'Interpretar métricas de rendimiento en tiempo real (CPU, RAM, disco y red)',
      'Identificar y terminar procesos bloqueados o que consumen recursos excesivos',
      'Diagnosticar la salud de unidades de almacenamiento con parámetros S.M.A.R.T.',
    ],
    slides: [
      {
        title: '1. Mantenimiento Preventivo vs Correctivo',
        icon: 'lucide:activity',
        body: `
El mantenimiento preventivo se realiza antes de que el equipo falle para garantizar estabilidad y extender su vida útil. El correctivo se aplica cuando el fallo ya detuvo el trabajo.

* **Preventivo de hardware:** Limpieza de polvo en ventiladores, cambio de pasta térmica, verificación de voltajes.
* **Preventivo de software:** Limpieza de archivos temporales, actualización de parches de seguridad, revisión de espacio libre en disco.
* **Correctivo:** Reemplazo de un disco dañado, reparación de sectores defectuosos o reinstalación del sistema.
`,
      },
      {
        title: '2. Monitoreo de Recursos en Tiempo Real',
        icon: 'lucide:gauge',
        body: `
Cuando un equipo responde lento, analiza los cuatro cuellos de botella posibles:

1. **CPU al 100%:** Un proceso realiza cálculos en bucle o hay software no deseado.
2. **RAM al límite:** El sistema recurre a la memoria virtual en disco (swap), reduciendo la velocidad de forma notable.
3. **Disco al 100% de uso de tiempo:** Lecturas o escrituras masivas bloquean la respuesta de las aplicaciones.
4. **Temperatura elevada:** El procesador baja su frecuencia intencionalmente (thermal throttling) para no dañarse.
`,
      },
      {
        title: '3. Herramientas y Señales de Diagnóstico',
        icon: 'lucide:stethoscope',
        body: `
Utiliza esta guía para identificar anomalías:

<table>
  <thead>
    <tr>
      <th>Síntoma Detectado</th>
      <th>Causa Probable</th>
      <th>Herramienta de Diagnóstico</th>
      <th>Acción Correctiva</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Ventiladores al máximo con equipo inactivo</td>
      <td>Pasta térmica seca o proceso fuera de control</td>
      <td><code>top</code>, <code>htop</code> o Administrador de Tareas</td>
      <td>Cierra el proceso o limpia disipadores</td>
    </tr>
    <tr>
      <td>Pantallas azules (BSOD) aleatorias</td>
      <td>Falla en celdas de memoria RAM</td>
      <td>MemTest86 o Diagnóstico de Memoria</td>
      <td>Prueba módulos de RAM por separado</td>
    </tr>
    <tr>
      <td>Demora de varios minutos al abrir carpetas</td>
      <td>Sectores reasignados en disco mecánico o SSD degradado</td>
      <td>CrystalDiskInfo o <code>smartctl</code></td>
      <td>Respalda datos de inmediato y reemplaza disco</td>
    </tr>
    <tr>
      <td>El equipo se apaga súbitamente al exigir carga</td>
      <td>Fuente de poder deficiente o sobrecalentamiento crítico</td>
      <td>HWMonitor o <code>sensors</code></td>
      <td>Monitorea temperaturas antes del apagón</td>
    </tr>
  </tbody>
</table>
`,
      },
      {
        title: '4. Práctica en el Laboratorio: Auditoría del Sistema',
        icon: 'lucide:clipboard-check',
        body: `
Realiza la auditoría técnica de tu estación:

1. Abre la terminal o monitor del sistema de tu equipo.
2. Registra el porcentaje de uso de CPU y memoria RAM con solo el navegador abierto.
3. Identifica cuál es el proceso con mayor consumo de memoria y anota su identificador (PID).
4. Ejecuta la herramienta de diagnóstico de disco provista en clase y verifica el estado de salud reportado (Bueno, Riesgo o Malo).
`,
      },
      {
        title: '5. Reto de Aula: Control de Procesos',
        icon: 'lucide:check-circle-2',
        body: `
Comprueba tus habilidades de soporte:

* Desde la terminal, usa el comando \`kill\` con el PID del proceso de prueba indicado por el docente para cerrarlo de forma limpia.
* Presenta tu hoja de auditoría completa con los tres indicadores clave: temperatura, consumo de RAM y salud de disco.
`,
      },
    ],
  },

  // SEMANA 5
  {
    semana: 5,
    moduloFolder: '01-hardware-sistemas-operativos',
    moduloTitle: '1 - Hardware, Sistemas Operativos y Software de Base',
    temaFolder: '03-entorno-evaluacion',
    temaTitle: 'Tema 3: Entorno y Evaluación',
    claseFolder: '01-entorno-evaluacion',
    title: 'Configuración del Entorno de Desarrollo y Evaluación 1',
    subtopicTitle: 'Herramientas de Trabajo y Cierre del Módulo 1',
    fecha: '18-07-2026',
    description: 'Instala y personaliza tu editor de código con extensiones técnicas, atajos de teclado y completa la evaluación práctica del Módulo 1.',
    objectives: [
      'Configurar el editor de código con fuentes monoespaciadas y extensiones indispensables',
      'Operar con soltura los atajos de teclado para edición ágil de texto y código',
      'Resolver la evaluación práctica integrada de hardware y sistemas operativos en el aula',
    ],
    slides: [
      {
        title: '1. El Editor de Código como Herramienta Principal',
        icon: 'lucide:code',
        body: `
Un editor de código no es un procesador de textos común. Ofrece resaltado de sintaxis, autocompletado inteligente, terminal integrada y control de versiones.

* **VS Code / VSCodium:** Entorno ligero y estándar en la industria.
* **Tipografía monoespaciada:** Cada letra ocupa el mismo ancho físico para alinear columnas de código y detectar errores visualmente (ej. JetBrains Mono, Fira Code).
* **Terminal integrada:** Permite compilar y ejecutar comandos sin salir de tu ventana de trabajo.
`,
      },
      {
        title: '2. Extensiones Indispensables de Trabajo',
        icon: 'lucide:puzzle',
        body: `
Configura estas extensiones en el laboratorio:

* **Prettier:** Formatea tu código automáticamente al guardar cambios con sangría consistente.
* **Error Lens:** Muestra advertencias y errores de sintaxis en la misma línea donde se originan.
* **Live Preview:** Levanta un servidor local en el aula para ver cambios en vivo sin recargar manualmente.
* **GitLens:** Identifica qué cambios se hicieron y en qué momento dentro del archivo.
`,
      },
      {
        title: '3. Atajos de Teclado Indispensables',
        icon: 'lucide:keyboard',
        body: `
Los profesionales usan el teclado en lugar del ratón para editar rápido:

<table>
  <thead>
    <tr>
      <th>Atajo (Windows / Linux)</th>
      <th>Acción Directa en el Editor</th>
      <th>Utilidad en Clase</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>Ctrl + P</code></td>
      <td>Búsqueda rápida y apertura de archivos</td>
      <td>Navegar proyectos grandes en segundos</td>
    </tr>
    <tr>
      <td><code>Ctrl + Shift + P</code></td>
      <td>Paleta de comandos completa</td>
      <td>Ejecutar cualquier función del editor</td>
    </tr>
    <tr>
      <td><code>Ctrl + \`</code></td>
      <td>Abrir o alternar terminal integrada</td>
      <td>Ejecutar comandos sin cambiar de ventana</td>
    </tr>
    <tr>
      <td><code>Alt + Flecha Arriba/Abajo</code></td>
      <td>Mover la línea actual hacia arriba o abajo</td>
      <td>Reorganizar instrucciones sin cortar y pegar</td>
    </tr>
    <tr>
      <td><code>Ctrl + D</code></td>
      <td>Seleccionar la siguiente coincidencia de la palabra</td>
      <td>Renombrar variables repetidas con rapidez</td>
    </tr>
  </tbody>
</table>
`,
      },
      {
        title: '4. Práctica: Preparación del Entorno',
        icon: 'lucide:settings',
        body: `
Aplica la configuración recomendada en tu máquina de clase:

1. Abre el editor de código e ingresa a Configuración (\`Ctrl + ,\`).
2. Activa la opción **Format On Save** (Formatear al guardar).
3. Establece el tamaño de tabulación en **2 espacios**.
4. Abre la terminal integrada con \`Ctrl + \`\` y verifica que ejecute correctamente comandos del sistema.
`,
      },
      {
        title: '5. Evaluación Práctica del Módulo 1',
        icon: 'lucide:graduation-cap',
        body: `
Completa el reto de evaluación presencial en el aula:

1. Identifica el modelo de procesador y la cantidad total de RAM en la máquina asignada.
2. Abre la terminal y genera un archivo con el reporte de hardware usando redirección de salida (\`lscpu > reporte.txt\` o equivalente).
3. Abre dicho reporte dentro de tu editor de código y muestra el resultado al docente.
`,
      },
    ],
  },

  // SEMANA 6
  {
    semana: 6,
    moduloFolder: '02-productividad-ofimatica',
    moduloTitle: '2 - Productividad, Ofimática y Colaboración en la Nube',
    temaFolder: '01-documentacion',
    temaTitle: 'Tema 1: Documentación y Textos',
    claseFolder: '01-procesamiento-texto',
    title: 'Procesamiento de Texto y Documentación Técnica',
    subtopicTitle: 'Estructuración Formal de Documentos',
    fecha: '25-07-2026',
    description: 'Aplica jerarquías tipográficas, tablas de contenido automáticas, citas bibliográficas y control de cambios en documentos formales.',
    objectives: [
      'Implementar estilos estructurados (Título 1, Título 2, Normal) para generar índices automáticos',
      'Configurar encabezados, pies de página con numeración seccionada y saltos de página formales',
      'Operar herramientas de edición colaborativa en tiempo real con control de cambios y comentarios',
    ],
    slides: [
      {
        title: '1. Jerarquía y Estilos Tipográficos',
        icon: 'lucide:file-text',
        body: `
No apliques formato manual cambiando el tamaño de cada encabezado a mano. Usa los **Estilos predefinidos** (Título 1, Título 2, Normal).

Al usar estilos, el software entiende la estructura de tu documento. Si decides cambiar la tipografía o el color de todos los títulos principales, lo haces en un clic en todo el reporte.

* **Título 1:** Temas principales o capítulos.
* **Título 2:** Subtemas y secciones internas.
* **Texto Normal:** Párrafos de lectura con interlineado cómodo (1.15 a 1.5).
`,
      },
      {
        title: '2. Índices Automáticos y Seccionamiento',
        icon: 'lucide:list',
        body: `
Los documentos formales separan la portada y el índice del contenido numerado.

* **Salto de página vs Salto de sección:**
  * Salto de página simple: Comienza en una página nueva dentro del mismo formato.
  * Salto de sección: Permite cambiar márgenes, orientación (vertical/horizontal) y numeración de página sin afectar las páginas anteriores.
* **Tabla de contenido automática:** Lee los estilos de Título 1 y 2 y actualiza los números de página automáticamente con un botón.
`,
      },
      {
        title: '3. Elementos de un Reporte Técnico Formal',
        icon: 'lucide:book-open',
        body: `
Sigue esta estructura en todos tus entregables del curso:

<table>
  <thead>
    <tr>
      <th>Sección Formal</th>
      <th>Contenido Esperado</th>
      <th>Regla de Formato</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Portada Institucional</td>
      <td>Título del proyecto, autor, grupo, fecha y logotipo</td>
      <td>Sin encabezado ni número de página</td>
    </tr>
    <tr>
      <td>Índice de Contenido</td>
      <td>Tabla de contenido con hipervínculos a secciones</td>
      <td>Generado con estilos automáticos</td>
    </tr>
    <tr>
      <td>Cuerpo del Reporte</td>
      <td>Introducción, desarrollo técnico y resultados prácticos</td>
      <td>Numeración arábiga (1, 2, 3...) desde la primera página de texto</td>
    </tr>
    <tr>
      <td>Tablas y Figuras</td>
      <td>Gráficos y capturas con pie de figura numerado</td>
      <td>Alineados al centro con descripción corta al pie</td>
    </tr>
    <tr>
      <td>Referencias</td>
      <td>Fuentes técnicas, manuales oficiales y repositorios</td>
      <td>Formato estándar con enlaces funcionales</td>
    </tr>
  </tbody>
</table>
`,
      },
      {
        title: '4. Práctica en el Aula: Construcción de Manual Técnico',
        icon: 'lucide:edit-3',
        body: `
Construye el documento de práctica en tu procesador de textos:

1. Crea un documento nuevo y titúlalo: *Manual de Mantenimiento Preventivo de Estaciones*.
2. Agrega tres secciones principales usando formato **Título 1**: Introducción, Procedimiento de Limpieza, Diagnóstico de Fallas.
3. Inserta un salto de página antes de la primera sección.
4. En la primera página, inserta una **Tabla de Contenido Automática**.
5. Cambia el título de la segunda sección y presiona **Actualizar Tabla**. Comprueba que el cambio se refleje en el índice.
`,
      },
      {
        title: '5. Reto de Edición: Control de Cambios',
        icon: 'lucide:check-circle-2',
        body: `
Trabaja con tu compañero de banca:

1. Comparte el documento en modo sugerencia o activa el **Control de Cambios**.
2. Revisa el reporte de tu compañero: corrige al menos dos faltas ortográficas o de puntuación y agrega un comentario de retroalimentación constructiva.
3. Acepta o rechaza las sugerencias recibidas en tu propio documento.
`,
      },
    ],
  },

  // SEMANA 7
  {
    semana: 7,
    moduloFolder: '02-productividad-ofimatica',
    moduloTitle: '2 - Productividad, Ofimática y Colaboración en la Nube',
    temaFolder: '02-hojas-calculo',
    temaTitle: 'Tema 2: Hojas de Cálculo',
    claseFolder: '01-logica-formulas',
    title: 'Hojas de Cálculo I: Lógica y Fórmulas',
    subtopicTitle: 'Celdas, Operadores y Lógica Condicional',
    fecha: '01-08-2026',
    description: 'Organiza datos en celdas, domina referencias relativas y absolutas, y programa fórmulas condicionales con la función SI en el aula.',
    objectives: [
      'Diferenciar entre datos de texto, valores numéricos, fechas y booleanos en celdas',
      'Construir fórmulas utilizando referencias relativas (A1) y absolutas ($A$1)',
      'Implementar la función lógica condicional SI / IF para automatizar decisiones',
    ],
    slides: [
      {
        title: '1. Datos y Anatomía de una Celda',
        icon: 'lucide:grid',
        body: `
Una hoja de cálculo es una cuadrícula donde las columnas se identifican con letras (A, B, C...) y las filas con números (1, 2, 3...). La intersección es una celda única (ej. B4).

* **Texto:** Se alinea automáticamente a la izquierda.
* **Números:** Se alinean automáticamente a la derecha. Si un número queda a la izquierda, la hoja lo interpretó como texto y no podrás sumarlo.
* **Toda fórmula inicia con el signo igual (\`=\`):** Le indica al motor de cálculo que debe procesar una instrucción y no mostrar texto literal.
`,
      },
      {
        title: '2. Referencias Relativas vs Absolutas',
        icon: 'lucide:anchor',
        body: `
Al arrastrar una fórmula hacia abajo, las celdas se ajustan automáticamente. Esto se llama referencia relativa.

Cuando necesitas multiplicar muchas celdas por un valor fijo (ejemplo: la tasa de IVA o un porcentaje de descuento), debes fijar la celda con el símbolo **$**. Esto se llama referencia absoluta.

* **Referencia relativa (\`A1\`):** Al copiar una fila hacia abajo, se convierte en \`A2\`.
* **Referencia absoluta (\`$A$1\`):** Al copiar a cualquier celda, siempre apunta a \`A1\`.
* **Atajo:** Presiona la tecla **F4** al escribir una celda para alternar el signo \`$\`.
`,
      },
      {
        title: '3. Operadores y Funciones Matemáticas Esenciales',
        icon: 'lucide:calculator',
        body: `
Fórmulas fundamentales que usarás en clase:

<table>
  <thead>
    <tr>
      <th>Operación / Función</th>
      <th>Sintaxis en la Hoja</th>
      <th>Propósito Técnico</th>
      <th>Ejemplo de Resultado</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Suma de rango</td>
      <td><code>=SUMA(B2:B10)</code></td>
      <td>Totaliza todos los valores numéricos del intervalo</td>
      <td>Suma de calificaciones o ventas</td>
    </tr>
    <tr>
      <td>Promedio aritmético</td>
      <td><code>=PROMEDIO(C2:C15)</code></td>
      <td>Calcula la media sin contar celdas vacías</td>
      <td>Promedio general del alumno</td>
    </tr>
    <tr>
      <td>Máximo y Mínimo</td>
      <td><code>=MAX(D2:D20)</code> / <code>=MIN(D2:D20)</code></td>
      <td>Obtiene el valor tope y el más bajo de una lista</td>
      <td>Nota más alta del grupo</td>
    </tr>
    <tr>
      <td>Lógica condicional SI</td>
      <td><code>=SI(B2>=7, "Aprobado", "Reprobado")</code></td>
      <td>Evalúa una condición y devuelve un valor si es cierta y otro si es falsa</td>
      <td>Estatus de acreditación automático</td>
    </tr>
  </tbody>
</table>
`,
      },
      {
        title: '4. Práctica en Laboratorio: Control de Calificaciones',
        icon: 'lucide:table',
        body: `
Crea tu libro de cálculo de práctica:

1. Crea las columnas: *Alumno*, *Parcial 1*, *Parcial 2*, *Proyecto*, *Promedio*, *Estatus*.
2. Captura datos para 5 estudiantes ficticios con notas del 0 al 10.
3. En la columna *Promedio*, calcula el promedio con la fórmula \`=PROMEDIO(B2:D2)\`.
4. En la columna *Estatus*, coloca la fórmula: \`=SI(E2>=6, "Aprobado", "Reprobado")\`.
5. Aplica **Formato Condicional** para que las celdas "Reprobado" se pinten con fondo rojo claro.
`,
      },
      {
        title: '5. Reto de Fórmulas: Condición Compuesta',
        icon: 'lucide:check-circle-2',
        body: `
Desafío de lógica en tu hoja:

* Modifica la fórmula de estatus para que exija dos condiciones a la vez: el promedio debe ser mayor o igual a 6 **Y** la nota de *Proyecto* debe ser al menos 7 para aprobar.
* Pista: Usa la función \`=SI(Y(E2>=6, D2>=7), "Aprobado", "Requiere Proyecto")\`.
* Muestra al docente la tabla funcionando al cambiar notas de prueba.
`,
      },
    ],
  },

  // SEMANA 8
  {
    semana: 8,
    moduloFolder: '02-productividad-ofimatica',
    moduloTitle: '2 - Productividad, Ofimática y Colaboración en la Nube',
    temaFolder: '02-hojas-calculo',
    temaTitle: 'Tema 2: Hojas de Cálculo',
    claseFolder: '02-analisis-datos',
    title: 'Hojas de Cálculo II: Gestión y Análisis de Datos',
    subtopicTitle: 'Búsquedas, Tablas Dinámicas y Gráficos',
    fecha: '08-08-2026',
    description: 'Aplica funciones de búsqueda como BUSCARV, filtros avanzados, tablas dinámicas y genera gráficos estadísticos para toma de decisiones.',
    objectives: [
      'Cruzar datos entre tablas independientes usando la función BUSCARV / VLOOKUP',
      'Construir tablas dinámicas para resumir grandes volúmenes de registros en segundos',
      'Seleccionar y configurar el tipo de gráfico adecuado según la naturaleza de la información',
    ],
    slides: [
      {
        title: '1. Búsqueda y Cruce de Datos con BUSCARV',
        icon: 'lucide:search',
        body: `
En bases de datos reales la información está separada en varias tablas (ejemplo: una tabla con ventas y otra con la lista de precios de productos).

La función **BUSCARV** busca un identificador (como un código de producto o matrícula de alumno) en una tabla de referencia y devuelve un dato asociado de otra columna.

* **Sintaxis:** \`=BUSCARV(valor_buscado, tabla_matriz, columna_a_devolver, FALSO)\`
* **Importante:** El último parámetro siempre debe ser **FALSO** (o 0) para exigir coincidencia exacta. Si omites este parámetro, devolverá datos incorrectos.
`,
      },
      {
        title: '2. Tablas Dinámicas (Pivot Tables)',
        icon: 'lucide:pie-chart',
        body: `
Una tabla dinámica no altera tus datos originales: genera una vista resumida e interactiva.

Permite agrupar miles de filas con preguntas clave en segundos:
* ¿Cuánto vendió cada sucursal este mes?
* ¿Cuántos alumnos hay en cada grupo escolar?
* ¿Cuál es el gasto total por categoría de insumos?

Las cuatro áreas de una tabla dinámica son: **Filas**, **Columnas**, **Valores** (lo que se suma o cuenta) y **Filtros**.
`,
      },
      {
        title: '3. Matriz de Selección de Gráficos',
        icon: 'lucide:bar-chart-3',
        body: `
Elige el gráfico según el mensaje que deseas transmitir:

<table>
  <thead>
    <tr>
      <th>Tipo de Gráfico</th>
      <th>Propósito Principal</th>
      <th>Cuándo Usarlo</th>
      <th>Error Común a Evitar</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Barras / Columnas</td>
      <td>Comparar cantidades entre categorías distintas</td>
      <td>Ventas por producto o calificaciones por materia</td>
      <td>Poner más de 12 barras saturando el eje horizontal</td>
    </tr>
    <tr>
      <td>Líneas con Marcadores</td>
      <td>Mostrar evolución de un valor a lo largo del tiempo</td>
      <td>Temperatura por hora o ingresos por mes</td>
      <td>Usarlo para comparar categorías no temporales</td>
    </tr>
    <tr>
      <td>Circular (Pay / Pastel)</td>
      <td>Representar partes de un todo (porcentajes que suman 100%)</td>
      <td>Distribución de presupuesto entre 3 a 5 áreas</td>
      <td>Usar más de 6 rebanadas o valores que no suman 100%</td>
    </tr>
    <tr>
      <td>Dispersión (XY)</td>
      <td>Analizar la relación o correlación entre dos variables numéricas</td>
      <td>Horas de estudio vs nota de examen</td>
      <td>Conectar puntos con líneas sin orden lógico</td>
    </tr>
  </tbody>
</table>
`,
      },
      {
        title: '4. Práctica: Reporte con Tabla Dinámica y BUSCARV',
        icon: 'lucide:layout-grid',
        body: `
Desarrolla el ejercicio en el aula:

1. En la hoja 1, crea una tabla de *Catálogo de Componentes* con: Código (C01, C02...), Nombre y Precio Unitario.
2. En la hoja 2, crea una tabla de *Ventas* con: Folio, Código del Componente y Cantidad Vendida.
3. Usa \`BUSCARV\` en la tabla de Ventas para traer el Nombre y el Precio Unitario desde el Catálogo.
4. Calcula el Total multiplicando Cantidad por Precio Unitario.
5. Inserta una **Tabla Dinámica** que muestre el total de ingresos agrupado por Nombre de Componente.
`,
      },
      {
        title: '5. Reto de Análisis Visual',
        icon: 'lucide:check-circle-2',
        body: `
Presenta tu informe gráfico:

* Agrega un gráfico de columnas vinculado a tu tabla dinámica con título claro y etiquetas de datos sobre cada barra.
* Agrega una **Segmentación de Datos** (Slicer) para filtrar el reporte por rango de fechas en un solo clic.
`,
      },
    ],
  },

  // SEMANA 9
  {
    semana: 9,
    moduloFolder: '02-productividad-ofimatica',
    moduloTitle: '2 - Productividad, Ofimática y Colaboración en la Nube',
    temaFolder: '03-presentaciones',
    temaTitle: 'Tema 3: Presentaciones y Proyectos',
    claseFolder: '01-presentaciones-tecnicas',
    title: 'Presentaciones Técnicas y Proyecto de Productividad',
    subtopicTitle: 'Comunicación Visual y Defensa de Propuestas',
    fecha: '15-08-2026',
    description: 'Diseña diapositivas de alto impacto técnico con síntesis visual y defiende en el aula el proyecto integrador del Módulo 2.',
    objectives: [
      'Aplicar la regla de síntesis visual evitando párrafos densos de texto en diapositivas',
      'Integrar gráficos, tablas resumen y esquemas de arquitectura para sustentar una propuesta',
      'Presentar y defender oralmente en el aula el proyecto de automatización del módulo',
    ],
    slides: [
      {
        title: '1. Principios de Diapositivas Técnicas',
        icon: 'lucide:presentation',
        body: `
Una diapositiva técnica no es un guion para que el expositor lo lea en voz alta. Es un soporte visual que refuerza lo que estás explicando al grupo.

* **Una sola idea principal por diapositiva:** No mezcles presupuesto, arquitectura y cronograma en una misma pantalla.
* **Jerarquía visual:** El título debe leerse desde la última fila del aula. Usa contraste alto (texto blanco sobre fondo oscuro o viceversa).
* **Menos texto, más esquemas:** Reemplaza listas de 10 viñetas por diagramas de flujo, capturas anotadas o cifras destacadas.
`,
      },
      {
        title: '2. Estructura de la Propuesta de Proyecto',
        icon: 'lucide:folder-check',
        body: `
Tu exposición en clase debe responder estas preguntas en orden:

1. **Problema detectado:** ¿Qué proceso es lento o ineficiente actualmente?
2. **Solución propuesta:** ¿Qué hoja de cálculo o sistema automatizado construiste para resolverlo?
3. **Demostración en vivo:** Muestra la hoja funcionando con datos reales.
4. **Presupuesto y viabilidad:** Tabla de costos, tiempo de implementación y beneficios medibles.
5. **Conclusión:** ¿Qué aprendiste y qué mejoras harías en una segunda versión?
`,
      },
      {
        title: '3. Criterios de Evaluación del Proyecto Módulo 2',
        icon: 'lucide:award',
        body: `
Revisa los rubros que calificará el docente:

<table>
  <thead>
    <tr>
      <th>Rubro de Evaluación</th>
      <th>Ponderación</th>
      <th>Criterio Técnico Esperado</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Funcionalidad de Fórmulas</td>
      <td>35%</td>
      <td>Uso correcto de referencias absolutas, funciones lógicas SI y búsquedas sin errores #N/D</td>
    </tr>
    <tr>
      <td>Diseño y Validación de Datos</td>
      <td>25%</td>
      <td>Listas desplegables, formato condicional y protección de celdas contra errores de usuario</td>
    </tr>
    <tr>
      <td>Reporte y Tablas Dinámicas</td>
      <td>20%</td>
      <td>Resumen analítico con gráficos claros y segmentación funcional</td>
    </tr>
    <tr>
      <td>Presentación y Defensa Oral</td>
      <td>20%</td>
      <td>Claridad al explicar el flujo, manejo del tiempo (3 a 5 min) y respuesta a dudas técnicas</td>
    </tr>
  </tbody>
</table>
`,
      },
      {
        title: '4. Taller en Aula: Ensayos de Exposición',
        icon: 'lucide:users',
        body: `
Prepara tu presentación de 5 diapositivas en el aula:

* **Diapositiva 1:** Portada con nombre del proyecto y autores.
* **Diapositiva 2:** Situación actual y objetivo de la automatización.
* **Diapositiva 3:** Captura del tablero de control con llamadas visuales (flechas o recuadros).
* **Diapositiva 4:** Gráfico de impacto económico o de tiempo ahorrado.
* **Diapositiva 5:** Conclusión técnica y cierre profesional.
`,
      },
      {
        title: '5. Defensa en Clase: Entrega del Proyecto',
        icon: 'lucide:check-circle-2',
        body: `
Demuestra el proyecto ante tus compañeros y docente:

* Abre tu libro de cálculo en el proyector del aula.
* Ingresa un registro nuevo y demuestra cómo se actualizan automáticamente el estatus, el promedio y la tabla dinámica.
* Entrega los archivos digitales finales en la carpeta de entregas del curso.
`,
      },
    ],
  },

  // SEMANA 10
  {
    semana: 10,
    moduloFolder: '03-multimedia-practica',
    moduloTitle: '3 - Multimedia Práctica: Imagen y Video',
    temaFolder: '01-graficos-digitales',
    temaTitle: 'Tema 1: Gráficos Digitales',
    claseFolder: '01-formatos-multimedia',
    title: 'Fundamentos Visuales y Formatos Multimedia',
    subtopicTitle: 'Píxeles, Vectores y Espacios de Color',
    fecha: '22-08-2026',
    description: 'Distingue entre mapa de bits y gráficos vectoriales. Domina espacios de color RGB vs CMYK y optimiza imágenes sin perder calidad visual.',
    objectives: [
      'Identificar la diferencia estructural entre gráficos rasterizados (píxeles) y vectoriales (fórmulas matemáticas)',
      'Seleccionar el espacio de color adecuado (RGB para pantallas, CMYK para impresión)',
      'Optimizar imágenes exportadas en formatos PNG, JPG, WebP y SVG según el canal de distribución',
    ],
    slides: [
      {
        title: '1. Mapa de Bits vs Gráficos Vectoriales',
        icon: 'lucide:image',
        body: `
Todas las imágenes digitales pertenecen a uno de estos dos mundos:

* **Mapa de bits (Raster):** Rejilla de pequeños cuadros de color llamados **píxeles**. Al ampliar la imagen, los píxeles se hacen visibles y la imagen se pixela o pierde nitidez (ejemplos: fotografías, capturas de pantalla, archivos JPG y PNG).
* **Gráficos vectoriales:** Definidos por **fórmulas matemáticas** de líneas, curvas y coordenadas. Puedes escalarlos al tamaño de una valla publicitaria sin perder ni un solo gramo de nitidez (ejemplos: logotipos, iconos, tipografías, archivos SVG).
`,
      },
      {
        title: '2. Espacios de Color: Luz (RGB) vs Tinta (CMYK)',
        icon: 'lucide:palette',
        body: `
El mismo color no se construye igual en una pantalla que sobre un papel impreso:

* **RGB (Rojo, Verde, Azul):** Modelo aditivo. Se utiliza en pantallas, teléfonos y proyectores. La suma de los tres colores al 100% genera **luz blanca**.
* **CMYK (Cian, Magenta, Amarillo, Negro):** Modelo sustractivo. Se utiliza en impresoras y litografía. La suma de tintas sobre papel blanco absorbe la luz hasta aproximarse al negro.

> **Regla de oro:** Si diseñas para sitios web, aplicaciones o presentaciones, usa siempre **RGB**. Si envías a imprimir en plotter, folletos o camisetas, convierte a **CMYK**.
`,
      },
      {
        title: '3. Matriz de Formatos de Imagen Digital',
        icon: 'lucide:file-type',
        body: `
Elige el formato adecuado según la necesidad técnica:

<table>
  <thead>
    <tr>
      <th>Formato</th>
      <th>Naturaleza</th>
      <th>Canal Alfa (Transparencia)</th>
      <th>Tipo de Compresión</th>
      <th>Uso Principal</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>PNG</td>
      <td>Mapa de bits</td>
      <td>Sí (Transparencia perfecta)</td>
      <td>Sin pérdida (Lossless)</td>
      <td>Capturas técnicas, logos con fondo transparente y diagramas</td>
    </tr>
    <tr>
      <td>JPG / JPEG</td>
      <td>Mapa de bits</td>
      <td>No (Fondo blanco opaco)</td>
      <td>Con pérdida (Lossy)</td>
      <td>Fotografías del mundo real donde el peso de archivo es crítico</td>
    </tr>
    <tr>
      <td>WebP</td>
      <td>Mapa de bits</td>
      <td>Sí</td>
      <td>Híbrida (Con o sin pérdida)</td>
      <td>Imágenes modernas para sitios web con 30% menos peso que JPG</td>
    </tr>
    <tr>
      <td>SVG</td>
      <td>Vectorial (XML)</td>
      <td>Sí</td>
      <td>Código matemático ligero</td>
      <td>Iconos de interfaz, logotipos institucionales e ilustraciones web</td>
    </tr>
  </tbody>
</table>
`,
      },
      {
        title: '4. Práctica en Aula: Inspección y Comparativa de Formatos',
        icon: 'lucide:zoom-in',
        body: `
Ejecuta la prueba con los assets provistos en el laboratorio:

1. Descarga la carpeta de imágenes de práctica en tu estación de trabajo.
2. Abre la fotografía en formato JPG y el logotipo en formato SVG dentro del visor de imágenes.
3. Aplica un zoom de 500% sobre el contorno de ambos archivos. Observa la pixelación en el JPG y la línea perfecta en el SVG.
4. Exporta la misma fotografía en tres calidades de compresión (100%, 70% y 20%) y compara el peso en kilobytes de cada archivo.
`,
      },
      {
        title: '5. Reto de Optimización Web',
        icon: 'lucide:check-circle-2',
        body: `
Demuestra la optimización de archivos:

* Toma una imagen de alta resolución provista por el docente (mayor a 5 MB).
* Redimensiónala a 1920x1080 píxeles a 72 DPI y expórtala en formato WebP con un peso final inferior a 250 KB sin degradación visual notable.
* Presenta ambos archivos al docente para verificar resolución y peso.
`,
      },
    ],
  },

  // SEMANA 11
  {
    semana: 11,
    moduloFolder: '03-multimedia-practica',
    moduloTitle: '3 - Multimedia Práctica: Imagen y Video',
    temaFolder: '01-graficos-digitales',
    temaTitle: 'Tema 1: Gráficos Digitales',
    claseFolder: '02-retoque-edicion-imagen',
    title: 'Retoque y Edición de Imagen Digital',
    subtopicTitle: 'Capas, Máscaras y Flujo No Destructivo',
    fecha: '29-08-2026',
    description: 'Aprende el flujo de trabajo no destructivo con capas, máscaras, curvas de nivel y herramientas de selección en software de edición.',
    objectives: [
      'Dominar el sistema de capas, modos de fusión y jerarquías de superposición',
      'Crear y editar máscaras de capa para ocultar elementos sin borrarlos físicamente',
      'Corregir exposición, balance de blancos y curvas tonales de una fotografía en el laboratorio',
    ],
    slides: [
      {
        title: '1. El Flujo de Trabajo No Destructivo y las Capas',
        icon: 'lucide:layers-2',
        body: `
El error de novato más grave es usar el borrador directamente sobre la foto original. Si te equivocas, la información se pierde para siempre.

El **flujo de trabajo no destructivo** garantiza que la fotografía base permanezca intacta. Todas las modificaciones se realizan mediante capas superpuestas que puedes ocultar, reordenar o ajustar en cualquier momento.

* **Capas (Layers):** Hojas de acetato transparente apiladas una sobre otra.
* **Orden de apilamiento:** La capa superior tapa a las que están abajo, a menos que tenga transparencia o un modo de fusión.
* **Opacidad:** Porcentaje de transparencia de cada capa (0% invisible, 100% opaca).
`,
      },
      {
        title: '2. Máscaras de Capa: Ocultar sin Borrar',
        icon: 'lucide:eye',
        body: `
Una **máscara de capa** es un mapa en escala de grises que controla qué partes de una capa son visibles y cuáles permanecen ocultas.

Aprende la regla fundamental de las máscaras:

> **"El blanco revela, el negro oculta, el gris transparenta."**

* Pinta con pincel negro en la máscara para hacer invisible una zona (ejemplo: recortar el fondo de una persona).
* Si te pasas, simplemente pinta con pincel blanco para recuperar la zona oculta. ¡Nunca perdiste píxeles!
`,
      },
      {
        title: '3. Herramientas de Ajuste Tonal y Selección',
        icon: 'lucide:sliders-horizontal',
        body: `
Comandos esenciales de edición fotográfica:

<table>
  <thead>
    <tr>
      <th>Herramienta / Ajuste</th>
      <th>Función Técnica</th>
      <th>Cuándo Utilizarla</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Niveles / Curvas</td>
      <td>Ajusta el punto negro, punto blanco y tonos medios de la imagen</td>
      <td>Corregir fotos oscuras (subexpuestas) o lavadas sin contraste</td>
    </tr>
    <tr>
      <td>Tono y Saturación</td>
      <td>Modifica la vivacidad y matiz de colores específicos</td>
      <td>Acentuar el color del cielo o corregir tonos de piel amarillentos</td>
    </tr>
    <tr>
      <td>Lazo Poligonal / Pluma</td>
      <td>Selección precisa basada en vértices vectoriales</td>
      <td>Recortar objetos con bordes duros como computadoras o cajas</td>
    </tr>
    <tr>
      <td>Pincel Corrector</td>
      <td>Muestrea píxeles vecinos para disimular imperfecciones</td>
      <td>Eliminar polvo de la lente, manchas o cables molestos del fondo</td>
    </tr>
  </tbody>
</table>
`,
      },
      {
        title: '4. Práctica en Laboratorio: Montaje y Corrección Tonal',
        icon: 'lucide:wand-2',
        body: `
Sigue el flujo de trabajo en el editor de imágenes del aula:

1. Abre la imagen de fondo (*laboratorio.jpg*) y coloca encima como capa la foto del estudiante (*persona.jpg*).
2. Agrega una **Máscara de Capa** a la capa de la persona.
3. Con un pincel suave de color negro, oculta el fondo original de la persona hasta integrarla con el laboratorio.
4. Agrega una capa de ajuste de **Curvas** y ajusta el contraste para que la iluminación de la persona coincida con la del fondo.
5. Guarda tu archivo en el formato nativo del editor (\`.xcf\` o \`.psd\`) para conservar todas las capas editables.
`,
      },
      {
        title: '5. Reto Práctico: Exportación Final de la Portada',
        icon: 'lucide:check-circle-2',
        body: `
Culmina tu entregable de la Semana 11:

* Agrega una capa de texto con tipografía limpia y legible que diga: *Tecnología y Futuro 2026*.
* Aplica una sombra suave a la tipografía para garantizar lectura sobre el fondo.
* Exporta una copia en **PNG** (para visualización) manteniendo tu archivo maestro editable con capas.
* Muestra al docente la máscara de capa activa para comprobar que no usaste el borrador destructivo.
`,
      },
    ],
  },
];

function generarMDX(c: ClaseContenido): string {
  const frontmatter = `---
title: "${c.title}"
moduleTitle: "${c.moduloTitle}"
topicTitle: "${c.temaTitle}"
subtopicTitle: "${c.subtopicTitle}"
semana: ${c.semana}
fecha: "${c.fecha}"
published: true
description: "${c.description}"
duration: 45
objectives:
${c.objectives.map(o => `  - "${o}"`).join('\n')}
---
import { Icon } from "astro-icon/components";

# ${c.title}

${c.description}

`;

  const slidesMDX = c.slides.map((s, idx) => {
    const isFirst = idx === 0;
    const prefix = isFirst ? '' : '---\n\n';
    return `${prefix}## ${s.title} <Icon name="${s.icon}" class="inline w-6 h-6 align-text-bottom text-brand-primary" />

${s.body.trim()}
`;
  }).join('\n');

  return frontmatter + slidesMDX;
}

const rootDir = path.resolve(__dirname, '..');
const leccionesDir = path.join(rootDir, 'src', 'content', 'lecciones');

console.log('Generando clases oficiales de la Semana 1 a la 11...');

for (const c of CLASES) {
  const targetDir = path.join(leccionesDir, c.moduloFolder, c.temaFolder, c.claseFolder);
  fs.mkdirSync(targetDir, { recursive: true });
  const filePath = path.join(targetDir, 'index.mdx');
  const mdxContent = generarMDX(c);
  fs.writeFileSync(filePath, mdxContent, 'utf8');
  console.log(`✓ Semana ${c.semana}: ${c.title} -> ${path.relative(rootDir, filePath)}`);
}

console.log('¡11 clases generadas con éxito siguiendo la plantilla estandarizada y las reglas stop-slop!');
