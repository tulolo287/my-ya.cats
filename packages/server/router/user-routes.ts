import userController from '../controllers/user-controller'
import express from 'express'

export const userRoutes = express.Router()

userRoutes.get('/login', userController.login)
userRoutes.get('/register', userController.register)
userRoutes.get('/', userController.getUser)
