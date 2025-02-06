import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const handleAdd = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        dispatch(addAnecdote(content))
        dispatch(setNotification(`you added ${content}`, 1000))
        event.target.anecdote.value = ''
      }

    return(
    <form onSubmit={handleAdd}>
        <h2>create new</h2>
        <div><input name="anecdote"/></div>
        <button type='submit'>create</button>
      </form>
    )
}

export default AnecdoteForm


