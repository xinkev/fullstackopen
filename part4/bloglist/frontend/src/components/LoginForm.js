import { useState } from "react"
import Notification from "./Notification"

const LoginForm = ({ onLoginSubmit, notification}) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onLoginSubmit({ username, password })
  }
  
  return (
    <div>
      <h2>log in to application</h2>
      <Notification notification={notification} />
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            value={username}
            name="Username"
            type="text"
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
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
