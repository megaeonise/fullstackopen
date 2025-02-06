import { createSlice, current } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState, //intialstate
    reducers: {
        setMessage(state, action) {
            return action.payload
        },
        removeNotification(state, action){
            return initialState
        }
    }
})

export const { removeNotification, setMessage } = notificationSlice.actions

export const setNotification = (message, time) => {
    return async dispatch => {
        dispatch(setMessage(message))
        setTimeout(()=> {
            dispatch(removeNotification())
        }, time)
    }
}

export default notificationSlice.reducer