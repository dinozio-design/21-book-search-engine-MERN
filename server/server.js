// [TODO: Done!] implement Apollo Server and apply it to the Express server as middleware
//Importing Apollo Server Express
const { ApolloServer } = require('apollo-server-express');
// import gql typeDefs and resolvers
const { typeDefs, resolvers } = require('./schema')
// importing authMiddleware for connecting to gql
const { authMiddleware } = require('./utils/auth');

const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

// Creating new instance of apollo server class with the configuration
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// -> must deprecare the next line
// app.use(routes);

// creating new instance of Apollo Server here
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

//starting the server
startApolloServer();

