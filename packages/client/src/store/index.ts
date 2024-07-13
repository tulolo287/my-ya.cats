import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { ssrReducer } from './ssr/ssr-slice'
import { topicsReducer } from './topics/topics-slice'
import { userReducer } from './user/user-slice'

declare global {
  interface Window {
    APP_INITIAL_STATE?: RootState
  }
}

export const reducer = combineReducers({
  user: userReducer,
  ssr: ssrReducer,
  topics: topicsReducer,
})

const store = configureStore({
  reducer,
  preloadedState:
    typeof window === 'undefined' ? undefined : window.APP_INITIAL_STATE,
})

if (typeof window != 'undefined') {
  delete window.APP_INITIAL_STATE
}

export type RootState = ReturnType<typeof reducer>
export type AppDispatch = typeof store.dispatch

export default store
