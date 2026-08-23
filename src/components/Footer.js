/* ==========================================================================
   FOOTER COMPONENT
   ========================================================================== */

export function renderFooter() {
  const waLink = "https://api.whatsapp.com/send?phone=+593982728303&text=Hola%20Edith!%20Necesito%20tu%20ayuda%20en%20%3A";

  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand-info">
            <div class="footer-brand-header">
              <a href="#hero" class="footer-logo">
                <img src="./Logo.png" alt="Edith Delgado Logo" class="footer-logo-img" width="48" height="48" />
              </a>
              <div class="footer-brand-text">
                <span class="footer-brand-name">Edith Delgado</span>
                <span class="footer-brand-sub">Psicología Clínica</span>
              </div>
            </div>
            <p class="footer-brand-desc">
              Psicóloga clínica y psicoterapeuta con +18 años de experiencia. Especialista en EMDR (Trauma), conducta suicida, terapia de parejas y soluciones contextuales breves.
            </p>
            <div class="footer-tagline-quote">
              "De tus fragmentos, nace tu versión más fuerte"
            </div>
          </div>

          <div>
            <div class="footer-column-title">Navegación</div>
            <ul class="footer-links-list">
              <li><a href="#hero">Inicio</a></li>
              <li><a href="#conocenos">Conócenos</a></li>
              <li><a href="#servicios">Kits de Soluciones</a></li>
              <li><a href="#frase">Filosofía</a></li>
              <li><a href="#comunidad">Comunidad</a></li>
            </ul>
          </div>

          <div>
            <div class="footer-column-title">Kits</div>
            <ul class="footer-links-list">
              <li><a href="./course/liberatumente/">Libera tu mente</a></li>
              <li><a href="./course/distancia-de-los-pensamientos/">Distancia de los pensamientos</a></li>
              <li><a href="./course/radar-de-rumia/">Tu radar de rumia</a></li>
            </ul>
          </div>

          <div>
            <div class="footer-column-title">Contacto</div>
            <p class="footer-contact-desc">
              Atención presencial y virtual para niños, adolescentes, adultos y parejas.
            </p>
            <p style="font-size: 0.88rem; color: #a2b1c6; margin-bottom: 14px; line-height: 1.5; display: flex; align-items: flex-start; gap: 6px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-primary-lime); flex-shrink: 0; margin-top: 3px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <span><strong style="color: var(--color-primary-cream);">Consultorio:</strong> Quito, Ecuador · <a href="https://maps.app.goo.gl/KgpJTCeMz1kmRZAa8" target="_blank" rel="noopener" style="color: var(--color-primary-lime); text-decoration: underline;">Ver en Google Maps ↗</a></span>
            </p>
            <a href="./agendar-cita/" class="btn btn-accent btn-sm footer-booking-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              Agendar Cita
            </a>

            <div class="footer-social-row">
              <a href="https://www.instagram.com/edithdelgadop" target="_blank" rel="noopener" class="btn btn-outline btn-sm footer-social-icon-btn" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@edithdelgadop" target="_blank" rel="noopener" class="btn btn-outline btn-sm footer-social-icon-btn" aria-label="YouTube">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/PsicoterapeutaEdithDelgado" target="_blank" rel="noopener" class="btn btn-outline btn-sm footer-social-icon-btn" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@edithdelgadop" target="_blank" rel="noopener" class="btn btn-outline btn-sm footer-social-icon-btn" aria-label="TikTok">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9a8.27 8.27 0 004.83 1.54V7.1a4.85 4.85 0 01-1.06-.41z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <div>
            &copy; ${new Date().getFullYear()} Edith Delgado - Psicología Clínica. Todos los derechos reservados.
          </div>
          <div class="footer-legal-links">
            <a href="https://www.edithdelgado.com/terms" target="_blank" rel="noopener">Términos y condiciones</a>
            <a href="https://www.edithdelgado.com/cookies" target="_blank" rel="noopener">Cookies</a>
            <a href="https://www.edithdelgado.com/privacy" target="_blank" rel="noopener">Política de privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}


