import React, { Component,  } from 'react';
import { graphql, compose } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Tooltip, Zoom } from '@material-ui/core';
import { Query } from "react-apollo";

import _ from 'lodash';

import Card from './UI/Card';
import Modal from './UI/Modal';

import getBooksQuery from './queries/getBooks';
import filterBookByAuthor from './queries/filterBooksByAuthor';

class BookList extends Component {
  state = {
    showInfoModal: false,
    selectedBook: {
    }
  }

  handleSelectBook = (id, name, genre, author) => {
    this.setState({
      showInfoModal: true,
      selectedBook: {
        ...this.state.selectedBook,
        id, name, genre, author
      }
    })
  }


  handleDeleteBook = (e,id) => {
    e.stopPropagation();
    this.props.mutate({
      variables: {
        id 
      },
      refetchQueries: [{ query: getBooksQuery }],
    }).then(() => console.log(`Book with id ${id} has been deleted`));
  }

  render() {
    // get selected book info
    const { id, name, genre, author } = this.state.selectedBook;
    

    const { data } = this.props;
    let bookList = data.books ?
                    data.books.map(book => {
                      return(
                        <Tooltip 
                          key={book.id}
                          title='View book details' 
                          placement='top'
                          TransitionComponent={Zoom} >
                          <div
                            onClick={() => this.handleSelectBook(book.id, book.name, book.genre, book.author.name)}
                            className='book-card-container'
                          >
                            <Card
                              bookName={book.name}
                              genre={book.genre}
                              authorName={book.author.name}
                              className='book-card'
                              style={{
                                height: 200, width: 200
                              }}
                              onClick={(e) => this.handleDeleteBook(e,book.id)}
                            />
                          </div>
                        </Tooltip>
                      )
                    })
                    :
                    <p>Loading...</p>
                    
    return (
      <div className="book-list">
        {bookList}
        {
          this.state.showInfoModal
          ?
          <Modal
            open={this.state.showInfoModal}
            handleCloseModal={() => this.setState({ showInfoModal: false })}
            className='book-detail-card'
          >
            <div>
              <h2>{name}</h2>
              <p>{genre}</p>
              <p style={{ fontSize: 18, fontWeight: 'bold' }}>{author}</p>

              {
                this.state.selectedBook
                ?
                <Query query={filterBookByAuthor} variables={{ name: this.state.selectedBook.author}} >
                  {(data, loading, error) => {
                    if(loading) {
                      return <p>Loading...</p>;
                    }

                    if(error) {
                      return <p>Unexpected error occured</p>
                    }
                    const bookData = data.data; 
                    let books = !_.isEmpty(bookData) 
                                ? 
                                bookData.author.books.filter(book => book.name !== this.state.selectedBook.name)
                                : null
                    console.log(books)
                    if(_.isEmpty(books)) {
                      return (
                        <p>There is no book written by {this.state.selectedBook.author} in your collection.</p>
                      )
                    }
                    return(
                      <div className='related-book-container'>
                        { books && books.map(book => {
                          return(
                            <div key={book.id}>
                              <p style={{fontStyle: 'italic'}}>Also by {author}</p>
                              <div 
                                className='related-book-card' >
                                <h3>{book.name}</h3>
                                <p>{book.genre}</p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )
                  }}
                </Query>
                : null
              }
              
            </div>
          </Modal>
          : null
        }
      </div>
    )
  }
}

const mutation = gql`
  mutation DeleteBook($id: ID) {
    deleteBook(id: $id) {
      id
    }
  }
`




export default compose(
  graphql(getBooksQuery),
  graphql(mutation))
(BookList);