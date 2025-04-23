const typeDefs = `
 type Book {
    title: String!,
    published: Int!,
    author: Author!,
    id: ID!,
    genres: String!
 }

 type Author {
    name: String!,
    id: ID!,
    born: Int,
    bookCount: Int!
 }
 
 type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}


 type Query {
    dummy: Int,
    bookCount: Int,
    authorCount: Int,
    allBooks(author: String, genre: String): [Book],
    allAuthors: [Author],
    me: User
  }
 type Mutation {
    addBook(
        title: String!,
        author: String!,
        published: Int!,
        genres: [String!]!
    ): Book
    editAuthor(
        name: String!,
        setBornTo: Int!
    ): Author
    createUser(
        username: String!
        favoriteGenre: String!
    ): User
    login(
        username: String!
        password: String!
    ): Token
 }
    type Subscription {
        bookAdded: Book!
 }    
`;

module.exports = typeDefs;
