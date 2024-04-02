import userController from '../controllers/user-controller'
import express from 'express'

export const userRoutes = express.Router()

userRoutes.get('/test', userController.test)
