import Togglable from "./Togglable"
import blogService from '../services/blogs'
const Blog = ({ blog, token }) => {
  console.log(blog)
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
    console.log(blog.likes)
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
    </Togglable>
  </div>  
)}

export default Blog