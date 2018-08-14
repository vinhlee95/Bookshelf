import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import {gql} from 'apollo-boost';
import { graphql } from 'react-apollo';


import BookList from './BookList';
import Button from './UI/Button';
import Modal from './UI/Modal';

import getBooksQuery from './queries/getBooks';
import Filter from './Filter';


class App extends Component {
  state = {
    showFilter: false, filterResultsShowed: false,
    showAddBookModal: false,
    bookName: '', genre: '', author: '',
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleAddBook = () => {
    const { bookName, genre, author } = this.state;
    this.props.addBook({
      variables: {
        name: bookName,
        genre,
        authorName: author
      },
      refetchQueries: [{ query: getBooksQuery }]
    }).then(() => {
      this.setState({ showAddBookModal: false })
      console.log(`Book named ${bookName} has been added to your list`)
    }
    );
  }

  render() {
    const { showFilter } = this.state;
    return (
      <div className="App">
        <h1>My books</h1>
        <Button 
          variant='contained'
          label={showFilter?'Cancel':'Filter'}
          onClick={() => this.setState({ showFilter: !showFilter })}
          style={{ margin: 0, marginBottom: 20 }}
        />
        {
          showFilter
          ?
          <Filter 
            handleShowFilterResults={() => console.log('Results showed!')}
          />
          : 
          <BookList />
        }
        <div className='button'>
          <Button 
            onClick={() => this.setState({ showAddBookModal: !this.state.showAddBookModal})}
            AddIcon
          />
          <Modal 
            open={this.state.showAddBookModal}
            handleCloseModal={() => this.setState({ showAddBookModal: false })}
          >
            <h2>Add books</h2>
              <TextField
                label="Name"
                value={this.state.bookName}
                placeholder="Book Name"
                fullWidth
                onChange={this.handleChange('bookName')}
                style={{
                  marginBottom: 15
                }}
              />
              <TextField
                label="Genre"
                value={this.state.genre}
                placeholder="Business, Sci-Fi..."
                fullWidth
                onChange={this.handleChange('genre')}
                style={{
                  marginBottom: 15
                }}
              />
              <TextField
                label="Author"
                value={this.state.author}
                placeholder="Author name"
                fullWidth
                onChange={this.handleChange('author')}
                style={{
                  marginBottom: 30
                }}
              />
              <Button
                variant='contained'
                label='ADD'
                onClick={this.handleAddBook}
                fullWidth
                style={{ margin: 0 }}
              />
          </Modal>
        </div>
      </div>
    );
  }
}

const addBookMutation = gql`
  mutation AddBook($name: String, $genre: String, $authorName: String) {
    addBook(name: $name, genre: $genre, authorName: $authorName) {
      name
      genre
      author {
        name
      }
    }
  }
`;

export default graphql(addBookMutation, { name: "addBook" })(App);
