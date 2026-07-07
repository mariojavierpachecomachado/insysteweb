---
name: marca-innsyste
description: Guía de marca y diseño del sitio web de INNSYSTE. Usar SIEMPRE antes de diseñar, rediseñar o modificar cualquier página, componente visual, prototipo o Artifact del sitio, para mantener consistencia con la identidad de la empresa.
---

# Guía de marca — INNSYSTE

INNSYSTE es una empresa de soluciones tecnológicas/industriales. El sitio es corporativo,
estático (HTML + CSS + JS vanilla, sin frameworks ni build step) y está en español.

## Paleta oficial

| Rol | Color | Uso |
|---|---|---|
| Navy (primario) | `#112e50` | Texto, fondos oscuros, botones primarios |
| Rosa (acento) | `#ff4575` | CTAs, highlights, detalles interactivos |
| Blanco (fondo) | `#ffffff` | Fondo base, texto sobre navy |

- Todos los tonos derivados se expresan como `rgba()` del navy o blanco (ver `:root` en `styles.css`).
- No introducir colores nuevos sin aprobación del usuario.

## Tipografía

- Única familia: **Montserrat** (Google Fonts), fallback `system-ui`. Pesos cargados: 400/600/700/800.
- Títulos: peso 800 (h1/h2) y 700 (h3/h4), `letter-spacing: -0.015em`, tamaños con `clamp()` fluido.
- Cuerpo: 16px, `line-height: 1.7`.

## Layout y estilo

- Contenedor máximo: `1180px` (`--container`).
- Estética del rediseño 2026: fondo blanco, jerarquía por líneas finas (`--line`, `--line-soft`)
  en lugar de sombras; radios pequeños (2–4px); kickers en mayúsculas con guion rosa;
  ondas de marca en canvas en el hero (degradado navy→rosa, opacidad ≤ 0.12).
- Transiciones: `150ms`.
- Reutilizar las variables CSS de `:root` en `styles.css` (`--ink`, `--accent`, `--paper`, `--line`);
  no hardcodear valores.

## Estructura del sitio

- `index.html` — página principal (rediseño 2026).
- `inntime.html`, `innseal.html`, `kas-telenet.html` — landings de producto/propuestas.
- `sdm/` — sección independiente.
- `assets/` — logos (`logo.svg` navy, `logo-light.svg` para fondos oscuros), favicon, fotos.
- `styles.css` y `script.js` — archivos del rediseño; hoy los usa `index.html`, y las páginas que
  se vayan migrando deben compartirlos. `inntime.html` usa `inntime-legacy.css`/`.js` (diseño
  anterior congelado hasta su migración); `innseal.html`, `kas-telenet.html` y `sdm/index.html`
  son auto-contenidas con CSS propio embebido.

## Reglas de trabajo

1. Contenido siempre en **español**.
2. Mantener el sitio 100% estático y auto-contenido: sin CDNs nuevos, sin frameworks,
   sin dependencias de build (se despliega como Azure Static Web App).
3. Toda página nueva debe compartir header, footer y `styles.css` con el resto del sitio.
4. Responsive obligatorio: probar en móvil (~375px), tablet y escritorio.
5. Antes de proponer un rediseño visual, cargar también la skill `artifact-design`
   y presentar prototipos como Artifact para aprobación antes de tocar el código real.
