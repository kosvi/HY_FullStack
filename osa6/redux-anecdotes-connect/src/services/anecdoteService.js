import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const addNew = async (anecdote) => {
  const obj = { content: anecdote, votes: 0 }
  const res = await axios.post(baseUrl, obj)
  return res.data
}

const vote = async (anecdote) => {
  const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
  const res = await axios.put(`${baseUrl}/${newAnecdote.id}`, newAnecdote)
  return res.data
}

const methods = {
  getAll,
  addNew,
  vote
}

export default methods