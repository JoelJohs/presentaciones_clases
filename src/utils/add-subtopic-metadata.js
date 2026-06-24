import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_DIR = path.join(__dirname, '../content/lecciones');

function getFilesRecursively(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(filePath));
    } else if (file.endsWith('.mdx') || file.endsWith('.md')) {
      results.push(filePath);
    }
  });
  return results;
}

function cleanSubtopicTitle(title) {
  let clean = title;
  // Remueve prefijo "Repaso: "
  clean = clean.replace(/^Repaso:\s*/i, '');
  // Remueve sufijos tipo " (Parte 1)", " - Parte 2", " parte 3", " (Parte 1/2)", etc.
  clean = clean.replace(/\s*[\(\-]?\s*parte\s*\d+(\/\d+)?\s*\)?/i, '');
  return clean.trim();
}

function processFiles() {
  const files = getFilesRecursively(BASE_DIR);
  let count = 0;

  // Primero construimos un mapa de carpetas que contienen index.mdx para heredar su título
  const folderIndexTitles = {};
  files.forEach((filePath) => {
    const relative = path.relative(BASE_DIR, filePath);
    if (relative.startsWith('00-inicio/')) return;

    const fileName = path.basename(filePath);
    if (fileName === 'index.mdx' || fileName === 'index.md') {
      const folder = path.dirname(filePath);
      const content = fs.readFileSync(filePath, 'utf8');
      const match = content.match(/^---([\s\S]*?)---/);
      if (match) {
        const titleMatch = match[1].match(/title:\s*["'](.*?)["']/);
        if (titleMatch) {
          folderIndexTitles[folder] = titleMatch[1];
        }
      }
    }
  });

  files.forEach((filePath) => {
    const relative = path.relative(BASE_DIR, filePath);
    // Omitir sección de inicio
    if (relative.startsWith('00-inicio/')) return;

    const content = fs.readFileSync(filePath, 'utf8');
    const match = content.match(/^---([\s\S]*?)---/);
    if (!match) return;

    const frontmatter = match[1];
    const body = content.slice(match[0].length);

    // Verificar si ya tiene subtopicTitle
    if (frontmatter.includes('subtopicTitle:')) return;

    // Obtener el title del frontmatter
    const titleMatch = frontmatter.match(/title:\s*["'](.*?)["']/);
    if (!titleMatch) return;
    const title = titleMatch[1];

    // Determinar subtopicTitle
    const folder = path.dirname(filePath);
    let subtopicTitle = '';

    if (folderIndexTitles[folder]) {
      // Si está en una carpeta con index, usamos el título del index limpio
      subtopicTitle = cleanSubtopicTitle(folderIndexTitles[folder]);
    } else {
      // Si es standalone, usamos el propio título de la lección limpio
      subtopicTitle = cleanSubtopicTitle(title);
    }

    // Reconstruir frontmatter insertando subtopicTitle después de topicTitle (o antes de fecha)
    let newFrontmatter = frontmatter;
    if (frontmatter.includes('topicTitle:')) {
      newFrontmatter = frontmatter.replace(/(topicTitle:\s*.*?\n)/, `$1subtopicTitle: "${subtopicTitle}"\n`);
    } else {
      // En caso de que no tenga topicTitle (fallback)
      newFrontmatter = frontmatter + `subtopicTitle: "${subtopicTitle}"\n`;
    }

    fs.writeFileSync(filePath, `---${newFrontmatter}---${body}`, 'utf8');
    count++;
  });

  console.log(`Proceso completado. Se actualizaron ${count} archivos.`);
}

processFiles();
