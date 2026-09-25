# Quickstart & Validation Guide: Rediseño de Paneles Académicos

Esta guía describe los pasos prácticos para validar de punta a punta las mejoras en los paneles de profesor y estudiante, la erradicación del "AI slop" visual y las medidas de seguridad básicas.

---

## 1. Prerrequisitos y Configuración

1. Instalar dependencias y verificar el entorno:
   ```bash
   npm install
   ```
2. Ejecutar la suite de pruebas automatizadas:
   ```bash
   npm test
   ```
3. Iniciar el servidor local de desarrollo:
   ```bash
   npm run dev
   ```
   Abrir en el navegador: `http://localhost:4321`

---

## 2. Escenarios de Validación

### Escenario 1: Panel del Docente con Espacios Duales (Sábado y Domingo)
1. **Acción**: En la pantalla de inicio, hacer clic en la pestaña "Docente" o ingresar la clave rápida `profesor`.
2. **Resultado esperado**:
   - El banner voluminoso de inducción de 54 semanas ya **no** aparece en el cuerpo central.
   - En su lugar, se presentan dos tarjetas destacadas lado a lado: **Clase Sábado** y **Clase Domingo**.
   - Cada tarjeta muestra la semana activa actual, el módulo, el título de la clase y el botón directo para **Proyectar la clase activa**.
   - El acceso a la presentación oficial de inducción se encuentra disponible de forma compacta en la barra superior (`Presentación Inducción`).
   - Al pulsar `+1 Finalizar semana` en cualquiera de los grupos, el número de semana avanza y el título de la lección cambia de inmediato.

### Escenario 2: Panel del Estudiante Limpio y Enfocado
1. **Acción**: Cerrar sesión docente e ingresar como alumno (ej. con el usuario `erandi.alvarado` o la clave rápida `sabado`).
2. **Resultado esperado**:
   - La vista de bienvenida está limpia, sin saturación de tarjetas vacías o banners promocionales.
   - Se muestra de manera prioritaria la lección de la semana activa del Grupo Sábado.
   - Si existe una tarea asignada para esa semana, se muestran sus instrucciones claras y fecha límite.
   - Se despliega el listado de repaso con las clases anteriores ya cursadas.

### Escenario 3: Verificación de Diseño Humano (Sin Patrones de IA)
1. **Acción**: Inspeccionar visualmente la página de inicio, panel y navegación en modos claro y oscuro.
2. **Resultado esperado**:
   - Ausencia de gradientes morados/neón artificiales.
   - Paleta de color institucional consistente (azul marino CPI, acento ámbar sobrio).
   - Tipografía con jerarquía natural y textos en segunda persona orientados a la práctica del estudiante.

### Escenario 4: Prueba de Seguridad Básica (Prevención XSS)
1. **Acción**:
   - Como docente, abrir el modal de gestión de tarea para la semana en curso.
   - En el campo de título ingresar: `<script>alert('xss')</script>Comandos Linux`.
   - Guardar la tarea.
2. **Resultado esperado**:
   - En el panel del profesor y del estudiante, el texto se muestra como texto literal sanitizado (`&lt;script&gt;...`), sin ejecutar ninguna alerta o script en el navegador.
