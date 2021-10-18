import React, { useEffect } from 'react'
import ConnectedAnecdoteForm from './components/AnecdoteForm'
import ConnectedAnecdoteList from './components/AnecdoteList'
import ConnectedNotification from './components/Notification'
import ConnectedFilter from './components/Filter'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <ConnectedNotification />
      <ConnectedFilter />
      <ConnectedAnecdoteList />
      <ConnectedAnecdoteForm />
    </div>
  )
}

export default App