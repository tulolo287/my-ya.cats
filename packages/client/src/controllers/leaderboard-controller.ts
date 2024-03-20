import { LeaderboardRecord } from '@core/types'
import { LeaderboardAPI } from '@services/api/leaderboard-api'

class LeaderboardController {
  private api = new LeaderboardAPI()

  async addRecord(score: number, login: string) {
    return this.api.addRecord({
      data: {
        yacatsScore: score,
        login: login,
      },
      ratingFieldName: 'yacatsScore',
      teamName: 'yacats',
    })
  }

  async getRecords(cursor: number, limit: number) {
    return this.api.getRecords<LeaderboardRecord[]>({
      ratingFieldName: 'yacatsScore',
      cursor,
      limit,
    })
  }
}

export default new LeaderboardController()
