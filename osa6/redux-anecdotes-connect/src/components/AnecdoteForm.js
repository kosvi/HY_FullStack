import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const newAnecdote = event.target.newAnecdote.value
    event.target.newAnecdote.value = ''
    props.createAnecdote(newAnecdote)
    props.setNotification(`you added '${newAnecdote}'`, 5000)
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

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = {
  createAnecdote,
  setNotification
}

const ConnectedAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm