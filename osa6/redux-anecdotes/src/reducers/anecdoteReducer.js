import anecdoteService from '../services/anecdoteService'

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'INIT':
      return action.data.sort((a, b) => b.votes - a.votes)
    case 'NEW':
      return [...state, action.data]
    case 'VOTE':
      const newAnecdoteList = state.map(obj => obj.id !== action.data.id ? obj : action.data)
      return newAnecdoteList.sort((a, b) => b.votes - a.votes)
    default: return state
  }
}

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.addNew(anecdote)
    dispatch({
      type: 'NEW',
      data: newAnecdote
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.vote(anecdote)
    dispatch({
      type: 'VOTE',
      data: votedAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export default anecdoteReducer