import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const hasFilter = (anecdote) => {
      return anecdote.content.toLowerCase().includes(filter.toLowerCase())
    }
  
    const vote = (id, content) => {
      dispatch(setNotification(`you voted ${content}`))
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
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
        )}
        </>
    )
}

export default AnecdoteList