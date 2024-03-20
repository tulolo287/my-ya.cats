import { LeaderboardRequestAll, LeaderboardRequestGet } from '@core/types'
import { API } from '../api.service'

export class LeaderboardAPI extends API {
  constructor() {
    super('/leaderboard')
  }

  public addRecord<Response>(data: LeaderboardRequestGet) {
    return this.http.post<Response>('', { data })
  }

  public getRecords<Response>(data: LeaderboardRequestAll) {
    return this.http.post<Response>('/all', { data })
  }
}
