import { AuthAPI } from '@services/api/auth-api'
import { AuthLoginData, AuthSignupData, UserData } from '@core/types'

class AuthController {
  private api = new AuthAPI()

  login(data: AuthLoginData) {
    return this.api.login(data)
  }

  logout() {
    return this.api.logout()
  }

  signup(data: AuthSignupData) {
    return this.api.signup(data)
  }

  getUser() {
    return this.api.getUser<UserData>()
  }
}

export default new AuthController()
