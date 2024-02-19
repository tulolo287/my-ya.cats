import axios, { AxiosError } from 'axios'

import { AuthAPI } from '@services/auth-api'
import { AuthLoginData, AuthSignupData, ServerError } from '@core/types'
import { defaultError } from '@core/constants'

class AuthController {
  private api = new AuthAPI()

  private handleError(e: unknown) {
    if (axios.isAxiosError(e)) {
      const error = e as AxiosError<ServerError>
      throw error.response?.data?.reason
    } else {
      throw defaultError
    }
  }

  async login(data: AuthLoginData) {
    try {
      const res = await this.api.login(data)
      return res
    } catch (error) {
      this.handleError(error)
    }
  }

  async logout() {
    try {
      const res = await this.api.logout()
      return res
    } catch (error) {
      this.handleError(error)
    }
  }

  async signup(data: AuthSignupData) {
    try {
      const res = await this.api.signup(data)
      return res
    } catch (error) {
      this.handleError(error)
    }
  }

  async getUser() {
    try {
      const res = await this.api.getUser()
      return res
    } catch (error) {
      this.handleError(error)
    }
  }
}

export default new AuthController()
