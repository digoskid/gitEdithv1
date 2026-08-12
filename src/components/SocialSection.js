/* ==========================================================================
   SOCIAL & COMMUNITY SECTION COMPONENT
   ========================================================================== */

import { socialChannels } from '../data/content.js';

export function renderSocialSection() {
  const iconSvgs = {
    youtube: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>`,
    instagram: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
    facebook: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
    tiktok: `<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9a8.27 8.27 0 004.83 1.54V7.1a4.85 4.85 0 01-1.06-.41z"/></svg>`
  };
  const cardsHtml = socialChannels.map(channel => `
    <div class="card social-card">
      <div class="social-card-content">
        <span class="badge badge-indigo social-card-badge">${channel.badge}</span>
        ${iconSvgs[channel.icon] || ''}
        <p class="social-card-desc">${channel.description}</p>
      </div>

      <a href="${channel.url}" target="_blank" rel="noopener" class="btn btn-outline social-card-link">
        Ver Canal de ${channel.name} →
      </a>
    </div>
  `).join('');

  return `
    <section class="section social-section" id="comunidad">
      <div class="container">
        <div class="section-title-wrap">
          <span class="section-subtitle">Comunidad & Redes Sociales</span>
          <h2 class="section-title">Acompañamiento Emocional Continuo</h2>
          <p class="section-description">
            Sigue nuestros canales para acceder a reflexiones diarias, videos de psicoeducación y recursos gratuitos para tu crecimiento personal.
          </p>
        </div>

        <div class="social-cards-grid">
          ${cardsHtml}
        </div>
      </div>
    </section>
  `;
}

