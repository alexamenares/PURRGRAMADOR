export function searchAll(data, query) {
  const q = String(query ?? '').trim().toLowerCase();
  if (!q) return [];
  const results = [];

  (data.stories ?? []).forEach(s => {
    const title = s.title?.toLowerCase() ?? '';
    const keywords = (s.keywords ?? []).map(k => k.toLowerCase());
    if (title.includes(q) || keywords.some(k => k.includes(q))) {
      results.push({ type: 'story', id: s.id, label: s.title });
    }
  });

  (data.characters ?? []).forEach(c => {
    const name = c.name?.toLowerCase() ?? '';
    const specialty = c.specialty?.toLowerCase() ?? '';
    if (name.includes(q) || specialty.includes(q)) {
      results.push({ type: 'character', id: c.id, label: c.name });
    }
  });

  (data.opportunities ?? []).forEach(o => {
    const title = o.title?.toLowerCase() ?? '';
    const desc = o.desc?.toLowerCase() ?? '';
    if (title.includes(q) || desc.includes(q)) {
      results.push({ type: 'opportunity', id: o.id, label: o.title });
    }
  });

  return results;
}