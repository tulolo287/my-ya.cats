import axios from 'axios'

const enum HTTPMethodEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export class HTTPService {
  protected endpoint: string

  constructor(endpoint: string) {
    this.endpoint = `${process.env.API_URL}${endpoint}`
  }

  get = (url = '/', options = {}) => {
    return axios(`${this.#path(url)}`, {
      ...options,
      method: HTTPMethodEnum.GET,
    })
  }

  put = (url: string, options = {}) => {
    return axios(this.#path(url), { ...options, method: HTTPMethodEnum.PUT })
  }

  post = (url: string, options = {}) => {
    return axios(this.#path(url), { ...options, method: HTTPMethodEnum.POST })
  }

  delete = (url: string, options = {}) => {
    return axios(this.#path(url), { ...options, method: HTTPMethodEnum.DELETE })
  }

  #path(path: string) {
    return `${this.endpoint}${path}`
  }
}
