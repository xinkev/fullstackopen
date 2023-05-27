import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material"
import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import BlogForm from "../components/BlogForm"
import Toggleable from "../components/Toggleable"
import { createBlog, initializeBlogs } from "../reducers/blogReducer"
import { setNotification } from "../reducers/notificationReducer"
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

  return (
    <Box p={3}>
      <Box pt={3} pb={3}>
        <Toggleable buttonLabel="new blog" ref={toggleRef}>
          <BlogForm onCreateBlog={handleBlogCreation} ref={blogFormRef} />
        </Toggleable>
      </Box>
      <Paper variant="outlined">
        <List>
          {blogs.map((blog) => (
            <ListItem key={blog.id} component={Link} to={`/blogs/${blog.id}`}>
              <ListItemText primary={blog.title} secondary={blog.author} />
              <Divider />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  )
}

export default Blogs
