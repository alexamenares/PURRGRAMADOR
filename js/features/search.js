import { DATA } from '../data.js';
import { $, showNotice } from '../ui.js';
import { searchAll } from '../search-logic.js';

export function initSearch() {
  const input = $('#globalSearch');
  const status = $('#searchStatus');
  if (!input) return;

  input.addEventListener('input', () => {
    const q = input.value.trim();
    if (!q) {
      if (status) status.textContent = 'Cada tarjeta representa una propuesta de contenido.';
      return;
    }

    const hits = searchAll(DATA, q);
    if (!hits.length) {
      showNotice(`Sin resultados para “${q}”.`);
      if (status) status.textContent = '0 resultados.';
      return;
    }

    const summary = hits.slice(0, 3).map(h => h.label).join(', ');
    const suffix = hits.length > 3 ? '…' : '';
    if (status) status.textContent = `${hits.length} resultado(s): ${summary}${suffix}`;
    showNotice(`${hits.length} resultado(s) para “${q}”.`);
  });
}

export function renderStoryCards() {
  const grid = $('#storyGrid');
  if (!grid) return;

  grid.innerHTML = DATA.stories.map(s => `
    <button class="story-card" type="button" data-story="experiencia"
            data-searchable="${[s.title, s.summary, ...(s.keywords ?? [])].join(' ').toLowerCase()}">
      <div class="story-symbol">${s.symbol ?? '◇'}</div>
      <span class="tag">${s.tag ?? 'Módulo'}</span>
      <h3>${s.title}</h3>
      <p>${s.summary}</p>
    </button>
  `).join('');
}