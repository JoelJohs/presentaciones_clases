import ExcelJS from 'exceljs';
import path from 'node:path';
import fs from 'node:fs';

async function generateWorkbook() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Profesor de Informática';
  workbook.lastModifiedBy = 'Estudiante';
  workbook.created = new Date();
  workbook.modified = new Date();

  // Colores de la paleta institucional
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
    grayHeader: 'F1F5F9',
    grayBorder: 'CBD5E1',
    yellowHighlight: 'FEF08A', // Yellow 200
    white: 'FFFFFF',
  };

  const thinBorder = {
    top: { style: 'thin', color: { argb: colors.grayBorder } },
    left: { style: 'thin', color: { argb: colors.grayBorder } },
    bottom: { style: 'thin', color: { argb: colors.grayBorder } },
    right: { style: 'thin', color: { argb: colors.grayBorder } },
  };

  const mediumBorder = {
    top: { style: 'medium', color: { argb: colors.navyLight } },
    left: { style: 'medium', color: { argb: colors.navyLight } },
    bottom: { style: 'medium', color: { argb: colors.navyLight } },
    right: { style: 'medium', color: { argb: colors.navyLight } },
  };

  // ==========================================
  // HOJA 1: 📌 INSTRUCCIONES Y PORTADA
  // ==========================================
  const wsPortada = workbook.addWorksheet('📌 Instrucciones', {
    views: [{ showGridLines: true }]
  });
  wsPortada.columns = [
    { width: 4 },  // A
    { width: 26 }, // B
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
  mainTitleCell.value = 'Práctica 1: Google Sheets / Microsoft Excel';
  mainTitleCell.font = { name: 'Segoe UI', size: 18, bold: true, color: { argb: colors.navy } };

  wsPortada.mergeCells('B4:E4');
  const subTitleCell = wsPortada.getCell('B4');
  subTitleCell.value = 'Plantilla interactiva para laboratorio y autoestudio — Hojas de Cálculo';
  subTitleCell.font = { name: 'Segoe UI', size: 11, italic: true, color: { argb: '64748B' } };

  // Ficha de Identificación del Alumno
  wsPortada.getCell('B6').value = 'Nombre del Alumno:';
  wsPortada.getCell('B6').font = { name: 'Segoe UI', size: 11, bold: true };
  wsPortada.mergeCells('C6:D6');
  wsPortada.getCell('C6').value = '';
  wsPortada.getCell('C6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.yellowHighlight } };
  wsPortada.getCell('C6').border = thinBorder;
  wsPortada.getCell('D6').border = thinBorder;

  wsPortada.getCell('B7').value = 'Fecha:';
  wsPortada.getCell('B7').font = { name: 'Segoe UI', size: 11, bold: true };
  wsPortada.getCell('C7').value = '29-08-2026';
  wsPortada.getCell('C7').font = { name: 'Segoe UI', size: 11 };
  wsPortada.getCell('C7').border = thinBorder;

  wsPortada.getCell('D7').value = 'Grupo / Grado:';
  wsPortada.getCell('D7').font = { name: 'Segoe UI', size: 11, bold: true };
  wsPortada.getCell('E7').value = '';
  wsPortada.getCell('E7').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.primaryLight } };
  wsPortada.getCell('E7').border = thinBorder;

  // Índice de actividades en pestañas
  wsPortada.mergeCells('B9:E9');
  wsPortada.getCell('B9').value = '📋 ESTRUCTURA DE LA PRÁCTICA (HOJAS DE TRABAJO)';
  wsPortada.getCell('B9').font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FFFFFF' } };
  wsPortada.getCell('B9').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.navy } };
  wsPortada.getCell('B9').alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };

  const hojas = [
    {
      num: '1',
      pestaña: '1. Coordenadas y Tipos',
      tema: 'Ubicación en el tablero y tipos de datos',
      detalles: 'Prueba Rápida 1 (C3, E7) y Prueba Rápida 2 (Texto vs Número vs Fórmula).'
    },
    {
      num: '2',
      pestaña: '2. Fórmulas y Relleno',
      tema: 'Signo igual (=) y autorrelleno inteligente',
      detalles: 'Prueba Rápida 3 (Multiplicación con celdas) y Prueba Rápida 4 (Series).'
    },
    {
      num: '3',
      pestaña: '3. SUMA y PROMEDIO',
      tema: 'Funciones con rangos (:)',
      detalles: 'Prueba Rápida 5 (Calificaciones con =SUMA() y =PROMEDIO()).'
    },
    {
      num: '4',
      pestaña: '4. Cotización Gamer',
      tema: 'Proyecto Integrador de Laboratorio',
      detalles: 'Cotización completa con subtotales, total general, promedio y formato $.'
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

    wsPortada.getCell(`E${curRow}`).value = 'Por completar';
    wsPortada.getCell(`E${curRow}`).font = { name: 'Segoe UI', size: 10, italic: true };
    wsPortada.getCell(`E${curRow}`).alignment = { horizontal: 'center' };
    wsPortada.getCell(`E${curRow}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.grayHeader } };
    wsPortada.getCell(`E${curRow}`).border = thinBorder;

    curRow += 2;
  });

  // Instrucciones de uso
  curRow = 19;
  wsPortada.mergeCells(`B${curRow}:E${curRow}`);
  wsPortada.getCell(`B${curRow}`).value = '💡 INSTRUCCIONES PARA EL ESTUDIANTE:';
  wsPortada.getCell(`B${curRow}`).font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: colors.accentAmber } };

  curRow++;
  const tips = [
    '1. Navega entre las pestañas usando las pestañas inferiores de la ventana.',
    '2. Las celdas con fondo AMARILLO son tus espacios de trabajo donde debes escribir o ingresar fórmulas.',
    '3. Recuerda que toda fórmula SIEMPRE comienza con el signo igual (=).',
    '4. Al finalizar todas las hojas, guarda tu archivo como "Presupuesto_TuNombre.xlsx" y entrégalo.',
  ];
  tips.forEach((t) => {
    wsPortada.mergeCells(`B${curRow}:E${curRow}`);
    wsPortada.getCell(`B${curRow}`).value = t;
    wsPortada.getCell(`B${curRow}`).font = { name: 'Segoe UI', size: 10 };
    curRow++;
  });


  // ==========================================
  // HOJA 2: 1. COORDENADAS Y TIPOS
  // ==========================================
  const ws1 = workbook.addWorksheet('1. Coordenadas y Tipos', {
    views: [{ showGridLines: true }]
  });
  ws1.columns = [
    { width: 4 },  // A
    { width: 20 }, // B
    { width: 24 }, // C
    { width: 24 }, // D
    { width: 26 }, // E
    { width: 24 }, // F
  ];

  // Encabezado
  ws1.mergeCells('B2:F2');
  ws1.getCell('B2').value = 'ACTIVIDAD 1 & 2: COORDENADAS Y TIPOS DE DATOS';
  ws1.getCell('B2').font = { name: 'Segoe UI', size: 13, bold: true, color: { argb: colors.primary } };

  // Prueba Rápida 1
  ws1.mergeCells('B4:F4');
  ws1.getCell('B4').value = '🎯 PRUEBA RÁPIDA 1: Ubicación en el Tablero de Coordenadas';
  ws1.getCell('B4').font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FFFFFF' } };
  ws1.getCell('B4').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.navy } };
  ws1.getCell('B4').alignment = { horizontal: 'left', indent: 1 };

  ws1.mergeCells('B5:F5');
  ws1.getCell('B5').value = 'Paso 1: Haz clic en la celda C3 y escribe tu nombre.';
  ws1.getCell('B5').font = { name: 'Segoe UI', size: 10, italic: true };

  ws1.mergeCells('B6:F6');
  ws1.getCell('B6').value = 'Paso 2: Haz clic en la celda E7 y escribe tu comida favorita.';
  ws1.getCell('B6').font = { name: 'Segoe UI', size: 10, italic: true };

  // Resaltamos visualmente las celdas C3 y E7
  ws1.getCell('C3').value = '[Escribe tu nombre aquí]';
  ws1.getCell('C3').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.yellowHighlight } };
  ws1.getCell('C3').font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: colors.primary } };
  ws1.getCell('C3').alignment = { horizontal: 'center' };
  ws1.getCell('C3').border = mediumBorder;

  ws1.getCell('E7').value = '[Escribe tu comida favorita]';
  ws1.getCell('E7').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.yellowHighlight } };
  ws1.getCell('E7').font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: colors.accentPurple } };
  ws1.getCell('E7').alignment = { horizontal: 'center' };
  ws1.getCell('E7').border = mediumBorder;

  // Prueba Rápida 2
  ws1.mergeCells('B9:F9');
  ws1.getCell('B9').value = '🎯 PRUEBA RÁPIDA 2: Identificación de Tipos de Datos';
  ws1.getCell('B9').font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FFFFFF' } };
  ws1.getCell('B9').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.navy } };
  ws1.getCell('B9').alignment = { horizontal: 'left', indent: 1 };

  ws1.mergeCells('B10:F10');
  ws1.getCell('B10').value = 'Escribe exactamente el dato indicado en las celdas amarillas y observa su alineación automática:';
  ws1.getCell('B10').font = { name: 'Segoe UI', size: 10, italic: true };

  const headers2 = ['Ubicación', 'Dato a Escribir', 'Escríbelo Aquí', 'Tipo de Dato', 'Alineación Obtenida'];
  const cols2 = ['B', 'C', 'D', 'E', 'F'];
  headers2.forEach((h, idx) => {
    const c = ws1.getCell(`${cols2[idx]}12`);
    c.value = h;
    c.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFF' } };
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.primary } };
    c.alignment = { horizontal: 'center', vertical: 'middle' };
    c.border = thinBorder;
  });

  const datosP2 = [
    { pos: 'Celda D13', texto: 'Audífonos', tipo: 'Texto', alineacion: 'Izquierda' },
    { pos: 'Celda D14', texto: '350', tipo: 'Número', alineacion: 'Derecha' },
    { pos: 'Celda D15', texto: '350 pesos', tipo: 'Texto', alineacion: 'Izquierda' },
  ];

  datosP2.forEach((d, idx) => {
    const row = 13 + idx;
    ws1.getCell(`B${row}`).value = d.pos;
    ws1.getCell(`B${row}`).alignment = { horizontal: 'center' };
    ws1.getCell(`B${row}`).border = thinBorder;

    ws1.getCell(`C${row}`).value = d.texto;
    ws1.getCell(`C${row}`).font = { name: 'Segoe UI', size: 10, bold: true };
    ws1.getCell(`C${row}`).alignment = { horizontal: 'center' };
    ws1.getCell(`C${row}`).border = thinBorder;

    // Celda para que el estudiante escriba
    ws1.getCell(`D${row}`).value = '';
    ws1.getCell(`D${row}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.yellowHighlight } };
    ws1.getCell(`D${row}`).border = thinBorder;

    ws1.getCell(`E${row}`).value = d.tipo;
    ws1.getCell(`E${row}`).alignment = { horizontal: 'center' };
    ws1.getCell(`E${row}`).border = thinBorder;

    ws1.getCell(`F${row}`).value = d.alineacion;
    ws1.getCell(`F${row}`).alignment = { horizontal: 'center' };
    ws1.getCell(`F${row}`).border = thinBorder;
  });

  // Pregunta de reflexión
  ws1.mergeCells('B18:F18');
  ws1.getCell('B18').value = '❓ PREGUNTA DE COMPROBACIÓN:';
  ws1.getCell('B18').font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: colors.accentAmber } };

  ws1.mergeCells('B19:F19');
  ws1.getCell('B19').value = '¿Por qué en la celda con "350 pesos" la hoja clasifica el dato como Texto e impide hacer sumas?';
  ws1.getCell('B19').font = { name: 'Segoe UI', size: 10, italic: true };

  ws1.mergeCells('B20:F21');
  ws1.getCell('B20').value = '[ Tu respuesta: Al incluir letras (pesos), la hoja no reconoce el valor como un número puro. Para mostrar el signo de pesos sin convertirlo en texto, se debe aplicar Formato de Moneda ($) ]';
  ws1.getCell('B20').font = { name: 'Segoe UI', size: 10, italic: true, color: { argb: '64748B' } };
  ws1.getCell('B20').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.grayHeader } };
  ws1.getCell('B20').border = thinBorder;
  ws1.getCell('B20').alignment = { vertical: 'top', wrapText: true };


  // ==========================================
  // HOJA 3: 2. FÓRMULAS Y RELLENO
  // ==========================================
  const ws2 = workbook.addWorksheet('2. Fórmulas y Relleno', {
    views: [{ showGridLines: true }]
  });
  ws2.columns = [
    { width: 4 },  // A
    { width: 20 }, // B
    { width: 16 }, // C
    { width: 22 }, // D
    { width: 4 },  // E
    { width: 18 }, // F
    { width: 22 }, // G
  ];

  // Encabezado
  ws2.mergeCells('B2:G2');
  ws2.getCell('B2').value = 'ACTIVIDAD 3 & 4: FÓRMULAS CON REFERENCIAS Y AUTORRELLENO';
  ws2.getCell('B2').font = { name: 'Segoe UI', size: 13, bold: true, color: { argb: colors.primary } };

  // Prueba Rápida 3
  ws2.mergeCells('B4:D4');
  ws2.getCell('B4').value = '🎯 PRUEBA RÁPIDA 3: Cálculo con Referencias';
  ws2.getCell('B4').font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FFFFFF' } };
  ws2.getCell('B4').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.navy } };
  ws2.getCell('B4').alignment = { horizontal: 'left', indent: 1 };

  ws2.getCell('B6').value = 'Concepto';
  ws2.getCell('C6').value = 'Valor / Celda';
  ws2.getCell('D6').value = 'Instrucción para el Alumno';
  ['B', 'C', 'D'].forEach((col) => {
    const c = ws2.getCell(`${col}6`);
    c.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFF' } };
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.primary } };
    c.alignment = { horizontal: 'center' };
    c.border = thinBorder;
  });

  ws2.getCell('B7').value = 'Precio Unitario (C7)';
  ws2.getCell('C7').value = 50;
  ws2.getCell('C7').alignment = { horizontal: 'right' };
  ws2.getCell('C7').border = thinBorder;
  ws2.getCell('D7').value = 'Valor inicial ($50)';
  ws2.getCell('D7').font = { name: 'Segoe UI', size: 9, italic: true };
  ws2.getCell('D7').border = thinBorder;
  ws2.getCell('B7').border = thinBorder;

  ws2.getCell('B8').value = 'Cantidad (C8)';
  ws2.getCell('C8').value = 3;
  ws2.getCell('C8').alignment = { horizontal: 'right' };
  ws2.getCell('C8').border = thinBorder;
  ws2.getCell('D8').value = 'Cantidad de piezas (3)';
  ws2.getCell('D8').font = { name: 'Segoe UI', size: 9, italic: true };
  ws2.getCell('D8').border = thinBorder;
  ws2.getCell('B8').border = thinBorder;

  ws2.getCell('B9').value = 'Subtotal (C9)';
  ws2.getCell('C9').value = { formula: 'C7*C8' };
  ws2.getCell('C9').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.yellowHighlight } };
  ws2.getCell('C9').font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: colors.primary } };
  ws2.getCell('C9').alignment = { horizontal: 'right' };
  ws2.getCell('C9').border = thinBorder;
  ws2.getCell('D9').value = 'Escribe =C7*C8';
  ws2.getCell('D9').font = { name: 'Segoe UI', size: 9, bold: true };
  ws2.getCell('D9').border = thinBorder;
  ws2.getCell('B9').border = thinBorder;

  // Reto de comprobación
  ws2.mergeCells('B11:D11');
  ws2.getCell('B11').value = '🧪 Reto de comprobación en clase:';
  ws2.getCell('B11').font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: colors.accentAmber } };

  ws2.mergeCells('B12:D14');
  ws2.getCell('B12').value = '1. Cambia el Precio en C7 de 50 a 120.\n2. Presiona Enter.\n3. Comprueba que C9 se actualiza automáticamente a 360.';
  ws2.getCell('B12').font = { name: 'Segoe UI', size: 9 };
  ws2.getCell('B12').alignment = { wrapText: true };

  // Prueba Rápida 4: Series con autorrelleno
  ws2.mergeCells('F4:G4');
  ws2.getCell('F4').value = '🎯 PRUEBA RÁPIDA 4: Controlador de Relleno';
  ws2.getCell('F4').font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FFFFFF' } };
  ws2.getCell('F4').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.navy } };
  ws2.getCell('F4').alignment = { horizontal: 'left', indent: 1 };

  ws2.getCell('F6').value = 'Serie 1: Meses';
  ws2.getCell('G6').value = 'Serie 2: Números (10 en 10)';
  ['F', 'G'].forEach((col) => {
    const c = ws2.getCell(`${col}6`);
    c.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFF' } };
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.accentPurple } };
    c.alignment = { horizontal: 'center' };
    c.border = thinBorder;
  });

  ws2.getCell('F7').value = 'Enero';
  ws2.getCell('F7').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.accentPurpleLight } };
  ws2.getCell('F7').font = { name: 'Segoe UI', size: 10, bold: true };
  ws2.getCell('F7').alignment = { horizontal: 'center' };
  ws2.getCell('F7').border = thinBorder;

  ws2.getCell('G7').value = 10;
  ws2.getCell('G7').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.accentGreenLight } };
  ws2.getCell('G7').font = { name: 'Segoe UI', size: 10, bold: true };
  ws2.getCell('G7').alignment = { horizontal: 'center' };
  ws2.getCell('G7').border = thinBorder;

  ws2.getCell('G8').value = 20;
  ws2.getCell('G8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.accentGreenLight } };
  ws2.getCell('G8').font = { name: 'Segoe UI', size: 10, bold: true };
  ws2.getCell('G8').alignment = { horizontal: 'center' };
  ws2.getCell('G8').border = thinBorder;

  // Celdas vacías listas para ser rellenadas
  for (let r = 8; r <= 12; r++) {
    if (r > 8) {
      ws2.getCell(`G${r}`).value = '';
      ws2.getCell(`G${r}`).border = thinBorder;
    }
    ws2.getCell(`F${r}`).value = '';
    ws2.getCell(`F${r}`).border = thinBorder;
  }

  ws2.mergeCells('F14:G16');
  ws2.getCell('F14').value = 'Instrucciones:\n1. Selecciona "Enero" y arrastra el cuadro azul inferior derecho hasta F12.\n2. Selecciona las celdas G7 y G8 juntas, y arrastra hacia abajo hasta G12.';
  ws2.getCell('F14').font = { name: 'Segoe UI', size: 9, italic: true };
  ws2.getCell('F14').alignment = { wrapText: true, vertical: 'top' };


  // ==========================================
  // HOJA 4: 3. SUMA Y PROMEDIO
  // ==========================================
  const ws3 = workbook.addWorksheet('3. SUMA y PROMEDIO', {
    views: [{ showGridLines: true }]
  });
  ws3.columns = [
    { width: 4 },  // A
    { width: 22 }, // B
    { width: 18 }, // C
    { width: 26 }, // D
    { width: 34 }, // E
  ];

  // Encabezado
  ws3.mergeCells('B2:E2');
  ws3.getCell('B2').value = 'ACTIVIDAD 5: FUNCIONES SUMA Y PROMEDIO CON RANGOS';
  ws3.getCell('B2').font = { name: 'Segoe UI', size: 13, bold: true, color: { argb: colors.primary } };

  ws3.mergeCells('B4:E4');
  ws3.getCell('B4').value = '🎯 PRUEBA RÁPIDA 5: Cálculo de Calificaciones';
  ws3.getCell('B4').font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FFFFFF' } };
  ws3.getCell('B4').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.navy } };
  ws3.getCell('B4').alignment = { horizontal: 'left', indent: 1 };

  ws3.mergeCells('B5:E5');
  ws3.getCell('B5').value = 'Ingresa las fórmulas con las funciones =SUMA() y =PROMEDIO() en las celdas amarillas:';
  ws3.getCell('B5').font = { name: 'Segoe UI', size: 10, italic: true };

  // Tabla calificaciones
  const headers3 = ['Evaluación / Parcial', 'Calificación', 'Fórmula Requerida', 'Significado del Rango ( : )'];
  const colLetters3 = ['B', 'C', 'D', 'E'];
  headers3.forEach((h, idx) => {
    const c = ws3.getCell(`${colLetters3[idx]}7`);
    c.value = h;
    c.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFF' } };
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.accentGreen } };
    c.alignment = { horizontal: 'center' };
    c.border = thinBorder;
  });

  const califs = [
    { p: 'Parcial 1', v: 8 },
    { p: 'Parcial 2', v: 9 },
    { p: 'Parcial 3', v: 10 },
    { p: 'Parcial 4', v: 7 },
  ];

  califs.forEach((item, idx) => {
    const row = 8 + idx;
    ws3.getCell(`B${row}`).value = item.p;
    ws3.getCell(`B${row}`).border = thinBorder;

    ws3.getCell(`C${row}`).value = item.v;
    ws3.getCell(`C${row}`).alignment = { horizontal: 'center' };
    ws3.getCell(`C${row}`).font = { name: 'Segoe UI', size: 11, bold: true };
    ws3.getCell(`C${row}`).border = thinBorder;

    ws3.getCell(`D${row}`).value = 'Dato numérico';
    ws3.getCell(`D${row}`).font = { name: 'Segoe UI', size: 9, italic: true, color: { argb: '64748B' } };
    ws3.getCell(`D${row}`).border = thinBorder;

    ws3.getCell(`E${row}`).value = `Celda C${row}`;
    ws3.getCell(`E${row}`).font = { name: 'Segoe UI', size: 9, italic: true, color: { argb: '64748B' } };
    ws3.getCell(`E${row}`).border = thinBorder;
  });

  // Fila SUMA
  ws3.getCell('B12').value = 'TOTAL PUNTOS';
  ws3.getCell('B12').font = { name: 'Segoe UI', size: 10, bold: true };
  ws3.getCell('B12').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.grayHeader } };
  ws3.getCell('B12').border = thinBorder;

  ws3.getCell('C12').value = { formula: 'SUM(C8:C11)' };
  ws3.getCell('C12').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.yellowHighlight } };
  ws3.getCell('C12').font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: colors.accentGreen } };
  ws3.getCell('C12').alignment = { horizontal: 'center' };
  ws3.getCell('C12').border = thinBorder;

  ws3.getCell('D12').value = '=SUMA(C8:C11)';
  ws3.getCell('D12').font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: colors.navy } };
  ws3.getCell('D12').border = thinBorder;

  ws3.getCell('E12').value = 'Suma el bloque continuo desde C8 hasta C11.';
  ws3.getCell('E12').font = { name: 'Segoe UI', size: 9 };
  ws3.getCell('E12').border = thinBorder;

  // Fila PROMEDIO
  ws3.getCell('B13').value = 'PROMEDIO FINAL';
  ws3.getCell('B13').font = { name: 'Segoe UI', size: 10, bold: true };
  ws3.getCell('B13').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.grayHeader } };
  ws3.getCell('B13').border = thinBorder;

  ws3.getCell('C13').value = { formula: 'AVERAGE(C8:C11)' };
  ws3.getCell('C13').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.yellowHighlight } };
  ws3.getCell('C13').font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: colors.primary } };
  ws3.getCell('C13').alignment = { horizontal: 'center' };
  ws3.getCell('C13').numFmt = '0.00';
  ws3.getCell('C13').border = thinBorder;

  ws3.getCell('D13').value = '=PROMEDIO(C8:C11)';
  ws3.getCell('D13').font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: colors.navy } };
  ws3.getCell('D13').border = thinBorder;

  ws3.getCell('E13').value = 'Calcula la media aritmética del rango.';
  ws3.getCell('E13').font = { name: 'Segoe UI', size: 9 };
  ws3.getCell('E13').border = thinBorder;

  // Explicación de los dos puntos
  ws3.mergeCells('B16:E16');
  ws3.getCell('B16').value = '💡 RECORDATORIO SOBRE RANGOS:';
  ws3.getCell('B16').font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: colors.accentAmber } };

  ws3.mergeCells('B17:E18');
  ws3.getCell('B17').value = 'Los dos puntos ( : ) indican "hasta". La expresión C8:C11 incluye: C8, C9, C10 y C11.\nSi usas punto y coma o coma (C8, C11), solo se tomarían dos celdas sueltas.';
  ws3.getCell('B17').font = { name: 'Segoe UI', size: 10 };
  ws3.getCell('B17').alignment = { wrapText: true };


  // ==========================================
  // HOJA 5: 4. PROYECTO COTIZACIÓN GAMER
  // ==========================================
  const ws4 = workbook.addWorksheet('4. Cotización Gamer', {
    views: [{ showGridLines: true }]
  });
  ws4.columns = [
    { width: 4 },  // A
    { width: 28 }, // B
    { width: 14 }, // C
    { width: 20 }, // D
    { width: 20 }, // E
    { width: 32 }, // F
  ];

  // Título del proyecto
  ws4.mergeCells('B2:E2');
  ws4.getCell('B2').value = 'PROYECTO DE LABORATORIO: COTIZACIÓN TIENDA GAMER';
  ws4.getCell('B2').font = { name: 'Segoe UI', size: 13, bold: true, color: { argb: colors.accentPurple } };

  ws4.mergeCells('B3:F3');
  ws4.getCell('B3').value = 'Calcula subtotales con fórmulas, total con SUMA, promedio con PROMEDIO y aplica formato $.';
  ws4.getCell('B3').font = { name: 'Segoe UI', size: 10, italic: true, color: { argb: '64748B' } };

  // Encabezados de la tabla Gamer
  const gamerHeaders = ['Producto', 'Cantidad', 'Precio Unitario ($)', 'Subtotal ($)'];
  const gamerCols = ['B', 'C', 'D', 'E'];
  gamerHeaders.forEach((h, idx) => {
    const c = ws4.getCell(`${gamerCols[idx]}5`);
    c.value = h;
    c.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FFFFFF' } };
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.navy } };
    c.alignment = { horizontal: 'center', vertical: 'middle' };
    c.border = thinBorder;
  });

  const productos = [
    { nombre: 'Teclado Mecánico RGB', cant: 2, precio: 850 },
    { nombre: 'Mouse Inalámbrico', cant: 3, precio: 450 },
    { nombre: 'Monitor 144Hz', cant: 1, precio: 3200 },
    { nombre: 'Mousepad XXL', cant: 4, precio: 200 },
    { nombre: 'Headset con Micrófono', cant: 2, precio: 950 },
  ];

  productos.forEach((p, idx) => {
    const row = 6 + idx;
    ws4.getCell(`B${row}`).value = p.nombre;
    ws4.getCell(`B${row}`).border = thinBorder;

    ws4.getCell(`C${row}`).value = p.cant;
    ws4.getCell(`C${row}`).alignment = { horizontal: 'center' };
    ws4.getCell(`C${row}`).border = thinBorder;

    ws4.getCell(`D${row}`).value = p.precio;
    ws4.getCell(`D${row}`).numFmt = '"$"#,##0.00';
    ws4.getCell(`D${row}`).alignment = { horizontal: 'right' };
    ws4.getCell(`D${row}`).border = thinBorder;

    // Celda de Subtotal: con fórmula configurada y formato de moneda
    ws4.getCell(`E${row}`).value = { formula: `C${row}*D${row}` };
    ws4.getCell(`E${row}`).numFmt = '"$"#,##0.00';
    ws4.getCell(`E${row}`).alignment = { horizontal: 'right' };
    ws4.getCell(`E${row}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.primaryLight } };
    ws4.getCell(`E${row}`).border = thinBorder;
  });

  // Fila TOTAL
  ws4.getCell('B11').value = 'TOTAL GENERAL';
  ws4.getCell('B11').font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: colors.accentGreen } };
  ws4.getCell('B11').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.grayHeader } };
  ws4.getCell('B11').border = thinBorder;

  ws4.getCell('C11').value = '';
  ws4.getCell('C11').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.grayHeader } };
  ws4.getCell('C11').border = thinBorder;

  ws4.getCell('D11').value = '';
  ws4.getCell('D11').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.grayHeader } };
  ws4.getCell('D11').border = thinBorder;

  ws4.getCell('E11').value = { formula: 'SUM(E6:E10)' };
  ws4.getCell('E11').numFmt = '"$"#,##0.00';
  ws4.getCell('E11').font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: colors.accentGreen } };
  ws4.getCell('E11').alignment = { horizontal: 'right' };
  ws4.getCell('E11').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.accentGreenLight } };
  ws4.getCell('E11').border = thinBorder;

  // Fila PRECIO PROMEDIO
  ws4.getCell('B12').value = 'PRECIO PROMEDIO UNITARIO';
  ws4.getCell('B12').font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: colors.primary } };
  ws4.getCell('B12').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.grayHeader } };
  ws4.getCell('B12').border = thinBorder;

  ws4.getCell('C12').value = '';
  ws4.getCell('C12').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.grayHeader } };
  ws4.getCell('C12').border = thinBorder;

  ws4.getCell('D12').value = { formula: 'AVERAGE(D6:D10)' };
  ws4.getCell('D12').numFmt = '"$"#,##0.00';
  ws4.getCell('D12').font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: colors.primary } };
  ws4.getCell('D12').alignment = { horizontal: 'right' };
  ws4.getCell('D12').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.primaryLight } };
  ws4.getCell('D12').border = thinBorder;

  ws4.getCell('E12').value = '';
  ws4.getCell('E12').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.grayHeader } };
  ws4.getCell('E12').border = thinBorder;

  // Guía de pasos a la derecha
  ws4.getCell('F5').value = '📝 GUÍA DE PASOS:';
  ws4.getCell('F5').font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: colors.navy } };

  const pasos = [
    'Paso 1: En E6 escribe =C6*D6.',
    'Paso 2: Arrastra el cuadro azul hasta E10 para copiar la fórmula.',
    'Paso 3: En E11 calcula el total con =SUMA(E6:E10).',
    'Paso 4: En D12 calcula el promedio con =PROMEDIO(D6:D10).',
    'Paso 5: Aplica formato de Moneda ($) con Ctrl + Shift + 4.',
  ];

  pasos.forEach((p, idx) => {
    const row = 6 + idx;
    ws4.getCell(`F${row}`).value = p;
    ws4.getCell(`F${row}`).font = { name: 'Segoe UI', size: 9, italic: true };
  });

  // Checklist de evaluación
  ws4.mergeCells('B15:F15');
  ws4.getCell('B15').value = '✅ LISTA DE COTEJO Y AUTOEVALUACIÓN:';
  ws4.getCell('B15').font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: colors.navy } };

  const checklist = [
    ' [   ] Subtotales calculados con coordenadas de celda (=C6*D6)',
    ' [   ] Fórmula copiada correctamente en toda la columna con el controlador de relleno',
    ' [   ] Total general calculado con la función =SUMA(E6:E10)',
    ' [   ] Precio promedio unitario calculado con la función =PROMEDIO(D6:D10)',
    ' [   ] Formato de moneda ($) aplicado a precios unitarios y subtotales',
    ' [   ] Bordes de tabla y alineaciones correctas (números a la derecha, texto a la izquierda)',
  ];

  checklist.forEach((item, idx) => {
    const row = 16 + idx;
    ws4.mergeCells(`B${row}:F${row}`);
    ws4.getCell(`B${row}`).value = item;
    ws4.getCell(`B${row}`).font = { name: 'Segoe UI', size: 10 };
  });

  // Guardar archivo
  const outputDir = path.resolve('public/descargas');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'practica-google-sheets-excel.xlsx');
  await workbook.xlsx.writeFile(outputPath);
  console.log(`Archivo generado exitosamente en: ${outputPath}`);
}

generateWorkbook().catch(console.error);
