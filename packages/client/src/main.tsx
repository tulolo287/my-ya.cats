import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import { registerServiceWorker } from '@utils/register-sw'
import './index.css'

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

registerServiceWorker()
