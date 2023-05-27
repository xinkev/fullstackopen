import { Button, Container, Stack, TextField } from "@mui/material"
import PropTypes from "prop-types"
import { useState } from "react"
import Notification from "./Notification"

const LoginForm = ({ onLoginSubmit, notification }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onLoginSubmit({ username, password })
  }

  return (
    <Container id="login-form" maxWidth="xs">
      <h2>Log in to application</h2>
      <Notification notification={notification} />
      <Stack spacing={2} component="form" onSubmit={handleSubmit}>
        <TextField
          value={username}
          name="Username"
          type="text"
          label="Username"
          id="username-input"
          onChange={({ target }) => setUsername(target.value)}
        />
        <TextField
          value={password}
          name="Password"
          label="Password"
          onChange={({ target }) => setPassword(target.value)}
          type="password"
          id="password-input"
        />
        <Button type="submit" id="login-button" variant="contained">
          Login
        </Button>
      </Stack>
    </Container>
  )
}

LoginForm.displayName = "LoginForm"
LoginForm.propTypes = {
  onLoginSubmit: PropTypes.func.isRequired,
  notification: PropTypes.object,
}
export default LoginForm
