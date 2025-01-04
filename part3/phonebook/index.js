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
morgan.token('data', function () {return data})

app.use(morgan(':method :url :status :response-time :data'))

app.get('/api/persons', (req, res) => {
  console.log(req.body)
  Person.find({}).then(result => {
    res.json(result)
  })
})

// app.get('/', (req, res) => {
//   res.send('Hi')
// })

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body
  data = JSON.stringify(req.body)
  // Person.find({})
  // .then(result => {if(result.find(person => person.name === name)){
  //     res.send('name must be unique')
  //   }
  // }) //tried to find duplicate name
  if(name && number){
    const person = new Person({
      name: name,
      number: number
    })
    person.save().then(savedPerson => {
      res.json(savedPerson)
    })
      .catch(error => next(error))
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
  Person.find({}).then(result => {
    const entry_num = result.length
    res.send(`Phonebook has info for ${entry_num} people <br> ${today}`)
  })

})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if(person){
        res.json(person)
      }
      else{
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body
  const person = {
    name: name,
    number: number,
  }

  Person.findByIdAndUpdate(req.params.id, person, { new:true, runValidators:true })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      console.log(result)
      res.status(204).end()
    })
    .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    res.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
