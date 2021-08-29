const { BookType, AuthorType, books, authors } = require('../type/appTypes')
const { 
        GraphQLObjectType,
        GraphQLList,
        GraphQLString,
        GraphQLInt,
        GraphQLNonNull
       } = require('graphql');

       const { addBook,
        getAllBooks,
        getSingleBook,
        getAllBooksFromAuthor,
        addAuthor,
        getAllAuthors,
        getSingleAuthor } = require('../model/bookModel');

const rootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query',
  fields: () => ({
    book: {
      type: BookType,
      description: 'A Single Book',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => getSingleBook(args.id)
    },
    books: {
      type: GraphQLList(BookType),
      description: 'List All Books',
      resolve: () => getAllBooks(),
    },
    author: {
      type: AuthorType,
      description: 'A Single Author',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) =>  getSingleAuthor(args.id)
    },
    booksFromAuthor: {
      type: GraphQLList(BookType),
      description: 'All Books from an Author',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => getAllBooksFromAuthor(args.id)
    },
    authors: {
      type: GraphQLList(AuthorType),
      description: 'List All Authors',
      resolve: () => getAllAuthors(),
    }
  }),
});


const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    addBook: {
      type: BookType,
      description: 'Add a book',
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        year: { type: GraphQLNonNull(GraphQLInt) },
        authorId: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve: (parent, args) => {
        const book = { id: args.id, name: args.name, year: args.year, authorId: args.authorId }
        addBook(book)
        return book
      }
    },
    addAuthor: {
      type: AuthorType,
      description: 'Add an author',
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: (parent, args) => {
        const author = { id: args.id, name: args.name }
        addAuthor(author)
        return author
      }
    }
  })
})


module.exports = {
  rootQueryType,
  RootMutationType
}