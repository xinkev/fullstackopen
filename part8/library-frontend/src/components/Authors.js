import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import { UpdateAuthor } from './UpdateAuthor'

const Authors = (props) => {
  const query = useQuery(ALL_AUTHORS)
  if (!props.show) {
    return null
  }

  if (query.loading) {
    return (<div>Loading...</div>)
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
        <tr>
          <th></th>
          <th>born</th>
          <th>books</th>
        </tr>
        {query.data.allAuthors.map((a) => (
          <tr key={a.id}>
            <td>{a.name}</td>
            <td>{a.born}</td>
            <td>{a.bookCount}</td>
          </tr>
        ))}
        </tbody>
      </table>
      <UpdateAuthor/>
    </div>
  )
}

export default Authors
