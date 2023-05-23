import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
  const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const mutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes")
      queryClient.setQueriesData("anecdotes", [...anecdotes, newAnecdote])
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""
    console.log("new anecdote")
    mutation.mutate(content, {
      onError: ({ response }) => {
        notificationDispatch({
          type: "SET_MESSAGE",
          message: response.data.error,
        })
        setTimeout(() => {
          notificationDispatch({ type: "CLEAR_MESSAGE" })
        }, 5000)
      },
    })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
