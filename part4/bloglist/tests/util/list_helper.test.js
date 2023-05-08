const listHelper = require("../../utils/list_helper")

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
]

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
]

test("dummy returns one", () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe("totalLikes", () => {
  test("of empty list is zero", () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test("when list has only one blog equals to the likes of that", () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(5)
  })

  test("of a bigger list is calculated right", () => {
    expect(listHelper.totalLikes(blogs)).toBe(36)
  })
})

describe("favoriteBlog", () => {
  test("of empty list is undefined", () => {
    expect(listHelper.favoriteBlog([])).toBe(undefined)
  })

  test("of a list with only one blog equals to that blog", () => {
    const expected = {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    }

    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(expected)
  })

  test("of a bigger list return the right blog", () => {
    const expected = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    }

    expect(listHelper.favoriteBlog(blogs)).toEqual(expected)
  })
})

describe("mostBlogs", () => {
  test("of an empty list returns undefined", () => {
    expect(listHelper.mostBlogs([])).toBe(undefined)
  })

  test("returns the author of the blog when it's the only blog available in a list", () => {
    const expected = {
      author: "Edsger W. Dijkstra",
      blogs: 1,
    }

    expect(listHelper.mostBlogs(listWithOneBlog)).toEqual(expected)
  })

  test("of a bigger list returns the author with most blogs", () => {
    const expected = {
      author: "Robert C. Martin",
      blogs: 3,
    }

    expect(listHelper.mostBlogs(blogs)).toEqual(expected)
  })
})

describe("mostLikes", () => {
  test("of an empty list returns undefined", () => {
    expect(listHelper.mostLikes([])).toBe(undefined)
  })

  test("returns the author of the blog when it's the only blog available in a list", () => {
    const expected = {
      author: "Edsger W. Dijkstra",
      likes: 5
    }

    expect(listHelper.mostLikes(listWithOneBlog)).toEqual(expected)
  })

  test("of a bigger list returns the author with most likes", () => {
    const expected = {
      author: "Edsger W. Dijkstra",
      likes: 17
    }

    expect(listHelper.mostLikes(blogs)).toEqual(expected)
  })
})
