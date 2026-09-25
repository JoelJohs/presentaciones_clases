import { describe, it, expect } from 'vitest';
import { escapeHtml, sanitizeWeekNumber, assertTeacherRole } from './security';
import type { PortalUser } from '../features/portal/types';

describe('src/utils/security.ts', () => {
  describe('escapeHtml', () => {
    it('escapa etiquetas script y tags HTML', () => {
      const input = '<script>alert("XSS")</script>';
      expect(escapeHtml(input)).toBe('&lt;script&gt;alert(&quot;XSS&quot;)&lt;&#x2F;script&gt;');
    });

    it('escapa caracteres especiales &, <, >, ", \', /', () => {
      const input = 'RAM & CPU > "GPU" / \'Storage\'';
      expect(escapeHtml(input)).toBe('RAM &amp; CPU &gt; &quot;GPU&quot; &#x2F; &#x27;Storage&#x27;');
    });

    it('maneja valores nulos y no definidos devolviendo cadena vacía', () => {
      expect(escapeHtml(null)).toBe('');
      expect(escapeHtml(undefined)).toBe('');
    });

    it('preserva cadenas seguras de texto plano', () => {
      expect(escapeHtml('Investigación de Comandos Linux')).toBe('Investigación de Comandos Linux');
    });
  });

  describe('sanitizeWeekNumber', () => {
    it('delimita semanas menores a 1 a 1', () => {
      expect(sanitizeWeekNumber(0)).toBe(1);
      expect(sanitizeWeekNumber(-5)).toBe(1);
    });

    it('delimita semanas mayores a 54 a 54', () => {
      expect(sanitizeWeekNumber(55)).toBe(54);
      expect(sanitizeWeekNumber(100)).toBe(54);
    });

    it('convierte strings numéricos y redondea decimales', () => {
      expect(sanitizeWeekNumber('4')).toBe(4);
      expect(sanitizeWeekNumber('12.8')).toBe(12);
    });

    it('usa el valor por defecto si el valor no es un número válido', () => {
      expect(sanitizeWeekNumber('invalido', 4)).toBe(4);
      expect(sanitizeWeekNumber(NaN, 1)).toBe(1);
    });
  });

  describe('assertTeacherRole', () => {
    it('devuelve true si el usuario tiene rol de profesor', () => {
      const teacher: PortalUser = { id: 'u_prof', nombre: 'Joel', rol: 'profesor' };
      expect(assertTeacherRole(teacher)).toBe(true);
    });

    it('devuelve false si el usuario tiene rol de alumno', () => {
      const student: PortalUser = { id: 'u_01', nombre: 'Erandi', rol: 'alumno', grupo: 'sabado' };
      expect(assertTeacherRole(student)).toBe(false);
    });

    it('devuelve false si el usuario es null o undefined', () => {
      expect(assertTeacherRole(null)).toBe(false);
      expect(assertTeacherRole(undefined)).toBe(false);
    });
  });
});
