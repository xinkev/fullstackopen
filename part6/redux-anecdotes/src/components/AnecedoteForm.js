import React from "react"
import { useDispatch } from "react-redux"
import { createAnecedote } from "../reducers/anecdoteReducer"

const AnecedoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    e.target.anecdote.value = ""
    dispatch(createAnecedote(anecdote))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}
export default AnecedoteForm
