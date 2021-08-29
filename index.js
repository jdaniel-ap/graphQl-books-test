const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const { BookType, AuthorType, books, authors } = require('./type/appTypes')
const { GraphQLSchema } = require('graphql');


const { RootMutationType, rootQueryType } = require('./queries/root')

const app = express();


const schema = new GraphQLSchema({
  query: rootQueryType,
  mutation: RootMutationType
})

app.use('/graphql', expressGraphQL({
  schema: schema,
  graphiql: true
}));


app.listen(3000, () => console.log('server running on port', 3000));
