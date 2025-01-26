import { useState } from "react"

import Togglable from "./Togglable"
import blogService from '../services/blogs'
const Blog = ({ blog, token, dummy }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [likes, setLikes] = useState(blog.likes)
  const [visible, setVisible] = useState(true)

  const handleLikes = async () => {
    blog.likes += 1
    const updatedBlog = await blogService.addLike(token, blog)
    setLikes(updatedBlog.likes)
  }

  const handleDelete = async () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
    await blogService.deleteBlog(token, blog.id)
    setVisible(false)
  }

  if(visible){
  return (
  <div style={blogStyle}>
    {blog.title} {blog.author} <Togglable buttonLabel="view" closeButtonLabel="hide">
      <div>
        {blog.url}
      </div>
      <div>
        likes {likes}
        <button onClick={handleLikes}>like</button>
      </div>
      <div>
        <button onClick={handleDelete}>delete</button>
      </div>
      <div>
      {!blog.user ? '' : blog.user.username}
      </div>
    </Togglable>
  </div>  
)}
else{
  return(
    <>
    </>
  )
}}

export default Blog