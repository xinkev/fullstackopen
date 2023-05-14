import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const LOCAL_KEY_USER = "loggedin_user"
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token)
      blogService.getAll().then((blogs) => setBlogs(blogs))
    }
  }, [user])

  useEffect(() => {
    const userString = window.localStorage.getItem(LOCAL_KEY_USER)
    setUser(JSON.parse(userString))
  }, [])

  const onLoginSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(LOCAL_KEY_USER, JSON.stringify(user))
      setUser(user)
    } catch (exception) {
      console.log("failed to login", exception)
    }
  }

  const onLogoutClick = (e) => {
    window.localStorage.removeItem(LOCAL_KEY_USER)
    setUser(null)
  }

  if (user) {
    return (
      <div>
        <h2>blogs</h2>
        <div>
          {user.name} logged in <button onClick={onLogoutClick}>logout</button>
        </div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    )
  } else {
    return (
      <div>
        <h2>log in to application</h2>
        <form onSubmit={onLoginSubmit}>
          <div>
            username{" "}
            <input
              value={username}
              name="Username"
              type="text"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password{" "}
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
}

export default App
