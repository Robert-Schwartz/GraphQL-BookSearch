const { AuthenticationError } = require("apollo-server-express");
const { User, Book } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id }).select(
                    "-__v -password"
                );

                return userData;
            }

            throw new AuthenticationError("Not logged in");
        },
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError("Incorrect credentials");
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError("Incorrect credentials");
            }

            const token = signToken(user);
            return { token, user };
        },

        saveBook: async (parent, { bookData }, context) => {
            // check for user
            if (context.user) {
                const user = await User.findByIdAndUpdate(
                    //where
                    { _id: context.user._id },
                    //how to update user
                    { $push: {savedBooks: bookData } },
                    // create a new list
                    { new: true }
                );

                return user;
            }
            throw new AuthenticationError("You need to be logged in!");
        }
    }
}

    module.exports = resolvers;