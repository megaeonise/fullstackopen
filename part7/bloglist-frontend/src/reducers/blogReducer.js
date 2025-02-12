import { createSlice, current } from "@reduxjs/toolkit"


const initialState = []


const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        setBlog(state, action){
            return action.payload
        }
    }
})

export const {setBlog} = blogSlice.actions

export default blogSlice.reducer