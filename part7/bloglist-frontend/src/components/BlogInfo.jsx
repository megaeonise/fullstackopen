import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { incrementLike, addComment } from '../reducers/blogReducer';
import { useNavigate } from "react-router-dom";
import blogService from '../services/blogs'
import { useState } from "react";


const BlogInfo = ({blog, blogRefresh, user, token}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [comment, setComment] = useState("")

    const handleLikes = () => {
    if (token){
        dispatch(incrementLike(blog, token))
    }
    }

    const handleDelete = async () => {
        if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
            await blogService.deleteBlog(token, blog.id)
            blogRefresh()
            navigate('/')
        }
    }

    const handleComment = (event) => {
        event.preventDefault()
        if(token){
            dispatch(addComment(blog, token, comment))
        }
        setComment("")
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
        <div>
            <h3>comments</h3>
            <form onSubmit={handleComment}>
                <input
                id="comment"
                className="comment"
                type="text"
                value={comment}
                onChange={({target}) => setComment(target.value)} 
                />
                <button id="create" type="submit">add comment</button>
            </form>
            <ul>
                {blog.comments.map((comment)=> 
                <li key={Math.floor((Math.random() * 10000) + 1)}>{comment}</li>)}
            </ul>
        </div>
        {blog.user.username!==user.username ? null :
            <div id="blog_delete">
              <button id="delete-button" onClick={handleDelete}>delete</button>
        </div>}
        </>
    )
}

export default BlogInfo