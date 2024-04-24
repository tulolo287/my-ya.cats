import { useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import './app.css'
import store from '@store/index'
import { routes } from './routes'

const router = createBrowserRouter(routes)

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `${process.env.SERVER_URL}/api`
      const response = await fetch(url!)
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
