import { useQuery, useSubscription } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS, GENRES, BOOK_ADDED } from "../queries";

const Books = (props) => {
  if (!props.show) {
    return null;
  }
  const [genreFilter, setGenreFilter] = useState("");
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: genreFilter },
    pollInterval: 2000,
  });
  const bookGenres = useQuery(GENRES, {
    pollInterval: 2000,
  });

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      console.log(data, client);
      client.cache.inspectFields("Query");
      client.cache.updateQuery({ query: ALL_BOOKS }, (data) => {
        console.log(data, "WHY");
        // return {
        //   allBooks: allBooks.concat(addedBook),
        // };
      });
    },
  });
  if (result.loading || bookGenres.loading) {
    return <div>loading...</div>;
  }
  const books = result.data.allBooks;
  const genreList = bookGenres.data.allBooks;
  let genres = [];
  for (let i = 0; i < Object.keys(genreList).length; i++) {
    const genre = genreList[i].genres.split(", ");
    genres = genre.reduce((accumulator, currentValue) => {
      if (!accumulator.includes(currentValue)) {
        accumulator.push(currentValue);
      }
      return accumulator;
    }, genres);
  }
  const filteredBooks = books;

  return (
    <div>
      <h2>books</h2>
      {genreFilter && (
        <div>
          in genre <b>{genreFilter}</b>
        </div>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => {
            setGenreFilter(genre);
            result.refetch();
          }}
        >
          {genre}
        </button>
      ))}
      <button
        onClick={() => {
          setGenreFilter("");
          result.refetch();
        }}
      >
        all genres
      </button>
    </div>
  );
};

export default Books;
