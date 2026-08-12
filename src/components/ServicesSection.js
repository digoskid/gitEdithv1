/* ==========================================================================
   SERVICES & KITS SECTION COMPONENT
   ========================================================================== */

import { servicesData } from '../data/servicesData.js';

export function renderServicesSection() {
  const cardsHtml = servicesData.map(service => renderSolutionCard(service)).join('');

  return `
    <section class="section services-section" id="servicios">
      <div class="container">
        <div class="section-title-wrap">
          <span class="section-subtitle">RECURSOS BREVES & EFECTIVOS</span>
          <h2 class="section-title">Kits de Soluciones Prácticas</h2>
          <p class="section-description">
            Herramientas psicológicas estructuradas, breves y directas diseñadas para brindarte pautas claras de afrontamiento emocional.
          </p>
        </div>

        <div class="grid grid-3 kit-cards-grid" id="solutions-grid">
          ${cardsHtml}
        </div>
      </div>
    </section>
  `;
}

function renderSolutionCard(service) {
  return `
    <article class="kit-card">
      <div class="kit-card-media">
        <img src="${service.image}" alt="${service.title}" class="kit-card-img" loading="lazy" width="300" height="180" />
      </div>
      
      <div class="kit-card-content">
        <div class="kit-card-body">
          <h3 class="kit-card-title">${service.title}</h3>
          <p class="kit-card-desc">${service.description}</p>
        </div>
        
        <div class="kit-card-footer">
          <a href="${service.link}" class="btn btn-accent kit-card-cta">
            ${service.ctaText}
          </a>
          <span class="kit-card-price">
            ${service.price}
          </span>
        </div>
      </div>
    </article>
  `;
}

export function initServicesEvents() {
  // No hay filtros dinámicos que inicializar porque solo son 3 kits estáticos
}

