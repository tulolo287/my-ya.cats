import { LoadStatus, NewTopic, Topic } from '@core/types'
import { Action, PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'
import { getTopics, addNewTopic } from './topics-thunks'

type TopicState = {
  allTopics: Topic[] | null
  status: LoadStatus
  error: string | null
}

const initialState: TopicState = {
  allTopics: null,
  status: LoadStatus.INITIAL,
  error: null,
}

/**
 * Проверка action на 'pending'
 */
const isLoading = (action: Action) => action.type.endsWith('pending')

/**
 * Проверка action на 'rejected'
 */
const isError = (action: Action) => action.type.endsWith('rejected')

/**
 * Обработчик успешного действия с payload
 */
const onFulfilled = (state: TopicState, action: PayloadAction<Topic[]>) => {
  state.status = LoadStatus.SUCCESS
  state.allTopics = action.payload
  state.error = null
}

const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    addTopic(state, action: PayloadAction<Topic>) {
      state.allTopics?.push(action.payload)
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getTopics.fulfilled, onFulfilled)
      .addCase(
        addNewTopic.fulfilled,
        (state: TopicState, action: PayloadAction<NewTopic>) => {
          state.status = LoadStatus.SUCCESS
          state.error = null
          state.allTopics?.push(action.payload)
        }
      )
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

export const selectTopics = (state: RootState) => state.topics.allTopics
export const { addTopic } = topicsSlice.actions

export const topicsReducer = topicsSlice.reducer
