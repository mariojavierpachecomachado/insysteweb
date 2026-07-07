(function () {
  'use strict';

  // ---------- Nav móvil ----------
  const navToggle = document.getElementById('navToggle');
  const nav = document.querySelector('.nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      navToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });

    // Cerrar el menú al navegar a una sección
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (nav.classList.contains('is-open')) {
          nav.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.setAttribute('aria-label', 'Abrir menú');
        }
      });
    });
  }

  // ---------- Año del footer ----------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Ondas fluidas del hero ----------
  const canvas = document.getElementById('heroWaves');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let t = 0;

    const size = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      const lines = 14;
      for (let i = 0; i < lines; i++) {
        const k = i / (lines - 1);
        const yBase = h * 0.38 + k * h * 0.72;
        const amp = 26 + i * 5;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 8) {
          const y = yBase
            + Math.sin(x * 0.0035 + i * 0.55 + t) * amp
            + Math.sin(x * 0.0011 - i * 0.3 + t * 0.6) * amp * 0.7;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        // Del navy de la marca hacia el rosa acento, siempre muy tenue
        const r = Math.round(17 + (255 - 17) * k);
        const g = Math.round(46 + (69 - 46) * k);
        const b = Math.round(80 + (117 - 80) * k);
        ctx.strokeStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + (0.05 + k * 0.07).toFixed(3) + ')';
        ctx.lineWidth = 1.3;
        ctx.stroke();
      }
    };

    const loop = () => {
      t += 0.0035;
      draw();
      requestAnimationFrame(loop);
    };

    window.addEventListener('resize', () => { size(); draw(); });
    size();
    if (reduce) draw();
    else loop();
  }

})();
