import { UserAPI } from '@services/api/user-api'
import { UserData, UserProfileData, UserPasswordData } from '@core/types'

class UserController {
  private api = new UserAPI()

  changeAvatar(data: FormData) {
    return this.api.changeUserAvatar<UserData>(data)
  }

  changePassword(password: UserPasswordData) {
    return this.api.changeUserPassword<UserPasswordData>(password)
  }

  changeProfileData(data: UserProfileData) {
    return this.api.changeUserData<UserData>(data)
  }
}

export default new UserController()
