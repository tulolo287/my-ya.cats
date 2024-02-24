import { API } from '../api.service'
import { AuthLoginData, AuthSignupData } from '@core/types'

export class AuthAPI extends API {
  constructor() {
    super('/auth')
  }

  public login = async <Response>(data: AuthLoginData) => {
    return await this.http.post<Response>('/signin', { data })
  }

  public logout = async <Response>() => {
    return await this.http.post<Response>('/logout')
  }

  public signup = async <Response>(data: AuthSignupData) => {
    return await this.http.post<Response>('/signup', { data })
  }

  public getUser = async <Response>() => {
    return await this.http.get<Response>('/user')
  }
}
