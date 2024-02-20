import { UserAPI } from '@services/user-api'

import { UserAvatarData } from '@core/types'
import { UserPasswordData } from '@core/types'

class UserController {
  private api = new UserAPI()

  async changeAvatar(data: FormData) {
    const res = await this.api.changeUserAvatar<UserAvatarData>(data)
    // todo: убрать из localStorage в стор (YAC-29)
    localStorage.setItem(
      'avatarUrl',
      `${process.env.API_URL}/resources/${res.data.avatar}`
    )
  }

  async changePassword(password: UserPasswordData) {
    await this.api.changeUserPassword(password)
  }
}

export default new UserController()
