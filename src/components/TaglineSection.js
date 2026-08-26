/* ==========================================================================
   TAGLINE & KINTSUGI SECTION - EDITORIAL MINIMALISM
   ========================================================================== */

import { siteConfig } from '../data/content.js';

export function renderTaglineSection() {
  return `
    <section class="section tagline-section" id="frase">
      <div class="container">
        <div class="tagline-content-wrap">

          <h2 class="tagline-quote-main">
            <span class="quote-highlight">${siteConfig.tagline}</span>
          </h2>

          <p class="tagline-explanation">
            "${siteConfig.tagline}" es una afirmación de poder interior. Habla de transformación, de aceptar las partes rotas o heridas y usarlas como base para reconstruirse con más conciencia, más autenticidad y más fuerza. No se trata de volver a ser lo que uno era antes, sino de emerger distinto y renovado.
          </p>

          <div class="kintsugi-features-grid">
            <div class="kintsugi-feature-card">
              <div class="feature-num">01.</div>
              <h3 class="feature-title">Fuerza sobre Dorado</h3>
              <p class="feature-desc">
                No hay dorado por elección: la resiliencia no necesita brillo artificial para tener un valor incalculable.
              </p>
            </div>

            <div class="kintsugi-feature-card">
              <div class="feature-num">02.</div>
              <h3 class="feature-title">Integración de Heridas</h3>
              <p class="feature-desc">
                Cada fragmento cuenta. Honramos las experiencias vividas como parte esencial de la belleza humana.
              </p>
            </div>

            <div class="kintsugi-feature-card">
              <div class="feature-num">03.</div>
              <h3 class="feature-title">Nuevo Propósito</h3>
              <p class="feature-desc">
                Transformamos lo que antes pesaba en un nuevo motor de crecimiento personal y paz interior.
              </p>
            </div>
          </div>

          <div class="tagline-cta-wrap">
            <h3 class="tagline-cta-title">No tienes que transitar este proceso a solas</h3>
            <p class="tagline-cta-desc">Atención presencial en Quito o virtual para cualquier lugar del mundo.</p>
            <a href="./agendar-cita/" class="btn btn-accent">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              Iniciar mi Proceso Terapéutico
            </a>
          </div>
        </div>
      </div>
    </section>
  `;
}
