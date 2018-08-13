import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { gql } from 'apollo-boost';
import Card from './UI/Card';
import getBooksQuery from './queries/getBooks';

class BookList extends Component {

  handleDeleteBook = (id) => {
    this.props.mutate({
      variables: {
        id 
      },
      refetchQueries: [{ query: getBooksQuery }],
    }).then(() => console.log(`Book with id ${id} has been deleted`));
  }

  render() {
    const { data } = this.props;
    let bookList = data.books ?
                    data.books.map(book => {
                      return(
                        <Card
                          key={book.id}
                          bookName={book.name}
                          genre={book.genre}
                          authorName={book.author.name}
                          className='book-card'
                          style={{
                            height: 200, width: 200
                          }}
                          onClick={() => this.handleDeleteBook(book.id)}
                        />
                      )
                    })
                    :
                    <p>Loading...</p>
                    
    return (
      <div className="book-list">
        {bookList}
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


export default compose(graphql(getBooksQuery),graphql(mutation))(BookList);