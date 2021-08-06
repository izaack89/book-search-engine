import { gql } from '@apollo/client';

//Mutation for the login
export const LOGIN_USER = gql`
mutation loginUser($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
    }
  }
}
`;
//Mutation for the Add user 
export const ADD_USER = gql`
mutation addUser($username: String!, $password: String!, $email: String!) {
  addUser(username: $username, password: $password, email: $email) {
    
    user {
      _id
      username
      email
      bookCount
      savedBooks {
        authors
        bookId
        image
        link
        title
        description
      }
    }
    token
  }
}
`;
//Mutation for save a book
export const SAVE_BOOK = gql`
    mutation saveBook($input: savedBook!) {
    saveBook (input: $input)
        {
            _id
            username
            email
            bookCount
            savedBooks {
                # _id
                bookId
                authors
                image
                link
                title
                description
            }
        }
    }
`;
//Mutation to remove a book
export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID!) {
        removeBook(bookId:$bookId) {
            _id
            username
            email
            bookCount
            savedBooks {
                # _id
                bookId
                authors
                image
                link
                title
                description
            }
        }
}
`;