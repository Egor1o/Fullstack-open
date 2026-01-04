const loginRouter = require('express').Router()
const User = require('../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { SECRET } = require('../utils/config')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  if(!username || !password) {
    return response.status(400).json({ error: 'Username or password missing' })
  }

  const user = await User.findOne({ username })
  const isValidPassword = user === null ? false : await bcrypt.compare(password, user.passwordHash)
  if(!user || !isValidPassword) {
    return response.status(401).json({ error: 'Invalid username or password' })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, SECRET, { expiresIn: 60*60 })
  return response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter