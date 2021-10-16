const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'INIT':
      return action.data
    case 'NEW':
      return [...state, action.data]
    case 'VOTE':
      const objToChange = state.find(obj => obj.id === action.data.id)
      const changedObj = { ...objToChange, votes: objToChange.votes + 1 }
      const newAnecdoteList = state.map(obj => obj.id !== action.data.id ? obj : changedObj)
      return newAnecdoteList.sort((a, b) => b.votes - a.votes)
    default: return state
  }
}

export const createAnecdote = (anecdote) => {
  return {
    type: 'NEW',
    data: anecdote
  }
}

export const voteById = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT',
    data: anecdotes
  }
}

export default anecdoteReducer