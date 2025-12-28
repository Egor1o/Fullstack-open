const userRouter = require('express').Router()
const User = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SALT_ROUNDS = 10

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
  return response.json(users)
})

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if(!password){
    return response.status(400).json({ error: 'Password is required' })
  }
  if(password.length < 3) {
    return response.status(400).json({ error: 'Password has to be at least 3 characters long' })
  }
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)
  const user = new User({ username, name, passwordHash })
  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

userRouter.post('/login', async (request, response) => {
  const { username, password } = request.body

  if(!username || !password) {
    return response.status(400).json({ error: 'Username or password missing' })
  }

  const user = await User.findOne({ username })
  const isValidPassword = await bcrypt.compare(password, user.passwordHash)
  if(!user || !isValidPassword) {
    return response.status(401).json({ error: 'Invalid username or password' })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60 })
  return response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = userRouter