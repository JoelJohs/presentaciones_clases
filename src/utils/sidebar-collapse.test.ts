import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Sidebar Collapse Verification', () => {
  it('should have the sidebar collapse toggle and styling in Header.astro and Layout.astro', () => {
    const headerPath = path.join(__dirname, '../components/Header.astro');
    const layoutPath = path.join(__dirname, '../layouts/Layout.astro');

    // 1. Verify Header.astro contains sidebar-toggle button
    expect(fs.existsSync(headerPath)).toBe(true);
    const headerContent = fs.readFileSync(headerPath, 'utf-8');
    expect(headerContent).toContain('id="sidebar-toggle"');
    expect(headerContent).toContain('hidden lg:inline-flex');
    expect(headerContent).toContain('Alternar Temario');

    // 2. Verify Layout.astro contains the inline check script to prevent layout flash
    expect(fs.existsSync(layoutPath)).toBe(true);
    const layoutContent = fs.readFileSync(layoutPath, 'utf-8');
    expect(layoutContent).toContain("localStorage.getItem('sidebar-collapsed') === 'true'");
    expect(layoutContent).toContain("document.documentElement.classList.add('sidebar-collapsed');");

    // 3. Verify Layout.astro contains the element ID main-content-wrapper and transition classes
    expect(layoutContent).toContain('id="main-content-wrapper"');
    expect(layoutContent).toContain('transition-all duration-300');

    // 4. Verify Layout.astro script binds the desktop toggle
    expect(layoutContent).toContain("const sidebarToggle = document.getElementById('sidebar-toggle');");
    expect(layoutContent).toContain("sidebarToggle?.addEventListener('click'");
    expect(layoutContent).toContain("document.documentElement.classList.toggle('sidebar-collapsed');");
    expect(layoutContent).toContain("localStorage.setItem('sidebar-collapsed', String(isCollapsed));");

    // 5. Verify Layout.astro style is:global contains collapsed state overrides
    expect(layoutContent).toContain('<style is:global>');
    expect(layoutContent).toContain('.sidebar-collapsed #sidebar');
    expect(layoutContent).toContain('transform: translateX(-100%);');
    expect(layoutContent).toContain('.sidebar-collapsed #main-content-wrapper');
    expect(layoutContent).toContain('padding-left: 0 !important;');
  });
});
