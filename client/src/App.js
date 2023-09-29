import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// using apollo client instead
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';


//[TODO:] Create an Apollo Provider to make every request work with the Apollo Server
//making gql link dynamic
const httpLink = createHttpLink({
  uri: '/graphql',
});
// setting up apollo client
const client = new ApolloClient({
  uri: httpLink,
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      {/* Wrap page elements in Router component to keep track of location state */}
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route
              path='/'
              element={<SearchBooks />}
            />
            <Route
              path='/saved'
              element={<SavedBooks />}
            />
            <Route
              path='*'
              element={<h1 className='display-2'>Wrong page!</h1>}
            />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
