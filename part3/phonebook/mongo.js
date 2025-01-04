const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  id: String,
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length<3) {
  console.log('You are missing arguments..., you should put password name number, or password')
  process.exit(1)
}
else if(process.argv.length===5){
  const password = process.argv[2] ///0 is node, 1 is mongo.js, 2 is password, 3 is name, 4 is number
  const name = process.argv[3]
  const number = process.argv[4]
  const url = `mongodb+srv://rikthmeowhumayun:${password}@fsocluster.unbb5.mongodb.net/?retryWrites=true&w=majority&appName=FSOCluster`

  mongoose.set('strictQuery', false)

  mongoose.connect(url)

  const id_num = Math.floor(Math.random() * 10000)

  const person = new Person({
    id: id_num,
    name: name,
    number: number
  })

  person.save().then(result => {
    console.log(result)
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}
else if(process.argv.length===3){
  const password = process.argv[2] ///0 is node, 1 is mongo.js, 2 is password, 3 is name, 4 is number
  const url = `mongodb+srv://rikthmeowhumayun:${password}@fsocluster.unbb5.mongodb.net/?retryWrites=true&w=majority&appName=FSOCluster`
  mongoose.set('strictQuery', false)
  mongoose.connect(url)

  console.log('Phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}
else{
  console.log('You have too arguments...,  you should put password name number, or password')
  process.exit(1)
}

