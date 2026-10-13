import { DATA } from '../data.js';
import { loadState, saveState } from '../storage.js';
import { $, $$, showNotice } from '../ui.js';
import { checkAnswer, applyCompletion, computeProgress } from '../quiz-logic.js';

const STORY_ID = 'senal-perdida';
const BADGE = 'mision-senal';
const TOTAL_STEPS = 3;

export function initQuiz() {
  const feedback = $('#answerFeedback');
  const continueBtn = $('#continueButton');
  if (!feedback) return;

  const story = DATA.stories.find(s => s.id === STORY_ID);
  if (!story) return;

  $$('.choice').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.querySelector('code')?.textContent ?? '';
      const { correct, explanation } = checkAnswer(story, code);

      $$('.choice').forEach(b => b.removeAttribute('data-state'));
      btn.dataset.state = correct ? 'correct' : 'wrong';

      if (correct) {
        feedback.textContent = `¡Correcto! ${explanation}`;
        if (continueBtn) continueBtn.disabled = false;

        const state = loadState();
        applyCompletion(state, STORY_ID, BADGE);
        saveState(state);
        updateProgressUI();
      } else {
        feedback.textContent = 'Pista: busca la función que muestra texto en la terminal.';
        if (continueBtn) continueBtn.disabled = true;
      }
    });
  });

  continueBtn?.addEventListener('click', () => {
    showNotice('Avanzarías al siguiente capítulo (demo).');
  });

  updateProgressUI();
}

export function updateProgressUI() {
  const state = loadState();
  const { done, total, pct } = computeProgress(state, TOTAL_STEPS);

  const fill = $('#progressFill');
  const label = $('#progressLabel');
  const bar = $('[role="progressbar"]');
  if (fill) fill.style.width = pct + '%';
  if (label) label.textContent = `${done} de ${total} etapas de ejemplo`;
  if (bar) bar.setAttribute('aria-valuenow', String(done));

  const chapterOne = $('#chapterOne');
  const chapterOneStatus = $('#chapterOneStatus');
  if (chapterOne && state.completedStories.includes(STORY_ID)) {
    chapterOne.classList.add('done');
    if (chapterOneStatus) chapterOneStatus.textContent = 'Completada';
  }

  const profileProgress = $('#profileProgress');
  const profileBadge = $('#profileBadge');
  if (profileProgress) profileProgress.textContent = `${done} de ${total} etapas`;
  if (profileBadge) profileBadge.textContent = state.badges.length ? 'Misión de ejemplo' : 'Por desbloquear';
}