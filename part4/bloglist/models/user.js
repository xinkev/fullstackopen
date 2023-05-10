const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    unique: true,
  },
  name: String,
  passwordHash: String,
})

schema.plugin(uniqueValidator)

schema.set("toJSON", {
  transform: (doc, obj) => {
    obj.id = obj._id.toString()
    delete obj._id
    delete obj.__v
    // the passwordHash should not be revealed
    delete obj.passwordHash
  },
})

module.exports = mongoose.model("User", schema)
