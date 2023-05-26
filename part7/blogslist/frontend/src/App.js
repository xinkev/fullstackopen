/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Toggleable from "./components/Toggleable"
import BlogForm from "./components/BlogForm"
import { useDispatch, useSelector } from "react-redux"
import { setNotification } from "./reducers/notificationReducer"
import {
  createBlog,
  deleteBlog,
  initializeBlogs,
  updateBlog,
} from "./reducers/blogReducer"
import { login, logout } from "./reducers/userReducer"

const App = () => {
  const user = useSelector((state) => state.user)
  const notification = useSelector((state) => state.notification)
  const blogs = useSelector((state) =>
    [...state.blogs].sort((a, b) => a.likes < b.likes)
  )

  const blogFormRef = useRef()
  const toggleRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token)
      dispatch(initializeBlogs())
    }
  }, [user])

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

  const handleBlogCreation = async (newBlog) => {
    try {
      dispatch(createBlog(newBlog))
      showNotification({
        message: `a new blog ${newBlog.title} by ${newBlog.author}`,
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
      dispatch(updateBlog(newBlog))
    } catch (exception) {
      showNotification({
        message: "failed to remove the blog",
        type: "error",
      })
    }
  }

  const handleRemoveClick = async (blog) => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) return
    try {
      dispatch(deleteBlog(blog))
    } catch (exception) {
      showNotification({
        message: "failed to remove the blog",
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
          {blogs &&
            blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                removable={user.id === blog.user.id}
                onClickLike={() => handleLikeClick(blog)}
                onClickDelete={() => handleRemoveClick(blog)}
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
