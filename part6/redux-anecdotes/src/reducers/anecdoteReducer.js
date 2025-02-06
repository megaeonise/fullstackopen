import { createSlice, current } from "@reduxjs/toolkit"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addVote(state, action){
      let votedAnecdote = state.findIndex(anecdote => anecdote.id === action.payload)
      state[votedAnecdote].votes += 1
      return state.sort((a, b) => b.votes - a.votes)
    },
    addAnecdote(state, action){
      state.push(asObject(action.payload))
      state.sort((a, b) => b.votes - a.votes)
    }
  }
})

export const { addVote, addAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer