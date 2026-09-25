import type { PortalUser } from '../features/portal/types';

/**
 * Escapa caracteres peligrosos para neutralizar ataques XSS antes de insertar
 * texto plano en plantillas HTML dinámicas o manipular innerHTML.
 */
export function escapeHtml(unsafe: string | null | undefined): string {
  if (unsafe == null) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Valida y delimita el rango numérico de semanas escolares permitidas (1 a 54).
 */
export function sanitizeWeekNumber(week: unknown, defaultWeek = 1): number {
  const parsed = typeof week === 'number' ? week : parseInt(String(week), 10);
  if (isNaN(parsed)) return defaultWeek;
  return Math.max(1, Math.min(54, Math.floor(parsed)));
}

/**
 * Valida si el usuario actual posee rol docente antes de autorizar
 * modificaciones sobre el estado académico.
 */
export function assertTeacherRole(user: PortalUser | null | undefined): boolean {
  return Boolean(user && user.rol === 'profesor');
}
