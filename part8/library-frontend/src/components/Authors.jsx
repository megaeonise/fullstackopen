import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`;

const EDIT_AUTHOR = gql`
  mutation ($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;

const Authors = (props) => {
  // if (!props.show) {
  //   return null;
  // }
  const [born, setBorn] = useState("");
  const [name, setName] = useState("");
  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 2000,
  });
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    // refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      console.log(messages);
    },
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        console.log(response.data.editAuthor, allAuthors);
        return {
          allAuthors: allAuthors.concat(response.data.editAuthor),
        };
      });
    },
  });
  if (result.loading) {
    return <div>loading...</div>;
  }
  const authors = result.data.allAuthors;

  const submit = async (event) => {
    event.preventDefault();
    if (name !== "") {
      await editAuthor({ variables: { name, setBornTo: parseInt(born) } });
      setBorn("");
    }
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.token && (
        <form onSubmit={submit}>
          <h2>Set birthyear</h2>
          <select value={name} onChange={(e) => setName(e.target.value)}>
            <option>select author</option>
            {authors.map((a) => (
              <option key={a.id} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
          <div>
            born
            <input
              type="number"
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type="submit">update author</button>
        </form>
      )}
    </div>
  );
};

export default Authors;
