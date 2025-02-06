import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, addVote } from './requests'
import { useNotificationDispatch } from './contexts/NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()
  const updateAnecdoteMutation = useMutation({
    mutationFn: addVote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const updatedAnecdotes = anecdotes.map((anecdote) => {
        if(anecdote.id === updatedAnecdote.id){
          return {...anecdote, votes: updatedAnecdote.votes}
        }
        return anecdote
      }).sort((a, b) => b.votes - a.votes)
      queryClient.setQueryData(['anecdotes'], updatedAnecdotes)
      notificationDispatch({
        type: "SET_NOTIF",
        payload: `you voted ${updatedAnecdote.content}`
      })
      setTimeout(()=> {
        notificationDispatch({type: "REMOVE_NOTIF"})
      }, 5000)
    }
  })

  const handleVote = (anecdote) => {
    console.log('vote')
    updateAnecdoteMutation.mutate(anecdote)
  }

  const result = useQuery(
    {
      queryKey: ['anecdotes'],
      queryFn: getAnecdotes,
      retry: 1
    }
  )

  if (result.isLoading) {
    return <div>loading anecdotes...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data.sort((a, b) => b.votes - a.votes)

  return (

    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
