import { UserAPI } from '@services/user-api'

import { ServerError, UserAvatarData } from '@core/types'
import { UserPasswordData } from '@core/types'

class UserController {
  private api = new UserAPI()

  async changeAvatar(data: FormData) {
    try {
      const res = await this.api.changeUserAvatar<UserAvatarData>(data)
      // todo: убрать из localStorage в стор (YAC-29)
      localStorage.setItem(
        'avatarUrl',
        `${process.env.API_URL}/resources/${res.data.avatar}`
      )
    } catch (error: unknown) {
      console.error((error as ServerError).reason)
    }
  }

  async changePassword(password: UserPasswordData) {
    try {
      await this.api.changeUserPassword(password)
    } catch (error: unknown) {
      console.error((error as ServerError).reason)
    }
  }
}
export default new UserController()
