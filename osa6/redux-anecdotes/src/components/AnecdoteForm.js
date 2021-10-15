import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { resetNotification, setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const newAnecdote = event.target.newAnecdote.value
    event.target.newAnecdote.value = ''
    dispatch(createAnecdote(newAnecdote))
    //    dispatch(setNotification(`you added '${newAnecdote}'`))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="newAnecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm