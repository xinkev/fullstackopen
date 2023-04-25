import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
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
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const person = { name: newName, number: number, id: persons.length + 1 }
      setPersons(persons.concat(person))
      setNewName("")
      setNumber("")
      setFilterKeyword("")
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input value={filterKeyword} onChange={handleFilterChange} />

      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={number} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons
        .filter(person => person && person.name.includes(filterKeyword))
        .map(person =>
          <div key={person.id}>{person.name} {person.number}</div>
        )}
    </div>
  )
}

export default App