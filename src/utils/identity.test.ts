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
    expect(sidebarContent).toContain('text-brand-primary');
    expect(sidebarContent).toContain('bg-brand-sidebar-bg');

    // Verify Layout.astro branding name & body classes
    expect(fs.existsSync(layoutPath)).toBe(true);
    const layoutContent = fs.readFileSync(layoutPath, 'utf-8');
    expect(layoutContent).toContain('title = \'Plataforma de Estudios\'');
    expect(layoutContent).toContain('| Plataforma de Estudios');
    expect(layoutContent).toContain('bg-brand-bg');
    expect(layoutContent).toContain('text-brand-text');

    // Verify global.css contains custom styling
    expect(fs.existsSync(globalCssPath)).toBe(true);
    const cssContent = fs.readFileSync(globalCssPath, 'utf-8');
    expect(cssContent).toContain('.prose h1');
    expect(cssContent).toContain('color: var(--color-brand-navy)');
    expect(cssContent).toContain('color: var(--color-brand-primary)');
    expect(cssContent).toContain('border-left: 4px solid var(--color-brand-primary)');
  });
});
