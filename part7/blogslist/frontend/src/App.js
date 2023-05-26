/* eslint-disable no-unused-vars */
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import { useDispatch, useSelector } from "react-redux"
import { setNotification } from "./reducers/notificationReducer"
import { login, logout } from "./reducers/userReducer"
import { Link, Outlet } from "react-router-dom"

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
      <div
        style={{
          display: "flex",
          gap: 4,
          width: "100%",
          background: "#C9C9C9",
          padding: 4,
        }}
      >
        <Link to="/">Blogs</Link>
        <Link to="/users">Users</Link>
        {user && (
          <>
            {user.name} logged in{" "}
            <button onClick={onLogoutClick}>logout</button>
          </>
        )}
      </div>
      <h2>blog app</h2>
      {user && <Notification notification={notification} />}
      {!user && (
        <LoginForm onLoginSubmit={onLoginSubmit} notification={notification} />
      )}

      {user && <Outlet />}
    </div>
  )
}

export default App
