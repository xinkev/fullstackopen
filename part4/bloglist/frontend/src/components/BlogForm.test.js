import React from "react"
import userEvent from "@testing-library/user-event"
import { screen, render } from "@testing-library/react"
import BlogForm from "./BlogForm"

describe("<BlogForm/>", () => {
  test("submission handler should receive the right details", async () => {
    const blog = {
      title: "Test Title",
      author: "Test Author",
      url: "http://test-url.com",
    }

    const mockHandler = jest.fn()
    const container = render(<BlogForm onCreateBlog={mockHandler} />).container
    const user = userEvent.setup()
    const titleInput = container.querySelector("#title-input")
    const authorInput = container.querySelector("#author-input")
    const urlInput = container.querySelector("#url-input")
    const createButton = screen.getByText("create")

    await user.type(titleInput, blog.title)
    await user.type(authorInput, blog.author)
    await user.type(urlInput, blog.url)
    await user.click(createButton)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0]).toEqual(blog)
  })
})
