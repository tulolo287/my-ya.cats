import MockAdapter from 'axios-mock-adapter'
import { mockLeaderboardApi } from './leaderboard/leaderboard-api'

export const initMock = (mock: MockAdapter) => {
  mockLeaderboardApi(mock)
}
