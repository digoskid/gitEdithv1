/* ==========================================================================
   BOOKING COMPONENT MODULE - EDITH DELGADO
   Ubicación: src/components/BookingComponent.js
   ========================================================================== */

import { $, $$ } from '../utils/dom.js';

/* ==========================================================================
   1. CREDENCIALES Y CONFIGURACIÓN GLOBAL
   ========================================================================== */
export let PAYPHONE_TOKEN = "TU_TOKEN_PAYPHONE_AQUI";
export let PAYPHONE_STORE_ID = "TU_STORE_ID_PAYPHONE_AQUI";
export let GOOGLE_SCRIPT_AGENDAR_URL = "TU_GOOGLE_SCRIPT_AGENDAR_URL_AQUI";
export let GOOGLE_SCRIPT_PAYPHONE_CONFIRM_URL = "TU_GOOGLE_SCRIPT_PAYPHONE_CONFIRM_URL_AQUI";

try {
  const config = await import('../config.js');
  if (config.PAYPHONE_TOKEN) PAYPHONE_TOKEN = config.PAYPHONE_TOKEN;
  if (config.PAYPHONE_STORE_ID) PAYPHONE_STORE_ID = config.PAYPHONE_STORE_ID;
  if (config.GOOGLE_SCRIPT_AGENDAR_URL) GOOGLE_SCRIPT_AGENDAR_URL = config.GOOGLE_SCRIPT_AGENDAR_URL;
  if (config.GOOGLE_SCRIPT_PAYPHONE_CONFIRM_URL) GOOGLE_SCRIPT_PAYPHONE_CONFIRM_URL = config.GOOGLE_SCRIPT_PAYPHONE_CONFIRM_URL;
} catch (e) {
}

let paypalRendered = false;
let tipoSeleccionado = "";

/* ==========================================================================
   2. CONTROL DE NAVEGACIÓN ENTRE PASOS
   ========================================================================== */
