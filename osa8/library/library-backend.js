const { ApolloServer, PubSub, UserInputError, AuthenticationError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const config = require('./utils/config')
const lodash = require('lodash')

console.log('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI).then(() => {
  console.log('connected to Mongo')
}).catch((error) => {
  console.error('error connecting to MongoDB:', error.message)
})

const pubsub = new PubSub()

const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author]!
    allGenres: [String]!
    me: User
  }
  type Subscription {
    bookAdded: Book!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    books: [Book]!
    id: ID!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
`

const resolvers = {
  Query: {
    bookCount: () => {
      console.log('Book.collection')
      return Book.collection.countDocuments()
    },
    authorCount: () => {
      console.log('Author.collection')
      return Author.collection.countDocuments()
    },
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        console.log('Book.find')
        return await Book.find({}).populate('author')
      }
      console.log('Book.find')
      let filteredBooks = await Book.find({}).populate('author')
      if (args.author) {
        filteredBooks = filteredBooks.filter(b => b.author.name === args.author)
      }
      if (args.genre) {
        filteredBooks = filteredBooks.filter(b => b.genres.find(g => g == args.genre))
      }
      return filteredBooks
    },
    allAuthors: async () => {
      console.log('Author.find')
      return await Author.find({}).populate('books')
    },
    allGenres: async () => {
      console.log('Book.find')
      const books = await Book.find({})
      const genres = lodash.uniq(lodash.flattenDeep(lodash.map(books, 'genres')))
      return genres
    },
    me: (root, args, context) => context.currentUser
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      let author = await Author.findOne({ name: args.author }).populate('books')
      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
      }
      try {
        const book = new Book({ title: args.title, published: args.published, author: author, genres: args.genres })
        await book.save()
        author.books = author.books.concat(book._id)
        author.save()
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      const author = await Author.findOne({ name: args.name })
      if (author) {
        author.born = args.setBornTo
        try {
          return await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
      }
      return null
    },
    createUser: async (root, args) => {
      try {
        const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
        return await user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== config.PASSWORD) {
        throw new UserInputError('wrong credentials')
      }
      const userToken = {
        username: user.username,
        id: user._id
      }
      return { value: jwt.sign(userToken, config.JWT_SECRET) }
    }
  },
  Author: {
    bookCount: async (root) => {
      const author = root
      //      return await (await Book.find({ author: author })).length
      return root.books.length
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), config.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
