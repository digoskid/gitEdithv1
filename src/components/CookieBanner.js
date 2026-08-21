/* ==========================================================================
   COOKIE CONSENT BANNER COMPONENT - EDITH DELGADO
   ========================================================================== */

const STORAGE_KEY = 'edith_cookie_consent_v1';

export function renderCookieBanner() {
  return `
    <aside class="cookie-banner-wrapper" id="cookie-banner" role="region" aria-label="Aviso de Cookies y Privacidad">
      <div class="cookie-banner-container">
        <div class="cookie-banner-content">
          <div class="cookie-banner-header">
            <svg class="cookie-banner-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
              <path d="M8.5 8.5v.01"></path>
              <path d="M7.5 15.5v.01"></path>
              <path d="M12 12v.01"></path>
              <path d="M16 16v.01"></path>
            </svg>
            <span class="cookie-banner-title">Privacidad y Cookies</span>
          </div>
          <p class="cookie-banner-text">
            Utilizamos cookies técnicas necesarias para el funcionamiento del sitio web y para garantizar una navegación segura. Conoce más en nuestra 
            <a href="./legal/cookies.html">Política de Cookies</a> y nuestra <a href="./legal/privacidad.html">Política de Privacidad</a>.
          </p>
        </div>
        <div class="cookie-banner-actions">
          <button type="button" class="cookie-btn-reject" id="btn-cookie-essential">
            Solo Necesarias
          </button>
          <button type="button" class="cookie-btn-accept" id="btn-cookie-accept">
            Aceptar Todas
          </button>
        </div>
      </div>
    </aside>
  `;
}

export function initCookieBannerEvents() {
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;

  const storedConsent = localStorage.getItem(STORAGE_KEY);

  // Si no ha respondido previamente, mostrar el banner tras un breve retardo visual
  if (!storedConsent) {
    setTimeout(() => {
      banner.classList.add('show');
    }, 600);
  }

  const handleConsent = (level) => {
    const consentData = {
      level: level, // 'all' | 'essential'
      essential: true,
      analytics: level === 'all',
      timestamp: new Date().toISOString()
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consentData));
    } catch (e) {
      console.warn('No se pudo guardar la preferencia de cookies en LocalStorage:', e);
    }
    banner.classList.remove('show');
    banner.classList.add('hide');
  };

  document.getElementById('btn-cookie-accept')?.addEventListener('click', () => {
    handleConsent('all');
  });

  document.getElementById('btn-cookie-essential')?.addEventListener('click', () => {
    handleConsent('essential');
  });
}
