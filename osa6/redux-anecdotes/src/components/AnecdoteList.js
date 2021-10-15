import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteById } from '../reducers/anecdoteReducer'
import { resetNotification, setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  })

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteById(id))
    const line = anecdotes.find(a => a.id === id)
    dispatch(setNotification(`you voted '${line.content}'`))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )

}

export default AnecdoteList