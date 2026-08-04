# Plan de Prueba Piloto — Plataforma de Estudios y Motor de Presentación

## 1. Objetivo General
Evaluar en un entorno de aula real la usabilidad, estabilidad, legibilidad y rendimiento pedagógico de la plataforma de estudios durante una sesión de clase de 30 a 60 minutos con proyector y hardware real.

---

## 2. Entorno y Hardware (Ficha de Registro)

```markdown
## Ficha de Registro del Entorno
- Fecha de la prueba:
- Aula / Laboratorio:
- Nombre del docente:
- Número aproximado de estudiantes:
- Modelo de laptop:
- Sistema Operativo (Windows/macOS/Linux):
- Navegador web y versión:
- Resolución nativa de la laptop:
- Modelo del proyector o pantalla externa:
- Resolución de salida al proyector:
- Tipo de conexión (HDMI / DisplayPort / VGA / Inalámbrico):
- Modelo del control remoto de presentación (si aplica):
- Estado de la conexión a Internet:
```

---

## 3. Rutas de Lección Seleccionadas

Se recomiendan las siguientes dos lecciones del curso debido a su diversidad de contenido:

1. **Ruta Principal**: `/01-fundamentos-mantenimiento/01-introduccion-computacion/01-hardware-y-software`
   - *Justificación*: Contiene 4 encabezados `H2` (5 diapositivas en total), introducción, comparaciones en tablas, listas ordenadas/desordenadas y actividades prácticas.
2. **Ruta Secundario/Complejo**: `/01-fundamentos-mantenimiento/02-hardware-mantenimiento/01-componentes-internos`
   - *Justificación*: Incluye diagramas de componentes, imágenes de hardware y bloques de código de comandos.

---

## 4. Escenario y Cronograma de la Prueba (30-60 Minutos)

### Fase A: Preparación Previa (10 Minutos)
- [ ] Conectar laptop al proyector y ajustar la resolución de salida.
- [ ] Configurar el modo de pantalla (Duplicar o Extender).
- [ ] Abrir el navegador en el servidor local (`http://localhost:4321`) o compilación estática.
- [ ] Silenciar notificaciones del sistema operativo.
- [ ] Verificar carga de la lección seleccionada.
- [ ] Probar alternancia previa entre `Lectura`, `Continuo` y `Diapositivas`.
- [ ] Probar entrada y salida de pantalla completa con la tecla `F` y el botón flotante.
- [ ] Confirmar salida del modo diapositivas con la tecla `Escape`.

### Fase B: Ejecución Durante la Clase (30-40 Minutos)
- [ ] Iniciar la lección en modo `Lectura` o `Continuo` para la introducción.
- [ ] Cambiar al modo `Diapositivas` para la explicación de conceptos clave.
- [ ] Navegar entre diapositivas utilizando el teclado (`Flecha Izquierda` / `Flecha Derecha` / `Espacio`).
- [ ] Probar el avance y retroceso mediante el control remoto de presentación.
- [ ] Mostrar tablas y verificar el desplazamiento horizontal en pantalla proyectada.
- [ ] Mostrar bloques de código e imágenes asegurando proporcionalidad.
- [ ] Entrar a modo `Pantalla Completa` durante la explicación principal.
- [ ] Si ocurre alguna inconsistencia visual, aplicar el fallback al modo `Continuo`.

### Fase C: Registro Post-Clase (10 Minutos)
- [ ] Documentar problemas e interrupciones en `PILOT_ISSUES.md`.
- [ ] Registrar la cronología de eventos en `PILOT_TEST_LOG.md`.
- [ ] Recopilar comentarios generales de legibilidad del docente y estudiantes.
- [ ] Determinar el veredicto final de la prueba piloto.

---

## 5. Matriz de Evaluación de Modos

Escala de evaluación: **1 (Inutilizable)** a **5 (Muy Bueno)**.

| Modo | Comodidad Docente | Legibilidad Proyectada | Fluidez de Navegación | Calificación (1-5) | Observaciones |
| ---- | ----------------- | ---------------------- | --------------------- | ------------------ | ------------- |
| `reading` | | | | | |
| `presentation-scroll` | | | | | |
| `presentation-slides` | | | | | |

---

## 6. Matriz de Navegación por Teclado y Control Remoto

| Entrada | Acción Esperada | Resultado Observado | ¿Interfiere con Inputs/Botones? |
| ------- | --------------- | ------------------- | ------------------------------- |
| `ArrowRight` / `ArrowDown` | Siguiente diapositiva | | |
| `ArrowLeft` / `ArrowUp` | Diapositiva anterior | | |
| `Space` | Scroll interno / Siguiente | | |
| `PageDown` / `PageUp` | Siguiente / Anterior | | |
| `Home` / `End` | Primera / Última diapositiva | | |
| `F` | Pantalla Completa API | | |
| `Escape` | Salir de Diapositivas | | |
| Control Remoto (Clicker) | Avance / Retroceso | | |

---

## 7. Verificación de Pantalla Completa y F11

- **Fullscreen API (Botón / Tecla F)**:
  - [ ] Entra en pantalla completa de elemento correctamente.
  - [ ] Mantiene la barra flotante de controles visible.
  - [ ] Sale correctamente con la tecla `Escape`.
- **Modo F11 del Navegador**:
  - [ ] Oculta la barra de pestañas y marcadores del navegador.
  - [ ] Funciona independientemente de la Fullscreen API.

---

## 8. Evaluación de Legibilidad en Aula

Escala: **1 (Ilegible)** a **5 (Excelente)**.

| Elemento Visual | Vista Cercana (Laptop) | Centro del Aula | Fondo del Aula | Notas |
| --------------- | --------------------- | --------------- | -------------- | ----- |
| Títulos `H1` / `H2` | | | | |
| Texto de Párrafos | | | | |
| Bloques de Código | | | | |
| Tablas de Datos | | | | |
| Badges de Tipo | | | | |
| Barra Flotante | | | | |

---

## 9. Reglas para Observaciones de Estudiantes
- Registra únicamente comentarios generales sobre legibilidad y comprensión visual.
- **PROHIBIDO**: No recopiles nombres de alumnos, datos personales, imágenes sin autorización ni calificaciones individuales.

---

## 10. Condiciones para Detener la Prueba
Detén la prueba y regresa al modo `Continuo` o `Lectura` si:
1. La aplicación deja de responder o la interfaz se congela.
2. Ocurren errores visuales repetitivos que impidan continuar la explicación.
3. El proyector pierde señal o se desconecta el hardware.

---

## 11. Criterios de Aprobación y Veredictos

### Criterios Mínimos
- Ningún problema de severidad `BLOCKER`.
- La lección se imparte por completo de principio a fin.
- La navegación por teclado o control remoto responde de forma predecible.
- El fallback a modo `Continuo` funciona si es necesario.

### Veredictos Posibles
- **`PILOTO APROBADO`**: Sin problemas relevantes durante la clase.
- **`PILOTO APROBADO CON CORRECCIONES`**: Clase impartida con éxito, existen pequeños detalles visuales o UX para pulir.
- **`PILOTO REQUIERE REPETICIÓN`**: Factores de entorno o falta de tiempo impidieron evaluar los 3 modos.
- **`PILOTO FALLIDO`**: La plataforma impidió impartir la clase.
