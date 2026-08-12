/* ==========================================================================
   BIO SECTION COMPONENT - EDITORIAL MINIMALISM
   ========================================================================== */

import { bioData } from '../data/content.js';

export function renderBioSection() {
  const therapyCardsHtml = bioData.therapies.map(item => `
    <div class="therapy-card">
      <div class="therapy-abbr">${item.code}</div>
      <div class="therapy-desc">${item.desc}</div>
    </div>
  `).join('');

  const audienceBadgesHtml = bioData.audiences.map(aud => `
    <span class="badge badge-indigo">
      • Atención a ${aud}
    </span>
  `).join('');

  return `
    <section class="section bio-section" id="conocenos">
      <div class="container">
        <div class="bio-grid">
          <div class="bio-portrait-wrap">
            <div class="bio-portrait-card">
              <img src="./assets/images/characters/251.png?v=999999" alt="Edith Delgado - Psicóloga Clínica" />
              <div class="bio-credentials-badge">
                ★ Supervisor EMDR Especialista TRAUMA
              </div>
            </div>
          </div>

          <div class="bio-content">
            <span class="section-subtitle">SOBRE MÍ & ENFOQUE CLÍNICO</span>
            <h2 class="section-title bio-content-heading">${bioData.title}</h2>

            <p class="bio-text">
              ${bioData.summary}
            </p>

            <p class="bio-text">
              ${bioData.philosophy}
            </p>

            <div class="therapy-approaches-title">Terapias Basadas en la Evidencia</div>
            <div class="therapy-grid">
              ${therapyCardsHtml}
            </div>

            <div class="audience-section-title">Población de Atención</div>
            <div class="audience-list">
              ${audienceBadgesHtml}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
