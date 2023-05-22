import { useSelector, useDispatch } from "react-redux"
import { voteAnecdotes } from "./reducers/anecdoteReducer"
import AnecedoteForm from "./components/AnecedoteForm"

const App = () => {
  const anecdotes = useSelector((state) =>
    state.sort((a, b) => a.votes < b.votes)
  )
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log("vote", id)
    dispatch(voteAnecdotes(id))
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
      <AnecedoteForm />
    </div>
  )
}

export default App
