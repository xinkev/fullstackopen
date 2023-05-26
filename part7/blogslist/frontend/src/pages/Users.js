import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUsers } from "../reducers/usersReducer"

const Users = () => {
  const dispatch = useDispatch()

  const users = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  if (!users) return null

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td>
              <strong>blog created</strong>
            </td>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Users
