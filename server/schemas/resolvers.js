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
			// if no user found
			throw new AuthenticationError("Not logged in");
		},
	},

	Mutation: {
		//add a user
		addUser: async (parent, args) => {
			const user = await User.create(args);
			const token = signToken(user);

			return { token, user };
		},
		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw new AuthenticationError("Incorrect username or password");
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError("Incorrect username or password");
			}

			const token = signToken(user);
			return { token, user };
		},

		// Save a Book
		saveBook: async (parent, { content }, context) => {
			// check for user
			if (context.user) {
				const user = await User.findByIdAndUpdate(
					//where
					{ _id: context.user._id },
					//how to update user
					{ $push: { savedBooks: content } },
					// create a new list
					{ new: true }
				);

				return user;
			}
			throw new AuthenticationError("You need to be logged in to do that!");
		},

		// Remove a Book
		removeBook: async (parent, { bookId }, context) => {
			// check for user
			if (context.user) {
				const user = await User.findByIdAndUpdate(
					//where
					{ _id: context.user._id },
					//how to update user
					{ $pull: { savedBooks: { bookId: bookId } } },
					// create a new list
					{ new: true }
				);

				return user;
			}
			throw new AuthenticationError("You need to be logged in to do that!");
		},
	},
};

// Export resolvers
module.exports = resolvers;
