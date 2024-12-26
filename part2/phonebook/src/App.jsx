import { useState, useEffect } from 'react'
import Result from './components/Result'
import NameForm from './components/NameForm'
import phonebookService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')
  

  useEffect(() => {
    phonebookService
    .getAll()
    .then(response => {setPersons(response.data)})
    console.log(persons, 'd')
  }, [])

  const addName = (event) => {
    event.preventDefault()
    let next_id = Math.max(...persons.map(person => Number(person.id)))
    if(next_id===-Infinity){
      next_id = 0
    }
    else{
      next_id +=1 
    }
    let entry = { name: newName, number: newNumber, id: next_id.toString()}
    if(persons.map(person=>person.name).includes(newName)){
      const matched = persons.find(person=> person.name===newName)
      entry = { name: matched.name, number: newNumber, id: matched.id}
      console.log('old', persons)
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        phonebookService
        .update(matched.id, entry)
        .then(response => {
          console.log(response)
        }
      )
        .catch(error => {
          alert('The entry to be updated has already been deleted')
          console.log(persons)
          setPersons(persons.filter(person => person.id !== matched.id))
        })
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
        setNewName('')
        setNewNumber('')
      })
    }
    console.log('test', persons)
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
    console.log(persons)
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