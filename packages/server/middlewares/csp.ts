import type { Request, Response, NextFunction } from 'express'

export const cspMiddleware = (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  res.setHeader(
    'Content-Security-Policy-Report-Only',
    "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'"
  )
  next()
}
