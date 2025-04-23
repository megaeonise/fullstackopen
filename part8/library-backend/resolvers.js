const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");
const { GraphQLError, subscribe } = require("graphql");
const { v1: uuid } = require("uuid");
const jwt = require("jsonwebtoken");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

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
      const books = await Book.find({}).populate("author");
      let count = 0;
      for (let i = 0; i < books.length; i++) {
        if (books[i].author.name === root.name) {
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
      pubsub.publish("BOOK_ADDED", { bookAdded: populatedBook });
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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
