import type { Request } from 'express'
import axios from 'axios'

export type User = {
  first_name: string
  second_name: string
  login: string
  email: string
  phone: string
  id: number
  avatar: string | null
  display_name: string | null
}

export type RequestWithUser = Request & { currentUser: User }

const API_URL = process.env.API_URL

export class AuthService {
  constructor(private _cookieHeader: string | undefined) {}

  async getCurrentUser(): Promise<User | undefined> {
    let user: User | undefined
    try {
      const { data } = await axios.get(`${API_URL}/auth/user`, {
        headers: {
          cookie: this._cookieHeader,
        },
      })
      user = data
    } catch (error) {
      console.log(error)
      user = undefined
    }
    return user
  }
}
