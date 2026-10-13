export function checkAnswer(story, code) {
  const option = story.options.find(o => o.code === code);
  return {
    correct: Boolean(option?.correct),
    explanation: story.explanation
  };
}

export function applyCompletion(state, storyId, badge) {
  if (!state.completedStories.includes(storyId)) {
    state.completedStories.push(storyId);
  }
  if (badge && !state.badges.includes(badge)) {
    state.badges.push(badge);
  }
  return state;
}

export function computeProgress(state, total) {
  const done = Math.min(state.completedStories.length, total);
  return {
    done,
    total,
    pct: total > 0 ? (done / total) * 100 : 0
  };
}