/// <reference lib="webworker" />

const CACHE_NAME = 'ya-cats-cache-v1'
const URLS = [
  '/index.html',
  '/sw.js',
  '/background_layer_1.png',
  '/background_layer_2.png',
  '/background_layer_3.png',
  '/cat-image-dead.png',
  '/cat-image-error.png',
  '/cat-image.png',
]

const sw = self as unknown as ServiceWorkerGlobalScope & typeof globalThis

sw.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        console.info('Opened cache')
        return cache.addAll(URLS)
      })
      .catch(error => {
        console.error(error)
        throw error
      })
  )
})

sw.addEventListener('fetch', async (event: FetchEvent) => {
  if (event.request.method !== 'GET') {
    return
  }

  const { request } = event
  if (request.url.includes('/api') || request.url.includes('/yandex-api')) {
    event.respondWith(fetchFromNet(request))
  } else {
    event.respondWith(fetchFromCache(request))
  }
})

sw.addEventListener('activate', async event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(() => true).map(name => caches.delete(name))
      )
    })
  )
})

const fetchFromCache = async (request: Request): Promise<Response> => {
  const cashedRequest = await caches.match(request)
  return cashedRequest || fetchFromNet(request)
}

const fetchFromNet = async (request: Request): Promise<Response> => {
  const cache = await caches.open(CACHE_NAME)
  try {
    const response = await fetch(request)
    if (!response || response.status !== 200 || response.type !== 'basic') {
      return response
    }
    cache.put(request, response.clone())
    return response
  } catch {
    const response = await cache.match(request)
    if (response) {
      return response
    }
    throw new Error(`No cached or network response for ${request.url}`)
  }
}

export {}
