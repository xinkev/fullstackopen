import { forwardRef, useImperativeHandle, useState } from "react"
import PropTypes from "prop-types"

const BlogForm = forwardRef(({ onCreateBlog }, refs) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onCreateBlog({ title, author, url })
  }

  const reset = () => {
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  useImperativeHandle(refs, () => {
    return {
      reset,
    }
  })

  return (
    <div>
      create new
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            value={title}
            type="text"
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            id="title-input"
          />
        </div>
        <div>
          author:
          <input
            value={author}
            id="author-input"
            type="text"
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            id="url-input"
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit" id="create-blog-button">
          create
        </button>
      </form>
    </div>
  )
})

BlogForm.displayName = "BlogForm"
BlogForm.propTypes = {
  onCreateBlog: PropTypes.func.isRequired,
}
export default BlogForm
