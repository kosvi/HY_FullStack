import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_YEAR } from '../misc/queries'

const EditYear = ({ authors, setError }) => {

  // we assume that there is atleast one author in the array
  // else I guess we would have no reason to even render the whole component
  const [year, setYear] = useState('')
  const [author, setAuthor] = useState(authors[0].name)

  const [editYear] = useMutation(EDIT_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  const submit = (event) => {
    event.preventDefault()
    editYear({ variables: { name: author, year: parseInt(year, 10) } })
    setYear('')
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <select onChange={({ target }) => setAuthor(target.value)}>
            {
              authors.map(a => <option key={a.name} value={a.name}>{a.name}</option>)
            }
          </select>
        </div>
        <div>
          born <input value={year} onChange={({ target }) => setYear(target.value)} />
        </div>
        <div>
          <button type='submit'>update author</button>
        </div>
      </form>
    </div>
  )
}

const Authors = (props) => {

  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>Loading...</div>
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <EditYear authors={authors} setError={props.setError} />
    </div>
  )
}

export default Authors