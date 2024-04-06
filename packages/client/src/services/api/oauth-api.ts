import { OAuthLoginRequest, OAuthServiceIdRequest } from '@core/types'
import { API } from '@services/api.service'

export class OAuthAPI extends API {
  constructor() {
    super('/yandex-api/oauth/yandex')
  }

  public oAuthLogin = <Response>(data: OAuthLoginRequest) => {
    return this.http.post<Response>('', { data })
  }

  public oAuthServiceId = <Response>(data: OAuthServiceIdRequest) => {
    return this.http.get<Response>('/service-id', { data })
  }
}
