const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const router = require("express").Router()
const User = require("../models/user")
const { TOKEN_SECRET } = require("../utils/config")

router.post("/", async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })
  const isPassCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && isPassCorrect)) {
    return res.status(401).json({
      error: "invalid username or password",
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, TOKEN_SECRET)

  res
    .status(200)
    .json({ token, username: user.username, name: user.name, id: user.id })
})

module.exports = router
