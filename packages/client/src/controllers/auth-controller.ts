import { AuthAPI } from '@services/auth-api'
import { AuthLoginData, AuthSignupData } from '@core/types'

class AuthController {
  private api = new AuthAPI()

  async login(data: AuthLoginData) {
    return await this.api.login(data)
  }

  async logout() {
    return await this.api.logout()
  }

  async signup(data: AuthSignupData) {
    return await this.api.signup(data)
  }

  async getUser() {
    return await this.api.getUser()
  }
}

export default new AuthController()
