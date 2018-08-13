import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Card from './UI/Card';
import getBooksQuery from './queries/getBooks';

class BookList extends Component {
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


export default graphql(getBooksQuery)(BookList);