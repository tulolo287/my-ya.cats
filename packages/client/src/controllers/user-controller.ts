import { UserAPI } from '../services/user-api'

import { ServerError } from '../types/server-error'
import { UserPasswordData } from '../types/user-password-data'

class UserController {
  private api = new UserAPI()

  async changeAvatar(data: FormData) {
    try {
      await this.api.changeUserAvatar(data)
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
