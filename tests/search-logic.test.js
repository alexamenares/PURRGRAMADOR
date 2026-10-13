import { describe, it, expect } from 'vitest';
import { searchAll } from '../js/search-logic.js';

const data = {
  stories: [{ id: 's1', title: 'La señal perdida', keywords: ['python', 'print'] }],
  characters: [{ id: 'c1', name: 'Pyra', specialty: 'Datos · SQL' }],
  opportunities: [{ id: 'o1', title: 'Ficha de prueba', desc: 'empleo junior' }]
};

describe('searchAll', () => {
  it('retorna arreglo vacío con query vacía', () => {
    expect(searchAll(data, '')).toEqual([]);
    expect(searchAll(data, '   ')).toEqual([]);
    expect(searchAll(data, null)).toEqual([]);
  });

  it('encuentra por título de historia', () => {
    const r = searchAll(data, 'señal');
    expect(r).toHaveLength(1);
    expect(r[0].type).toBe('story');
  });

  it('encuentra por keyword', () => {
    const r = searchAll(data, 'python');
    expect(r.some(x => x.id === 's1')).toBe(true);
  });

  it('encuentra por nombre de personaje', () => {
    const r = searchAll(data, 'pyra');
    expect(r[0].type).toBe('character');
  });

  it('encuentra por descripción de oportunidad', () => {
    const r = searchAll(data, 'junior');
    expect(r[0].type).toBe('opportunity');
  });

  it('búsqueda case-insensitive', () => {
    expect(searchAll(data, 'PYRA')).toHaveLength(1);
    expect(searchAll(data, 'PyRa')).toHaveLength(1);
  });
});