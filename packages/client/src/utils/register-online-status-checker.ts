import notificationService from '@services/notification.service'

const updateOnlineStatus = () => {
  if (navigator.onLine) {
    notificationService.notify({ body: "You're online" })
  } else {
    notificationService.notify({ body: "You're offline" })
  }
}

export const registerOnlineStatusChecker = () => {
  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)
}
