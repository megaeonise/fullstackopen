import Togglable from "./Togglable"
import blogService from '../services/blogs'
const Blog = ({ blog, token }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikes = async () => {
    blog.likes += 1
    const updatedBlog = await blogService.addLike(token, blog)
    blog.likes = updatedBlog.likes
  }

  return (
  <div style={blogStyle}>
    {blog.title} {blog.author} <Togglable buttonLabel="view" closeButtonLabel="hide">
      <div>
        {blog.url}
      </div>
      <div>
        likes {blog.likes}
        <button onClick={handleLikes}>like</button>
      </div>
      <div>
      {!blog.user ? '' : blog.user.username}
      </div>
    </Togglable>
  </div>  
)}

export default Blog