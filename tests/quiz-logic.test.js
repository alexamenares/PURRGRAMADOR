import { describe, it, expect } from 'vitest';
import { checkAnswer, applyCompletion, computeProgress } from '../js/quiz-logic.js';

const story = {
  options: [
    { code: 'return x', correct: false },
    { code: 'print(x)', correct: true }
  ],
  explanation: 'print muestra en terminal'
};

describe('quiz-logic', () => {
  it('checkAnswer marca correcta la opción correcta', () => {
    expect(checkAnswer(story, 'print(x)').correct).toBe(true);
  });

  it('checkAnswer marca incorrecta cualquier otra', () => {
    expect(checkAnswer(story, 'return x').correct).toBe(false);
    expect(checkAnswer(story, 'inexistente').correct).toBe(false);
  });

  it('checkAnswer incluye la explicación', () => {
    expect(checkAnswer(story, 'print(x)').explanation).toBe('print muestra en terminal');
  });

  it('applyCompletion añade sin duplicar', () => {
    let state = { completedStories: [], badges: [] };
    state = applyCompletion(state, 'a', 'b1');
    state = applyCompletion(state, 'a', 'b1');
    expect(state.completedStories).toEqual(['a']);
    expect(state.badges).toEqual(['b1']);
  });

  it('computeProgress calcula el porcentaje', () => {
    const state = { completedStories: ['a'], badges: [] };
    const p = computeProgress(state, 3);
    expect(p.done).toBe(1);
    expect(p.pct).toBeCloseTo(33.33, 1);
  });

  it('computeProgress nunca supera el total', () => {
    const state = { completedStories: ['a', 'b', 'c', 'd'], badges: [] };
    const p = computeProgress(state, 3);
    expect(p.done).toBe(3);
    expect(p.pct).toBe(100);
  });
});