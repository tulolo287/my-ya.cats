const SW_URL = '/sw.js'

export const registerServiceWorker = async () => {
  if (!import.meta.env.PROD) {
    console.warn("Service worker doesn't work in dev mode")
    return
  }

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        await navigator.serviceWorker.register(SW_URL)
      } catch (error) {
        console.error('Registration of service worker failed:', error)
      }
    })
  } else {
    console.warn('Service workers are not supported')
  }
}
