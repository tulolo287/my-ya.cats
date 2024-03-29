import ReactDOM from 'react-dom/server'
import { Provider } from 'react-redux'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server'
import { Request as ExpressRequest } from 'express'

import store from './store'
import { routes } from './routes'
import { createFetchRequest } from '@utils/entry-server.utils'

export const render = async (req: ExpressRequest) => {
  const { query, dataRoutes } = createStaticHandler(routes)

  const fetchRequest = createFetchRequest(req)

  const context = await query(fetchRequest)

  if (context instanceof Response) {
    throw context
  }

  const router = createStaticRouter(dataRoutes, context)

  return ReactDOM.renderToString(
    <Provider store={store}>
      <StaticRouterProvider router={router} context={context} />
    </Provider>
  )
}
