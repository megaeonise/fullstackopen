const mongoose = require('mongoose')

require('dotenv').config()
const url = process.env.MONGODB_URI;

mongoose.set('strictQuery', false)
console.log('connecting')

mongoose.connect(url).then(result=>{
    console.log('connected to MongoDB')
})
.catch(error=>{
    console.log('error connecting to MongoDB', error.message)
})

const personSchema = new mongoose.Schema({
    id: String,
    name: String,
    number: String
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model("Person", personSchema)