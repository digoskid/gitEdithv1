/* ==========================================================================
   PUNTO DE ENTRADA PRINCIPAL DE LA APLICACIÓN - EDITH DELGADO
   ========================================================================== */

import { renderHeader, initHeaderEvents } from './components/Header.js';
import { renderHeroSection, initHeroEvents } from './components/HeroSection.js';
import { renderBioSection } from './components/BioSection.js';
import { renderServicesSection, initServicesEvents } from './components/ServicesSection.js';
import { renderTaglineSection } from './components/TaglineSection.js';
import { renderSocialSection } from './components/SocialSection.js';
import { renderFooter } from './components/Footer.js';
import { renderCookieBanner, initCookieBannerEvents } from './components/CookieBanner.js';
import { initCleanNavigation } from './utils/cleanNavigation.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');

  if (!app) return;

  // Montar el layout de componentes
  app.innerHTML = `
    ${renderHeader()}
    <main>
      ${renderHeroSection()}
      ${renderBioSection()}
      ${renderServicesSection()}
      ${renderTaglineSection()}
      ${renderSocialSection()}
    </main>
    ${renderFooter()}
    ${renderCookieBanner()}
  `;

  // Inicializar eventos, estado y navegación limpia
  initCleanNavigation();
  initHeaderEvents();
  initHeroEvents();
  initServicesEvents();
  initCookieBannerEvents();
});
