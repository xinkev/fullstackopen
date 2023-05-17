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
  let renderResult

  beforeEach(() => {
    renderResult = render(
      <Blog blog={blog} onClickDelete={() => {}} onClickLike={() => {}} />
    )
  })

  test("renders title and author by default", () => {
    const element = screen.getByText(`${blog.title} ${blog.author}`)
    expect(element).toBeDefined()
  })

  test("initially hide url and likes", () => {
    const element = renderResult.container.querySelector("#blog-details")
    expect(element).not.toBeVisible()
  })

  test("url and likes are shown when details is clicked", async () => {
    const user = userEvent.setup()
    const button = screen.getByText("view")
    await user.click(button)

    const element = renderResult.container.querySelector("#blog-details")
    expect(element).toBeVisible()
  })

  test("clicking like button twice call event handler twice", async () => {
    const mockHandler = jest.fn()
    renderResult.rerender(
      <Blog onClickLike={mockHandler} blog={blog} onClickDelete={() => {}} />
    )
    const user = userEvent.setup()
    const viewButton = screen.getByText("view")
    const likeButton = screen.getByText("like")

    await user.click(viewButton)
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
