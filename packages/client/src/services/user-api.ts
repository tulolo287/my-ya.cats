import { API } from './api.service'
import { UserPasswordData } from '@core/types'

export class UserAPI extends API {
  constructor() {
    super('/user')
  }

  public async changeUserAvatar<Response>(data: FormData) {
    return await this.http.put<Response>('/profile/avatar', { data })
  }

  public async changeUserPassword<Response>(data: UserPasswordData) {
    return await this.http.put<Response>('/password', { data })
  }
}
