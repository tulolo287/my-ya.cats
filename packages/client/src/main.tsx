import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { registerServiceWorker } from '@utils/register-sw'
import { registerOnlineStatusChecker } from '@utils/register-online-status-checker'
import notificationService from '@services/notification.service'
import './index.css'
import { initMock } from '@services/mock/init-mock'

ReactDOM.hydrateRoot(document.querySelector('#root') as HTMLElement, <App />)

if (process.env.NODE_ENV === 'development') {
  const mock = new MockAdapter(axios, { delayResponse: 500 })

  initMock(mock)
}
registerServiceWorker()
registerOnlineStatusChecker()
notificationService.register()
