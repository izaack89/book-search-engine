const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user) {
                const userData = await User.findOne({})
                .select('-__v -password')
                .populate('books')            
                return userData;
            }
            throw new AuthenticationError('User not logged in')
        },
    },
    Mutation: {
      //MUTATION that will be used to add an user
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);          
            return {token, user};
        },
        //MUTATION that will be used for the login
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});
            if(!user) {
                throw new AuthenticationError('The credentials entered do not match those on file.');
            }
            const correctPw = await user.isCorrectPassword(password);
            if(!correctPw) {
                throw new AuthenticationError('The credentials entered do not match those on file.');
            }
            const token = signToken(user);
            return {token, user};    
        },
        //MUTATION that will be used to save the book
        saveBook: async (parent, { bookData }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                  { _id: context.user._id },
                  { $push: { savedBooks: bookData } },
                  { new: true }
                );
        
                return updatedUser;
              }     
            throw new AuthenticationError('User not logged. Please loggin first!');
        },
        //MUTATION that will be used to remove a Book
        removeBook: async (parent, args, context) => {
            if(context.user) {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: args.bookId } } },
                { new: true }
            );
            return updatedUser;
            }
            throw new AuthenticationError('User not logged. Please loggin first!');
        }
    }
};


module.exports = resolvers;
