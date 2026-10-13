import { $$ } from './ui.js';

export function initRouter() {
  const nav = $$('#mainNav button');
  const screens = $$('.screen');

  function show(name) {
    screens.forEach(s => s.classList.toggle('active', s.dataset.view === name));
    nav.forEach(b => {
      if (b.dataset.screen === name) b.setAttribute('aria-current', 'page');
      else b.removeAttribute('aria-current');
    });
    const main = document.querySelector('main');
    if (main) main.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    window.location.hash = name;
  }

  nav.forEach(b => b.addEventListener('click', () => show(b.dataset.screen)));
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-go]');
    if (btn) show(btn.dataset.go);
    const storyBtn = e.target.closest('[data-story]');
    if (storyBtn) show(storyBtn.dataset.story);
  });

  const hash = window.location.hash.replace('#', '');
  if (hash) show(hash);
}