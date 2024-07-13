import TopicController from '@controllers/topic-controller'
import { NewTopic, Topic } from '@core/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { PageInitContext } from '@routes'

export const getTopics = createAsyncThunk<Topic[], PageInitContext>(
  'topics/getTopics',
  async (ctx?) => {
    const data = { headers: { Cookie: ctx?.authCookie } }
    const response = await TopicController.getTopics(data)
    return response.data
  }
)

export const addNewTopic = createAsyncThunk<Topic, NewTopic>(
  'topic/addNewTopic',
  async data => {
    const response = await TopicController.addNewTopic(data)
    return response.data
  }
)
