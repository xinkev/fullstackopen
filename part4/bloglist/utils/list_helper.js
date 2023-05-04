const maxBy = require("lodash/maxBY")
const countBy = require("lodash/countBy")

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
    const blog = maxBy(blogs, "likes")
    return {
      title: blog.title,
      author: blog.author,
      likes: blog.likes,
    }
  }
}

const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) return undefined

  const blogsByAuthor = countBy(blogs, "author")

  const author = maxBy(Object.keys(blogsByAuthor), (key) => blogsByAuthor[key])

  return { author, blogs: blogsByAuthor[author] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
