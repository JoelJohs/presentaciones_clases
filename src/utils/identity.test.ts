import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Global Identity and Color Palette Validation', () => {
  it('should have the branding name "Plataforma de Estudios" in Sidebar.astro and Layout.astro', () => {
    const sidebarPath = path.join(__dirname, '../components/Sidebar.astro');
    const layoutPath = path.join(__dirname, '../layouts/Layout.astro');
    const globalCssPath = path.join(__dirname, '../styles/global.css');

    // Verify Sidebar.astro branding name
    expect(fs.existsSync(sidebarPath)).toBe(true);
    const sidebarContent = fs.readFileSync(sidebarPath, 'utf-8');
    expect(sidebarContent).toContain('Plataforma de Estudios');
    expect(sidebarContent).toContain('text-[#1A5FA8]');
    expect(sidebarContent).toContain('dark:text-[#60A5FA]');
    expect(sidebarContent).toContain('bg-[#F5F7FA]');
    expect(sidebarContent).toContain('dark:bg-[#0D1B3E]');

    // Verify Layout.astro branding name & body classes
    expect(fs.existsSync(layoutPath)).toBe(true);
    const layoutContent = fs.readFileSync(layoutPath, 'utf-8');
    expect(layoutContent).toContain('title = \'Plataforma de Estudios\'');
    expect(layoutContent).toContain('| Plataforma de Estudios');
    expect(layoutContent).toContain('bg-[#FFFFFF]');
    expect(layoutContent).toContain('text-[#2D3748]');
    expect(layoutContent).toContain('dark:bg-[#0B0F19]');
    expect(layoutContent).toContain('dark:text-[#E2E8F0]');

    // Verify global.css contains custom styling
    expect(fs.existsSync(globalCssPath)).toBe(true);
    const cssContent = fs.readFileSync(globalCssPath, 'utf-8');
    expect(cssContent).toContain('.prose h1');
    expect(cssContent).toContain('color: #0D1B3E');
    expect(cssContent).toContain('color: #1A5FA8');
    expect(cssContent).toContain('border-left: 4px solid #1A5FA8');
  });
});
