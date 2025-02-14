import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";

const User = ({ users }) => {
  console.log(users);
  if (users === null) {
    return <></>;
  } else {
    return (
      <>
        <h1>Users</h1>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link
                    to={`/users/${user.id}`}
                    component={RouterLink}
                    sx={{ color: "#DD7F50" }}
                  >
                    {user.name}
                  </Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
};

export default User;
