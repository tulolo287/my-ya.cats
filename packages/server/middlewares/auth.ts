import type { Request, Response, NextFunction } from 'express'
import { AuthService } from '../services/auth-service'

/**
 * Проверяем авторизацию пользователя
 * Если авторизован, устанавливаем в req.currentUser
 */
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authService = new AuthService(req.headers.cookie)
    const currentUser = await authService.getCurrentUser()
    if (!currentUser) {
      res.status(403).send('You do not have permission to access')
      return
    }
    ;(req as any).currentUser = currentUser
    next()
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal Server Error')
  }
}
