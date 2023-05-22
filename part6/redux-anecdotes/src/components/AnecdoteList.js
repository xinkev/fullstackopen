import { useDispatch, useSelector } from "react-redux"
import { voteAnecdotes } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.anecdotes
      .sort((a, b) => a.votes < b.votes)
      .filter((a) => a.content.includes(state.filter))
  )
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log("vote", id)
    dispatch(voteAnecdotes(id))
  }

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
