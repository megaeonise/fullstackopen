import { gql } from "@apollo/client";

const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    name
    born
    bookCount
    id
  }
`;
const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    id
    author {
      name
      born
    }
    published
    genres
  }
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`;

export const EDIT_AUTHOR = gql`
  mutation ($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`;

export const ALL_BOOKS = gql`
  query ($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;
export const GENRES = gql`
  query ($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      genres
    }
  }
`;

export const LOGIN = gql`
  mutation ($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const NEW_BOOK = gql`
  mutation (
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const GENRE_INFO = gql`
  query {
    me {
      favoriteGenre
      id
    }
  }
`;
