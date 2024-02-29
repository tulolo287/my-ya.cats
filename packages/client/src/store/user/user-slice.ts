import { Action, PayloadAction, createSlice } from '@reduxjs/toolkit'
import { LoadStatus, UserData } from '@core/types'
import {
  getUser,
  login,
  logout,
  signup,
  changeAvatar,
  changeProfileData,
  changePassword,
} from './user-thunks'

type UserState = {
  currentUser: UserData | null
  status: LoadStatus
  error: string | null
}

const initialState: UserState = {
  currentUser: null,
  status: LoadStatus.INITIAL,
  error: null,
}

const isLoading = (action: Action) => action.type.endsWith('pending')

const isError = (action: Action) => action.type.endsWith('rejected')

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = LoadStatus.SUCCESS
        state.currentUser = action.payload
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = LoadStatus.SUCCESS
        state.currentUser = action.payload
        state.error = null
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = LoadStatus.SUCCESS
        state.currentUser = action.payload
        state.error = null
      })
      .addCase(changeProfileData.fulfilled, (state, action) => {
        state.status = LoadStatus.SUCCESS
        state.currentUser = action.payload
        state.error = null
      })
      .addCase(changeAvatar.fulfilled, (state, action) => {
        state.status = LoadStatus.SUCCESS
        state.currentUser = action.payload
        state.error = null
      })
      .addCase(changePassword.fulfilled, state => {
        state.status = LoadStatus.SUCCESS
        state.error = null
      })
      .addCase(logout.fulfilled, state => {
        state.status = LoadStatus.SUCCESS
        state.currentUser = null
        state.error = null
      })
      .addMatcher(isLoading, state => {
        state.status = LoadStatus.LOADING
        state.error = null
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.status = LoadStatus.ERROR
        state.error = action.payload
      })
  },
})

export const userReducer = userSlice.reducer
