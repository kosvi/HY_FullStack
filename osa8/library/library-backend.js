const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const config = require('./utils/config')
// v1??? source: https://fullstackopen.com/osa8/graph_ql_palvelin
// const { v1: uuid } = require('uuid')

console.log('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI).then(() => {
  console.log('connected to Mongo')
}).catch((error) => {
  console.error('error connecting to MongoDB:', error.message)
})

/*
const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks: [Book]!
  }
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
`
const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      return await Book.find({})
    }
  }
}
*/
const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author]!
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
  }
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return await Book.find({}).populate('author')
      }
      let filteredBooks = await Book.find({}).populate('author')
      if (args.author) {
        filteredBooks = filteredBooks.filter(b => b.author.name === args.author)
      }
      if (args.genre) {
        filteredBooks = filteredBooks.filter(b => b.genres.find(g => g == args.genre))
      }
      return filteredBooks
    },
    allAuthors: async () => await Author.find({})
  },
  Mutation: {
    addBook: async (root, args) => {
      //      if (!Author.find({}).find(a => a.name === args.author)) {
      let author = await Author.findOne({ name: args.author })
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
      const book = new Book({ title: args.title, published: args.published, author: author, genres: args.genres })
      return await book.save()
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if (author) {
        author.born = args.setBornTo
        return await author.save()
      }
      return null
    }
  },
  Author: {
    bookCount: async (root) => {
      /*
      const reducer = (prev, current) => {
        if (root.name === current.author) {
          return prev + 1
        }
        return prev
      }
      */
     // does not work for now!
      const author = Author.findOne({ name: root.name })
      return await (await Book.find({ author: author.id })).length // .reduce(reducer, 0)
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
