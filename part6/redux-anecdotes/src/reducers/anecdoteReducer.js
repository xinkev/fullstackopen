import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      return state.map((o) =>
        o.id === action.payload ? { ...o, votes: o.votes + 1 } : o
      )
    },
    createAnecdote(state, action) {
      return [...state, action.payload]
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { createAnecdote, voteAnecdote, setAnecdotes } =
  anecdoteSlice.actions

export default anecdoteSlice.reducer
