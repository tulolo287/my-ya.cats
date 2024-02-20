import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { routerPaths } from '@core/constants'

type ProtectedRouteProps = {
  authProtected: boolean
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ authProtected }) => {
  // TODO: брать из стора когда будет редакс
  const isAuth = localStorage.getItem('isAuth')

  if (authProtected) {
    return isAuth ? <Outlet /> : <Navigate to={routerPaths.login} replace />
  }

  return isAuth ? <Navigate to={routerPaths.main} replace /> : <Outlet />
}

export default ProtectedRoute
