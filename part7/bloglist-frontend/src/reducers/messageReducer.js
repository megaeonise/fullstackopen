import { createSlice, current } from "@reduxjs/toolkit"


const initialState = [null,false]


const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setMessage(state, action){
            console.log([action.payload, state[1]], 'insetmessage')
            return [action.payload, state[1]]
        },
        setError(state, action){
            console.log([state[0], action.payload], 'inseterror')
            return [state[0], action.payload]
        }
    }
})

export const {setError, setMessage} = messageSlice.actions

export const setNotification = (message, time) => {
    return async dispatch => {
        dispatch(setMessage(message))
        setTimeout(()=>{
            dispatch(setMessage(null))
        }, time)
        
    }
}

export default messageSlice.reducer