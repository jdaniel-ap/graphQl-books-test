const { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull, 
  GraphQLList} = require('graphql');

  const { getAllBooks,
          getSingleBook,
          getAllBooksFromAuthor,
          getAllAuthors,
          getSingleAuthor } = require('../model/bookModel');

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'This represents an Author of the book',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    books: {
      type: GraphQLList(BookType),
      resolve: (author) => {
        return getAllBooksFromAuthor(author.id)
      }
    }
  }),
});


const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'This represents a books written by an author',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    year: { type: GraphQLNonNull(GraphQLInt) },
    authorId: { type: GraphQLNonNull(GraphQLInt) },
    author: { 
      type: AuthorType,
      resolve: (book) => {
        return getSingleAuthor(book.authorId)
      } }
  }),
});

module.exports = {
  AuthorType,
  BookType,
}