import { useSelector } from "react-redux"
import { useMatch } from "react-router-dom"

const Blog = () => {
  const match = useMatch("/blogs/:id")
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === match.params.id)
  )

  if (!blog) return null

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a><br/>
      likes {blog.likes}
      <button>like</button><br/>
      added by {blog.author}
    </div>
  )
}

export default Blog
