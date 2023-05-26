import { useState } from "react"
import Notification from "./Notification"
import PropTypes from "prop-types"

const LoginForm = ({ onLoginSubmit, notification }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onLoginSubmit({ username, password })
  }

  return (
    <div id="login-form">
      <h2>log in to application</h2>
      <Notification notification={notification} />
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            value={username}
            name="Username"
            type="text"
            id="username-input"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            type="password"
            id="password-input"
          />
        </div>
        <button type="submit" id="login-button">login</button>
      </form>
    </div>
  )
}

LoginForm.displayName = "LoginForm"
LoginForm.propTypes = {
  onLoginSubmit: PropTypes.func.isRequired,
  notification: PropTypes.object,
}
export default LoginForm
