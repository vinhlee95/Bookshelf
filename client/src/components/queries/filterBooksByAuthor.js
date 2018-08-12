import { gql } from 'apollo-boost';

export default gql`
  query FilterBooksByAuthor($name: String) {
    author(name: $name) {
      name
      books: {
        name
        genre
      }
    }
  }
`;