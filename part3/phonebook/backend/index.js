require("dotenv").config()
const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const path = require("path")
const Person = require("./models/person")

morgan.token("payload", function (req, res) {
  if (req.method == "POST") {
    return JSON.stringify(req.body)
  } else {
    return null
  }
})

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, "build")))
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :payload"
  )
)

app.get("/info", (request, response) => {
  Person.find({}).then((persons) => {
    const html = `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${Date()}</p>
  `
    response.send(html)
  })
})

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id)
  .then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
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

  // if (persons.some((p) => person.name === p.name)) {
  //   error = "name must be unique"
  // }

  if (error) {
    return response.status(400).json({ error })
  }

  const model = new Person({...person})
  model.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
