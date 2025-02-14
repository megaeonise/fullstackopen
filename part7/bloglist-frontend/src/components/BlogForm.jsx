import { useState } from "react";
import { Button, TextField } from "@mui/material";
const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({ title: title, author: author, url: url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={addBlog}>
      <h2>create new</h2>
      <div>
        <TextField
          sx={{ mb: 1 }}
          id="title"
          label="Title"
          className="title"
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        <TextField
          sx={{ mb: 1 }}
          id="author"
          label="Author"
          className="author"
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        <TextField
          sx={{ mb: 1 }}
          id="url"
          label="URL"
          className="url"
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <Button id="create" type="submit">
        create
      </Button>
    </form>
  );
};
export default BlogForm;
