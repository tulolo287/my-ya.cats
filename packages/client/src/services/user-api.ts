import { API } from './api.service'
import { UserPasswordData } from '@core/types'

export class UserAPI extends API {
  constructor() {
    super('/user')
  }

  public async changeUserAvatar(data: FormData) {
    return await this.http.put('/profile/avatar', { data })
  }

  public async changeUserPassword(data: UserPasswordData) {
    return await this.http.put('/password', { data })
  }
}
