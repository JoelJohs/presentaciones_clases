import * as fs from 'node:fs';
import * as path from 'node:path';
import { CURRICULUM_MODULES } from '../src/config/curriculum';

const ROOT = path.resolve(__dirname, '..');
const LECCIONES_DIR = path.join(ROOT, 'src/content/lecciones');

interface ScaffoldStats {
  existing: number;
  created: number;
  total: number;
}

export function scaffoldCurriculum(): ScaffoldStats {
  const stats: ScaffoldStats = { existing: 0, created: 0, total: 0 };

  for (const mod of CURRICULUM_MODULES) {
    for (const topic of mod.topics) {
      for (const lesson of topic.lessons) {
        stats.total++;
        const targetDir = path.join(LECCIONES_DIR, mod.id, topic.id, lesson.id);
        const targetFile = path.join(targetDir, 'index.mdx');

        if (fs.existsSync(targetFile)) {
          stats.existing++;
          continue;
        }

        fs.mkdirSync(targetDir, { recursive: true });

        const frontmatter = [
          '---',
          `title: "${lesson.title.replace(/"/g, '\\"')}"`,
          `moduleTitle: "${mod.title.replace(/"/g, '\\"')}"`,
          `topicTitle: "${topic.title.replace(/"/g, '\\"')}"`,
          `subtopicTitle: "${lesson.title.replace(/"/g, '\\"')}"`,
          `description: "${lesson.description.replace(/"/g, '\\"')}"`,
          `duration: ${lesson.duration}`,
                    `kind: "${lesson.kind}"`,
          'published: false',
          'objectives:',
          `  - "Comprender los fundamentos de ${lesson.title.toLowerCase()}"`,
          `  - "Aplicar los conocimientos en el reto práctico de la sesión"`,
          '---',
          '',
          'import { Icon } from "astro-icon/components";',
          '',
          `# ${lesson.title}`,
          '',
          `## 1. Introducción y Conceptos Clave`,
          '',
          lesson.description,
          '',
          '> **Observa:** Relaciona este concepto con situaciones reales que usas todos los días en tu computadora o celular.',
          '',
          '---',
          '',
          '## 2. Demostración y Funcionamiento',
          '',
          'Analiza la siguiente tabla comparativa para identificar los elementos centrales de esta sesión:',
          '',
          '<table>',
          '  <thead>',
          '    <tr>',
          '      <th>Elemento</th>',
          '      <th>Función Principal</th>',
          '      <th>Ejemplo Práctico</th>',
          '    </tr>',
          '  </thead>',
          '  <tbody>',
          '    <tr>',
          `      <td><strong>${lesson.title}</strong></td>`,
          `      <td>Gestión y aplicación práctica en el entorno digital.</td>`,
          `      <td>Implementación paso a paso en el laboratorio.</td>`,
          '    </tr>',
          '  </tbody>',
          '</table>',
          '',
          '---',
          '',
          '## 3. Reto Práctico del Estudiante',
          '',
          'Sigue estos pasos en tu computadora para completar el reto:',
          '',
          '1. **Abre** el entorno de trabajo o aplicación indicada por tu profesor.',
          '2. **Experimenta** con los parámetros y herramientas explicadas en la diapositiva anterior.',
          '3. **Comprueba** que el resultado coincida con la demostración.',
          '',
          '---',
          '',
          '## 4. Verificación y Cierre',
          '',
          'Comprueba que cumpliste con los objetivos de la sesión:',
          '',
          `- Has comprendido el rol de **${lesson.title}**.`,
          '- Has completado la práctica en tu equipo.',
          '- Guarda tus cambios y prepárate para la siguiente sesión.',
          '',
        ].join('\n');

        fs.writeFileSync(targetFile, frontmatter, 'utf8');
        stats.created++;
      }
    }
  }

  return stats;
}

if (import.meta.main || process.argv[1]?.includes('scaffold-curriculum')) {
  console.log('🚀 Iniciando scaffolding del plan curricular...');
  const res = scaffoldCurriculum();
  console.log(`✅ Completado:`);
  console.log(`   - Lecciones existentes conservadas: ${res.existing}`);
  console.log(`   - Nuevas lecciones generadas: ${res.created}`);
  console.log(`   - Total lecciones en el currículo: ${res.total}`);
}
