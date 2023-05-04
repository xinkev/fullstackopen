const _ = require("lodash")

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
    const blog = _.maxBy(blogs, "likes")
    return {
      title: blog.title,
      author: blog.author,
      likes: blog.likes,
    }
  }
}

const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) return undefined

  const blogsByAuthor = _.countBy(blogs, "author")
  const author = _.maxBy(
    Object.keys(blogsByAuthor),
    (key) => blogsByAuthor[key]
  )

  return { author, blogs: blogsByAuthor[author] }
}

const mostLikes = (blogs) => {
  if (!blogs || blogs.length === 0) return undefined
  const likesReceivedByAuthors = {}
  blogs.forEach((blog) => {
    likesReceivedByAuthors[blog.author] =
      (likesReceivedByAuthors[blog.author] ?? 0) + blog.likes
  })

  const authorWithMostLikes = _(likesReceivedByAuthors)
    .entries()
    .maxBy((item) => item[1])
  return { author: authorWithMostLikes[0], likes: authorWithMostLikes[1] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
