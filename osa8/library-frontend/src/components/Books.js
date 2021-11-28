import React, { useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../misc/queries'
import { useState } from 'react/cjs/react.development'

const Genres = ({ genres, setGenre }) => {
  return (
    <div>
      {genres.map(g =>
        <button key={g} onClick={() => setGenre(g)}>{g}</button>
      )}
      <button onClick={() => setGenre(null)} >all genres</button>
    </div>
  )
}

const Books = (props) => {

  const [getBooks, result] = useLazyQuery(ALL_BOOKS)
  const [genre, setGenre] = useState(null)
  const genreResult = useQuery(ALL_GENRES)

  useEffect(() => {
    getBooks()
  }, [getBooks])

  if (!props.show) {
    return null
  }

  if (result.loading || genreResult.loading) {
    return <div>Loading...</div>
  }

  const showGenre = (genre) => {
    getBooks({ variables: { genre: genre } })
    setGenre(genre)
  }

  const books = result.data.allBooks
  const genres = genreResult.data.allGenres

  return (
    <div>
      <h2>books</h2>
      {genre!==null && <div>in genre <b>{genre}</b></div>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <Genres genres={genres} setGenre={showGenre} />
    </div>
  )
}

export default Books