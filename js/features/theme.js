import { loadState, saveState } from '../storage.js';
import { $ } from '../ui.js';

export function initTheme() {
  const btn = $('#themeToggle');
  const state = loadState();

  function apply(theme) {
    if (theme === 'auto') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }

  apply(state.theme || 'auto');

  if (btn) btn.addEventListener('click', () => {
    const current = loadState().theme || 'auto';
    const next = current === 'auto' ? 'dark' : current === 'dark' ? 'light' : 'auto';
    const st = loadState();
    st.theme = next;
    saveState(st);
    apply(next);
  });
}