const { describe, test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helpers = require('./test_helper')
const User = require('../models/users')
const mongoose = require('mongoose')

describe('when there are users initially saved', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })
  describe('login attempts', () => {
    test('succeeds with valid credentials', async () => {
      const usersInDbBefore = await helpers.usersInDb()
      const mockUser = helpers.mockTestUser
      await helpers.createAndSaveMockUser()

      const usersInDbAfter = await helpers.usersInDb()
      assert.strictEqual(usersInDbBefore.length + 1, usersInDbAfter.length)

      const response = await api.post('/api/login').send(mockUser)
      assert.strictEqual(response.status, 200)
      assert.strictEqual(true, response.body.token !== undefined)
      assert.strictEqual(response.body.name, mockUser.name)
      assert.strictEqual(response.body.username, mockUser.username)
    })
    test('fails with invalid credentials', async () => {
      const mockUser = { username: 'abrakadabraabraunana', password: 'wrongpasswordabrakadabra' }
      const response = await api.post('/api/login').send(mockUser)
      assert.strictEqual(response.status, 401)
      assert.strictEqual(response.body.error, 'Invalid username or password')
    })
  })

  after(async () => {
    await User.deleteMany({})
    await mongoose.connection.close()
  })
})