export function cambiarPaso(n) {
  $$('.paso').forEach(el => el.style.display = 'none');
  const pasoVirtual4 = $('#confirmacion-virtual');
  if (pasoVirtual4) pasoVirtual4.style.display = 'none';

  $$('.step').forEach(stepEl => {
    const stepNum = parseInt(stepEl.getAttribute('data-step'), 10);
    if (stepNum < n) {
      stepEl.classList.add('completed');
      stepEl.classList.remove('active');
    } else if (stepNum === n) {
      stepEl.classList.add('active');
      stepEl.classList.remove('completed');
    } else {
      stepEl.classList.remove('active', 'completed');
    }
  });

  if (n === 1) {
    const p1 = $('.paso-1');
    if (p1) p1.style.display = 'block';
  } else if (n === 2) {
    const p2 = $('.paso-2');
    if (p2) p2.style.display = 'block';
    if (!paypalRendered) {
      renderPayPalButtons();
      paypalRendered = true;
    }
  } else if (n === 3) {
    const p3 = $('#calendar-presencial');
    if (p3) p3.style.display = 'flex';
    generarHoras();
  } else if (n === 4) {
    mostrarConfirmacion();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function marcarPasoCompletado(stepNumber) {
  const step = $(`.step[data-step="${stepNumber}"]`);
  if (step) {
    step.classList.add('completed');
    const circle = step.querySelector('.circle');
    if (circle) circle.innerHTML = '✓';
  }
}

/* ==========================================================================
   3. PASO 1: VALIDACIÓN DE DATOS Y STORAGE
   ========================================================================== */
function initPaso1Events() {
  const btnNext = $('#btn-next');
  if (!btnNext) return;

  btnNext.addEventListener('click', () => {
    const tipo = $('#tipo-cita')?.value;
    const nombre = $('#nombre-presencial')?.value.trim();
    const email = $('#email-presencial')?.value.trim();
    const telefono = $('#telefono-presencial')?.value.trim();
    const terminos = $('#terminos')?.checked;

    if (!tipo) return mostrarNotificacion("Por favor, selecciona la modalidad de la cita.", "#EF4444");
    if (!nombre || !email || !telefono) return mostrarNotificacion("Completa todos los campos obligatorios.", "#EF4444");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return mostrarNotificacion("Ingresa un correo electrónico válido.", "#EF4444");

    if (!terminos) return mostrarNotificacion("Debes aceptar los términos y condiciones.", "#EF4444");

    tipoSeleccionado = tipo;

    try {
      sessionStorage.setItem('cita_tipo', tipo);
      sessionStorage.setItem('cita_nombre', nombre);
      sessionStorage.setItem('cita_email', email);
      sessionStorage.setItem('cita_telefono', telefono);
    } catch (e) {
      console.warn("Storage restricted:", e);
    }

    marcarPasoCompletado(1);
    cambiarPaso(2);
  });
}

/* ==========================================================================
   4. PASO 2: INTEGRACIÓN PAYPAL & PAYPHONE
   ========================================================================== */
export function renderPayPalButtons() {
  if (typeof paypal === 'undefined') return;
  paypal.Buttons({
    createOrder: (data, actions) => actions.order.create({
      purchase_units: [{ description: 'Cita Psicológica con Edith Delgado', amount: { value: '100.00' } }]
    }),
    onApprove: (data, actions) => actions.order.capture().then((details) => {
      mostrarNotificacion("¡Pago exitoso con PayPal!", "#22C55E");
      marcarPasoCompletado(2);
      cambiarPaso(3);
    }),
    onError: (err) => {
      console.error(err);
      mostrarNotificacion("Error al procesar el pago con PayPal.", "#EF4444");
    }
  }).render('#paypal-button-container');
}

export function renderPayPhone() {
  const container = $('#pp-button');
  if (!container) return;
  container.innerHTML = "";

  if (typeof PPaymentButtonBox === 'undefined') {
    container.innerHTML = "<p style='color:#EF4444; font-size:13px;'>Cargando PayPhone...</p>";
    return;
  }

  const nombre = $('#nombre-presencial')?.value.trim() || sessionStorage.getItem('cita_nombre') || "";
  const email = $('#email-presencial')?.value.trim() || sessionStorage.getItem('cita_email') || "";
  let rawTel = ($('#telefono-presencial')?.value.trim() || sessionStorage.getItem('cita_telefono') || "").replace(/\D/g, "").replace(/^0/, "");
  const telefono = rawTel ? (rawTel.startsWith("593") ? rawTel : "593" + rawTel) : "";

  const payphoneOptions = {
    token: PAYPHONE_TOKEN,
    clientTransactionId: "CITA-" + Date.now(),
    amount: 10000,
    amountWithoutTax: 10000,
    amountWithTax: 0,
    tax: 0,
    service: 0,
    tip: 0,
    currency: "USD",
    reference: "Reserva Cita Edith Delgado",
    lang: "es",
    defaultMethod: "card"
  };

  if (PAYPHONE_STORE_ID && PAYPHONE_STORE_ID !== "TU_STORE_ID_PAYPHONE_AQUI") {
    payphoneOptions.storeId = PAYPHONE_STORE_ID;
  }
  if (email) payphoneOptions.email = email;
  if (telefono) payphoneOptions.phoneNumber = telefono;
  if (nombre) payphoneOptions.optionalParameter = nombre;

  try {
    new PPaymentButtonBox(payphoneOptions).render("pp-button");
  } catch (err) {
    console.error("Error PayPhone:", err);
  }
}

/* ==========================================================================
   5. PASO 3: GESTIÓN DE HORARIOS Y ENVÍO A GOOGLE APPS SCRIPT
   ========================================================================== */
export function generarHoras() {
  const select = $('#input-hora');
  if (!select) return;

  select.innerHTML = '<option value="">Selecciona una hora</option>';
  for (let h = 9; h <= 20; h++) {
    const hora24 = String(h).padStart(2, '0') + ":00";
    const periodo = h >= 12 ? "PM" : "AM";
    const hora12 = h % 12 || 12;
    const opt = document.createElement('option');
    opt.value = hora24;
    opt.textContent = `${hora12}:00 ${periodo}`;
    select.appendChild(opt);
  }
}

export function limitarFechas() {
  const input = $('#input-fecha');
  if (!input) return;

  const hoy = new Date();
  const max = new Date();
  max.setDate(hoy.getDate() + 60);

  input.min = hoy.toISOString().split('T')[0];
  input.max = max.toISOString().split('T')[0];

  input.addEventListener('change', function () {
    if (!this.value) return;
    const [y, m, d] = this.value.split('-');
    const dia = new Date(y, m - 1, d).getDay();
    if (dia === 0 || dia === 6) {
      mostrarNotificacion("Atendemos de Lunes a Viernes. Por favor selecciona un día hábil.", "#F59E0B");
      this.value = "";
      return;
    }
    validarHorasDisponibles();
  });
}

export function validarHorasDisponibles() {
  const fechaInput = $('#input-fecha')?.value;
  const select = $('#input-hora');
  if (!fechaInput || !select) return;

  const ahora = new Date();
  const hoyStr = ahora.toISOString().split('T')[0];

  generarHoras();

  if (fechaInput === hoyStr) {
    const horaMinima = ahora.getHours() + 4;
    Array.from(select.options).forEach(opt => {
      if (opt.value && parseInt(opt.value.split(":")[0], 10) < horaMinima) {
        opt.disabled = true;
        opt.textContent += " (No disponible)";
      }
    });
  }
}

export async function enviarDatosAGoogle() {
  const btn = $('#btn-finalizar-presencial');
  const fecha = $('#input-fecha')?.value;
  const hora = $('#input-hora')?.value;

  if (!fecha || !hora) {
    mostrarNotificacion("Por favor selecciona una fecha y hora.", "#EF4444");
    return;
  }

  btn.disabled = true;
  btn.innerHTML = "Verificando disponibilidad y agendando...";

  const nombre = $('#nombre-presencial')?.value.trim() || sessionStorage.getItem('cita_nombre') || "";
  const email = $('#email-presencial')?.value.trim() || sessionStorage.getItem('cita_email') || "";
  const telefono = $('#telefono-presencial')?.value.trim() || sessionStorage.getItem('cita_telefono') || "";
  const tipo = tipoSeleccionado || $('#tipo-cita')?.value || sessionStorage.getItem('cita_tipo') || "presencial";

  const datos = {
    nombre: nombre,
    email: email,
    telefono: telefono,
    fecha: `${fecha}T${hora}`,
    tipo: tipo
  };

  try {
    const params = new URLSearchParams(datos).toString();
    const response = await fetch(`${GOOGLE_SCRIPT_AGENDAR_URL}?${params}`, {
      method: 'GET',
      mode: 'cors'
    });

    const resultado = await response.text();

    if (resultado.includes("Error: OCUPADO")) {
      mostrarNotificacion("Esta hora ya está ocupada. Por favor selecciona otro horario.", "#EF4444");
      btn.disabled = false;
      btn.innerHTML = "Confirmar y Agendar Cita";
    } else if (resultado.includes("Error: FUERA DE HORARIO")) {
      mostrarNotificacion("La hora seleccionada está fuera del horario de atención.", "#EF4444");
      btn.disabled = false;
      btn.innerHTML = "Confirmar y Agendar Cita";
    } else if (resultado.includes("Éxito") || resultado.includes("Exito")) {
      marcarPasoCompletado(3);
      cambiarPaso(4);
    } else {
      throw new Error(resultado);
    }
  } catch (error) {
    console.error("Error al agendar:", error);
    mostrarNotificacion("Error al conectar con el servidor de agendamiento.", "#EF4444");
    btn.disabled = false;
    btn.innerHTML = "Confirmar y Agendar Cita";
  }
}

/* ==========================================================================
   6. PASO 4: CONFIRMACIÓN
   ========================================================================== */
export function mostrarConfirmacion() {
  $$('.paso').forEach(el => el.style.display = 'none');
  marcarPasoCompletado(4);

  const tipo = tipoSeleccionado || sessionStorage.getItem('cita_tipo');

  if (tipo === "virtual") {
    const virt = $('#confirmacion-virtual');
    if (virt) virt.style.display = 'block';
  } else {
    const pres = $('#confirmacion-presencial');
    if (pres) pres.style.display = 'block';
  }
}

async function verificarRetornoPayPhone() {
  const url = new URLSearchParams(window.location.search);
  const id = url.get("id");
  const client = url.get("clientTransactionId");

  if (!id) return;

  mostrarNotificacion("¡Pago recibido de PayPhone! Verificando...", "#3B82F6");

  try {
    const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
  } catch (e) { }

  try {
    const respuesta = await fetch(GOOGLE_SCRIPT_PAYPHONE_CONFIRM_URL, {
      method: "POST",
      mode: "cors",
      redirect: "follow",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify({
        id: id,
        clientTransactionId: client
      })
    });

    const pago = await respuesta.json();

    if (pago.statusCode === 3 || pago.transactionStatus === "Approved") {
      mostrarNotificacion("¡Pago verificado y aprobado por PayPhone!", "#22C55E");
    } else {
      mostrarNotificacion("Pago registrado en PayPhone.", "#22C55E");
    }
  } catch (err) {
    console.warn("Validación directa Apps Script:", err);
    mostrarNotificacion("¡Pago procesado por PayPhone correctamente!", "#22C55E");
  }

  marcarPasoCompletado(1);
  marcarPasoCompletado(2);
  cambiarPaso(3);
}

/* ==========================================================================
   8. UTILIDADES DE NOTIFICACIÓN
   ========================================================================== */
export function mostrarNotificacion(mensaje, color) {
  if (typeof Toastify !== 'undefined') {
    Toastify({
      text: mensaje,
      duration: 4500,
      gravity: "top",
      position: "right",
      style: {
        background: color || "#6A6EB2",
        borderRadius: "8px",
        fontSize: "14px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
      }
    }).showToast();
  } else {
    alert(mensaje);
  }
}

/* ==========================================================================
   9. EVENTOS DEL ACORDEÓN Y COPIADO
   ========================================================================== */
function initAccordionEvents() {
  const items = $$('.accordion-item');
  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isAlreadyActive = item.classList.contains('active');

      items.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherIcon = otherItem.querySelector('.accordion-icon');
        if (otherIcon) otherIcon.textContent = '+';
      });

      if (!isAlreadyActive) {
        item.classList.add('active');
        const icon = item.querySelector('.accordion-icon');
        if (icon) icon.textContent = '-';
      }
    });
  });
}

