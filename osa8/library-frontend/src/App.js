import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import ErrorMessage from './components/ErrorMessage'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [error, setError] = useState('')

  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  const showError = (message) => {
    setError(message)
    setTimeout(() => {
      setError('')
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token !== null && <button onClick={() => setPage('add')}>add book</button>}
        {token === null && <button onClick={() => setPage('loginForm')}>login</button>}
        {token !== null && <button onClick={logout}>logout</button>}
      </div>

      {error.length > 0 && <ErrorMessage message={error} />}

      <Authors
        show={page === 'authors' || (page === 'loginForm' && token !== null)}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <LoginForm
        show={page === 'loginForm' && token === null}
        setError={showError}
        setToken={setToken}
      />

    </div>
  )
}

export default App