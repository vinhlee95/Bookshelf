import { gql } from 'apollo-boost';

export default gql`
  query Author($name: String) {
    author(name: $name) {
      books {
        id
        name
        genre
      }
    }
  }
`;