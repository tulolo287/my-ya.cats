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

sw.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response
      }

      const fetchRequest = event.request.clone()
      return fetch(fetchRequest).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response
        }

        const responseToCache = response.clone()
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache)
        })
        return response
      })
    })
  )
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

export {}
