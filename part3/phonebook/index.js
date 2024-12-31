const express = require('express')
const app = express()

app.use(express.json())

let persons = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

  
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.post('/api/persons', (req, res) => {
  const id = Math.floor(Math.random() * 10000)
  console.log(id)
  const {name, number} = req.body
  const error = persons.find(person => person.name === name)
  if(persons.find(person => person.name === name)){
    console.log('?')
    res.send('name must be unique')
  }
  else if(name && number){
    const person = {id, name, number}
    console.log(person)
    res.json(person)
  }
  else if(!name && !number){
    res.send('name and number is missing')
  }
  else if(!name){
    res.send('name is missing')
  }
  else{
    res.send('number is missing')
  }
  
})



app.get('/info', (req, res) => {
  const today = new Date()
  const entry_num = persons.length
  res.send(`Phonebook has info for ${entry_num} people <br> ${today}`)
}) 

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person =  persons.find(person => person.id === id)
  res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
