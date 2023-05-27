import LikeButton from "@mui/icons-material/ThumbUp"
import {
  Button,
  Container,
  IconButton,
  Link,
  Stack,
  TextField,
} from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useMatch } from "react-router-dom"
import { saveComment, updateBlog } from "../reducers/blogReducer"
import { setNotification } from "../reducers/notificationReducer"

const Blog = () => {
  const match = useMatch("/blogs/:id")
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === match.params.id)
  )
  const dispatch = useDispatch()

  if (!blog) return null

  const handleLikeClick = async () => {
    const newBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    try {
      dispatch(updateBlog(newBlog))
    } catch (exception) {
      dispatch(
        setNotification({
          message: "failed to remove the blog",
          type: "error",
        })
      )
    }
  }

  const handleSubmt = (e) => {
    e.preventDefault()
    dispatch(saveComment(blog.id, e.target.comment.value))
    e.target.comment.value = ""
  }

  return (
    <Container>
      <Stack>
        <h2>{blog.title}</h2>
        <Link href={blog.url}>{blog.url}</Link>
        likes {blog.likes}
        <IconButton onClick={handleLikeClick} aria-label="like" size="small">
          <LikeButton />
        </IconButton>
        added by {blog.author}
        <h3>comments</h3>
        <form onSubmit={handleSubmt}>
          <TextField type="text" name="comment" />
          <Button variant="contained" type="submit">
            Add comment
          </Button>
        </form>
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </Stack>
    </Container>
  )
}

export default Blog
