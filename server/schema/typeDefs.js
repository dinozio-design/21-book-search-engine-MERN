// [TODO: DONE!] define the necessary Querry and Mutation types:

const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Auth {
    _id: ID
    token: String
    user: User
}

type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
}

type Book {
    _id: ID
    bookId: String
    title: String
    description: String
    iamge: String
    link: String
    authors: [String]
}

type Query {
    me: User
}

input BookInput {
    bookId: String
    title: String
    description: String
    iamge: String
    link: String
    authors: [String]
}

input userInput {
    _id: ID!
    username: String!
    email: String!
  }

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(bookMark: bookInput!, user: userInput!): User

}
`;

module.exports = typeDefs;

/*
* `Query` type:

            * `me`: Which returns a `User` type.
    	
* `Mutation` type:

            * `login`: Accepts an email and password as parameters; returns an `Auth` type.

            * `addUser`: Accepts a username, email, and password as parameters; returns an `Auth` type.

            * `saveBook`: Accepts a book author's array, description, title, bookId, image, and link as parameters; returns a `User` type. (Look into creating what's known as an `input` type to handle all of these parameters!)

            * `removeBook`: Accepts a book's `bookId` as a parameter; returns a `User` type.
        	
* `User` type:

            * `_id`

            * `username`

            * `email`

            * `bookCount`

            * `savedBooks` (This will be an array of the `Book` type.)

* `Book` type:

            * `bookId` (Not the `_id`, but the book's `id` value returned from Google's Book API.)

            * `authors` (An array of strings, as there may be more than one author.)

            * `description`

            * `title`

            * `image`

            * `link`

* `Auth` type:

            * `token`

            * `user` (References the `User` type.)
*/