const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorModel = new Schema({
  name: { type: String },
  age: { type: Number },
})

module.exports = mongoose.model('Author', authorModel);