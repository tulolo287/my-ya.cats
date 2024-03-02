import { FC, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { routerPaths } from '@core/constants'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { getUser } from '@store/user/user-thunks'
import { LoadStatus } from '@core/types'

type ProtectedRouteProps = {
  /**
   * указывает защищен ли роут авторизацией
   */
  authProtected: boolean
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ authProtected }) => {
  const dispatch = useAppDispatch()
  const { currentUser, status } = useAppSelector(state => state.user)

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  /**
   * пока происходит запрос пользователя отдает страницу
   */
  if (status === LoadStatus.LOADING || status === LoadStatus.INITIAL) {
    return <Outlet />
  }

  /**
   * Для защищенных роутов:
   * если юзер авторизован - загрузить страницу
   * если нет - перейти на страницу логин
   */
  if (authProtected) {
    return currentUser ? (
      <Outlet />
    ) : (
      <Navigate to={routerPaths.login} replace />
    )
  }

  /**
   * Для незащищенных роутов:
   * если юзер авторизован - перейти на главную
   * если нет - загрузить запрашиваемую страницу (логин или регистрация)
   */
  return currentUser ? <Navigate to={routerPaths.main} replace /> : <Outlet />
}

export default ProtectedRoute
