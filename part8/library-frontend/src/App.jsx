import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import { Routes, Route, useNavigate } from "react-router-dom";
import Recommend from "./components/Recommend";
import { useApolloClient } from "@apollo/client";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const client = useApolloClient();

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
        <Route path="/books" element={<Books show={page === "books"} />} />
        <Route path="/add" element={<NewBook show={page === "add"} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/recommendation" element={<Recommend token={token} />} />
      </Routes>
    </div>
  );
};

export default App;
