/* ==========================================================================
   QUIZ COMPONENT - TEST DE BIENESTAR (10 PREGUNTAS)
   ========================================================================== */

import { quizQuestions, calculateQuizResult } from '../data/quizData.js';
import { $, $$ } from '../utils/dom.js';

let currentStep = 0;
let userAnswers = {};

export function renderQuizSection() {
  return `
    <section class="section quiz-section" id="test-bienestar">
      <div class="container">
        <div class="section-title-wrap">
          <div class="section-subtitle">Evaluación Autoguiada</div>
          <h2 class="section-title">Test de Bienestar Emocional</h2>
          <p class="section-description">
            Responde estas 10 breves preguntas para reflexionar sobre tu estado emocional actual y recibir una orientación personalizada basada en tus necesidades.
          </p>
        </div>

        <div class="quiz-container-card" id="quiz-card-wrapper">
          <!-- El contenido dinámico del quiz se inyecta por JS -->
        </div>
      </div>
    </section>
  `;
}

export function initQuizEvents() {
  currentStep = 0;
  userAnswers = {};
  renderStep();
}

function renderStep() {
  const container = $('#quiz-card-wrapper');
  if (!container) return;

  if (currentStep < quizQuestions.length) {
    const q = quizQuestions[currentStep];
    const progressPercent = Math.round(((currentStep + 1) / quizQuestions.length) * 100);
    const selectedScore = userAnswers[q.id];

    const optionsHtml = q.options.map((opt, idx) => `
      <div class="quiz-option-item ${selectedScore === opt.score ? 'selected' : ''}" data-score="${opt.score}">
        <div class="quiz-option-indicator"></div>
        <span>${opt.text}</span>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="quiz-progress-wrap">
        <div class="quiz-progress-info">
          <span class="quiz-step-text">Pregunta ${currentStep + 1} de ${quizQuestions.length}</span>
          <span class="quiz-percent-text">${progressPercent}% Completado</span>
        </div>
        <div class="quiz-progress-bar">
          <div class="quiz-progress-fill" style="width: ${progressPercent}%;"></div>
        </div>
      </div>

      <div class="quiz-question-box">
        <h3 class="quiz-question-title">${q.id}. ${q.question}</h3>
        <div class="quiz-options-list" id="quiz-options-list">
          ${optionsHtml}
        </div>
      </div>

      <div class="quiz-nav-controls">
        <button class="btn btn-outline" id="quiz-prev-btn" ${currentStep === 0 ? 'disabled style="opacity:0.4; pointer-events:none;"' : ''}>
          ← Anterior
        </button>

        <button class="btn btn-primary" id="quiz-next-btn" ${selectedScore === undefined ? 'disabled style="opacity:0.5; pointer-events:none;"' : ''}>
          ${currentStep === quizQuestions.length - 1 ? 'Ver Mi Diagnóstico' : 'Siguiente →'}
        </button>
      </div>
    `;

    // Attach option listeners
    $$('.quiz-option-item', container).forEach(item => {
      item.addEventListener('click', () => {
        const score = parseInt(item.getAttribute('data-score'), 10);
        userAnswers[q.id] = score;

        $$('.quiz-option-item', container).forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');

        const nextBtn = $('#quiz-next-btn', container);
        if (nextBtn) {
          nextBtn.removeAttribute('disabled');
          nextBtn.style.opacity = '1';
          nextBtn.style.pointerEvents = 'auto';
        }
      });
    });

    // Navigation listeners
    $('#quiz-prev-btn', container)?.addEventListener('click', () => {
      if (currentStep > 0) {
        currentStep--;
        renderStep();
      }
    });

    $('#quiz-next-btn', container)?.addEventListener('click', () => {
      if (userAnswers[q.id] !== undefined) {
        currentStep++;
        renderStep();
      }
    });

  } else {
    // Render Results
    const result = calculateQuizResult(userAnswers);

    let severityClass = "badge-indigo";
    if (result.severity === "Moderado") severityClass = "badge-amber";
    if (result.severity === "Alto") severityClass = "badge-navy";

    container.innerHTML = `
      <div class="quiz-result-card animate-fade-in-up">
        <span class="badge ${severityClass} result-badge">
          Nivel de Requerimiento: ${result.severity}
        </span>

        <h3 class="section-title">${result.title}</h3>
        <div class="result-score-gauge">${result.score} / ${result.maxScore}</div>
        <div class="result-score-label">Puntaje Total de Evaluación (${result.percentage}%)</div>

        <div class="result-recommendation-box">
          <div class="result-recommendation-title">Recomendación Psicoterapéutica:</div>
          <p style="color: var(--color-text-secondary); line-height: 1.7; margin-bottom: 1rem;">
            ${result.description}
          </p>
          <div style="font-weight: 700; color: var(--color-primary-indigo);">
            • Recurso Recomendado: ${result.recommendedKit}
          </div>
        </div>

        <div class="flex-center gap-md" style="flex-wrap: wrap;">
          <button class="btn btn-primary" id="quiz-result-booking">
            ${result.recommendedAction}
          </button>
          <button class="btn btn-outline" id="quiz-restart-btn">
            Repetir Test de Bienestar
          </button>
        </div>
      </div>
    `;

    $('#quiz-result-booking', container)?.addEventListener('click', () => {
      window.location.href = './agendar-cita/index.html';
    });

    $('#quiz-restart-btn', container)?.addEventListener('click', () => {
      currentStep = 0;
      userAnswers = {};
      renderStep();
    });
  }
}
