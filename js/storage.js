const KEY = 'purrgramador:v1';

export function loadState() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || defaultState();
  } catch {
    return defaultState();
  }
}

export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function defaultState() {
  return {
    completedStories: [],
    badges: [],
    theme: 'auto'
  };
}