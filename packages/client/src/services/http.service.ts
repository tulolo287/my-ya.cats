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

  get = <Response>(url = '/', options = {}) => {
    return axios<Response>(`${this.#path(url)}`, {
      ...options,
      method: HTTPMethodEnum.GET,
    })
  }

  put = <Response>(url: string, options = {}) => {
    return axios<Response>(this.#path(url), {
      ...options,
      method: HTTPMethodEnum.PUT,
    })
  }

  post = <Response>(url: string, options = {}) => {
    return axios<Response>(this.#path(url), {
      ...options,
      method: HTTPMethodEnum.POST,
    })
  }

  delete = <Response>(url: string, options = {}) => {
    return axios<Response>(this.#path(url), {
      ...options,
      method: HTTPMethodEnum.DELETE,
    })
  }

  #path(path: string) {
    return `${this.endpoint}${path}`
  }
}
