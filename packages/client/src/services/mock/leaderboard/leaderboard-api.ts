import type MockAdapter from 'axios-mock-adapter'

import getAllRecords200 from './getAllRecords200.json'

export const mockLeaderboardApi = (mock: MockAdapter) => {
  mock
    .onPost('/all', {
      ratingFieldName: 'yacatsScore',
      cursor: 0,
      limit: 6,
    })
    .reply(200, getAllRecords200)
}
