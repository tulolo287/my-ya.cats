import dotenv from 'dotenv'
dotenv.config()

import express, { Request as ExpressRequest } from 'express'
import path from 'node:path'
import fs from 'node:fs/promises'
import { createServer as createViteServer, ViteDevServer } from 'vite'

const port = process.env.PORT || 3000
const clientPath = path.join(__dirname, '..')
const isDev = process.env.NODE_ENV === 'development'

async function createServer() {
  const app = express()

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

  app.get('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let render: (req: ExpressRequest) => Promise<string>
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

      const appHtml = await render(req)

      const html = template.replace(`<!--ssr-outlet-->`, appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (error) {
      vite!.ssrFixStacktrace(error as Error)
      next(error)
    }
  })

  app.listen(port, () => {
    console.log(`Client is listening on port: ${port}`)
  })
}

// eslint-disable-next-line unicorn/prefer-top-level-await
createServer()
