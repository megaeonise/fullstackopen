const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI;
console.log(uuid().split("-").join("").slice(0, 24));
console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

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
`;

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate("author");
      if (Object.keys(args).length > 1) {
        if (args.author && args.genre) {
          const filtered_books = books.filter(
            (book) => book.author === args.author
          );
          return filtered_books.filter((book) =>
            book.genres.includes(args.genre)
          );
        }
      }
      if (args.author) {
        return books.filter((book) => book.author === args.author);
      } else if (args.genre) {
        return books.filter((book) => book.genres.includes(args.genre));
      }

      return books;
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => context.currentUser,
  },
  Book: {
    genres: (root) => root.genres.join(", "),
  },
  Author: {
    bookCount: async (root) => {
      const books = Book.find({});
      let count = 0;
      for (let i = 0; i < books.length; i++) {
        if (books[i].author === root.name) {
          count++;
        }
      }
      return count;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      console.log(args);
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const author_name = args.author;
      let author_id = uuid().split("-").join("").slice(0, 24);
      const book_id = uuid().split("-").join("").slice(0, 24);
      const book = new Book({ ...args, _id: book_id });
      const author = await Author.findOne({ name: author_name });

      if (!author) {
        // const author_id = uuid().split("-").join("").slice(0, 24);
        const author = new Author({
          name: author_name,
          _id: author_id,
          bookCount: 1,
        });
        try {
          await author.save();
        } catch (error) {
          throw new GraphQLError("Saving author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.title,
              error,
            },
          });
        }
      } else {
        author.bookCount += 1;
        author_id = author._id;
        try {
          await author.save();
        } catch (error) {
          throw new GraphQLError("Saving author failed", {
            extensions: {
              invalidArgs: error,
            },
          });
        }
      }
      book.author = author_id;
      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      }
      const populatedBook = await book.populate("author");
      return populatedBook;
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const author = await Author.findOne({ name: args.name });
      if (!author) {
        return null;
      }
      author.born = args.setBornTo;
      // authors = authors.map((author) => {
      //   return author.name === args.name ? updatedAuthor : author;
      // });
      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError("Saving author failed", {
          extensions: {
            invalidArgs: error,
          },
        });
      }
      return author;
    },
    createUser: async (root, args) => {
      const user = new User({
        ...args,
        _id: uuid().split("-").join("").slice(0, 24),
      });
      try {
        await user.save();
      } catch (error) {
        throw new GraphQLError("registering user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: error,
          },
        });
      }
      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
