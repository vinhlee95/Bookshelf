const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String
})

bookSchema.static.getBooks = function(name) {
  return this.find({
    name
  })
  .then(res => console.log(res))
  .catch(err => console.log(err));
}

module.exports = mongoose.model('Book', bookSchema);


