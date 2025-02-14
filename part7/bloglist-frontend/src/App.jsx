import { useState, useEffect, useRef, useCallback } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Message from "./components/Message";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import { useDispatch, useSelector } from "react-redux";
import { setBlog } from "./reducers/blogReducer";
import { setNotification, setError } from "./reducers/messageReducer";
import { setUser, removeUser, setUsers } from "./reducers/userReducer";
import {
  Routes,
  Route,
  Link as RouterLink,
  useNavigate,
  useMatch,
} from "react-router-dom";
import User from "./components/User";
import UserInfo from "./components/UserInfo";
import BlogInfo from "./components/BlogInfo";
import {
  Container,
  TableContainer,
  Paper,
  TableBody,
  TableRow,
  Table,
  TableCell,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Link,
  Button,
  Box,
} from "@mui/material";
import { palette } from "@mui/system";

const App = () => {
  const blogs = useSelector((state) => state.blog);
  const errorMessage = useSelector((state) => state.message[0]);
  const isError = useSelector((state) => state.message[1]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.user[0]);
  const users = useSelector((state) => state.user[1]);
  const [heading, setHeading] = useState("log in to application");
  const dispatch = useDispatch();

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      color: {
        cyan: "#00ffad",
        blue: "#0051ff",
        pink: "#ff0051",
        violet: "#6500f3",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            color: "#6500f3",
            borderColor: "#6500f3",
          },
        },
        defaultProps: {
          variant: "outlined",
          size: "small",
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: "#cf005f",
          },
        },
      },
    },
  });

  useEffect(() => {
    loginService.getAll().then((users) => dispatch(setUsers(users)));
  }, []);

  const Menu = () => {
    const padding = {
      paddingRight: 5,
    };
    if (users !== null) {
      const userMatch = useMatch("/users/:id");
      const blogMatch = useMatch("/blogs/:id");
      const matchedUser = userMatch
        ? users.find((user) => user.id === userMatch.params.id)
        : null;
      const matchedBlog = blogMatch
        ? blogs.find((blog) => blog.id === blogMatch.params.id)
        : null;
      return (
        <Box>
          <Box>
            <Link
              component={RouterLink}
              style={padding}
              to="/"
              sx={{ color: "#DD7F50" }}
            >
              blogs
            </Link>
            <Link
              component={RouterLink}
              style={padding}
              to="/users"
              sx={{ color: "#DD7F50" }}
            >
              users
            </Link>
          </Box>
          <Routes>
            <Route path="/users" element={<User users={users} />} />
            <Route path="/" element={<Blogs />} />
            <Route
              path="/users/:id"
              element={<UserInfo user={matchedUser} />}
            />
            <Route
              path="/blogs/:id"
              element={
                <BlogInfo
                  blog={matchedBlog}
                  blogRefresh={blogRefresh}
                  user={user}
                  token={user.token}
                />
              }
            />
          </Routes>
        </Box>
      );
    }
    return (
      <Box>
        <Box>
          <Link style={padding} to="/">
            blogs
          </Link>
          <Link style={padding} to="/users">
            users
          </Link>
        </Box>
        <Routes>
          <Route path="/users" element={<User users={users} />} />
          <Route path="/" element={<Blogs />} />
          <Route path="/users/:id" element={<UserInfo user={null} />} />
          <Route path="/blogs/:id" element={<BlogInfo blog={null} />} />
        </Routes>
      </Box>
    );
  };

  const Blogs = () => {
    return (
      <Box>
        <Box>
          {user === null ? null : (
            <Togglable
              buttonLabel="new blog"
              closeButtonLabel="cancel"
              ref={blogFormRef}
            >
              <BlogForm createBlog={createBlog} />
            </Togglable>
          )}
        </Box>
        <Box>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {blogs.map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell>
                      <Blog blog={blog} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    );
  };

  //login logic
  const sendLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      dispatch(setUser(user));
      setUsername("");
      setPassword("");
      setHeading("blogs");
      dispatch(setError(false));
      dispatch(setNotification("logged in", 5000));
      blogRefresh();
    } catch (exception) {
      dispatch(setError(true));
      dispatch(setNotification("wrong username or password", 5000));
    }
    console.log("logging in with", username);
  };
  //blog creation handling
  const createBlog = async (blog) => {
    try {
      await blogService.addBlog(user.token, blog);
      blogFormRef.current.toggleVisibility();
      dispatch(setError(false));
      dispatch(
        setNotification(
          `a new blog ${blog.title} by ${blog.author} added`,
          5000
        )
      );
      blogRefresh();
    } catch (exception) {
      dispatch(setError(true));
      blogRefresh();
      dispatch(setNotification("title or url missing or incorrect", 5000));
    }
  };

  //handling logout
  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogappUser");
    setHeading("log in to application");
    dispatch(removeUser());
    dispatch(setBlog([]));
    dispatch(setError(false));
    dispatch(setNotification("logged out", 5000));
  };

  //getting blogs
  const blogRefresh = useCallback(() => {
    if (user !== null) {
      blogService
        .getAll(user.token)
        .then((blogs) =>
          dispatch(setBlog(blogs.sort((a, b) => b.likes - a.likes)))
        );
    } else {
      dispatch(setBlog([]));
    }
  }, [user]);

  //For getting the list of blogs
  useEffect(() => {
    blogRefresh();
  }, [user, blogRefresh]);

  //checking if user is stored in storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      setHeading("blogs");
    }
  }, []);

  const loginForm = () => (
    <form onSubmit={sendLogin}>
      <Box>
        username
        <input
          id="username"
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </Box>
      <Box>
        password
        <input
          id="password"
          type="text"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </Box>
      <Button id="login-button" type="submit" sx={{ color: "color.violet" }}>
        login
      </Button>
    </form>
  );

  const blogFormRef = useRef();

  return (
    <Container>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Box>
          <Message message={errorMessage} isError={isError} />
          <h2>{heading}</h2>
          {user === null ? (
            loginForm()
          ) : (
            <Box>
              <Box>
                {user.name} logged in
                <Button onClick={handleLogout} sx={{ ml: 1 }}>
                  logout
                </Button>
                <Menu />
              </Box>
            </Box>
          )}
        </Box>
      </ThemeProvider>
    </Container>
  );
};

export default App;
