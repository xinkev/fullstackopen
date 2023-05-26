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
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <br />
      likes {blog.likes}
      <button onClick={handleLikeClick}>like</button>
      <br />
      added by {blog.author}
      <br />
      <h3>comments</h3>
      <form onSubmit={handleSubmt}>
        <input type="text" name="comment" />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
