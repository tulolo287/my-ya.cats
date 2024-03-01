import { API } from '../api.service'
import { UserProfileData, UserPasswordData } from '@core/types'

export class UserAPI extends API {
  constructor() {
    super('/user')
  }

  public async changeUserAvatar<Response>(data: FormData) {
    return await this.http.put<Response>('/profile/avatar', {
      data,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  }

  public async changeUserPassword<Response>(data: UserPasswordData) {
    return await this.http.put<Response>('/password', { data })
  }

  public async changeUserData<Response>(data: UserProfileData) {
    return await this.http.put<Response>('/profile', { data })
  }
}