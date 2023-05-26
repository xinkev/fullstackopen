import { useDispatch, useSelector } from "react-redux"
import BlogForm from "../components/BlogForm"
import Toggleable from "../components/Toggleable"
import { useEffect, useRef } from "react"
import Blog from "../components/Blog"
import { setNotification } from "../reducers/notificationReducer"
import {
  createBlog,
  deleteBlog,
  initializeBlogs,
  updateBlog,
} from "../reducers/blogReducer"
import blogService from "../services/blogs"

const Blogs = () => {
  const blogFormRef = useRef()
  const toggleRef = useRef()
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) =>
    [...state.blogs].sort((a, b) => a.likes < b.likes)
  )

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token)
      dispatch(initializeBlogs())
    }
  }, [user])

  const showNotification = (notification) => {
    dispatch(setNotification(notification))
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
    </div>
  )
}

export default Blogs
