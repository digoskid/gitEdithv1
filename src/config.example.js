/* ==========================================================================
   CONFIG.EXAMPLE.JS  —  Plantilla de configuración
   =========================================================================
   INSTRUCCIONES:
   1. Copia este archivo y renómbralo a: src/config.js
   2. Llena los valores reales en src/config.js
   3. NUNCA subas src/config.js al repositorio (está en .gitignore)
   ========================================================================== */

// ─── PayPhone ────────────────────────────────────────────────────────────────
// Obtén estos valores en: https://app.payphonetodoesposible.com
export const PAYPHONE_TOKEN    = "TU_TOKEN_PAYPHONE_AQUI";
export const PAYPHONE_STORE_ID = "TU_STORE_ID_PAYPHONE_AQUI";

// ─── Google Apps Script ──────────────────────────────────────────────────────
// URL de tu Apps Script para agendamiento en Google Calendar
export const GOOGLE_SCRIPT_AGENDAR_URL =
  "https://script.google.com/macros/s/REEMPLAZA_CON_TU_URL/exec";

// URL de tu Apps Script para confirmar pagos PayPhone
export const GOOGLE_SCRIPT_PAYPHONE_CONFIRM_URL =
  "https://script.google.com/macros/s/REEMPLAZA_CON_TU_URL/exec";

// ─── PayPal ──────────────────────────────────────────────────────────────────
// Client ID de PayPal (va en el script tag del HTML, no aquí)
// Obtén el tuyo en: https://developer.paypal.com/dashboard/applications
// PAYPAL_CLIENT_ID = "TU_CLIENT_ID_PAYPAL_AQUI";
