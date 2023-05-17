import { useState } from "react"
import PropTypes from "prop-types"

const Blog = ({ blog, onClickLike, onClickDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  const [isVisible, setIsVisible] = useState(false)

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? "hide" : "view"}
        </button>
      </div>
      <div style={{ display: isVisible ? "" : "none" }}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} <button onClick={onClickLike}>like</button>
        </div>
        <div>{blog.user && blog.user.name}</div>
        <button onClick={onClickDelete}>remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  onClickLike: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired
}

export default Blog
