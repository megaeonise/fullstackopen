import { Link } from 'react-router-dom';
 
const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

    return (
      <div id="blog_title_blog_author" className="entry" style={blogStyle}>
        <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        {/* <Togglable buttonLabel="view" closeButtonLabel="hide">
          <div id="blog_url">
            {blog.url}
          </div>
          <div id={`${blog.title}_likes`}>
        likes {blog.likes}
            <button id={`${blog.title}-like-button`} onClick={handleLikes}>like</button>
          </div>
          {blog.user.username!==user.username ? null :
            <div id="blog_delete">
              <button id="delete-button" onClick={handleDelete}>delete</button>
            </div>}
          <div id="blog_user">
            {!blog.user ? '' : blog.user.username}
          </div>
        </Togglable> */}
      </div>
    )}

export default Blog