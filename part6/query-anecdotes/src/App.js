import AnecdoteForm from "./components/AnecdoteForm"
import Notification from "./components/Notification"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { getAnecdotes, updateAnecdote } from "./requests"

const App = () => {
  const result = useQuery("anecdotes", () => getAnecdotes(), {
    retry: 1,
    refetchOnWindowFocus: false,
  })
  const queryClient = useQueryClient()
  const voteMutation = useMutation(updateAnecdote, {
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes")
      queryClient.setQueryData(
        "anecdotes",
        anecdotes.map((a) => (a.id === anecdote.id ? anecdote : a))
      )
    },
  })

  const handleVote = (anecdote) => {
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
