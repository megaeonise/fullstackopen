import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import { Routes, Route, useNavigate } from "react-router-dom";
import Recommend from "./components/Recommend";
import { useApolloClient, useSubscription } from "@apollo/client";

import { BOOK_ADDED, ALL_BOOKS } from "./queries";

export const updateCache = (cache, query, bookAdded) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.name;
      return seen.has(k) ? false : seen.add(k);
    });
  };
  cache.updateQuery(query, ({ allBooks }) => {
    return { allBooks: uniqByName(allBooks.concat(bookAdded)) };
  });
};

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [genreFilter, setGenreFilter] = useState("");
  const navigate = useNavigate();
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const bookAdded = data.data.bookAdded;
      window.alert(`${bookAdded.title} was added`);
      updateCache(
        client.cache,
        { query: ALL_BOOKS, variables: { genre: genreFilter } },
        bookAdded
      );
    },
  });

  return (
    <div>
      <div>
        <button
          onClick={() => {
            setPage("authors");
            navigate("/");
          }}
        >
          authors
        </button>
        <button
          onClick={() => {
            setPage("books");
            navigate("/books");
          }}
        >
          books
        </button>
        {!token && (
          <button
            onClick={() => {
              setPage("add");
              navigate("/login");
            }}
          >
            login
          </button>
        )}
        {token && (
          <button
            onClick={() => {
              setPage("add");
              navigate("/add");
            }}
          >
            add book
          </button>
        )}
        {token && (
          <button
            onClick={() => {
              setPage("books");
              navigate("/recommendation");
            }}
          >
            recommendation
          </button>
        )}
        {token && (
          <button
            onClick={() => {
              setPage("authors");
              setToken(null);
              localStorage.removeItem("library-user-token");
              client.resetStore();
            }}
          >
            logout
          </button>
        )}
      </div>

      <Routes>
        <Route
          path="/"
          element={<Authors show={page === "authors"} token={token} />}
        />
        <Route
          path="/books"
          element={
            <Books
              show={page === "books"}
              genreFilter={genreFilter}
              setGenreFilter={setGenreFilter}
            />
          }
        />
        <Route path="/add" element={<NewBook show={page === "add"} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/recommendation" element={<Recommend token={token} />} />
      </Routes>
    </div>
  );
};

export default App;
