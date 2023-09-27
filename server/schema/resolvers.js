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
        // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
        addUser: async (parent, { username, email, password }) => {
            try {
                const user = await User.create({ username, email, password });
                if (!user) {
                    return res.status(400).json({ message: 'Something is wrong!' });
                }
                const token = signToken(user);
                return { token, user };
            } catch (err) {
                console.error(err);
            };

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

