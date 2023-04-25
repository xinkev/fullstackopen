import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [name, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [filterKeyword, setFilterKeyword] = useState('')

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    setFilterKeyword(e.target.value)
  }

  const addPerson = (e) => {
    e.preventDefault()
    if (persons.find(person => person.name === name)) {
      alert(`${name} is already added to phonebook`)
    } else {
      const person = { name: name, number: number, id: persons.length + 1 }
      setPersons(persons.concat(person))
      setNewName("")
      setNumber("")
      setFilterKeyword("")
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter keyword={filterKeyword} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        name={name}
        number={number}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onSubmit={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={persons
        .filter(person => person && person.name.includes(filterKeyword))
      } />
    </div>
  )
}

export default App