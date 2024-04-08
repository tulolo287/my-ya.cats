import { createProxyMiddleware } from 'http-proxy-middleware'

const API_URL = process.env.API_URL

/**
 * Проксирование запросов на апи практикума
 */
export const yandexApiProxy = createProxyMiddleware({
  changeOrigin: true,
  cookieDomainRewrite: {
    '*': '',
  },
  pathRewrite: {
    '/yandex-api': '',
  },
  target: API_URL,
})
