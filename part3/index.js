require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const PhoneBookInstance = require('./models/phonebook')

const app = express()
app.use(express.static('dist'))
morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body'),
)
app.use(express.json())

app.get('/info', (req, res) => {
  PhoneBookInstance.find({}).then((result) => {
    const entryCount = result.length
    const currentDate = new Date()
    res.send(
      `<p>Phonebook has info for ${entryCount} people</p><p>${currentDate}</p>`,
    )
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id

  PhoneBookInstance.findById(id)
    .then((result) => {
      if (result) {
        res.json(result)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.get('/api/persons', (req, res) => {
  PhoneBookInstance.find({}).then((result) => {
    res.json(result)
  })
})

app.delete('/api/persons/:id', (req, res, next) => {
  PhoneBookInstance.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body
  PhoneBookInstance.findById(req.params.id)
    .then((phoneBook) => {
      if (!phoneBook) {
        return res.status(404).end()
      }

      phoneBook.name = name
      phoneBook.number = number

      return phoneBook.save().then((updatedNote) => {
        res.json(updatedNote)
      })
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number is missing' })
  }

  const phoneBookInstance = new PhoneBookInstance({
    name: body.name,
    number: body.number,
  })

  phoneBookInstance
    .save()
    .then((result) => {
      return res.json(result)
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`)
})
