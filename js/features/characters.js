import { DATA } from '../data.js';
import { $, openModal } from '../ui.js';

export function initCharacters() {
  const grid = $('.character-grid');
  if (!grid) return;

  grid.innerHTML = DATA.characters.map(c => `
    <button class="character" type="button" data-char="${c.id}">
      <h3>${c.name}</h3>
      <p>${c.specialty}</p>
    </button>
  `).join('');

  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-char]');
    if (!btn) return;
    const c = DATA.characters.find(x => x.id === btn.dataset.char);
    if (!c) return;
    openModal(`
      <span class="tag purple">Personaje</span>
      <h2 style="margin:10px 0 6px">${c.name}</h2>
      <p class="muted">${c.specialty}</p>
      <p style="margin-top:14px">Biografía, historia y relaciones: pendientes en la biblia del universo.</p>
    `);
  });
}