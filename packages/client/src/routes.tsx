import ErrorBoundary from '@components/error-boundary'
import ProtectedRoute from '@components/protected-route'
import { routerPaths } from '@core/constants'
import ErrorPage from '@pages/ErrorPage'
import ForumPage, { initForumPage } from '@pages/ForumPage'
import ForumTopicPage, { initForumTopicPage } from '@pages/ForumTopicPage'
import GamePage, { initGamePage } from '@pages/GamePage'
import LeaderBoardPage, { initLeaderBoardPage } from '@pages/LeaderBoardPage'
import LoginPage from '@pages/LoginPage'
import MainPage, { initMainPage } from '@pages/MainPage'
import ProfilePage, { initProfilePage } from '@pages/ProfilePage'
import SignupPage from '@pages/SignupPage'
import { AppDispatch, RootState } from './store'

export type PageInitContext = {
  authCookie?: string
  uuid?: string
}

export type PageInitArgs = {
  dispatch: AppDispatch
  state: RootState
  ctx: PageInitContext
}

export type InitRoutes = {
  path: string
  fetchData: ({ dispatch, state, ctx }: PageInitArgs) => Promise<unknown>
}

export const routes = [
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
    ],
  },
  {
    path: '*',
    element: <ErrorPage type="404" />,
  },
]

export const initRoutes: InitRoutes[] = [
  {
    path: routerPaths.main,
    fetchData: initMainPage,
  },
  {
    path: routerPaths.profile,
    fetchData: initProfilePage,
  },
  {
    path: routerPaths.game,
    fetchData: initGamePage,
  },
  {
    path: routerPaths.leaderBoard,
    fetchData: initLeaderBoardPage,
  },
  {
    path: routerPaths.forum,
    fetchData: initForumPage,
  },
  {
    path: routerPaths.forumTopic,
    fetchData: initForumTopicPage,
  },
]
