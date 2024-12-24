import { useState, useEffect } from 'react'
import Result from './components/Result'
import NameForm from './components/NameForm'
import phonebookService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')
  const [remove, setRemove] = useState('')
  

  useEffect(() => {
    phonebookService
    .getAll()
    .then(response => {setPersons(response.data)})
  }, [])

  const addName = (event) => {
    event.preventDefault()
    console.log(persons.length)
    let entry = { name: newName, number: newNumber, id: (persons.length+1).toString()}
    if(persons.map(person=>person.name).includes(newName)){
      const matched = persons.find(person=> person.name===newName)
      entry = { name: matched.name, number: newNumber, id: matched.id}
      console.log(entry)
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        phonebookService
        .update(matched.id, entry)
        setNewName('')
        setNewNumber('')
      }
    }
    else{
      setPersons(persons.concat(entry))
      phonebookService  
      .create(entry)
      .then(response => {
        console.log(response)
      })
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

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input value={query} onChange={handleQuery} /></div>
      <h2>add a new</h2>
      <NameForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Result persons={persons} query={query}/>
    </div>
  )
}

export default App