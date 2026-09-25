# UI & Data Contracts: Rediseño de Paneles Académicos

Este documento define los contratos de interfaz de usuario y las funciones públicas que aseguran consistencia en las vistas de inicio y paneles.

---

## 1. Contrato de Vista Dual del Docente (`#view-teacher`)

### Layout y Componentes
- **Espacio Superior**: Encabezado con información del docente y botones de acción rápida:
  - Botón: `Presentación Inducción` (`/00-inicio`) — discreto, accesible, sin ocupar espacio central.
  - Botón: `Plan de Estudios` (`/plan-de-estudios`).
  - Botón: `Control de Grupos` (`/panel`).
  - Botón: `Captura de Calificaciones` (`/calificaciones`).
  - Botón: `Cerrar sesión`.
- **Área Central (Reemplazo del Banner de 54 semanas)**:
  Contenedor de dos tarjetas destacadas (`grid grid-cols-1 md:grid-cols-2 gap-4`):
  1. **Tarjeta Grupo Sábado (`#teacher-card-sabado`)**:
     - Identificador del grupo con distintivo y horario (`09:00 – 13:00 h`).
     - Semana activa en curso (`Semana N de 54`).
     - Módulo actual (`Módulo XX: Nombre`).
     - Título de la clase de la semana (`Clase: Nombre de la clase`).
     - Botón principal de acción:
       - Si la clase cuenta con presentación `.mdx`: Enlace destacado con icono de proyección `Proyectar clase activa` hacia `/${slug}`.
       - Si es sesión práctica de aula: Mensaje indicativo claro con acceso al temario del módulo.
     - Sección de tarea semanal: Resumen de la tarea asignada para la semana $N$ con botón `Gestionar tarea`.
     - Barra de control de semana: Botón `+1 Finalizar semana` y enlace para ajuste detallado.
  2. **Tarjeta Grupo Domingo (`#teacher-card-domingo`)**:
     - Estructura simétrica a la tarjeta de Sábado, sincronizada de forma autónoma con los datos del grupo de Domingo.

---

## 2. Contrato de Vista del Estudiante (`#view-student`)

### Jerarquía de Contenido
1. **Encabezado del Estudiante**:
   - Nombre del alumno y distintivo del grupo asignado (`Clase Sábado` o `Clase Domingo`).
   - Matrícula individual.
   - Enlace a `Plan de Estudios` y `Mis Calificaciones`.
   - Botón `Cerrar sesión`.
2. **Tarjeta Central: Clase en Curso (`#student-active-week-container`)**:
   - Semana activa $N$ de 54.
   - Título de la clase y descripción orientada a la práctica del día.
   - Botón principal para abrir diapositivas/presentación si está disponible.
3. **Tarjeta de Tarea Semanal (`#student-task-container`)**:
   - Se muestra si existe una tarea configurada para la semana activa.
   - Título del tema a investigar.
   - Indicaciones puntuales de investigación en libreta técnica.
   - Fecha de entrega.
   - Si no hay tarea, se omite limpiamente para no generar ruido visual.
4. **Historial de Repaso (`#student-unlocked-list`)**:
   - Listado de clases de semanas $1 \dots N-1$.
   - Acceso para volver a estudiar las diapositivas de clases anteriores.

---

## 3. Contrato de Seguridad y Sanitización (OWASP Helper)

### Firma de Funciones

```typescript
/**
 * Escapa caracteres peligrosos para neutralizar ataques XSS antes de insertar
 * texto plano en plantillas HTML dinámicas.
 */
export function escapeHtml(unsafe: string | null | undefined): string;

/**
 * Valida si el usuario actual posee rol docente antes de autorizar
 * modificaciones sobre el estado académico.
 */
export function assertTeacherRole(user: PortalUser | null): boolean;

/**
 * Valida y delimita el rango numérico de semanas escolares permitidas (1 a 54).
 */
export function sanitizeWeekNumber(week: unknown): number;
```

### Comportamiento Esperado

| Entrada (`unsafe`) | Salida (`escapeHtml`) |
|--------------------|-----------------------|
| `<script>alert(1)</script>` | `&lt;script&gt;alert(1)&lt;/script&gt;` |
| `Investigación "RAM & CPU"` | `Investigación &quot;RAM &amp; CPU&quot;` |
| `<img src=x onerror=alert()>` | `&lt;img src=x onerror=alert()&gt;` |
| `null` o `undefined` | `""` (cadena vacía) |
