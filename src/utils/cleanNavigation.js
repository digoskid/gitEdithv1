/* ==========================================================================
   CLEAN HASHLESS & CLEAN-URL NAVIGATION SYSTEM - EDITH DELGADO
   ========================================================================== */

/**
 * Obtiene la ruta limpia eliminando 'index.html' o '#hash' de cualquier ruta
 */
export function getCleanPath(pathname = window.location.pathname) {
  let clean = pathname.replace(/\/index\.html$/, '/');
  if (clean === '/index.html' || clean === 'index.html') clean = '/';
  if (clean.length > 1 && clean.endsWith('/')) {
    clean = clean.slice(0, -1);
  }
  return clean || '/';
}

/**
 * Limpia la URL actual en la barra de direcciones eliminando index.html y hashes
 */
export function cleanAddressBarUrl() {
  if (typeof window === 'undefined' || !window.history || !window.history.replaceState) return;

  const currentPath = window.location.pathname;
  let cleanPath = currentPath.replace(/\/index\.html$/, '');
  if (cleanPath === '/index.html' || cleanPath === '' || cleanPath === 'index.html') cleanPath = '/';

  const cleanUrl = cleanPath + window.location.search;
  
  if (window.location.href.includes('index.html') || window.location.hash) {
    window.history.replaceState(null, '', cleanUrl);
  }
}

/**
 * Desplaza suavemente hacia un elemento por ID compensando la barra de navegación fija
 * y limpia el hash visible de la URL.
 */
export function scrollToElementCleanly(targetId, updateHistory = true) {
  if (!targetId) return false;
  
  // Limpiar posible # inicial
  const cleanId = targetId.replace(/^#/, '');
  const targetElement = document.getElementById(cleanId);

  if (!targetElement) return false;

  const header = document.querySelector('.site-header');
  const headerHeight = header ? header.getBoundingClientRect().height : 74;
  const elementPosition = targetElement.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - (headerHeight + 16);

  window.scrollTo({
    top: offsetPosition > 0 ? offsetPosition : 0,
    behavior: 'smooth'
  });

  // Limpiar la barra de direcciones
  if (updateHistory && window.history && window.history.pushState) {
    let cleanPath = window.location.pathname.replace(/\/index\.html$/, '');
    if (cleanPath === '/index.html' || cleanPath === '' || cleanPath === 'index.html') cleanPath = '/';
    const cleanUrl = cleanPath + window.location.search;
    window.history.pushState(null, '', cleanUrl);
  }

  // Cerrar menú móvil si está abierto
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (mobileToggle && navMenu && navMenu.classList.contains('active')) {
    mobileToggle.classList.remove('active');
    navMenu.classList.remove('active');
  }

  return true;
}

/**
 * Inicializa la delegación global de eventos para interceptar clics en enlaces con anclajes.
 */
export function initCleanNavigation() {
  // Limpieza inmediata de la URL al cargar
  cleanAddressBarUrl();

  // 1. Interceptar clics en enlaces con hash
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href) return;

    // Verificar si el enlace contiene un hash
    const hashIndex = href.indexOf('#');
    if (hashIndex === -1) return;

    const targetHash = href.substring(hashIndex + 1);
    if (!targetHash) return;

    const linkPath = href.substring(0, hashIndex);
    const currentPath = window.location.pathname;

    // Determinar si el enlace apunta a la misma página actual
    const isSamePage = 
      linkPath === '' || 
      linkPath === '#' ||
      linkPath === './' ||
      linkPath === '../' ||
      (linkPath.endsWith('index.html') && currentPath.endsWith('index.html')) ||
      currentPath.endsWith(linkPath) ||
      linkPath.endsWith(currentPath.split('/').filter(Boolean).pop() || '');

    if (isSamePage) {
      const targetElement = document.getElementById(targetHash);
      if (targetElement) {
        e.preventDefault();
        scrollToElementCleanly(targetHash, true);
      }
    }
  });

  // 2. Si la página cargó con un hash inicial, desplazarse suavemente y limpiar URL
  if (window.location.hash) {
    const initialHash = window.location.hash.substring(1);
    setTimeout(() => {
      scrollToElementCleanly(initialHash, false);
      cleanAddressBarUrl();
    }, 150);
  }
}

// Auto-ejecución inmediata y al cargar el DOM
cleanAddressBarUrl();
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCleanNavigation);
  } else {
    initCleanNavigation();
  }
}
