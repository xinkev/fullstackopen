import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const LOCAL_KEY_USER = "loggedin_user"
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [blog, setBlog] = useState(null)
  const [notification, setNotification] = useState(null)

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
      showNotification({
        message: "wrong username or password",
        type: "error",
      })
    }
  }

  const showNotification = (notification) => {
    console.log(JSON.stringify(notification))
    setNotification(notification)
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const onLogoutClick = (e) => {
    window.localStorage.removeItem(LOCAL_KEY_USER)
    setUser(null)
  }

  const onCreateBlog = async (e) => {
    e.preventDefault()
    try {
      const createdBlog = await blogService.create(blog)
      setBlogs(blogs.concat(createdBlog))
      setBlog(null)
      showNotification({
        message: `a new blog ${blog.title} by ${blog.author}`,
        type: "success",
      })
    } catch (exception) {
      showNotification({
        message: "failed to create the blog",
        type: "error",
      })
    }
  }

  const loginForm = () => {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification notification={notification} />
        <form onSubmit={onLoginSubmit}>
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

  const blogsLayout = () => {
    return (
      <div>
        <h2>blogs</h2>
        <Notification notification={notification} />
        <p>
          {user.name} logged in <button onClick={onLogoutClick}>logout</button>
        </p>
        <br />
        <div>
          create new
          <form onSubmit={onCreateBlog}>
            <div>
              title:
              <input
                value={blog ? blog.title : ""}
                type="text"
                name="Title"
                onChange={({ target }) =>
                  setBlog({ ...blog, title: target.value })
                }
              />
            </div>
            <div>
              author:
              <input
                value={blog ? blog.author : ""}
                type="text"
                name="Author"
                onChange={({ target }) =>
                  setBlog({ ...blog, author: target.value })
                }
              />
            </div>
            <div>
              url:
              <input
                type="text"
                name="url"
                value={blog ? blog.url : ""}
                onChange={({ target }) =>
                  setBlog({ ...blog, url: target.value })
                }
              />
            </div>
            <button type="submit">create</button>
          </form>
        </div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    )
  }

  return user ? blogsLayout() : loginForm()
}

export default App
