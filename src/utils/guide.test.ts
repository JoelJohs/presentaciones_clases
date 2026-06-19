import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('GUIA_CONTENIDO.md verification', () => {
  it('should exist and contain correct sections and markdown formatting', () => {
    const guidePath = path.join(__dirname, '../../GUIA_CONTENIDO.md');
    
    // 1. Check file existence
    expect(fs.existsSync(guidePath)).toBe(true);
    
    const content = fs.readFileSync(guidePath, 'utf-8');
    
    // 2. Check title and main sections
    expect(content).toContain('# Guía de Creación de Contenido');
    expect(content).toContain('## 1. Estructura de Carpetas');
    expect(content).toContain('## 2. Metadatos (Frontmatter)');
    expect(content).toContain('## 3. Formato del Texto (Markdown y MDX)');
    expect(content).toContain('## 4. Publicar Cambios');
    
    // 3. Verify all backticks (code blocks) are balanced
    const codeBlockCount = (content.match(/```/g) || []).length;
    expect(codeBlockCount % 2).toBe(0); // must be an even number (each open block has a close block)
    
    // 4. Verify specific expected snippets are present
    expect(content).toContain('src/content/lecciones/');
    expect(content).toContain('moduleTitle: "Nombre del Módulo (Visible en el menú)"');
    expect(content).toContain('topicTitle: "Nombre del Tema (Visible en el menú)"');
    expect(content).toContain('git add .');
    expect(content).toContain('Vercel');
  });
});
