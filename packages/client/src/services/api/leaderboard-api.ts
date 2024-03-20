import { LeaderboardRequestAll } from '@core/types'
import { API } from '../api.service'

export class LeaderboardAPI extends API {
  constructor() {
    super('/leaderboard')
  }

  public async addRecord<Response>(data: any) {
    return await this.http.post<Response>('', { data })
  }

  public async getRecords<Response>(data: LeaderboardRequestAll) {
    return await this.http.post<Response>('/all', { data })
  }
}
