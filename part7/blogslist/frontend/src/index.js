import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { Provider } from "react-redux"
import { store } from "./store"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Users from "./pages/Users"
import User from "./components/User"
import Blogs from "./pages/Blogs"
import Blog from "./pages/Blog"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Blogs /> },
      { path: "/users", element: <Users /> },
      { path: "/users/:id", element: <User /> },
      { path: "/blogs/:id", element: <Blog /> },
    ],
  },
])

const Root = () => (
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
ReactDOM.createRoot(document.getElementById("root")).render(<Root />)
