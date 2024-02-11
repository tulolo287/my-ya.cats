export const formatScoreNumber = (score: string) =>
  score.length > 7 ? `${score.slice(0, 7)}+` : score
