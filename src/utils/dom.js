/* ==========================================================================
   DOM UTILS HELPER MODULE
   ========================================================================== */

export const $ = (selector, context = document) => context.querySelector(selector);
export const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

export function createElement(tag, attributes = {}, children = []) {
  const el = document.createElement(tag);
  
  Object.entries(attributes).forEach(([key, val]) => {
    if (key === 'className') {
      el.className = val;
    } else if (key === 'dataset') {
      Object.entries(val).forEach(([dKey, dVal]) => el.dataset[dKey] = dVal);
    } else if (key.startsWith('on') && typeof val === 'function') {
      el.addEventListener(key.substring(2).toLowerCase(), val);
    } else {
      el.setAttribute(key, val);
    }
  });

  children.forEach(child => {
    if (typeof child === 'string' || typeof child === 'number') {
      el.appendChild(document.createTextNode(child));
    } else if (child instanceof HTMLElement) {
      el.appendChild(child);
    }
  });

  return el;
}

export function scrollToSection(sectionId) {
  const target = document.getElementById(sectionId);
  if (target) {
    const headerOffset = 80;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

export function showToast(message, type = 'info') {
  let toastContainer = $('.toast-container');
  if (!toastContainer) {
    toastContainer = createElement('div', { className: 'toast-container' });
    document.body.appendChild(toastContainer);
  }

  const toast = createElement('div', { className: `toast toast-${type}` }, [message]);
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
