---
name: run-sitio
description: Cómo levantar y verificar localmente el sitio web de INNSYSTE. Usar cuando haya que correr el sitio, tomar screenshots o comprobar que un cambio se ve y funciona en el navegador.
---

# Levantar el sitio de INNSYSTE localmente

El sitio es estático puro — no hay build ni dependencias. Basta un servidor de archivos.

## Servir

Desde la raíz del repo:

```powershell
py -m http.server 8080
```

(en esta máquina `python` no está en el PATH — usar el launcher `py`; correr en segundo plano
si se va a seguir trabajando). Como alternativa sin Python: `npx serve -l 8080 .`.

Luego abrir/verificar `http://localhost:8080/` (index), y las demás páginas:
`/inntime.html`, `/innseal.html`, `/kas-telenet.html`, `/sdm/`.

Para screenshots y revisión de consola automatizadas, usar la skill `webapp-testing`
(Playwright ya está instalado para `py`: Chromium headless).

## Qué verificar tras un cambio

1. La página modificada carga sin errores en consola.
2. Navegación del header y links del footer siguen funcionando.
3. Responsive: revisar al menos ancho móvil (~375px) y escritorio (1280px+).
4. Los assets (logos, favicon, imágenes) cargan — rutas relativas correctas,
   especialmente desde `sdm/` que está un nivel abajo.

## Despliegue

El sitio se publica como **Azure Static Web App** desde la rama `main`
(workflow en `.github/workflows/`). No hay paso de build: lo que está en el repo
es lo que se sirve. Verificar localmente antes de hacer push a `main`.
