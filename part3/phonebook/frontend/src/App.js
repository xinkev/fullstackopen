import { useEffect, useState } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Notification from "./components/Notification"
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [name, setNewName] = useState("")
  const [number, setNumber] = useState("")
  const [filterKeyword, setFilterKeyword] = useState("")
  const [notification, setNotification] = useState()

  useEffect(() => {
    personService.getAll().then((persons) => setPersons(persons))
  }, [])

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    setFilterKeyword(e.target.value)
  }

  const handleOnDeleteClick = (id) => {
    personService.del(id).then(() => {
      setPersons(persons.filter((person) => person.id != id))
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const foundPerson = persons.find((person) => person.name === name)
    if (foundPerson) {
      const shouldUpdate = window.confirm(
        `${foundPerson.name} is already added to phonebook, replace the old number with a new one?`
      )
      if (shouldUpdate) {
        updatePerson(foundPerson)
      }
    } else {
      addPerson()
    }
  }

  const updatePerson = (oldPerson) => {
    const person = { ...oldPerson, number: number }
    personService
      .update(person)
      .then((newPerson) => {
        setPersons(
          persons.map((person) =>
            person.id !== newPerson.id ? person : newPerson
          )
        )
        resetInputs()

        showNotification(`${person.name}'s number is changed.`, "success")
      })
      .catch((error) => {
        showNotification(
          error.response.data.error,
          "error"
        )
      })
  }

  const addPerson = () => {
    const person = { name: name, number: number }
    personService
      .create(person)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        resetInputs()

        showNotification(`Added ${person.name}`, "success")
      })
      .catch((error) => {
        const message = error.response.data.error
        console.log(message)
        setNotification({ message, type: "error" })
      })
  }

  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 6000)
  }

  const resetInputs = () => {
    setNewName("")
    setNumber("")
    setFilterKeyword("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter keyword={filterKeyword} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        name={name}
        number={number}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons.filter(
          (person) => person && person.name.includes(filterKeyword)
        )}
        onDelete={handleOnDeleteClick}
      />
    </div>
  )
}

export default App
