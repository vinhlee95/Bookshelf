import React, { Component } from 'react';
import { TextField } from '@material-ui/core';

import BookList from './BookList';
import Button from './UI/Button';
import Modal from './UI/Modal';


class App extends Component {
  state = {
    showAddBookModal: false,
    bookName: '', genre: '', author: ''
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };


  render() {
    console.log(this.state)
    return (
      <div className="App">
        <h1>My books</h1>
        <BookList />
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

export default App;
