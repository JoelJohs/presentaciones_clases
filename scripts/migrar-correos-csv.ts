import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { importStudentsFromCsv, getPortalDB, savePortalDB } from '../src/features/portal/db';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Argumentos CLI
const args = process.argv.slice(2);
const overwrite = args.includes('--overwrite') || args.includes('-f');
const csvArg = args.find(a => !a.startsWith('-'));
const targetCsvPath = csvArg
  ? path.resolve(process.cwd(), csvArg)
  : path.resolve(rootDir, 'lista_correos_alumnos.csv');

if (!fs.existsSync(targetCsvPath)) {
  console.error(`Error: No se encontró el archivo CSV en: ${targetCsvPath}`);
  process.exit(1);
}

// Cargar estado previo de correos locales si existe
const emailsJsonPath = path.resolve(rootDir, 'src', 'data', 'alumnos_correos.json');
let previousEmailMap: Record<string, string> = {};
if (fs.existsSync(emailsJsonPath)) {
  try {
    previousEmailMap = JSON.parse(fs.readFileSync(emailsJsonPath, 'utf-8'));
    const db = getPortalDB();
    let hydrated = false;
    db.usuarios.forEach(u => {
      const stored = (u.username && previousEmailMap[u.username.toLowerCase()]) ||
                     (u.matricula && previousEmailMap[u.matricula.toLowerCase()]);
      if (stored && !u.email) {
        u.email = stored;
        hydrated = true;
      }
    });
    if (hydrated) {
      savePortalDB(db);
    }
  } catch {}
}

const csvContent = fs.readFileSync(targetCsvPath, 'utf-8');
console.log(`\n================================================================`);
console.log(`  CPI: MIGRACIÓN PARCIAL DE CORREOS DE ALUMNOS (CSV)`);
console.log(`================================================================`);
console.log(`Archivo: ${targetCsvPath}`);
console.log(`Sobreescribir correos existentes: ${overwrite ? 'SÍ' : 'NO (conserva existentes)'}`);

const result = importStudentsFromCsv(csvContent, { overwriteExisting: overwrite });

console.log(`\n--- RESUMEN EJECUTIVO ---`);
console.log(`Filas analizadas:                   ${result.totalRows}`);
console.log(`Alumnos actualizados con correo:    ${result.updated.length}`);
console.log(`Omitidos (ya tenían correo):        ${result.skippedAlreadyHasEmail.length}`);
console.log(`Omitidos (sin correo en CSV):       ${result.skippedEmptyEmail.length}`);
console.log(`No encontrados en catálogo:         ${result.skippedNotFound.length}`);
console.log(`Errores o advertencias:             ${result.errors.length}`);

if (result.updated.length > 0) {
  console.log(`\n[✓] ACTUALIZADOS CON NUEVO CORREO:`);
  result.updated.forEach(u => {
    console.log(`  - [${u.matricula}] ${u.nombre} -> ${u.email}`);
    previousEmailMap[u.username.toLowerCase()] = u.email.toLowerCase();
    if (u.matricula) previousEmailMap[u.matricula.toLowerCase()] = u.email.toLowerCase();
  });

  // Persistir mapa en src/data/alumnos_correos.json
  fs.writeFileSync(emailsJsonPath, JSON.stringify(previousEmailMap, null, 2) + '\n', 'utf-8');
  console.log(`\nMapa local de correos actualizado: ${emailsJsonPath}`);

  // Generar bloque SQL de conveniencia para Supabase
  const sqlLines: string[] = [
    `-- Actualización incremental de correos generada el ${new Date().toISOString()}`,
    `-- Pega este bloque en el SQL Editor de Supabase si requieres sincronizar la BD remota:`,
  ];
  result.updated.forEach(u => {
    sqlLines.push(`update public.alumnos set email = '${u.email.toLowerCase()}' where lower(username) = '${u.username.toLowerCase()}' or lower(matricula) = '${u.matricula.toLowerCase()}';`);
  });

  const sqlOutPath = path.resolve(rootDir, 'supabase', 'migracion_correos_alumnos_data.sql');
  fs.writeFileSync(sqlOutPath, sqlLines.join('\n') + '\n', 'utf-8');
  console.log(`Archivo SQL generado para Supabase: ${sqlOutPath}`);
}

if (result.skippedAlreadyHasEmail.length > 0) {
  console.log(`\n[⊘] OMITIDOS (YA CONTABAN CON CORREO):`);
  result.skippedAlreadyHasEmail.forEach(s => {
    console.log(`  - [${s.matricula}] ${s.username}: conserva ${s.currentEmail}`);
  });
}

if (result.skippedEmptyEmail.length > 0) {
  console.log(`\n[-] OMITIDOS (AÚN PENDIENTES SIN CORREO EN CSV):`);
  result.skippedEmptyEmail.forEach(e => {
    console.log(`  - [${e.matricula}] ${e.nombre}`);
  });
}

if (result.errors.length > 0) {
  console.log(`\n[!] ADVERTENCIAS:`);
  result.errors.forEach(err => {
    console.log(`  - Fila ${err.row}: ${err.error}`);
  });
}

console.log(`\nOperación completada.`);
