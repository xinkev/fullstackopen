import { React } from "react"

const Persons = ({ persons, onDelete }) => {
  const handleOnDeleteClick = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      onDelete(person.id)
    }
  }
  return persons.map((person) => (
    <div key={person.id}>
      {person.name} {person.number} &nbsp;
      <button onClick={() => handleOnDeleteClick(person)}>delete</button>
    </div>
  ))
}

export default Persons
