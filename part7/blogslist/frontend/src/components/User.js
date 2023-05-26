import {  useSelector } from "react-redux"
import { useMatch } from "react-router-dom"

const User = () => {
  const match = useMatch("/users/:id")
  const user = useSelector((state) => state.users.find((user) => user.id === match.params.id))

  if (!user) return null

  return (
    <div>
      <h2>{user.name}</h2>
      <strong>added blogs</strong>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
