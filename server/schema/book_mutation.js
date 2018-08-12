const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} = graphql;
const BookType = require('./book_type');
const BookModel = require('../models/book_model');

const BookMutation = new GraphQLObjectType({
  name: 'BookMutation',
  fields: {
    type: BookType,
    args: {
      name: { type: GraphQLString },
      genre: { type: GraphQLString },
      authorId: { type: GraphQLID }
    },
    async resolve(parent, { name, genre, authorId }) {
      try {
        const newBook = new BookModel({
          name, genre, authorId
        })
        await newBook.save():
        return newBook;
      } catch(err) {
        console.log(err)
      }
    }
  }
})

module.exports = BookMutation;