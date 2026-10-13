import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const load = (name) => JSON.parse(readFileSync(resolve(here, `../data/${name}`), 'utf-8'));

describe('data', () => {
  it('characters.json contiene los 21 personajes con campos mínimos', () => {
    const chars = load('characters.json');
    expect(chars).toHaveLength(21);
    chars.forEach(c => {
      expect(c).toHaveProperty('id');
      expect(c).toHaveProperty('name');
      expect(c).toHaveProperty('specialty');
    });
  });

  it('stories.json tiene al menos una historia con una opción correcta', () => {
    const stories = load('stories.json');
    expect(stories.length).toBeGreaterThan(0);
    stories.forEach(s => {
      expect(Array.isArray(s.options)).toBe(true);
      expect(s.options.some(o => o.correct)).toBe(true);
    });
  });

  it('opportunities.json usa categorías válidas', () => {
    const ops = load('opportunities.json');
    const valid = [
      'Empleo', 'Práctica', 'Freelance', 'Beca', 'Voluntariado',
      'Investigación', 'Pasantía', 'Evento', 'Proyecto'
    ];
    ops.forEach(o => expect(valid).toContain(o.category));
  });
});