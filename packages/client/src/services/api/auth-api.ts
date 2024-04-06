import { API } from '../api.service'
import { AuthLoginData, AuthSignupData } from '@core/types'

export class AuthAPI extends API {
  constructor() {
    super('/yandex-api/auth')
  }

  public login = <Response>(data: AuthLoginData) => {
    return this.http.post<Response>('/signin', { data })
  }

  public logout = <Response>() => {
    return this.http.post<Response>('/logout')
  }

  public signup = <Response>(data: AuthSignupData) => {
    return this.http.post<Response>('/signup', { data })
  }

  public getUser = <Response>() => {
    return this.http.get<Response>('/user')
  }
}
