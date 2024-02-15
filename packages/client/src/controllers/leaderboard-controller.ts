const mockData = [
  { login: '233erw', score: '343424390' },
  { login: 'e42erwo', score: '3434243' },
  { login: 'erwerer3wo', score: '33' },
  { login: 'erwcsderwo', score: '3434243' },
  { login: 'rerwe', score: '3243' },
]

class LeaderboardController {
  getRecords = () => mockData
}

export const leaderboardController = new LeaderboardController()
