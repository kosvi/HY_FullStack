import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  //  const anecdotes = useSelector(({ filter, anecdotes }) => {
  //    return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  //  })
  const anecdotes = props.anecdotes.filter(a => a.content.toLowerCase().includes(props.filter.toLowerCase()))

  const vote = (id) => {
    console.log('vote', id)
    const line = anecdotes.find(a => a.id === id)
    props.voteAnecdote(line)
    props.setNotification(`you voted '${line.content}'`, 5000)
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

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
    anecdotes: state.anecdotes
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList