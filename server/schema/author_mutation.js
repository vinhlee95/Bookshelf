const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} = graphql;
const AuthorType = require('./author_type');
const AuthorModel = require('../models/author_model');

const AuthorMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // add author mutation
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      async resolve(parent, args) {
        let newAuthor = new AuthorModel({
          name: args.name,
          age: args.age
        });
        await newAuthor.save();
        return newAuthor;
      }
    },
    
    // delete author mutation
    deleteAuthor: {
      type: AuthorType, 
      args: {
        name: { type: GraphQLString }
      },
      async resolve(parent, args) {
        try {
          const deletedAuthor = await AuthorModel.findOneAndRemove({
            name: args.name
          });
          return `${deletedAuthor.name} has been deleted`;
        } catch(err) {
          console.log(err)
        }
      }
    }
  }
})


module.exports = AuthorMutation;