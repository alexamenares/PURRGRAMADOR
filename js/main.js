import { loadAllData } from './data.js';
import { initRouter } from './router.js';
import { initTheme } from './features/theme.js';
import { initQuiz } from './features/quiz.js';
import { initSearch, renderStoryCards } from './features/search.js';
import { initOpportunities } from './features/opportunities.js';
import { initCharacters } from './features/characters.js';
import { initLab } from './features/lab.js';
import { showNotice } from './ui.js';

async function boot() {
  try {
    await loadAllData();
  } catch (err) {
    console.error(err);
    showNotice('No se pudieron cargar los datos. Abre la consola (F12).');
    return;
  }

  renderStoryCards();
  initRouter();
  initTheme();
  initSearch();
  initQuiz();
  initOpportunities();
  initCharacters();
  initLab();

  document.querySelector('#loginButton')?.addEventListener('click', () => {
    showNotice('El inicio de sesión es demostrativo; aún no hay backend.');
  });
}

document.addEventListener('DOMContentLoaded', boot);