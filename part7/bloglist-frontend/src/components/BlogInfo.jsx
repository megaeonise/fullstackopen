import { Link } from "react-router-dom"
import { useDispatch } from "react-redux";
import { incrementLike } from '../reducers/blogReducer';
import { useNavigate } from "react-router-dom";
import blogService from '../services/blogs'


const BlogInfo = ({blog, blogRefresh, user, token}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLikes = async () => {
    dispatch(incrementLike(blog, token))
    if (token){
        await blogService.addLike(token, blog)
    }
    }

    const handleDelete = async () => {
        if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
            await blogService.deleteBlog(token, blog.id)
            blogRefresh()
            navigate('/')
        }
    }

    if(!blog){
        return null
    }
    return (
        <>
        <h1>{blog.title} {blog.author}</h1>
        <div>
            <Link>{blog.url}</Link>
        </div>
        <div>
            {blog.likes} likes
            <button onClick={handleLikes}>like</button>
        </div>
        <div>
            added by {blog.author}
        </div>
        {blog.user.username!==user.username ? null :
            <div id="blog_delete">
              <button id="delete-button" onClick={handleDelete}>delete</button>
        </div>}
        </>
    )
}

export default BlogInfo