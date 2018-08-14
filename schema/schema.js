const graphql = require('graphql');
const {
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLID,
  GraphQLList
} = graphql;

const AuthorModel = require('../models/author_model');
const BookModel = require('../models/book_model');


const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return AuthorModel.findById(parent.authorId)
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    id: { type: GraphQLID },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return BookModel.find({ authorId: parent.id })
      }
    }
  })
})

const GenreType = new GraphQLObjectType({
  name: 'Genre',
  fields: () => ({
    name: { type: GraphQLString },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return BookModel.find({ genre: parent.name })
      }
    }
  })
})

// dèine RootQueryType
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { 
        name: { type: GraphQLString }
      },
      resolve(parent, args) {
        return BookModel.findOne({ name: args.name })
      }
    },
    author: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString }
      },
      resolve(parent, args) {
        return AuthorModel.findOne({ name: args.name })
      }
    },
    genre: {
      type: BookType,
      args: {
        name: { type: GraphQLString }
      },
      resolve(parent, args) {
        return 
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return BookModel.find({});
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return AuthorModel.find({ });
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorName: { type: GraphQLString },
      },
      async resolve(parent, { name, genre, authorName }) {
        // get authorId from author name
        let author = await AuthorModel.findOne({ name: authorName });
        // if this is a new author, create new author and return author id
        if(!author) {
          author = new AuthorModel({
            name: authorName
          });
          await author.save();
        }
        const authorId = author.id;
        console.log(authorId)
        // save new book to db
        const newBook = new BookModel({
          name, genre, authorId
        });
        await newBook.save();
        // return data
        return newBook;
      }
    },
    deleteBook: {
      type: BookType,
      args: {
        id: { type: GraphQLID }
      },
      async resolve(parent, { id }) {
        await BookModel.findByIdAndRemove(id);
      }
    },
    // filterBookByGenre: {
    //   type: BookType,
    //   args: {
    //     name: { type: GraphQLString }
    //   },
    //   async resolve(parent, { name }) {
    //     BookModel.find({ genre: name }, (err, data) => {
    //       return data;
    //     });
    //     return null;
    //   }
    // }
  }
})


module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})