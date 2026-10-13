import { DATA } from '../data.js';
import { $, $$ } from '../ui.js';

export function initOpportunities() {
  const list = $('.op-list');
  if (!list) return;

  list.innerHTML = DATA.opportunities.map(op => `
    <article class="op-card" data-op-category="${op.category}">
      <span class="tag">Ejemplo · ${op.category}</span>
      <h3>${op.title}</h3>
      <p>${op.desc}</p>
      <button class="text-button" type="button">Ver fuente original ↗</button>
    </article>
  `).join('');

  const filters = $$('[data-op-filter]');
  filters.forEach(btn => btn.addEventListener('click', () => {
    filters.forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    const sel = btn.dataset.opFilter;
    let shown = 0;
    $$('.op-card').forEach(card => {
      const visible = sel === 'Todas' || card.dataset.opCategory === sel;
      card.hidden = !visible;
      if (visible) shown++;
    });
    const notice = $('#opNotice');
    if (notice) notice.textContent = shown
      ? 'Mostrando fichas vacías de demostración.'
      : 'No hay fichas para esta categoría.';
  }));
}