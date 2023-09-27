// [TODO:] define the query and mutation functionality to work with the Mongoose models
// use functionality in the user-controller.js as a guide

// importing user model
const { User, Book } = require('../models');

// imporing sign token function from auth
const { signToken } = require('../utils/auth');

// creating query function according to typeDefs
const resolvers = {
    Query: {
        //get all documents from "me" collection from typeDefs
        me: async () => {
            return (await User.find({})).populate('savedBooks');
        }
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {

        },
        login: async (parent, { email, password }) => {

        },
        saveBook: async (parent, { bookMark, user }) => {

        },
        removeBook: async (parent, { bookId, userId }) => {

        }
    }

};

module.exports = resolvers;

