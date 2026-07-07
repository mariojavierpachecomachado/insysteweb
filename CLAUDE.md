# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es

Sitio corporativo de INNSYSTE (soluciones IT/OT, contenido en español). HTML5 + CSS3 + JavaScript vanilla, **sin build step, sin frameworks, sin dependencias**. Lo que está en el repo es exactamente lo que se sirve.

## Comandos

No hay build, lint ni tests. Desarrollo local = servir archivos estáticos desde la raíz:

```bash
python -m http.server 8080     # o: npx serve -l 8080 .
```

Verificación tras un cambio: abrir la página en el navegador, revisar consola sin errores, navegación del header/footer, responsive (móvil ~375px y escritorio) y que los assets carguen (cuidado con rutas relativas desde `sdm/`, que está un nivel abajo).

## Despliegue

Push a `main` → GitHub Actions (`.github/workflows/azure-static-web-apps-*.yml`) publica automáticamente en **Azure Static Web Apps**. No hay staging: verificar localmente antes de push. Los PRs generan un entorno de preview automático.

El remoto de producción es `github.com/mariojavierpachecomachado/insysteweb`. Existe un remoto viejo (`yaimor/insysteweb`) **sin deploy** — si `origin` apunta ahí, corregirlo.

`staticwebapp.config.json` controla el routing en Azure (rutas limpias como `/inntime` → `inntime.html`, y `navigationFallback` a `index.html`). **No borrarlo**; toda página nueva con URL limpia necesita su entrada `routes` aquí.

## Arquitectura

- `index.html` — sitio principal one-page (rediseño 2026: hero con ondas en canvas `#heroWaves`, retos, valor, servicios, estándares, experiencia, contacto). Usa `styles.css` + `script.js`.
- `inntime.html` — landing INNTime; usa `inntime-legacy.css` e `inntime-legacy.js` (diseño anterior congelado, header/footer incluidos), más CSS propio embebido con prefijo `it-*` y un carrusel inline. Pendiente de migrar al rediseño.
- `innseal.html`, `kas-telenet.html`, `sdm/index.html` — páginas **auto-contenidas** con su propio CSS embebido; NO cargan `styles.css` (sus clases chocan, p. ej. `.nav` en SDM). `kas-telenet.html` es una propuesta confidencial: tiene `noindex` y está excluida de sitemap/robots.
- `styles.css` — stylesheet del rediseño 2026 (fondo blanco, jerarquía por líneas finas, radios 2–4px). Hoy solo lo usa el index; las páginas que se vayan migrando deben compartirlo. Tokens en `:root` (`--ink`, `--accent`, `--paper`, `--line`…); usar las variables, no hardcodear valores.
- `script.js` — IIFE única del rediseño: nav móvil, año del footer y ondas del hero. Todos los bloques tienen guards: no lanza errores si faltan elementos.
- `inntime-legacy.css` / `inntime-legacy.js` — copia congelada del diseño anterior, solo para `inntime.html`; eliminar cuando INNTime migre al rediseño.
- `assets/` — `logo.svg` (navy, fondos claros) y `logo-light.svg` (fondos oscuros), favicons, imágenes.

## Reglas del proyecto

- Paleta oficial: navy `#112e50`, rosa `#ff4575`, blanco. Tipografía: Montserrat. Detalle completo en `.claude/skills/marca-innsyste/SKILL.md` — cargar esa skill antes de cualquier trabajo visual.
- La fuente de verdad del diseño es `styles.css` + la skill `marca-innsyste`. El README describe la arquitectura para humanos: mantenerlo al día cuando esta cambie.
- Mantener el sitio auto-contenido: sin CDNs nuevos ni frameworks. La única dependencia externa permitida es Google Fonts.
- Contenido siempre en español.
- El repo vive en una carpeta OneDrive y `.git` ya se corrompió una vez por la sincronización. Ante errores git raros (`bad object`, `cannot lock ref`, locks huérfanos), la fuente de verdad es `origin` (GitHub): recuperar refs desde `origin/main`, no intentar reparar objetos locales.
