/* ==========================================================================
   HEADER COMPONENT
   ========================================================================== */

import { $, $$, scrollToSection } from '../utils/dom.js';

export function renderHeader() {
  return `
    <header class="site-header" id="site-header">
      <div class="container header-container">
        <a href="#hero" class="brand-logo" id="header-logo-link">
          <img src="./Logo.png" alt="Edith Delgado - Logo" class="brand-logo-img" id="header-logo-img" />
        </a>

        <nav>
          <ul class="nav-menu" id="nav-menu">
            <li><a href="#hero" class="nav-link active" data-section="hero">Inicio</a></li>
            <li><a href="#conocenos" class="nav-link" data-section="conocenos">Conócenos</a></li>
            <li><a href="#servicios" class="nav-link" data-section="servicios">Kit de Soluciones</a></li>
            <li><a href="#frase" class="nav-link" data-section="frase">Filosofía</a></li>
            <li><a href="#comunidad" class="nav-link" data-section="comunidad">Comunidad</a></li>
          </ul>
        </nav>

        <div class="header-cta">
          <button class="btn btn-primary btn-booking" id="header-booking-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            Agendar Cita
          </button>

          <button class="mobile-toggle" id="mobile-toggle" aria-label="Abrir menú de navegación">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  `;
}

export function initHeaderEvents() {
  const header = $('#site-header');
  const mobileToggle = $('#mobile-toggle');
  const navMenu = $('#nav-menu');
  const navLinks = $$('.nav-link');

  // Update active nav link on scroll
  const sectionIds = ['hero', 'conocenos', 'servicios', 'frase', 'comunidad'];
  const sections = sectionIds.map(id => document.getElementById(id));
  const updateActiveNav = () => {
    const scrollPos = window.scrollY + window.innerHeight / 2; // middle of viewport
    let activeId = sectionIds[0];
    for (let i = 0; i < sections.length; i++) {
      const sec = sections[i];
      if (sec && sec.offsetTop <= scrollPos) {
        activeId = sectionIds[i];
      }
    }
    navLinks.forEach(link => {
      const target = link.getAttribute('data-section');
      if (target === activeId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };
  window.addEventListener('scroll', updateActiveNav);
  // Also run on load to set initial state
  updateActiveNav();

  // Mobile menu toggle
  mobileToggle?.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navMenu?.classList.toggle('active');
  });

  // Smooth scroll links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-section');
      if (targetId) {
        scrollToSection(targetId);
        mobileToggle?.classList.remove('active');
        navMenu?.classList.remove('active');
      }
    });
  });

  // Redireccionar a la página de agendar cita
  $('#header-booking-btn')?.addEventListener('click', () => {
    window.location.href = './agendar-cita/index.html';
  });
}
