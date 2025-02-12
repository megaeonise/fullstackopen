import { useState } from 'react'

import Togglable from './Togglable'
import blogService from '../services/blogs'
import { useDispatch } from "react-redux";
import { addLike, incrementLike } from '../reducers/blogReducer';
 
const Blog = ({ blog, token, blogRefresh, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(true)
  const handleLikes = async () => {
    dispatch(incrementLike(blog, token))
    if (token){
      await blogService.addLike(token, blog)
      blogRefresh()
    } else {
      blogRefresh()
    }
  }

  const handleDelete = async () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
      await blogService.deleteBlog(token, blog.id)
    setVisible(false)
  }

  if(visible){
    return (
      <div id="blog_title_blog_author" className="entry" style={blogStyle}>
        {blog.title} {blog.author} <Togglable buttonLabel="view" closeButtonLabel="hide">
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