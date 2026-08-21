import { RouterProvider } from 'react-router'
import { routes } from './app.routes'
import './App.css'
import { useAuth } from '../features/auth/hook/useAuth'
import { useEffect } from 'react'


function App() {
  const {handleGetMe} = useAuth()

  useEffect(()=> {
    handleGetMe()
  }, [])

  return (
    <RouterProvider router={routes} />
  )
}

export default App
