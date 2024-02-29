import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthController from '@controllers/auth-controller'
import UserController from '@controllers/user-controller'
import {
  AuthLoginData,
  AuthSignupData,
  UserData,
  UserPasswordData,
  UserProfileData,
} from '@core/types'

export const getUser = createAsyncThunk<UserData, undefined>(
  'user/getUser',
  async () => {
    const response = await AuthController.getUser()
    return response.data
  }
)

export const login = createAsyncThunk<UserData, AuthLoginData>(
  'user/login',
  async (data, { rejectWithValue }) => {
    try {
      await AuthController.login(data)
      const response = await AuthController.getUser()
      return response.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const signup = createAsyncThunk<UserData, AuthSignupData>(
  'user/signup',
  async (data, { rejectWithValue }) => {
    try {
      await AuthController.signup(data)
      const response = await AuthController.getUser()
      return response.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const logout = createAsyncThunk<boolean, undefined>(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await AuthController.logout()
      return true
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const changeProfileData = createAsyncThunk<UserData, UserProfileData>(
  'user/changeProfileData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await UserController.changeProfileData(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const changeAvatar = createAsyncThunk<UserData, FormData>(
  'user/changeAvatar',
  async (data, { rejectWithValue }) => {
    try {
      const response = await UserController.changeAvatar(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const changePassword = createAsyncThunk<boolean, UserPasswordData>(
  'user/changePassword',
  async (data, { rejectWithValue }) => {
    try {
      await UserController.changePassword(data)
      return true
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
