/* eslint-disable no-unused-vars */
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import { useDispatch, useSelector } from "react-redux"
import { setNotification } from "./reducers/notificationReducer"
import { login, logout } from "./reducers/userReducer"
import { Outlet } from "react-router-dom"

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

      {user && <Outlet />}
    </div>
  )
}

export default App
