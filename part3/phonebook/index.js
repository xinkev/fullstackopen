const express = require("express")
const app = express()
const morgan = require("morgan")

morgan.token("payload", function (req, res) {
  if (req.method == "POST") {
    return JSON.stringify(req.body)
  } else {
    return null
  }
})

app.use(express.json())
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :payload"
  )
)

var persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
]

app.get("/info", (request, response) => {
  const html = `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${Date()}</p>
  `
  response.send(html)
})

app.get("/api/persons", (request, response) => {
  response.json(persons)
})

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find((person) => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter((person) => person.id !== id)

  response.status(204).end()
})

app.post("/api/persons", (request, response) => {
  const person = request.body

  var error = null
  if (!person.name) {
    error = "name is missing"
  }
  if (!person.number) {
    error = "number is missing"
  }

  if (persons.some((p) => person.name === p.name)) {
    error = "name must be unique"
  }

  if (error) {
    return response.status(400).json({ error })
  }

  person.id = Math.floor(Math.random() * 1000)

  persons = persons.concat(person)

  response.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
