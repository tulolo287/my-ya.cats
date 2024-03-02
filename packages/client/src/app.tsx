import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import './app.css'
import router from './router'
import store from '@store/index'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
