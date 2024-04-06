import type { NextFunction, Request, Response } from 'express'

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const cookie = req.headers.cookie
  if (!cookie) {
    const error = new Error('You are not authenticated!')
    res.setHeader('WWW-Authenticate', 'Basic')
    res.status(403).send(error).redirect('/login')
    return
  }

  next()
}
