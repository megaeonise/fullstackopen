import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../contexts/NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const getId = () => (100000 * Math.random()).toFixed(0)
  const notificationDispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote ,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote).sort((a, b) => b.votes - a.votes))
      notificationDispatch({
        type: "SET_NOTIF",
        payload: `you added ${newAnecdote.content}`
      })
      setTimeout(()=> {
        notificationDispatch({type: "REMOVE_NOTIF"})
      }, 5000)
    },
    onError: (error) => {
      notificationDispatch({
        type: "SET_NOTIF",
        payload: error.response.data.error
      })
      setTimeout(()=> {
        notificationDispatch({type: "REMOVE_NOTIF"})
      }, 5000)
    },
  })
  
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate( {content: content, id: getId(), votes: 0} )
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
