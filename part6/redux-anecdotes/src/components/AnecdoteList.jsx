import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'


const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const hasFilter = (anecdote) => {
      return anecdote.content.toLowerCase().includes(filter.filter.toLowerCase())
    }
  
    const vote = (id) => {
      dispatch(addVote(id))
    }

    return (
        <>
        {anecdotes.filter(hasFilter).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
        )}
        </>
    )
}

export default AnecdoteList