import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const handleAdd = (event) => {
        event.preventDefault()
        console.log(event.target.anecdote.value)
        const content = event.target.anecdote.value
        dispatch(addAnecdote(content))
        event.target.anecdote.value = ''
      }

    return(
    <form onSubmit={handleAdd}>
        <div><input name="anecdote"/></div>
        <button type='submit'>create</button>
      </form>
    )
}

export default AnecdoteForm


