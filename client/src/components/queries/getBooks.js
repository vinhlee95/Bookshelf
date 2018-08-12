import { gql } from 'apollo-boost';

export default gql `
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