const express = require('express')
const morgan = require('morgan')
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

const handleData = () => {}

morgan.token('data', function (req, res) {return JSON.stringify(req.body)})

app.use(morgan(':method :url :status :response-time :data'))

app.get('/api/persons', (req, res) => {
  console.log(req.body)
  console.log(JSON.stringify(req.body))
  res.json(persons)
})

app.post('/api/persons', (req, res) => {
  const id = Math.floor(Math.random() * 10000)
  const {name, number} = req.body
  if(persons.find(person => person.name === name)){
    res.send('name must be unique')
  }
  else if(name && number){
    const person = {id, name, number}
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
