import { createSlice, current } from "@reduxjs/toolkit"
import blogService from '../services/blogs'


const initialState = []


const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        setBlog(state, action){
            return action.payload
        },
        addLike(state, action){
            state.find((blog)=> blog.id===action.payload).likes += 1
            return state
        },
        appendComment(state, action){
            console.log(action.payload)
            let commentedBlog = state.find((blog)=> blog.id===action.payload[0])
            commentedBlog.comments.push(action.payload[1])
            return state
        }
    }
})

export const {setBlog, addLike, appendComment} = blogSlice.actions

export const incrementLike = (blog, token) => {
    return async dispatch => {
        dispatch(addLike(blog.id))
        let newBlog = Object.assign({}, blog)
        newBlog.likes += 1
        await blogService.addLike(token, newBlog)
    }
}

export const addComment = (blog, token, comment) => {
    return async dispatch => {
        dispatch(appendComment([blog.id, comment]))
        let newBlog = structuredClone(blog)
        newBlog.comments.push(comment)
        await blogService.addComment(token, newBlog)
    }
}

export default blogSlice.reducer