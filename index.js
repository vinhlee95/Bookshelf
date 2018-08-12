const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const keys = require('./configs/keys');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());

mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
        .then(() => console.log('Connected to mLab'))
        .catch(err => console.log(err));

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));


app.listen(4000, () => console.log('App is running on port 4000'));