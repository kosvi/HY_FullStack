import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
      allAuthors {
          name,
          born,
          bookCount
      }
  }
`

export const ALL_BOOKS = gql`
  query($genre: String) {
      allBooks(genre: $genre) {
          title,
          author {
              name,
              born
          },
          published,
          genres,
          id
      }
  }
`

export const ALL_GENRES = gql`
  query {
      allGenres
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String]!) {
      addBook(
          title: $title,
          author: $author,
          published: $published,
          genres: $genres
      ) {
          title,
          author {
              name
          }
          published,
          genres
      }
  }
`

export const EDIT_YEAR = gql`
  mutation editYear($name: String!, $year: Int!) {
      editAuthor(name: $name, setBornTo: $year) {
          name, 
          born,
      }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
          value
      }
  }
`

export const ME = gql`
  query {
      me {
      username,
      favoriteGenre,
      id
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title,
      author {
        name,
        born
      },
      published,
      genres,
      id
    }
  }
`