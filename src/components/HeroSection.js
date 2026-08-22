/* ==========================================================================
   HERO SECTION COMPONENT
   ========================================================================== */

import { siteConfig } from '../data/content.js';
import { scrollToSection } from '../utils/dom.js';

export function renderHeroSection() {
  return `
    <section class="hero-section" id="hero">
      <div class="container hero-grid">
        <div class="hero-content">

          <h1 class="hero-title">
            <span class="highlight-indigo">Edith Delgado</span><br />
            Psicóloga Clínica & Psicoterapeuta
          </h1>

          <div class="hero-tagline-quote">
            “${siteConfig.tagline}”
          </div>

          <p class="hero-description">
            Ayudo a personas y parejas a superar la ansiedad, los duelos, los traumas y las crisis vitales integrando terapias basadas en la evidencia (EMDR, ACT, DBT, FAP, Mindfulness e Hipnosis) para ofrecer recursos breves, directos y profundamente efectivos.
          </p>

          <div class="hero-cta-group">
            <button class="btn btn-primary" id="hero-booking-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              Agendar Cita
            </button>
            <button class="btn btn-outline" id="hero-cta-kits">
              Explorar Kit de Soluciones
            </button>
          </div>

          <div class="hero-stats">
            <div class="stat-item">
              <span class="stat-number" data-target="18" data-prefix="+">+0</span>
              <span class="stat-label">Años de Práctica Clínica</span>
            </div>
            <div class="stat-item">
              <span class="stat-number" data-target="10" data-prefix="+">+0</span>
              <span class="stat-label">Países con pacientes atendidos con éxito</span>
            </div>
            <div class="stat-item">
              <span class="stat-number" data-target="20" data-prefix="+">+0</span>
              <span class="stat-label">Certificaciones especializadas</span>
            </div>
          </div>
        </div>

        <div class="hero-visual">
          <div class="hero-image-card">
            <div class="hero-image-frame">
              <img src="./assets/images/characters/248.png" alt="Edith Delgado - Ilustración Profesional Kintsugi" />
            </div>

            <div class="kintsugi-floating-badge">
              <div class="kintsugi-icon">
                <img src="./Logo.png" alt="Isotipo Kintsugi Edith Delgado" />
              </div>
              <div>
                <div class="kintsugi-text-title">Concepto Kintsugi</div>
                <div class="kintsugi-text-sub">Transformando heridas en fortaleza y propósito.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initHeroEvents() {
  document.getElementById('hero-booking-btn')?.addEventListener('click', () => {
    window.location.href = './agendar-cita/index.html';
  });

  document.getElementById('hero-cta-kits')?.addEventListener('click', () => {
    scrollToSection('servicios');
  });

  // Animación de conteo al cargar
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  const animateCount = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const prefix = el.dataset.prefix || '';
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      // easing: acelera al inicio, desacelera al final
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      current = Math.round(eased * target);
      el.textContent = prefix + current;

      if (step >= steps) {
        clearInterval(timer);
        el.textContent = prefix + target;
      }
    }, duration / steps);
  };

  // Usa IntersectionObserver para disparar cuando el hero es visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statNumbers.forEach(el => animateCount(el));
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const heroSection = document.getElementById('hero');
  if (heroSection) observer.observe(heroSection);
}
