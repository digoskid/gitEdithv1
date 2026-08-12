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
        </div>
      </div>
    </section>
  `;
}
