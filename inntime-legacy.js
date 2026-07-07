(function () {
  'use strict';

  // ---------- Header scroll state ----------
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 8) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Mobile nav toggle ----------
  const navToggle = document.getElementById('navToggle');
  const nav = document.querySelector('.nav');
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    navToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });

  // Close mobile nav when clicking a link
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // ---------- Nav dropdown (touch / click) ----------
  document.querySelectorAll('.nav-dropdown-toggle').forEach((toggle) => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const li = toggle.closest('.nav-has-dropdown');
      const isOpen = li.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-has-dropdown')) {
      document.querySelectorAll('.nav-has-dropdown.is-open').forEach((li) => {
        li.classList.remove('is-open');
        li.querySelector('.nav-dropdown-toggle').setAttribute('aria-expanded', 'false');
      });
    }
  });

  // ---------- Year in footer ----------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Scroll reveal ----------
  const revealTargets = document.querySelectorAll(
    '.section-head, .insight, .service, .valor-pillars li, .standards li, .contact-card, .contact-form, .extra-grid > div, .chips'
  );
  revealTargets.forEach((el) => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );
    revealTargets.forEach((el) => observer.observe(el));

    // Fallback: nada debe quedar oculto indefinidamente (crawlers,
    // navegadores sin scroll, observers que no disparan)
    setTimeout(() => {
      revealTargets.forEach((el) => el.classList.add('is-visible'));
    }, 4000);
  } else {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }

})();
