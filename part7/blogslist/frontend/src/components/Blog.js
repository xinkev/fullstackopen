/* eslint-disable no-unused-vars */
import { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

const Blog = ({ blog, removable, onClickLike, onClickDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  const [isVisible, setIsVisible] = useState(false)

  return (
    <div style={blogStyle} className="blog">
      <div>
        <Link to={"/blogs/" + blog.id}>
          {blog.title} {blog.author}
        </Link>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  removable: PropTypes.bool,
  onClickLike: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
}

export default Blog
