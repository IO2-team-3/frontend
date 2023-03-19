import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter,  RouterProvider, Route} from 'react-router-dom'

import App from './App'
import MyEvents from './pages/MyEvents'
import LogIn from './pages/LogIn'

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/my_events",
    element: <MyEvents/>
  },
  {
    path: "/log_in",
    element: <LogIn/>
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
