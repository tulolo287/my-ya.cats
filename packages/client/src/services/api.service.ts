import { HTTPService } from './http.service'

export abstract class API {
  protected http: HTTPService

  protected constructor(endpoint: string) {
    this.http = new HTTPService(endpoint)
  }
}
