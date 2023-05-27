/* eslint-disable no-unused-vars */
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
} from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { Link, Outlet } from "react-router-dom"
import AvatarMenu from "./components/AvatarMenu"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import { setNotification } from "./reducers/notificationReducer"
import { login, logout } from "./reducers/userReducer"

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

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline enableColorScheme />
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "inline-block", sm: "block" } }}
          >
            Blog App
          </Typography>
          {user && (
            <Box sx={{ display: "block" }}>
              <Button to="/" component={Link} sx={{ color: "#fff" }}>
                Blogs
              </Button>
              <Button to="/users" component={Link} sx={{ color: "#fff" }}>
                Users
              </Button>
              <AvatarMenu username={user.name} onClickLogout={handleLogout} />
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Container component="main">
        <Toolbar />
        {user && <Notification notification={notification} />}
        {!user && (
          <LoginForm
            onLoginSubmit={onLoginSubmit}
            notification={notification}
          />
        )}

        {user && <Outlet />}
      </Container>
    </Box>
  )
}

export default App
