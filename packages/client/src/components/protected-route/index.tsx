import { FC, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { routerPaths } from '@core/constants'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { getUser } from '@store/user/user-thunks'
import { LoadStatus } from '@core/types'

type ProtectedRouteProps = {
  authProtected: boolean
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ authProtected }) => {
  const dispatch = useAppDispatch()
  const { currentUser, status } = useAppSelector(state => state.user)

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  if (status === LoadStatus.LOADING || status === LoadStatus.INITIAL) {
    return <Outlet />
  }

  if (authProtected) {
    return currentUser ? (
      <Outlet />
    ) : (
      <Navigate to={routerPaths.login} replace />
    )
  }

  return currentUser ? <Navigate to={routerPaths.main} replace /> : <Outlet />
}

export default ProtectedRoute
