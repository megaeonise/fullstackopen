import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas'}
  ])
  const [newName, setNewName] = useState('')
  const addName = (event) => {
    event.preventDefault()
    const name = { name: newName }
    console.log(name, persons.map(person=>person.name))
    if(persons.map(person=>person.name).includes(newName)){
      alert(`${newName} is already added to phonebook`)
    }
    else{
      setPersons(persons.concat(name))
      setNewName('')
    }
    
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          <input value={newName} onChange={handleNameChange}/>
          
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, index) => <p key={index}>{person.name}</p>)}
    </div>
  )
}

export default App