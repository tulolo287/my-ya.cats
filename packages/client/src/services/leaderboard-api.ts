import { API } from './api.service'

export class LeaderboardAPI extends API {
  constructor() {
    super('/leaderboard')
  }

  public async getRecords<Response>() {
    return this.http.get<Response>('')
  }
}
