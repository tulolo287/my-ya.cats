import { LeaderboardRecord } from '@core/types'
import { LeaderboardAPI } from '@services/leaderboard-api'

const mockData: LeaderboardRecord[] = [
  { login: '233erw', score: 343_424_390 },
  { login: 'e42erwo', score: 3_434_243 },
  { login: 'erwerer3wo', score: 33 },
  { login: 'erwcsderwo', score: 3_434_243 },
  { login: 'rerwe', score: 3243 },
]

class LeaderboardController {
  private api = new LeaderboardAPI()

  async getRecords() {
    // todo: убрать моковые данные (YAC-30)
    return mockData
  }
}

export default new LeaderboardController()
