import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(_state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      return [...state, action.payload]
    },
    replaceBlog(state, action) {
      const blog = action.payload
      return state.map((b) => (b.id === blog.id ? blog : b))
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
  },
})

export const { setBlogs, appendBlog, replaceBlog, removeBlog } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const createdBlog = await blogService.create(blog)
    dispatch(appendBlog(createdBlog))
  }
}

export const updateBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog)
    dispatch(replaceBlog(updatedBlog))
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog)
    dispatch(removeBlog(blog.id))
  }
}

export const saveComment = (blogId, comment) => {
  return async (dispatch) => {
    const newBlog = await blogService.comment(blogId, comment)
    dispatch(replaceBlog(newBlog))
  }
}
export default blogSlice.reducer
