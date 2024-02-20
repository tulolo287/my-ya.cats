export const formatScoreNumber = (score: number) =>
  score.toString().length > 7
    ? `${score.toString().slice(0, 7)}+`
    : score.toString()
