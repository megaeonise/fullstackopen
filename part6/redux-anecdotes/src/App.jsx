import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useEffect } from 'react'

const App = () => {
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch(initializeAnecdotes())
  }, [])
  return (
    <div>
      <Notification />
      <Filter />  
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App