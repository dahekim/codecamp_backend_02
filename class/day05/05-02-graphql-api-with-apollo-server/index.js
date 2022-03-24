//const { ApolloServer, gql } = require('apollo-server');
import { ApolloServer, gql } from 'apollo-server'
const port = 3000

// The GraphQL schema
// Graphql type
const myTypeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
    fetchBoards: Int!
  }
`;

// A map of functions which return data for the schema.
// 이런 API를 resolver라고 부른다
const myResolvers = {
  Query: {
    hello: () => 'world',
  },
};

const server = new ApolloServer({
  typeDefs: myTypeDefs,
  resolvers: myResolvers,
});

server.listen(port).then(({ url }) => {
  console.log(`🚀 Server ready at ${url} on port ${port}`);
});