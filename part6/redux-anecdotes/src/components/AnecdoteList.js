import { useDispatch, useSelector } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    [...state.anecdotes]
      .sort((a, b) => a.votes < b.votes)
      .filter((a) => a.content && a.content.includes(state.filter))
  )
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    console.log("vote", anecdote.id)
    dispatch(setNotification(`you voted for '${anecdote.content}'`, 5000))
  }

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
