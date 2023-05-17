import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import Blog from "./Blog"
import userEvent from "@testing-library/user-event"

describe("<Blog/>", () => {
  const blog = {
    title: "A Test",
    author: "Tester",
    url: "http://example.com",
  }
  let container

  beforeEach(() => {
    container = render(
      <Blog blog={blog} onClickDelete={() => {}} onClickLike={() => {}} />
    ).container
  })
  test("renders title and author by default", () => {
    const element = screen.getByText(`${blog.title} ${blog.author}`)
    expect(element).toBeDefined()
  })

  test("initially hide url and likes", () => {
    const element = container.querySelector("#blog-details")
    expect(element).not.toBeVisible()
  })
})
