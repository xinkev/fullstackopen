import { Box, Button, Stack, TextField } from "@mui/material"
import PropTypes from "prop-types"
import { forwardRef, useImperativeHandle, useState } from "react"

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
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      Create new
      <Stack component="form" onSubmit={handleSubmit} maxWidth="sm" spacing={2}>
        <TextField
          label="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          id="title-input"
        />

        <TextField
          value={author}
          id="author-input"
          type="text"
          name="Author"
          label="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
        <TextField
          type="text"
          id="url-input"
          label="Url"
          name="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <Button
          type="submit"
          id="create-blog-button"
          variant="contained"
          sx={{ width: "min-content", mt: 1, mb: 1 }}
        >
          Create
        </Button>
      </Stack>
    </Box>
  )
})

BlogForm.displayName = "BlogForm"
BlogForm.propTypes = {
  onCreateBlog: PropTypes.func.isRequired,
}
export default BlogForm
