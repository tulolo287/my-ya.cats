import { createBrowserRouter } from 'react-router-dom'
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ProfilePage from './pages/ProfilePage'
import GamePage from './pages/GamePage'
import LeaderBoardPage from './pages/LeaderBoardPage'
import ForumPage from './pages/ForumPage'
import ForumTopicPage from './pages/ForumTopicPage'
import ErrorPage from './pages/ErrorPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/game',
    element: <GamePage />,
  },
  {
    path: '/leaderboard',
    element: <LeaderBoardPage />,
  },
  {
    path: '/forum',
    element: <ForumPage />,
  },
  {
    path: '/forum/:topicId',
    element: <ForumTopicPage />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
])

export default router
