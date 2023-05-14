import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
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

  const onLoginSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
    } catch (exception) {
      console.log("failed to login", exception)
    }
  }

  if (user) {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
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
