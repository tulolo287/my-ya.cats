import { formatScoreNumber } from './format-score-number'

describe('formatScoreNumber', () => {
  it('returns score correctly if it has less than 7 characters', () => {
    expect(formatScoreNumber(12_345)).toEqual('12345')
  })

  it('returns score correctly if it has less equal to 7 characters', () => {
    expect(formatScoreNumber(1_234_567)).toEqual('1234567')
  })

  it('truncates score and append "+" if it has more than 7 characters', () => {
    expect(formatScoreNumber(12_345_678)).toEqual('1234567+')
    expect(formatScoreNumber(987_654_321)).toEqual('9876543+')
  })

  it('handles zero correctly', () => {
    expect(formatScoreNumber(0)).toEqual('0')
  })
})
