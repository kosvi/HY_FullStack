import { useLazyQuery, useQuery } from '@apollo/client'
import React from 'react'
import { useEffect } from 'react/cjs/react.development'
import { ALL_BOOKS, ME } from '../misc/queries'

const Books = ({ genre }) => {

    const [getBooks, result] = useLazyQuery(ALL_BOOKS)

    useEffect(() => {
        getBooks({ variables: { genre: genre } })
    }, [getBooks, genre])

    if (result.loading || !result.data) {
        return <div>Loading...</div>
    }

    const books = result.data.allBooks

    return (
        <div>      <table>
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
        </div>
    )
}

const Recommend = (props) => {

    const result = useQuery(ME)

    if (result.loading) {
        return <div>Loading...</div>
    }

    const me = result.data.me

    return (
        <div>
            <h2>recommendations</h2>
            books in your favorite genre <b>{me.favoriteGenre}</b>
            <Books genre={me.favoriteGenre} />
        </div>
    )
}

export default Recommend