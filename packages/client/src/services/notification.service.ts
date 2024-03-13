type NotificationOptions = {
  body: string
  icon: string
}

class NotificationService {
  static _instance: NotificationService | undefined
  private options: NotificationOptions = {
    body: '',
    icon: '/cat-image.png',
  }

  constructor() {
    if (NotificationService._instance) {
      return NotificationService._instance
    }
    NotificationService._instance = this
  }

  notify({ body, icon }: Partial<NotificationOptions>) {
    new Notification('Ya.cats game', {
      body: body || this.options.body,
      icon: icon || this.options.icon,
    })
  }

  async register() {
    if (window.Notification) {
      await Notification.requestPermission()
    } else {
      console.warn('Notification API is not supported')
    }
  }
}

export default new NotificationService()
