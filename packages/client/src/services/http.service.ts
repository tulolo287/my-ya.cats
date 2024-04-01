import axios, { AxiosError } from 'axios'

import { ServerError } from '@core/types'
import { defaultError } from '@core/constants'

const enum HTTPMethodEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export class HTTPService {
  endpoint: string

  constructor(endpoint: string, uri?: string) {
    this.endpoint = `${uri ?? process.env.API_URL}${endpoint}`
  }

  private request = <Response>(
    method: HTTPMethodEnum,
    url = '/',
    options = {}
  ) => {
    const http = axios.create({
      baseURL: this.endpoint,
      withCredentials: true,
    })

    http.interceptors.response.use(
      response => response,
      e => {
        if (axios.isAxiosError(e)) {
          const error = e as AxiosError<ServerError>
          throw error.response?.data?.reason || error.message
        } else {
          throw defaultError
        }
      }
    )

    return http.request<Response>({
      method,
      url,
      ...options,
    })
  }

  get = <Response>(url = '/', options = {}) => {
    return this.request<Response>(HTTPMethodEnum.GET, url, options)
  }

  post = <Response>(url = '/', options = {}) => {
    return this.request<Response>(HTTPMethodEnum.POST, url, options)
  }

  put = <Response>(url = '/', options = {}) => {
    return this.request<Response>(HTTPMethodEnum.PUT, url, options)
  }

  delete = <Response>(url = '/', options = {}) => {
    return this.request<Response>(HTTPMethodEnum.DELETE, url, options)
  }
}
