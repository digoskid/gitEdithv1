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

            <div class="bio-cta-box">
              <div class="bio-cta-info">
                <h4>¿Listo para dar el primer paso?</h4>
                <p>Agenda tu consulta individual o de pareja y comencemos a trabajar en tu proceso.</p>
              </div>
              <a href="./agendar-cita/" class="btn btn-accent btn-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                Agendar Consulta
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
