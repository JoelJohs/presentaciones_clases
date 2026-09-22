# Referencia de Iconos para Lecciones

El proyecto cuenta con las librerías `@iconify-json/lucide` y `@iconify-json/simple-icons` instaladas junto con `astro-icon`.

## Sintaxis de Uso

Importación obligatoria al inicio del archivo MDX (debajo del frontmatter):

```mdx
import { Icon } from "astro-icon/components";
```

### En Encabezados de Diapositiva (`##` o `###`)
```html
## 1. ¿Qué es Hardware? <Icon name="lucide:wrench" class="inline w-6 h-6 align-text-bottom text-gray-600" />
```

### En Listas o Viñetas
```html
- <Icon name="lucide:cpu" class="inline w-5 h-5 align-text-bottom text-sky-600" /> **Procesador:** Descripción.
```

### En Notas / Destacados (`>`)
```html
> <Icon name="lucide:lightbulb" class="inline w-5 h-5 align-text-bottom text-amber-500" /> Nota importante aquí.
```

---

## Iconos Lucide Frecuentes (`lucide:*`)

| Nombre del Icono | Icono / Uso recomendado | Color sugerido (Tailwind) |
| :--- | :--- | :--- |
| `lucide:cpu` | Procesador, cómputo, algoritmos | `text-sky-600` |
| `lucide:layout-dashboard` | RAM, paneles, sistemas operativos | `text-emerald-600` |
| `lucide:backpack` | Almacenamiento permanente, disco duro | `text-amber-600` |
| `lucide:wrench` | Hardware, configuración, herramientas | `text-gray-600` |
| `lucide:monitor` | Software, pantalla, interfaz | `text-blue-600` |
| `lucide:bot` | Periféricos, automatización, IA | `text-purple-600` |
| `lucide:lightbulb` | Consejos, tips, ideas clave | `text-amber-500` |
| `lucide:keyboard` | Atajos de teclado, comandos | `text-gray-600` |
| `lucide:terminal` | Consola, comandos, scripts | `text-emerald-600` |
| `lucide:brain` | Lógica, teoría, arquitectura | `text-pink-600` |
| `lucide:folder` | Archivos, carpetas, extensiones | `text-amber-600` |
| `lucide:wand-2` | Retos, actividades prácticas mágicas | `text-purple-600` |
| `lucide:user` | Desafíos individuales, Modo Ninja | `text-gray-600` |
| `lucide:triangle-alert` | Advertencias, seguridad, peligros | `text-red-600` |
| `lucide:check-circle` | Verificación, objetivos cumplidos | `text-emerald-600` |
| `lucide:clock` | Historia, evolución cronológica | `text-amber-600` |
| `lucide:table` | Tablas de datos, resumen rápido | `text-blue-600` |

---

## Iconos Simple Icons Frecuentes (`simple-icons:*`)

| Nombre del Icono | Tecnología / Marca | Color sugerido (Tailwind) |
| :--- | :--- | :--- |
| `simple-icons:windows` | Microsoft Windows | `text-blue-600` |
| `simple-icons:apple` | Apple macOS / iOS | `text-slate-700` |
| `simple-icons:linux` | Linux / Terminal | `text-neutral-700` |
| `simple-icons:android` | Google Android | `text-green-600` |
| `simple-icons:python` | Python | `text-yellow-600` |
| `simple-icons:javascript` | JavaScript | `text-yellow-500` |
| `simple-icons:html5` | HTML5 | `text-orange-600` |
| `simple-icons:css3` | CSS3 | `text-blue-500` |
| `simple-icons:github` | GitHub / Git | `text-neutral-800` |
| `simple-icons:googlechrome` | Navegadores web | `text-red-500` |
