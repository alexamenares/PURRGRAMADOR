import { describe, it, expect, beforeEach } from 'vitest';
import { loadState, saveState, defaultState } from '../js/storage.js';

describe('storage', () => {
  beforeEach(() => localStorage.clear());

  it('retorna estado por defecto si no hay nada guardado', () => {
    expect(loadState()).toEqual(defaultState());
  });

  it('guarda y recupera estado', () => {
    const state = defaultState();
    state.completedStories.push('senal-perdida');
    saveState(state);
    expect(loadState().completedStories).toContain('senal-perdida');
  });

  it('tolera JSON corrupto y devuelve estado por defecto', () => {
    localStorage.setItem('purrgramador:v1', '{invalid json');
    expect(loadState()).toEqual(defaultState());
  });
});