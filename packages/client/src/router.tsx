import { createBrowserRouter } from 'react-router-dom'

import MainPage from '@pages/MainPage'
import LoginPage from '@pages/LoginPage'
import SignupPage from '@pages/SignupPage'
import ProfilePage from '@pages/ProfilePage'
import GamePage from '@pages/GamePage'
import LeaderBoardPage from '@pages/LeaderBoardPage'
import ForumPage from '@pages/ForumPage'
import ForumTopicPage from '@pages/ForumTopicPage'
import ErrorPage from '@pages//ErrorPage'
import ProtectedRoute from '@components/protected-route'
import { routerPaths } from '@core/constants'
import ErrorBoundary from './components/error-boundary'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <ProtectedRoute authProtected={false} />
      </ErrorBoundary>
    ),
    children: [
      {
        path: routerPaths.login,
        element: <LoginPage />,
      },
      {
        path: routerPaths.signup,
        element: <SignupPage />,
      },
    ],
  },
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <ProtectedRoute authProtected={true} />
      </ErrorBoundary>
    ),
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: routerPaths.profile,
        element: <ProfilePage />,
      },
      {
        path: routerPaths.game,
        element: <GamePage />,
      },
      {
        path: routerPaths.leaderBoard,
        element: <LeaderBoardPage />,
      },
      {
        path: routerPaths.forum,
        element: <ForumPage />,
      },
      {
        path: routerPaths.forumTopic,
        element: <ForumTopicPage />,
      },
      {
        path: '*',
        element: <ErrorPage type="404" />,
      },
    ],
  },
])

export default router
