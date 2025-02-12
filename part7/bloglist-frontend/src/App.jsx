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
import { setUser, removeUser } from "./reducers/userReducer";
import { useMatch, Routes, Route, Link, useNavigate} from "react-router-dom";
import User from './components/User';



const App = () => {
  const blogs = useSelector(state=>state.blog)
  const errorMessage = useSelector(state=>state.message[0])
  const isError = useSelector(state=>state.message[1])
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector(state=>state.user[0]);
  const [heading, setHeading] = useState("log in to application");
  const dispatch = useDispatch()

  const Menu = () => {
    console.log('where am i')
    const padding = {
      paddingRight: 5
    }
    return (
      <div>
        <div>
          <Link style={padding} to="/">blogs</Link>
          <Link style={padding} to="/users">users</Link>
        </div>
        <Routes>
          <Route path="/users" element={<User/>}/>
          <Route path="/" element={<Blogs/>}/>
        </Routes>
      </div>
    )
  }

  const Blogs = () => {
    return (
      <div>
        {user===null ? (
        null
      ): (
        <Togglable
        buttonLabel="new blog"
        closeButtonLabel="cancel"
        ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
        </Togglable>
      )}

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          user={user}
          blog={blog}
          token={user.token}
          blogRefresh={blogRefresh}
        />
      ))}
      </div>
    )
  }

  //login logic
  const sendLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      console.log(user)
      dispatch(setUser(user));
      setUsername("");
      setPassword("");
      setHeading("blogs");
      dispatch(setError(false))
      dispatch(setNotification("logged in",5000));
      blogRefresh();
    } catch (exception) {
      dispatch(setError(true));
      blogRefresh();
      dispatch(setNotification("wrong username or password",5000));
    }
    console.log("logging in with", username);
  };
  //blog creation handling
  const createBlog = async (blog) => {
    try {
      blogFormRef.current.toggleVisibility();
      await blogService.addBlog(user.token, blog);
      dispatch(setError(false))
      dispatch(setNotification(`a new blog ${blog.title} by ${blog.author} added`,5000));
      blogRefresh();
    } catch (exception) {
      dispatch(setError(true));
      blogRefresh();
      dispatch(setNotification("title or url missing or incorrect",5000));
    }
  };

  //handling logout
  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogappUser");
    setHeading("log in to application");
    dispatch(removeUser());
    dispatch(setBlog([]));
    dispatch(setError(false))
    dispatch(setNotification("logged out",5000))
  };

  //getting blogs
  const blogRefresh = useCallback(() => {
    if (user !== null) {
      blogService
        .getAll(user.token)
        .then((blogs) => dispatch(setBlog(blogs.sort((a, b) => b.likes - a.likes))));
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
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="text"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  );

  const blogFormRef = useRef();

  return (
    <div>
      <Message message={errorMessage} isError={isError} />
      <h2>{heading}</h2>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <div> {user.name} logged in
          <button onClick={handleLogout}>logout</button>
          <Menu />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
