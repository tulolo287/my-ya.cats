const mockData = [
  { name: '233erw', record: '343424390' },
  { name: 'e42erwo', record: '3434243' },
  { name: 'erwerer3wo', record: '33' },
  { name: 'erwcsderwo', record: '3434243' },
  { name: 'rerwe', record: '3243' },
]

class LeaderboardController {
  getRecords = () => mockData
}

export const leaderboardController = new LeaderboardController()
