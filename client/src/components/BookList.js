import React, { Component } from 'react';
import {gql} from 'apollo-boost';
import { graphql } from 'react-apollo';
import Card from './UI/Card';

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
                        />
                      )
                    })
                    :
                    <p>Loading...</p>
                    
    console.log(this.props)
    return (
      <div className="book-list">
        {bookList}
      </div>
    )
  }
}

const getBooksQuery = gql `
  {
    books {
      name
      genre
      id
      author {
        name
      }
    }
  }
`;


export default graphql(getBooksQuery)(BookList);