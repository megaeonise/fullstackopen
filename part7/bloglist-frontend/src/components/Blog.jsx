import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5,
  };

  return (
    <div id="blog_title_blog_author" className="entry" style={blogStyle}>
      <Link
        to={`/blogs/${blog.id}`}
        component={RouterLink}
        sx={{ color: "#af00f3" }}
      >
        {blog.title} {blog.author}
      </Link>
    </div>
  );
};

export default Blog;
