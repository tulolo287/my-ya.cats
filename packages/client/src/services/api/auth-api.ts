import { API } from '../api.service'
import { AuthLoginData, AuthSignupData, Headers } from '@core/types'

export class AuthAPI extends API {
  constructor() {
    super('/auth')
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

  public getUser = <Response>(data?: Headers) => {
    return this.http.get<Response>('/user', data)
  }
}
