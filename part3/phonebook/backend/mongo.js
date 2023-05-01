const mongoose = require("mongoose")

const args = process.argv
const argsCount = args.length

if (argsCount < 3) {
  console.log("give password as argument")
  process.exit(1)
}

const password = args[2]

const url = `mongodb+srv://isshin:${password}@phonebook.tfqbvn2.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set("strictQuery", false)
mongoose.connect(url)

const schema = mongoose.Schema({ name: String, number: String })

const Person = mongoose.model("Person", schema)

if (argsCount == 5) {
  const person = new Person({ name: args[3], number: args[4] })
  person.save().then((result) => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
} else if (argsCount == 3) {
  Person.find({}).then((persons) => {
    console.log("phonebook:")
    persons.forEach((person) => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}
