import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Toggleable from "./components/Toggleable"
import BlogForm from "./components/BlogForm"

const App = () => {
  const LOCAL_KEY_USER = "loggedin_user"
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()
  const toggleRef = useRef()

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

  const onLoginSubmit = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
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
    setNotification(notification)
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const onLogoutClick = (e) => {
    window.localStorage.removeItem(LOCAL_KEY_USER)
    setUser(null)
  }

  const handleBlogCreation = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(createdBlog))
      showNotification({
        message: `a new blog ${createdBlog.title} by ${createdBlog.author}`,
        type: "success",
      })
      blogFormRef.current.reset()
      toggleRef.current.toggleVisibility()
    } catch (exception) {
      showNotification({
        message: "failed to create the blog",
        type: "error",
      })
    }
  }

  const handleLikeClick = async (blog) => {
    const newBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    try {
      const updatedBlog = await blogService.update(newBlog)
      setBlogs(blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)))
    } catch (exception) {
      showNotification({
        message: "failed to create the blog",
        type: "error",
      })
    }
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
          <br />
          <Toggleable buttonLabel="new blog" ref={toggleRef}>
            <BlogForm onCreateBlog={handleBlogCreation} ref={blogFormRef} />
          </Toggleable>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              onClickLike={() => handleLikeClick(blog)}
            />
          ))}
        </>
      )}
      {!user && (
        <LoginForm onLoginSubmit={onLoginSubmit} notification={notification} />
      )}
    </div>
  )
}

export default App
