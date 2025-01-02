const express = require('express')
const morgan = require('morgan')
require('dotenv').config()


const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))



const Person = require('./models/Person')

// let persons = [
//   { 
//     "id": "1",
//     "name": "Arto Hellas", 
//     "number": "040-123456"
//   },
//   { 
//     "id": "2",
//     "name": "Ada Lovelace", 
//     "number": "39-44-5323523"
//   },
//   { 
//     "id": "3",
//     "name": "Dan Abramov", 
//     "number": "12-43-234345"
//   },
//   { 
//     "id": "4",
//     "name": "Mary Poppendieck", 
//     "number": "39-23-6423122"
//   }
// ]

let data = '{No HTTP Post Request Data}'
morgan.token('data', function (req, res) {return data})

app.use(morgan(':method :url :status :response-time :data'))

app.get('/api/persons', (req, res) => {
  Person.find({}).then(result=> {
    res.json(result)
  })
})

// app.get('/', (req, res) => {
//   res.send('Hi')
// })

app.post('/api/persons', (req, res) => {
  const {name, number} = req.body
  data = JSON.stringify(req.body)
  // Person.find({}).then(result => {const person = result}) tried to find duplicate name
  
  // if(result.find(person => person.name === name)){
  //   res.send('name must be unique')
  // }
  //else if(name && number){
  if(name && number){
    const person = new Person({
      name: name,
      number: number
    })
    console.log(person)
    person.save().then(savedPerson=> {
      res.json(savedPerson)
    })
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

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
  .then(person=> {
    if(person){
      res.json(person)
    }
    else{
      res.status(404).end()
    }
  })
  .catch(error=> next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  console.log(req)
  Person.findByIdAndDelete(req.params.id)
  .then(result=>{
    console.log(result)
    res.status(204).end()
  })
  .catch(error=>next(error))
})

const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    res.status(400).send({error: 'malformatted id'})
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
