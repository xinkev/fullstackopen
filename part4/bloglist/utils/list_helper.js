const maxBy = require("lodash/maxBY")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  } else {
    return blogs.reduce((acc, blog) => acc + blog.likes, 0)
  }
}

const favoriteBlog = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return undefined
  } else {
    const blog = maxBy(blogs, (blog) => blog.likes)
    return {
      title: blog.title,
      author: blog.author,
      likes: blog.likes,
    }
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
