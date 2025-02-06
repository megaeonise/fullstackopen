import { createSlice, current } from "@reduxjs/toolkit"

const initialState = ''

const filterSlice = createSlice({
    name: 'filter',
    initialState, //intialstate
    reducers: {
        setFilter(state, action) {
            console.log(action.payload)
            return action.payload
        },
    }
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer