import { setPageHasBeenInitializedOnServer } from '@store/ssr/ssr-slice'
import {
  createContext,
  createFetchRequest,
  createUrl,
} from '@utils/entry-server.utils'
import { Request as ExpressRequest } from 'express'
import ReactDOM from 'react-dom/server'
import { Provider } from 'react-redux'
import { matchRoutes } from 'react-router-dom'
import {
  StaticRouterProvider,
  createStaticHandler,
  createStaticRouter,
} from 'react-router-dom/server'
import { initRoutes, routes } from './routes'
import store from './store'

export const render = async (req: ExpressRequest) => {
  const { query, dataRoutes } = createStaticHandler(routes)

  const fetchRequest = createFetchRequest(req)

  const context = await query(fetchRequest)

  if (context instanceof Response) {
    throw context
  }

  const url = createUrl(req)

  const foundRoutes = matchRoutes(routes, url)
  if (!foundRoutes) {
    throw new Error('Страница не найдена!')
  }

  const initRoute = initRoutes.find(route => route.path === url.pathname)

  if (initRoute?.fetchData) {
    try {
      await initRoute.fetchData({
        dispatch: store.dispatch,
        state: store.getState(),
        ctx: createContext(req),
      })
    } catch (error) {
      console.log('Инициализация страницы произошла с ошибкой', error)
    }
  }

  store.dispatch(setPageHasBeenInitializedOnServer(true))
  const router = createStaticRouter(dataRoutes, context)

  return {
    html: ReactDOM.renderToString(
      <Provider store={store}>
        <StaticRouterProvider router={router} context={context} />
      </Provider>
    ),
    initialState: store.getState(),
  }
}
