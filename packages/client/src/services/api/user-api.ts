import { API } from '../api.service'
import { UserProfileData, UserPasswordData } from '@core/types'

export class UserAPI extends API {
  constructor() {
    super('/user')
  }

  public changeUserAvatar<Response>(data: FormData) {
    return this.http.put<Response>('/profile/avatar', {
      data,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  }

  public changeUserPassword<Response>(data: UserPasswordData) {
    return this.http.put<Response>('/password', { data })
  }

  public changeUserData<Response>(data: UserProfileData) {
    return this.http.put<Response>('/profile', { data })
  }
}
