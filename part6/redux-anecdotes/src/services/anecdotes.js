import axios from "axios"
const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createAnecdote = async (content) => {
  const newObj = { content, votes: 0 }
  const response = await axios.post(baseUrl, newObj)
  return response.data
}

const updateAnecdote = async (anecdote) => {
  const response = await axios.put(baseUrl + `/${anecdote.id}`, anecdote)
  return response.data
}

export default { getAll, createAnecdote, updateAnecdote }
