import * as React from 'react'
import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, SET_BORN } from '../queries'

export const UpdateAuthor = (props) => {
  const [author, setAuthor] = useState('')
  const [born, setBorn] = useState('')

  const authorsResult = useQuery(ALL_AUTHORS)
  const [updateAuthor] = useMutation(SET_BORN)

  const handleUpdate = (e) => {
    e.preventDefault()
    updateAuthor({ variables: { name: author, born: Number(born) } })

    setAuthor('')
    setBorn('')
  }

  return (
    <form onSubmit={handleUpdate}>
      <h2>Set birthyear</h2>
      {authorsResult.loading
        ? <div>Loading authors...</div>
        : <select value={author}
                  onChange={({ target }) => setAuthor(target.value)}>
          {
            authorsResult.data.allAuthors.map(a => (
              <option key={a.id} value={a.value}>{a.name}</option>
            ))
          }
        </select>
      }
      <div>born<input value={born}
                      onChange={({ target }) => setBorn(target.value)}/></div>
      <button type="submit">update author</button>
    </form>
  )
}