// [TODO:] define the query and mutation functionality to work with the Mongoose models
// use functionality in the user-controller.js as a guide

// importing user model
const { User, Book } = require('../models');

// imporing sign token function from auth
const { signToken } = require('../utils/auth');

//importing autentification checker from apollo server
const { AuthenticationError } = require('apollo-server-express');

// creating query function according to typeDefs
const resolvers = {
    Query: {
        //get all documents from "me" collection from typeDefs
        me: async (parent, args, context) => {
            if (context._id) {
                const user = await User.findById(context._id);
                return user
            }
            throw new AuthenticationError('Log in first!');
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
        // login a user, sign a token, and send it back (to client/src/components/LoginForm.js) 
        login: async (parent, { email, password }) => {
            // find user by email 
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('No profile with this email found!');
            };
            // verify password
            const correctPw = await profile.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect password!');
            };
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { bookMark, user }, context) => {
            // using conexts here. If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
            try {
                if (context.user) {
                    return User.findOneAndUpdate(
                        { _id: context.user._id },
                        {
                            $addToSet: { savedBooks: bookMark },
                        },
                        {
                            new: true,
                            runValidators: true,
                        }
                    );
                };
                //if user is not logged in it throws and error
                throw new AuthenticationError('You need to be logged in!');
            } catch (err) {
                console.error(err);
            }
        },
        removeBook: async (parent, { bookId, userId }, context) => {
            try {
                if (context.user) {
                    return User.findOneAndUpdate(
                        { _id: userId },
                        { $pull: { savedBooks: bookId } },
                        { new: true }
                    );
                }
                throw new AuthenticationError('Could not find user with this id!');
            } catch (err) {
                console.error(err);
            }
        }
    }

};

module.exports = resolvers;

