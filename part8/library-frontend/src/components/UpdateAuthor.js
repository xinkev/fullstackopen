import * as React from 'react'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { SET_BORN } from '../queries'

export const UpdateAuthor = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [updateAuthor] = useMutation(SET_BORN)

  const handleUpdate = (e) => {
    e.preventDefault()
    updateAuthor({ variables: { name, born: Number(born) } })

    setName('')
    setBorn('')
  }

  return (
    <form onSubmit={handleUpdate}>
      <h2>Set birthyear</h2>
      <div>name<input value={name}
                      onChange={({ target }) => setName(target.value)}/></div>
      <div>born<input value={born}
                      onChange={({ target }) => setBorn(target.value)}/></div>
      <button type="submit">update author</button>
    </form>
  )
}