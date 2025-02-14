import { Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { incrementLike, addComment } from "../reducers/blogReducer";
import { useNavigate } from "react-router-dom";
import blogService from "../services/blogs";
import { useState } from "react";
import { Link, Button, Box } from "@mui/material";
import { setNotification, setError } from "../reducers/messageReducer";

const BlogInfo = ({ blog, blogRefresh, user, token }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");

  const handleLikes = () => {
    if (token) {
      dispatch(incrementLike(blog, token));
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.deleteBlog(token, blog.id);
      blogRefresh();
      dispatch(setError(false));
      dispatch(setNotification(`${blog.title} has been deleted`, 5000));
      navigate("/");
    }
  };

  const handleComment = (event) => {
    event.preventDefault();
    if (token) {
      dispatch(addComment(blog, token, comment));
    }
    setComment("");
  };

  if (!blog) {
    return null;
  }
  return (
    <>
      <h1>
        {blog.title} {blog.author}
      </h1>
      <Box>
        <Link component={RouterLink}>{blog.url}</Link>
      </Box>
      <Box>
        {blog.likes} likes
        <Button onClick={handleLikes} sx={{ ml: 1 }}>
          like
        </Button>
      </Box>
      <Box>added by {blog.author}</Box>
      <Box>
        <h3>comments</h3>
        <form onSubmit={handleComment}>
          <input
            id="comment"
            className="comment"
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <Button id="create" type="submit" sx={{ ml: 1 }}>
            add comment
          </Button>
        </form>
        <ul>
          {blog.comments.map((comment) => (
            <li key={Math.floor(Math.random() * 10000 + 1)}>{comment}</li>
          ))}
        </ul>
      </Box>
      {blog.user.username !== user.username ? null : (
        <Box id="blog_delete">
          <Button id="delete-button" onClick={handleDelete}>
            delete
          </Button>
        </Box>
      )}
    </>
  );
};

export default BlogInfo;
