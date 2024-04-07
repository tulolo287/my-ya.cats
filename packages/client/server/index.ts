import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import express, { Request as ExpressRequest } from 'express'
import fs from 'node:fs/promises'
import path from 'node:path'
import { ViteDevServer, createServer as createViteServer } from 'vite'
dotenv.config()

const port = process.env.PORT || 3000
const clientPath = path.join(__dirname, '..')
const isDev = process.env.NODE_ENV === 'development'

async function createServer() {
  const app = express()
  app.use(cors())

  let vite: ViteDevServer | undefined

  if (isDev) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: clientPath,
      appType: 'custom',
    })

    app.use(vite.middlewares)
  } else {
    app.use(
      express.static(path.join(clientPath, 'dist/client'), { index: false })
    )
  }

  app.use('*', cookieParser(), async (req, res, next) => {
    const url = req.originalUrl

    try {
      let render: (
        req: ExpressRequest
      ) => Promise<{ html: string; initialState: unknown }>
      let template: string

      if (vite) {
        template = await fs.readFile(
          path.resolve(clientPath, 'index.html'),
          'utf8'
        )

        template = await vite.transformIndexHtml(url, template)

        const module = await vite.ssrLoadModule(
          path.join(clientPath, 'src/entry-server.tsx')
        )

        render = module.render
      } else {
        template = await fs.readFile(
          path.resolve(clientPath, 'dist/client/index.html'),
          'utf8'
        )

        const pathToServer = path.join(
          clientPath,
          'dist/server/entry-server.js'
        )

        const module = await import(pathToServer)
        render = module.render
      }

      const { html: appHtml, initialState } = await render(req)

      const initStateSerialized = JSON.stringify(initialState).replaceAll(
        '<',
        '\\u003c'
      )

      const html = template
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(
          `<!--ssr-initial-state-->`,
          `<script>window.APP_INITIAL_STATE = ${initStateSerialized}</script>`
        )

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (error) {
      vite.ssrFixStacktrace(error as Error)
      next(error)
    }
  })

  app.listen(port, () => {
    console.log(`Client is listening on port: ${port}`)
  })
}

// eslint-disable-next-line unicorn/prefer-top-level-await
createServer()
