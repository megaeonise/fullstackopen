import { gql, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
const ALL_BOOKS = gql`
  query AllBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
      id
    }
  }
`;
const GENRE_INFO = gql`
  query {
    me {
      favoriteGenre
      id
    }
  }
`;
const Recommend = ({ token }) => {
  if (!token) {
    return null;
  }
  const [favorite, setFavorite] = useState("");
  const genreInfo = useQuery(GENRE_INFO, {});
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: favorite },
    pollInterval: 2000,
  });

  useEffect(() => {
    if (genreInfo.data) {
      if (genreInfo.data.me) {
        return setFavorite(genreInfo.data.me.favoriteGenre);
      }
      genreInfo.refetch();
    }
  }, [genreInfo.data]);

  if (result.loading || genreInfo.loading) {
    return <div>loading...</div>;
  }
  const books = result.data.allBooks;

  const filteredBooks = books;
  // useEffect(() => {
  //   console.log("rerender");
  // }, []);
  return (
    <div>
      <h2>books in your favorite genre {favorite}</h2>
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
    </div>
  );
};

export default Recommend;
