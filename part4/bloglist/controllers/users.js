const bcrypt = require("bcrypt")
const router = require("express").Router()
const User = require("../models/user")

router.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs")
  res.json(users)
})

router.post("/", async (req, res) => {
  const { username, name, password } = req.body
  if (password.length < 3) {
    return res.status(400).json({
      error: "User validation failed: password: Path `password` shorter than the minimum allowed length (3)."
    })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

module.exports = router
