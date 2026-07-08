# INNSYSTE — Sitio corporativo

> Tecnología bien pensada para organizaciones exigentes.
> Soluciones y respaldo para líderes de IT/OT.

Sitio web institucional de **INNSYSTE**, basado en el portafolio de Soluciones TIC 2026.

## Stack

- **HTML5** semántico
- **CSS3** moderno (Grid, Flexbox, custom properties, clamp())
- **JavaScript** vanilla (sin dependencias)
- **Google Fonts** — Montserrat

Sin build step, sin frameworks. Lo que está en el repo es lo que se sirve.

## Estructura

```
insysteweb/
├── index.html                # Sitio principal (one-page)
├── inntime.html              # Landing INNTime — bolsas de horas TI (rediseño 2026)
├── innseal.html              # Innseal — análisis competitivo (auto-contenida)
├── kas-telenet.html          # Propuesta Kaspersky/TeleNet (confidencial, noindex)
├── MonitorINN-DDBB-DIMAR.html # Landing MonitorInn — cumplimiento DIMAR (confidencial, noindex, sin enlazar)
├── sdm/index.html            # Landing SDM — Service Delivery Management (auto-contenida)
├── styles.css                # Stylesheet del rediseño 2026: tokens, header, footer, componentes
├── script.js                 # JS del rediseño: nav móvil, ondas del hero (canvas), año
├── staticwebapp.config.json  # Routing de Azure (rutas limpias /inntime, /innseal, …)
├── sitemap.xml · robots.txt
└── assets/                   # Logos, favicon, imagen OG
```

`index.html` e `inntime.html` comparten `styles.css` + `script.js` (rediseño 2026).
`innseal.html`, `kas-telenet.html`, `MonitorINN-DDBB-DIMAR.html` y `sdm/index.html` son páginas
auto-contenidas con su propio CSS embebido. `MonitorINN-DDBB-DIMAR.html` es una landing de
cumplimiento de requerimientos: recolorea su "chrome" (header, badges, tablas) a la paleta
INNSYSTE, pero las 4 capturas de la app (mockups reales de producto, tema oscuro) no se tocan —
conservan su tipografía y estilo originales. No está enlazada desde `index.html` ni en
`staticwebapp.config.json`; se accede por su URL directa.

## Desarrollo local

Cualquier servidor estático sirve:

```bash
python -m http.server 8080     # o: npx serve -l 8080 .
```

Luego abre <http://localhost:8080>.

## Despliegue

**Azure Static Web Apps** vía GitHub Actions: cada push a `main` publica automáticamente
(workflow en `.github/workflows/`). Los pull requests generan un entorno de preview.
No hay staging: verificar localmente antes de hacer push.

Las rutas limpias (`/inntime`, `/innseal`, `/kas-telenet`) se definen en `staticwebapp.config.json`.

## Diseño

| Token | Valor |
|---|---|
| Navy (primario) | `#112e50` |
| Rosa (acento) | `#ff4575` |
| Fondo | `#ffffff` |
| Tipografía | Montserrat |

Rediseño 2026: fondo blanco, jerarquía por líneas finas, radios 2–4px, ondas animadas
en el hero (`canvas#heroWaves`). Todos los tokens viven como custom properties en
`:root` de `styles.css` (`--ink`, `--accent`, `--paper`, `--line`…).

## Responsive

Breakpoints en `styles.css`: `≤980px` (nav hamburguesa, layouts a 1 columna) y `≤620px`
(ajustes de móvil). Las páginas auto-contenidas e `inntime-legacy.css` definen los suyos.

## Accesibilidad

- Skip-link al contenido principal
- ARIA labels en navegación, botones y form
- `prefers-reduced-motion` respetado
- Contraste AA en texto sobre todos los fondos

## SEO

- Open Graph + Twitter cards + canonical en todas las páginas públicas
- JSON-LD (Organization) en el index
- `sitemap.xml` + `robots.txt` (kas-telenet y MonitorINN-DDBB-DIMAR excluidos: contenido confidencial con `noindex`)

## Contacto comercial

**Mario Javier Pacheco Machado**
📧 mario@innsyste.com
📞 +57 300 719 1116
🌐 [www.innsyste.com](https://www.innsyste.com)

---

© INNSYSTE — Todos los derechos reservados.
