// [TODO: Done!] implement Apollo Server and apply it to the Express server as middleware
//Importing Apollo Server Express
const { ApolloServer} = require('apollo-server-express');

// import gql typeDefs and resolvers
const {typeDefs, resolvers} = require('./schema')

const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

// Creating new instance of apollo server class with the configuration
const server = new ApolloServer({
  typeDefs,
  resolvers
});

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// -> must deprecare the next line
app.use(routes);

// creating new instance of Apollo Server here
const startApolloServer = async () =>{
  await server.start();
  server.applyMiddleware({app});

  db.once('open', () => {
    app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
  });
};

//starting the server
startApolloServer();

