const express = require('express')
const app = express()

app.use(express.json())

let notes = [
  {
    id: '1',
    content: "HTML is easy",
    important: true
  },
  {
    id: '2',
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: '3',
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]
app.get('/api/notes/:id', (req, res) => {
    const id = req.params.id
    console.log(id)
    const note = notes.find(note => note.id === id)
    if(note){
        res.json(note)
    }
    else{
        res.status(404).end()
    }
    
})

  
app.get('/api/notes', (req, res) => {
  res.json(notes)
})

const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => Number(n.id)))
      : 0
    return String(maxId + 1)
  }
  
  app.post('/api/notes', (request, response) => {
    const body = request.body
  
    if (!body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const note = {
      content: body.content,
      important: Boolean(body.important) || false,
      id: generateId(),
    }
  
    notes = notes.concat(note)
  
    response.json(note)
  })

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id
    console.log(id)
    notes = notes.filter(note => note.id !== id)
    res.status(204).end()
    
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
