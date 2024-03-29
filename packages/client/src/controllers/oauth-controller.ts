import {
  OAuthLoginRequest,
  OAuthServiceIdRequest,
  OAuthServiceIdResponse,
} from '@core/types'
import { OAuthAPI } from '@services/api/oauth-api'

class OAuthController {
  private api = new OAuthAPI()

  oAuthLogin(data: OAuthLoginRequest) {
    return this.api.oAuthLogin(data)
  }

  oAuthServiceId(data: OAuthServiceIdRequest) {
    return this.api.oAuthServiceId<OAuthServiceIdResponse>(data)
  }
}

export default new OAuthController()
