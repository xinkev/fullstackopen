import { React } from "react";

const Persons = (params) => params.persons.map(person =>
    <div key={person.id}>{person.name} {person.number}</div>
)

export default Persons