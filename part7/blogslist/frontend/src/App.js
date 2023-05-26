/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import blogService from "./services/blogs"
import loginService from "./services/login"
import { useDispatch, useSelector } from "react-redux"
import { setNotification } from "./reducers/notificationReducer"

import { login, logout } from "./reducers/userReducer"
import Users from "./pages/Users"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Blogs from "./pages/Blogs"

const router = createBrowserRouter([
  { path: "/", element: <Blogs /> },
  { path: "/users", element: <Users /> },
])

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)
  const notification = useSelector((state) => state.notification)

  const onLoginSubmit = async (credentials) => {
    try {
      dispatch(login(credentials))
    } catch (exception) {
      showNotification({
        message: "wrong username or password",
        type: "error",
      })
    }
  }

  const showNotification = (notification) => {
    dispatch(setNotification(notification))
  }

  const onLogoutClick = () => {
    dispatch(logout())
  }

  return (
    <div>
      {user && (
        <>
          <h2>blogs</h2>
          <Notification notification={notification} />
          <p>
            {user.name} logged in{" "}
            <button onClick={onLogoutClick}>logout</button>
          </p>
        </>
      )}
      {!user && (
        <LoginForm onLoginSubmit={onLoginSubmit} notification={notification} />
      )}

      {user && <RouterProvider router={router} />}
    </div>
  )
}

export default App
