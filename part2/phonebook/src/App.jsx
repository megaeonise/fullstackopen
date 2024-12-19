import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')
  const [result, setResult] = useState(persons.map(person=> <p key={person.id}> {person.name} {person.number}</p>))
  
  const addName = (event) => {
    event.preventDefault()
    console.log(persons.length)
    // const name = { name: newName }
    // const number = { number: newNumber }
    const entry = { name: newName, number: newNumber, id: persons.length+1}
    // console.log(name, persons)
    if(persons.map(person=>person.name).includes(newName)){
      alert(`${newName} is already added to phonebook`)
    }
    else{
      setPersons(persons.concat(entry))
      setNewName('')
      setNewNumber('')
    }
    
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleQuery = (event) => {
    console.log(event.target.value)
    setQuery(event.target.value)
  }

  const Result = ( props ) => {
    const includesQuery = (person) => {
      return person.name.toLowerCase().includes(props.query.toLowerCase()) 
    }
    if(query===''){
      return props.persons.map(person=> <p key={person.id}> {person.name} {person.number}</p>)
    }
    else{
      return props.persons.filter(includesQuery).map(person=> <p key={person.id}> {person.name} {person.number}</p>)
    }
    

  }
  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input value={query} onChange={handleQuery} /></div>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Result persons={persons} query={query} />
    </div>
  )
}

export default App