function initCopyButtons() {
  const copyButtons = $$('.btn-copy');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        const originalText = btn.textContent;
        btn.textContent = '¡Copiado!';
        btn.style.background = '#e1e155';
        btn.style.color = '#243956';

        mostrarNotificacion(`Número ${textToCopy} copiado al portapapeles.`, "#243956");

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.style.color = '';
        }, 2000);
      } catch (err) {
        console.error('Error al copiar:', err);
      }
    });
  });
}

/* ==========================================================================
   10. INICIALIZACIÓN PRINCIPAL
   ========================================================================== */
export function initBooking() {
  const mobileToggle = $('#mobile-toggle');
  const navMenu = $('#nav-menu');
  mobileToggle?.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navMenu?.classList.toggle('active');
  });

  let savedNombre = "", savedEmail = "", savedTel = "", savedTipo = "";
  try {
    savedNombre = sessionStorage.getItem('cita_nombre');
    savedEmail = sessionStorage.getItem('cita_email');
    savedTel = sessionStorage.getItem('cita_telefono');
    savedTipo = sessionStorage.getItem('cita_tipo');
  } catch (e) {
    console.warn("Storage restricted:", e);
  }

  if (savedNombre && $('#nombre-presencial')) $('#nombre-presencial').value = savedNombre;
  if (savedEmail && $('#email-presencial')) $('#email-presencial').value = savedEmail;
  if (savedTel && $('#telefono-presencial')) $('#telefono-presencial').value = savedTel;
  if (savedTipo && $('#tipo-cita')) {
    $('#tipo-cita').value = savedTipo;
    tipoSeleccionado = savedTipo;
  }

  initPaso1Events();
  limitarFechas();
  initAccordionEvents();
  initCopyButtons();
  initPayPhoneModalEvents();

  $('#btn-volver-paso-1')?.addEventListener('click', () => cambiarPaso(1));
  $('#btn-skip-payment')?.addEventListener('click', () => {
    mostrarNotificacion("Modo prueba: Pago simulado con éxito.", "#3B82F6");
    marcarPasoCompletado(2);
    cambiarPaso(3);
  });
  $('#btn-finalizar-presencial')?.addEventListener('click', enviarDatosAGoogle);
  verificarRetornoPayPhone();
}

function initPayPhoneModalEvents() {
  const btnOpen = $('#btn-open-payphone');
  const btnClose = $('#btn-close-payphone');
  const modal = $('#payphone-modal');

  if (!modal) return;

  btnOpen?.addEventListener('click', () => {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    renderPayPhone();
  });

  btnClose?.addEventListener('click', () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBooking);
} else {
  initBooking();
}
