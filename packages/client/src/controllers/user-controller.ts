import { UserAPI } from '@services/api/user-api'
import { UserData, UserProfileData, UserPasswordData } from '@core/types'

class UserController {
  private api = new UserAPI()

  async changeAvatar(data: FormData) {
    return await this.api.changeUserAvatar<UserData>(data)
  }

  async changePassword(password: UserPasswordData) {
    return await this.api.changeUserPassword<UserPasswordData>(password)
  }

  async changeProfileData(data: UserProfileData) {
    return await this.api.changeUserData<UserData>(data)
  }
}

export default new UserController()
