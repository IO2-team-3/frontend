import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider, Route, createRoutesFromElements, defer} from 'react-router-dom'

import App from './App'
import MyEvents from './pages/MyEvents'
import LogIn from './pages/LogIn'
import EditEvent from "./pages/EditEvent.jsx";
import {AuthLayout} from "./components/AuthLayout.jsx";
import {Home} from "./components/Home.jsx";
import {Protected} from "./components/Protected.jsx";
import ProgressBar from "./components/ProgressBar.jsx";

const getUserData = () =>
    new Promise((resolve) =>
        setTimeout(() => {
            const user = window.localStorage.getItem("user");
            resolve(user);
        }, 1000)
    );

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            element={<AuthLayout />}
            loader={() => defer({ userPromise: getUserData() })}
        >
            <Route element={<Home/>}>
                <Route path="/" element={<App />}/>
                <Route path="log_in" element={<LogIn />} />
            </Route>

            <Route path="/organizer" element={<Protected/>}>
                <Route path="my_events" element={<MyEvents />} />
                <Route path="event_details" element={<EditEvent />} />
            </Route>
        </Route>
    )
//    [
//   {
//     path: "/",
//     element: <App/>
//   },
//   {
//     path: "/my_events",
//     element:<MyEvents/>
//   },
//   {
//     path: "/log_in",
//     element: <LogIn/>
//   },
//   {
//     path: "/event_details",
//     element: <EditEvent/>
//   },
// ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
