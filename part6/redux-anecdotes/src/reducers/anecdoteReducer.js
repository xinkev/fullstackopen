import { createSlice } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

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
      return [...state, asObject(action.payload)]
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions

export default anecdoteSlice.reducer
