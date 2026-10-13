export const DATA = {
  characters: [],
  stories: [],
  opportunities: []
};

export async function loadAllData() {
  const [characters, stories, opportunities] = await Promise.all([
    fetch('data/characters.json').then(r => r.json()),
    fetch('data/stories.json').then(r => r.json()),
    fetch('data/opportunities.json').then(r => r.json())
  ]);

  DATA.characters = characters;
  DATA.stories = stories;
  DATA.opportunities = opportunities;

  return DATA;
}