import { createSlice, current} from "@reduxjs/toolkit"

const initialState = [null, null]

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action){
            return [action.payload, state[1]]
        },
        removeUser(state, action){
            return [null, state[1]]
        },
        setUsers(state, action){
            return [state[0], action.payload]
        }
    }
})

export const {setUser, removeUser, setUsers} = userSlice.actions

export default userSlice.reducer
