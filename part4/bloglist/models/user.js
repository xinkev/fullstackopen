const mongoose = require("mongoose")
const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  passwordHash: String,
})
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
