import { createSlice, current } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState, //intialstate
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        removeNotification(state, action){
            return initialState
        }
    }
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer