# Especificación de Diseño: Encabezado de Página Estilo Documento (Word) en Lecciones

Este documento detalla la especificación para añadir un encabezado de página visual al inicio de cada lección (MDX) en la plataforma, simulando el estilo de un encabezado de documento formal (tipo Word).

---

## 1. Motivación y Contexto

Para mejorar la orientación del alumno durante la lectura de los temas, se requiere mostrar de forma sutil pero clara la jerarquía actual del curso al inicio de cada lección. 
El encabezado debe mostrar:
*   El **Módulo** en la esquina superior izquierda.
*   La **Fecha** de la clase en la esquina superior derecha (alineada a la misma altura que el Módulo).
*   El **Tema** inmediatamente debajo del Módulo.
*   Una línea horizontal separadora que marque el inicio del contenido de la lección.

---

## 2. Diseño Visual y Estilos

El encabezado se renderizará arriba del artículo de contenido (`<article>`) utilizando Tailwind CSS en `src/pages/[...slug].astro`.

### Especificaciones de Estilo:
1.  **Tipografía**: Fuente monoespaciada/sans limpia (`font-mono` o `font-sans`), tamaño pequeño (`text-xs`), color atenuado (`text-slate-400 dark:text-slate-500` para Módulo y Fecha; `text-slate-500 dark:text-slate-400` para el Tema).
2.  **Disposición**: Contenedor Flexbox (`flex justify-between items-baseline`) para alinear el Módulo y la Fecha en los extremos de la misma línea.
3.  **Separación**: Línea de borde inferior (`border-b border-slate-200 dark:border-slate-800 pb-3 mb-8`) para separar estéticamente el encabezado del título `H1` de la lección.
4.  **Condicionalidad**: Solo se mostrará en páginas que pertenezcan a un Módulo (es decir, si `leccion.data.moduleTitle` está presente). Las páginas de inicio (`00-inicio/*`) no tendrán este encabezado.

---

## 3. Cambios Propuestos en el Código

### Modificación en `src/pages/[...slug].astro`:

Insertar la estructura JSX condicional justo antes de `<article class="prose ...">`:

```html
<!-- Cabecera de Página (Estilo Documento) -->
{leccion.data.moduleTitle && (
  <div class="mb-8 text-xs font-mono text-slate-400 dark:text-slate-500 border-b border-slate-200 dark:border-slate-800 pb-3 select-none">
    <div class="flex justify-between items-baseline gap-4">
      <span class="font-semibold uppercase tracking-wider">{leccion.data.moduleTitle}</span>
      {leccion.data.fecha && (
        <span class="text-right whitespace-nowrap">{leccion.data.fecha}</span>
      )}
    </div>
    {leccion.data.topicTitle && (
      <div class="mt-1 text-slate-500 dark:text-slate-400 font-medium">
        {leccion.data.topicTitle}
      </div>
    )}
  </div>
)}
```

---

## 4. Criterios de Aceptación y Validación
*   Las lecciones que tienen `moduleTitle` deben renderizar el Módulo, Tema y Fecha correctamente alineados.
*   Las lecciones especiales de `00-inicio/` (que no tienen `moduleTitle`) no deben mostrar este encabezado.
*   El diseño debe ser totalmente responsive y adaptarse en pantallas móviles (usando un comportamiento de flexbox adecuado).
*   La compilación (`npm run build`) y los tests (`npm test`) deben ejecutarse y pasar con éxito.
