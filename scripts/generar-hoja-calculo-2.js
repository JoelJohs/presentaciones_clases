import ExcelJS from 'exceljs';
import path from 'node:path';
import fs from 'node:fs';

async function generateWorkbook() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Profesor de Informática';
  workbook.lastModifiedBy = 'Estudiante';
  workbook.created = new Date();
  workbook.modified = new Date();

  // Paleta de colores visual
  const colors = {
    navy: '0F172A',
    navyLight: '1E293B',
    primary: '0284C7', // Sky 600
    primaryLight: 'E0F2FE', // Sky 100
    accentPurple: '7C3AED', // Violet 600
    accentPurpleLight: 'F3E8FF',
    accentGreen: '059669', // Emerald 600
    accentGreenLight: 'D1FAE5',
    accentAmber: 'D97706', // Amber 600
    accentAmberLight: 'FEF3C7',
    accentRed: 'DC2626',
    grayHeader: 'F8FAFC',
    graySubtle: 'F1F5F9',
    grayBorder: 'CBD5E1',
    yellowHighlight: 'FEF08A', // Amarillo para celdas a contestar
    yellowBorder: 'EAB308',
    white: 'FFFFFF',
  };

  const thinBorder = {
    top: { style: 'thin', color: { argb: colors.grayBorder } },
    left: { style: 'thin', color: { argb: colors.grayBorder } },
    bottom: { style: 'thin', color: { argb: colors.grayBorder } },
    right: { style: 'thin', color: { argb: colors.grayBorder } },
  };

  const inputCellBorder = {
    top: { style: 'medium', color: { argb: colors.yellowBorder } },
    left: { style: 'medium', color: { argb: colors.yellowBorder } },
    bottom: { style: 'medium', color: { argb: colors.yellowBorder } },
    right: { style: 'medium', color: { argb: colors.yellowBorder } },
  };

  // ==========================================
  // HOJA 1: 📌 INSTRUCCIONES Y PORTADA
  // ==========================================
  const wsPortada = workbook.addWorksheet('📌 Instrucciones', {
    views: [{ showGridLines: true }]
  });
  wsPortada.columns = [
    { width: 4 },  // A
    { width: 28 }, // B
    { width: 34 }, // C
    { width: 28 }, // D
    { width: 20 }, // E
    { width: 6 },  // F
  ];

  // Título Principal
  wsPortada.mergeCells('B2:E2');
  const catCell = wsPortada.getCell('B2');
  catCell.value = 'MÓDULO 2: OFIMÁTICA EN LA NUBE';
  catCell.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: colors.primary } };

  wsPortada.mergeCells('B3:E3');
  const mainTitleCell = wsPortada.getCell('B3');
  mainTitleCell.value = 'Práctica 2: Funciones, Formato Condicional y Gráficos';
  mainTitleCell.font = { name: 'Segoe UI', size: 18, bold: true, color: { argb: colors.navy } };

  wsPortada.mergeCells('B4:E4');
  const subTitleCell = wsPortada.getCell('B4');
  subTitleCell.value = 'Cuaderno de trabajo oficial (Sin resolver) — Completa cada pestaña durante la sesión';
  subTitleCell.font = { name: 'Segoe UI', size: 11, italic: true, color: { argb: '64748B' } };

  // Ficha de Identificación del Alumno
  wsPortada.getCell('B6').value = 'Nombre del Alumno:';
  wsPortada.getCell('B6').font = { name: 'Segoe UI', size: 11, bold: true };
  wsPortada.mergeCells('C6:D6');
  wsPortada.getCell('C6').value = '';
  wsPortada.getCell('C6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.yellowHighlight } };
  wsPortada.getCell('C6').border = inputCellBorder;
  wsPortada.getCell('D6').border = inputCellBorder;

  wsPortada.getCell('B7').value = 'Fecha:';
  wsPortada.getCell('B7').font = { name: 'Segoe UI', size: 11, bold: true };
  wsPortada.getCell('C7').value = '';
  wsPortada.getCell('C7').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.yellowHighlight } };
  wsPortada.getCell('C7').font = { name: 'Segoe UI', size: 11 };
  wsPortada.getCell('C7').border = thinBorder;

  wsPortada.getCell('D7').value = 'Grupo / Grado:';
  wsPortada.getCell('D7').font = { name: 'Segoe UI', size: 11, bold: true };
  wsPortada.getCell('E7').value = '';
  wsPortada.getCell('E7').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.yellowHighlight } };
  wsPortada.getCell('E7').border = thinBorder;

  // Índice de actividades
  wsPortada.mergeCells('B9:E9');
  wsPortada.getCell('B9').value = '📋 HOJAS DE TRABAJO A REALIZAR';
  wsPortada.getCell('B9').font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FFFFFF' } };
  wsPortada.getCell('B9').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.navy } };
  wsPortada.getCell('B9').alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };

  const hojas = [
    {
      num: '1',
      pestaña: '1. MAX, MIN y CONTAR',
      tema: 'Estadística básica',
      detalles: 'Encontrar valor máximo, mínimo y conteo total de elementos en una lista de productos.'
    },
    {
      num: '2',
      pestaña: '2. Función SI Condicional',
      tema: 'Toma de decisiones automática',
      detalles: 'Evaluar calificaciones para mostrar "APROBADO" o "REPROBADO" según la condición >= 70.'
    },
    {
      num: '3',
      pestaña: '3. Formato Condicional',
      tema: 'Resaltado visual automático',
      detalles: 'Aplicar colores automáticos a inventarios (Rojo si el stock es crítico).'
    },
    {
      num: '4',
      pestaña: '4. Dashboard Integrador',
      tema: 'Proyecto de Rendimiento Escolar',
      detalles: 'Calcular promedios, estatus condicional, totales, formato condicional e insertar gráfico de barras.'
    },
  ];

  let curRow = 11;
  hojas.forEach((h) => {
    wsPortada.getCell(`B${curRow}`).value = `Pestaña ${h.num}: ${h.pestaña}`;
    wsPortada.getCell(`B${curRow}`).font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: colors.primary } };
    
    wsPortada.mergeCells(`C${curRow}:D${curRow}`);
    wsPortada.getCell(`C${curRow}`).value = `${h.tema} — ${h.detalles}`;
    wsPortada.getCell(`C${curRow}`).font = { name: 'Segoe UI', size: 10 };
    wsPortada.getCell(`C${curRow}`).alignment = { wrapText: true };

    wsPortada.getCell(`E${curRow}`).value = '[  ] Sin realizar';
    wsPortada.getCell(`E${curRow}`).font = { name: 'Segoe UI', size: 10, italic: true };
    wsPortada.getCell(`E${curRow}`).alignment = { horizontal: 'center' };
    wsPortada.getCell(`E${curRow}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.grayHeader } };
    wsPortada.getCell(`E${curRow}`).border = thinBorder;

    curRow += 2;
  });

  // Instrucciones
  curRow = 19;
  wsPortada.mergeCells(`B${curRow}:E${curRow}`);
  wsPortada.getCell(`B${curRow}`).value = '💡 INSTRUCCIONES PARA RESOLVER TU PRÁCTICA:';
  wsPortada.getCell(`B${curRow}`).font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: colors.accentAmber } };

  curRow++;
  const tips = [
    '1. Las celdas marcadas en AMARILLO corresponden a las actividades que debes completar.',
    '2. Para la función SI, recuerda la sintaxis: =SI(prueba_lógica, "valor_si_verdadero", "valor_si_falso").',
    '3. En la pestaña 4 crearás un gráfico seleccionando el rango de datos y utilizando el menú Insertar > Gráfico.',
    '4. Guarda tu archivo final con la nomenclatura "Funciones_TuNombre.xlsx" al terminar.',
  ];
  tips.forEach((t) => {
    wsPortada.mergeCells(`B${curRow}:E${curRow}`);
    wsPortada.getCell(`B${curRow}`).value = t;
    wsPortada.getCell(`B${curRow}`).font = { name: 'Segoe UI', size: 10 };
    curRow++;
  });


  // ==========================================
  // HOJA 2: 1. MAX, MIN Y CONTAR (SIN RESOLVER)
  // ==========================================
  const ws1 = workbook.addWorksheet('1. MAX, MIN y CONTAR', {
    views: [{ showGridLines: true }]
  });
  ws1.columns = [
    { width: 4 },  // A
    { width: 22 }, // B
    { width: 16 }, // C
    { width: 18 }, // D
    { width: 28 }, // E
    { width: 20 }, // F
  ];

  ws1.mergeCells('B2:F2');
  ws1.getCell('B2').value = 'ACTIVIDAD 1: FUNCIONES ESTADÍSTICAS (MAX, MIN, CONTAR)';
  ws1.getCell('B2').font = { name: 'Segoe UI', size: 13, bold: true, color: { argb: colors.primary } };

  ws1.mergeCells('B4:F4');
  ws1.getCell('B4').value = '📊 REPORTE DE VENTAS DE EQUIPO DE CÓMPUTO';
  ws1.getCell('B4').font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FFFFFF' } };
  ws1.getCell('B4').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.navy } };
  ws1.getCell('B4').alignment = { horizontal: 'left', indent: 1 };

  // Tabla de datos
  const headers1 = ['Código', 'Producto', 'Categoría', 'Precio Unitario ($)', 'Unidades Vendidas'];
  headers1.forEach((h, idx) => {
    const colLet = String.fromCharCode(66 + idx);
    const c = ws1.getCell(`${colLet}6`);
    c.value = h;
    c.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFF' } };
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.primary } };
    c.alignment = { horizontal: 'center' };
    c.border = thinBorder;
  });

  const productos = [
    { cod: 'PROD-01', nom: 'Laptop Gamer i7', cat: 'Equipos', prec: 18500, vend: 12 },
    { cod: 'PROD-02', nom: 'Mouse Óptico USB', cat: 'Accesorios', prec: 250, vend: 45 },
    { cod: 'PROD-03', nom: 'Teclado Mecánico RGB', cat: 'Accesorios', prec: 890, vend: 28 },
    { cod: 'PROD-04', nom: 'Monitor 27" 144Hz', cat: 'Pantallas', prec: 4600, vend: 15 },
    { cod: 'PROD-05', nom: 'Disco SSD 1TB NVMe', cat: 'Almacenamiento', prec: 1350, vend: 34 },
    { cod: 'PROD-06', nom: 'Memoria RAM 16GB', cat: 'Componentes', prec: 920, vend: 40 },
    { cod: 'PROD-07', nom: 'Audífonos Bluetooth', cat: 'Audio', prec: 780, vend: 22 },
  ];

  productos.forEach((p, idx) => {
    const r = 7 + idx;
    ws1.getCell(`B${r}`).value = p.cod;
    ws1.getCell(`B${r}`).alignment = { horizontal: 'center' };
    ws1.getCell(`B${r}`).border = thinBorder;

    ws1.getCell(`C${r}`).value = p.nom;
    ws1.getCell(`C${r}`).border = thinBorder;

    ws1.getCell(`D${r}`).value = p.cat;
    ws1.getCell(`D${r}`).alignment = { horizontal: 'center' };
    ws1.getCell(`D${r}`).border = thinBorder;

    ws1.getCell(`E${r}`).value = p.prec;
    ws1.getCell(`E${r}`).numFmt = '"$"#,##0.00';
    ws1.getCell(`E${r}`).border = thinBorder;

    ws1.getCell(`F${r}`).value = p.vend;
    ws1.getCell(`F${r}`).alignment = { horizontal: 'right' };
    ws1.getCell(`F${r}`).border = thinBorder;
  });

  // Zona de respuestas a calcular
  ws1.mergeCells('B16:F16');
  ws1.getCell('B16').value = '🎯 RESPONDE UTILIZANDO LAS FUNCIONES REQUERIDAS (Escribe la fórmula en las celdas amarillas):';
  ws1.getCell('B16').font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: colors.accentAmber } };

  const preguntas1 = [
    { preg: '1. Precio del producto MÁS CARO (Función =MAX):', celda: 'F18', fmt: '"$"#,##0.00' },
    { preg: '2. Precio del producto MÁS BARATO (Función =MIN):', celda: 'F19', fmt: '"$"#,##0.00' },
    { preg: '3. TOTAL DE PRODUCTOS registrados (Función =CONTAR):', celda: 'F20', fmt: '0' },
    { preg: '4. Mayor cantidad de unidades vendidas (Función =MAX):', celda: 'F21', fmt: '0' },
  ];

  preguntas1.forEach((q) => {
    const rowNum = parseInt(q.celda.substring(1));
    ws1.mergeCells(`B${rowNum}:E${rowNum}`);
    ws1.getCell(`B${rowNum}`).value = q.preg;
    ws1.getCell(`B${rowNum}`).font = { name: 'Segoe UI', size: 10, bold: true };

    ws1.getCell(q.celda).value = ''; // VACÍA
    ws1.getCell(q.celda).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.yellowHighlight } };
    ws1.getCell(q.celda).border = inputCellBorder;
    ws1.getCell(q.celda).numFmt = q.fmt;
  });


  // ==========================================
  // HOJA 3: 2. FUNCIÓN SI CONDICIONAL (SIN RESOLVER)
  // ==========================================
  const ws2 = workbook.addWorksheet('2. Función SI Condicional', {
    views: [{ showGridLines: true }]
  });
  ws2.columns = [
    { width: 4 },  // A
    { width: 12 }, // B
    { width: 26 }, // C
    { width: 18 }, // D
    { width: 22 }, // E
    { width: 22 }, // F
  ];

  ws2.mergeCells('B2:F2');
  ws2.getCell('B2').value = 'ACTIVIDAD 2: FUNCIÓN CONDICIONAL =SI()';
  ws2.getCell('B2').font = { name: 'Segoe UI', size: 13, bold: true, color: { argb: colors.primary } };

  ws2.mergeCells('B4:F4');
  ws2.getCell('B4').value = '🎓 ACTA DE CALIFICACIONES - EVALUACIÓN AUTOMÁTICA DE ESTATUS';
  ws2.getCell('B4').font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FFFFFF' } };
  ws2.getCell('B4').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.navy } };
  ws2.getCell('B4').alignment = { horizontal: 'left', indent: 1 };

  ws2.mergeCells('B5:F5');
  ws2.getCell('B5').value = 'Regla: Si la Calificación es mayor o igual a 70 (>=70), el estatus debe ser "APROBADO". De lo contrario, "REPROBADO".';
  ws2.getCell('B5').font = { name: 'Segoe UI', size: 10, italic: true };

  const headers2 = ['ID', 'Nombre del Estudiante', 'Calificación', 'Estatus (=SI...)', 'Observación'];
  headers2.forEach((h, idx) => {
    const colLet = String.fromCharCode(66 + idx);
    const c = ws2.getCell(`${colLet}7`);
    c.value = h;
    c.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFF' } };
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.accentPurple } };
    c.alignment = { horizontal: 'center' };
    c.border = thinBorder;
  });

  const alumnos = [
    { id: 'AL-101', nom: 'Carlos Mendoza', cal: 85 },
    { id: 'AL-102', nom: 'Sofía Ramírez', cal: 62 },
    { id: 'AL-103', nom: 'Mateo Hernández', cal: 95 },
    { id: 'AL-104', nom: 'Lucía Torres', cal: 68 },
    { id: 'AL-105', nom: 'Diego Flores', cal: 70 },
    { id: 'AL-106', nom: 'Valentina Gómez', cal: 55 },
    { id: 'AL-107', nom: 'Santiago López', cal: 90 },
  ];

  alumnos.forEach((a, idx) => {
    const r = 8 + idx;
    ws2.getCell(`B${r}`).value = a.id;
    ws2.getCell(`B${r}`).alignment = { horizontal: 'center' };
    ws2.getCell(`B${r}`).border = thinBorder;

    ws2.getCell(`C${r}`).value = a.nom;
    ws2.getCell(`C${r}`).border = thinBorder;

    ws2.getCell(`D${r}`).value = a.cal;
    ws2.getCell(`D${r}`).alignment = { horizontal: 'center' };
    ws2.getCell(`D${r}`).border = thinBorder;

    // Celda amarilla para la fórmula =SI(D8>=70; "APROBADO"; "REPROBADO")
    ws2.getCell(`E${r}`).value = ''; // VACÍA
    ws2.getCell(`E${r}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.yellowHighlight } };
    ws2.getCell(`E${r}`).alignment = { horizontal: 'center' };
    ws2.getCell(`E${r}`).border = inputCellBorder;

    ws2.getCell(`F${r}`).value = ''; // Espacio opcional
    ws2.getCell(`F${r}`).border = thinBorder;
  });

  // Reto extra
  ws2.mergeCells('B16:F16');
  ws2.getCell('B16').value = '💡 PISTA / AYUDA DE SINTAXIS:';
  ws2.getCell('B16').font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: colors.accentAmber } };

  ws2.mergeCells('B17:F17');
  ws2.getCell('B17').value = 'Escribe en la celda E8:   =SI(D8>=70, "APROBADO", "REPROBADO")   y luego arrastra el autorrelleno hacia abajo.';
  ws2.getCell('B17').font = { name: 'Segoe UI', size: 10, italic: true };


  // ==========================================
  // HOJA 4: 3. FORMATO CONDICIONAL (SIN RESOLVER)
  // ==========================================
  const ws3 = workbook.addWorksheet('3. Formato Condicional', {
    views: [{ showGridLines: true }]
  });
  ws3.columns = [
    { width: 4 },  // A
    { width: 14 }, // B
    { width: 28 }, // C
    { width: 16 }, // D
    { width: 18 }, // E
    { width: 24 }, // F
  ];

  ws3.mergeCells('B2:F2');
  ws3.getCell('B2').value = 'ACTIVIDAD 3: REGLAS DE FORMATO CONDICIONAL';
  ws3.getCell('B2').font = { name: 'Segoe UI', size: 13, bold: true, color: { argb: colors.primary } };

  ws3.mergeCells('B4:F4');
  ws3.getCell('B4').value = '📦 INVENTARIO DE ALMACÉN - ALERTAS DE STOCK CRÍTICO';
  ws3.getCell('B4').font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FFFFFF' } };
  ws3.getCell('B4').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.navy } };
  ws3.getCell('B4').alignment = { horizontal: 'left', indent: 1 };

  const headers3 = ['ID Artículo', 'Descripción del Artículo', 'Stock Actual', 'Mínimo Requerido', 'Instrucción de Formato'];
  headers3.forEach((h, idx) => {
    const colLet = String.fromCharCode(66 + idx);
    const c = ws3.getCell(`${colLet}6`);
    c.value = h;
    c.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFF' } };
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.accentGreen } };
    c.alignment = { horizontal: 'center' };
    c.border = thinBorder;
  });

  const inventario = [
    { id: 'ART-01', desc: 'Cable HDMI 2m', stock: 45, min: 15, inst: 'Normal' },
    { id: 'ART-02', desc: 'Adaptador VGA a HDMI', stock: 4, min: 10, inst: 'Aplica Formato Rojo si Stock < 10' },
    { id: 'ART-03', desc: 'Pasta Térmica 5g', stock: 2, min: 8, inst: 'Aplica Formato Rojo si Stock < 8' },
    { id: 'ART-04', desc: 'Memoria USB 64GB', stock: 30, min: 12, inst: 'Normal' },
    { id: 'ART-05', desc: 'Aire Comprimido 400ml', stock: 5, min: 15, inst: 'Aplica Formato Rojo si Stock < 15' },
    { id: 'ART-06', desc: 'Espuma Limpiadora', stock: 18, min: 10, inst: 'Normal' },
  ];

  inventario.forEach((item, idx) => {
    const r = 7 + idx;
    ws3.getCell(`B${r}`).value = item.id;
    ws3.getCell(`B${r}`).alignment = { horizontal: 'center' };
    ws3.getCell(`B${r}`).border = thinBorder;

    ws3.getCell(`C${r}`).value = item.desc;
    ws3.getCell(`C${r}`).border = thinBorder;

    ws3.getCell(`D${r}`).value = item.stock;
    ws3.getCell(`D${r}`).alignment = { horizontal: 'center' };
    ws3.getCell(`D${r}`).border = thinBorder;

    ws3.getCell(`E${r}`).value = item.min;
    ws3.getCell(`E${r}`).alignment = { horizontal: 'center' };
    ws3.getCell(`E${r}`).border = thinBorder;

    ws3.getCell(`F${r}`).value = item.inst;
    ws3.getCell(`F${r}`).font = { name: 'Segoe UI', size: 9, italic: true };
    ws3.getCell(`F${r}`).border = thinBorder;
  });

  ws3.mergeCells('B14:F14');
  ws3.getCell('B14').value = '🎯 INSTRUCCIONES PRÁCTICAS:';
  ws3.getCell('B14').font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: colors.accentAmber } };

  ws3.mergeCells('B15:F15');
  ws3.getCell('B15').value = '1. Selecciona el rango D7:D12 (Stock Actual).';
  ws3.getCell('B15').font = { name: 'Segoe UI', size: 10 };

  ws3.mergeCells('B16:F16');
  ws3.getCell('B16').value = '2. Ve al menú Formato > Formato condicional (o Inicio > Formato condicional en Excel).';
  ws3.getCell('B16').font = { name: 'Segoe UI', size: 10 };

  ws3.mergeCells('B17:F17');
  ws3.getCell('B17').value = '3. Crea una regla: "Es menor que 10" y aplica relleno Rojo Claro con texto Rojo Oscuro.';
  ws3.getCell('B17').font = { name: 'Segoe UI', size: 10 };


  // ==========================================
  // HOJA 5: 4. DASHBOARD INTEGRADOR (SIN RESOLVER)
  // ==========================================
  const ws4 = workbook.addWorksheet('4. Dashboard Integrador', {
    views: [{ showGridLines: true }]
  });
  ws4.columns = [
    { width: 4 },  // A
    { width: 22 }, // B
    { width: 14 }, // C
    { width: 14 }, // D
    { width: 14 }, // E
    { width: 16 }, // F
    { width: 20 }, // G
  ];

  ws4.mergeCells('B2:G2');
  ws4.getCell('B2').value = 'PROYECTO INTEGRADOR: DASHBOARD DE RENDIMIENTO Y GRÁFICO';
  ws4.getCell('B2').font = { name: 'Segoe UI', size: 13, bold: true, color: { argb: colors.navy } };

  ws4.mergeCells('B4:G4');
  ws4.getCell('B4').value = '🏆 REPORTE GENERAL DE NOTAS DE INFORMÁTICA';
  ws4.getCell('B4').font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FFFFFF' } };
  ws4.getCell('B4').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.navy } };

  const headers4 = ['Estudiante', 'Parcial 1', 'Parcial 2', 'Parcial 3', 'Promedio (=PROMEDIO)', 'Estatus (=SI...)'];
  headers4.forEach((h, idx) => {
    const colLet = String.fromCharCode(66 + idx);
    const c = ws4.getCell(`${colLet}6`);
    c.value = h;
    c.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFF' } };
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.primary } };
    c.alignment = { horizontal: 'center' };
    c.border = thinBorder;
  });

  const notasDashboard = [
    { nom: 'Ana Martínez', p1: 85, p2: 90, p3: 88 },
    { nom: 'Bruno Gómez', p1: 60, p2: 55, p3: 65 },
    { nom: 'Carla Silva', p1: 95, p2: 100, p3: 98 },
    { nom: 'Daniel Ruiz', p1: 70, p2: 75, p3: 72 },
    { nom: 'Elena Vega', p1: 50, p2: 60, p3: 58 },
  ];

  notasDashboard.forEach((nd, idx) => {
    const r = 7 + idx;
    ws4.getCell(`B${r}`).value = nd.nom;
    ws4.getCell(`B${r}`).border = thinBorder;

    ws4.getCell(`C${r}`).value = nd.p1;
    ws4.getCell(`C${r}`).alignment = { horizontal: 'center' };
    ws4.getCell(`C${r}`).border = thinBorder;

    ws4.getCell(`D${r}`).value = nd.p2;
    ws4.getCell(`D${r}`).alignment = { horizontal: 'center' };
    ws4.getCell(`D${r}`).border = thinBorder;

    ws4.getCell(`E${r}`).value = nd.p3;
    ws4.getCell(`E${r}`).alignment = { horizontal: 'center' };
    ws4.getCell(`E${r}`).border = thinBorder;

    // Celdas amarillas para promedio y estatus (FÓRMULAS A ESCRIBIR POR EL ALUMNO)
    ws4.getCell(`F${r}`).value = ''; // VACÍA
    ws4.getCell(`F${r}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.yellowHighlight } };
    ws4.getCell(`F${r}`).border = inputCellBorder;
    ws4.getCell(`F${r}`).numFmt = '0.0';

    ws4.getCell(`G${r}`).value = ''; // VACÍA
    ws4.getCell(`G${r}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.yellowHighlight } };
    ws4.getCell(`G${r}`).alignment = { horizontal: 'center' };
    ws4.getCell(`G${r}`).border = inputCellBorder;
  });

  // Resumen Estadístico
  ws4.getCell('B13').value = 'PROMEDIO MÁS ALTO (=MAX):';
  ws4.getCell('B13').font = { name: 'Segoe UI', size: 10, bold: true };
  ws4.getCell('F13').value = '';
  ws4.getCell('F13').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.yellowHighlight } };
  ws4.getCell('F13').border = inputCellBorder;

  ws4.getCell('B14').value = 'PROMEDIO MÁS BAJO (=MIN):';
  ws4.getCell('B14').font = { name: 'Segoe UI', size: 10, bold: true };
  ws4.getCell('F14').value = '';
  ws4.getCell('F14').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.yellowHighlight } };
  ws4.getCell('F14').border = inputCellBorder;

  // Instrucciones del Gráfico
  ws4.mergeCells('B16:G16');
  ws4.getCell('B16').value = '📊 ACTIVIDAD FINAL: CREACIÓN DEL GRÁFICO DE BARRAS';
  ws4.getCell('B16').font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: colors.accentPurple } };

  const instGrafico = [
    '1. Selecciona el rango de nombres y promedios (B6:B11 y F6:F11).',
    '2. En la barra de herramientas, haz clic en Insertar > Gráfico.',
    '3. Elige un Gráfico de Columnas o Barras.',
    '4. Asigna el título "Comparativa de Promedios por Estudiante" y acomódalo debajo de esta sección.',
  ];

  instGrafico.forEach((ig, idx) => {
    const r = 17 + idx;
    ws4.mergeCells(`B${r}:G${r}`);
    ws4.getCell(`B${r}`).value = ig;
    ws4.getCell(`B${r}`).font = { name: 'Segoe UI', size: 10, italic: true };
  });

  // Guardar archivo
  const outputDir = path.join(process.cwd(), 'public', 'descargas');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'practica-excel-funciones-graficos.xlsx');
  await workbook.xlsx.writeFile(outputPath);
  console.log(`✅ Archivo Excel generado con éxito en: ${outputPath}`);
}

generateWorkbook().catch(console.error);
