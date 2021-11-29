import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import ErrorMessage from './components/ErrorMessage'
import { useApolloClient, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './misc/queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [error, setError] = useState('')

  const client = useApolloClient()

  const showError = (message) => {
    setError(message)
    setTimeout(() => {
      setError('')
    }, 5000)
  }

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => {
      set.map(b => b.id).includes(object.id)
    }
    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      showError(`New book by ${subscriptionData.data.bookAdded.author.name} added (${subscriptionData.data.bookAdded.title})`)
      updateCacheWith(subscriptionData.data.bookAdded)
    }
  })

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token) {
      setToken(token)
    }
  }, [])

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
        {token !== null && <button onClick={() => setPage('recommend')}>recommend</button>}
        {token === null && <button onClick={() => setPage('loginForm')}>login</button>}
        {token !== null && <button onClick={logout}>logout</button>}
      </div>

      {error.length > 0 && <ErrorMessage message={error} />}

      <Authors
        show={page === 'authors' || (page === 'loginForm' && token !== null)}
        setError={showError}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      {(page === 'recommend' && token !== null) && <Recommend />}

      <LoginForm
        show={page === 'loginForm' && token === null}
        setError={showError}
        setToken={setToken}
      />

    </div>
  )
}

export default App