import { useSelector, useDispatch } from "react-redux"
import { createAnecedote, voteAnecdotes } from "./reducers/anecdoteReducer"

const App = () => {
  const anecdotes = useSelector((state) =>
    state.sort((a, b) => a.votes < b.votes)
  )
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log("vote", id)
    dispatch(voteAnecdotes(id))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    e.target.anecdote.value = ""
    dispatch(createAnecedote(anecdote))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App