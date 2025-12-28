const { describe, test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const User = require('../models/users')
const mongoose = require('mongoose')

// valid by default
const createMockUser = (replaceFields = {}) => {
  return {
    username: 'testuser',
    name: 'Test User',
    password: '12345',
    ...replaceFields
  }
}

describe('When there are users initially saved', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
  })
  test('users are returned as json', async () => {
    await api.get('/api/users').expect(200).expect('Content-Type', /application\/json/)
  })
  test('users returned are of a correct length', async () => {
    const response = await api.get('/api/users')
    assert.strictEqual(response.body.length, helper.initialUsers.length)
  })

  describe('adding a new user ', () => {
    test('with valid data returns the added user', async ()  => {
      const newUser = createMockUser()
      const response = await api.post('/api/users').send(newUser)
      assert.strictEqual(response.status, 201)
      assert.strictEqual(newUser.username, response.body.username)
      assert.strictEqual(newUser.name, response.body.name)
    })
    test('with valid data changes the db state', async ()  => {
      const newUser = createMockUser()
      const usersInDbBefore = await helper.usersInDb()
      const response = await api.post('/api/users').send(newUser)
      assert.strictEqual(response.status, 201)
      const usersInDbAfter = await helper.usersInDb()
      assert.strictEqual(usersInDbBefore.length + 1, usersInDbAfter.length)
    })
    test('with valid data. The user can be found from db', async ()  => {
      const newUser = createMockUser()
      const response = await api.post('/api/users').send(newUser)
      assert.strictEqual(response.status, 201)
      const usersInDb = await helper.usersInDb()
      const savedUser = usersInDb.find(user => user.username === newUser.username)
      assert.deepStrictEqual(response.body, savedUser)
    })
    test('fails with proper statuscode and message if username already taken', async () => {
      const usersInDb = await helper.usersInDb()
      const existingUser = usersInDb[0]
      const newUser = createMockUser({ username: existingUser.username })
      const response = await api.post('/api/users').send(newUser)
      assert.strictEqual(response.status, 400)
      assert.strictEqual(response.body.error.includes('expected `username` to be unique'), true)
    })
    test('fails with proper statuscode and message if password or username is missing', async () => {
      const newUserWithoutUsername = createMockUser({ username: undefined })
      const response1 = await api.post('/api/users').send(newUserWithoutUsername)
      assert.strictEqual(response1.status, 400)
      assert.strictEqual(response1.body.error.includes('Path `username` is required'), true)

      const newUserWithoutPassword = createMockUser({ password: undefined })
      const response2 = await api.post('/api/users').send(newUserWithoutPassword)
      assert.strictEqual(response2.status, 400)
      assert.strictEqual(response2.body.error.includes('Password is required'), true)
    })
    test('fails with proper statuscode and message if password or username is too short', async () => {
      const newUserWithShortUsername = createMockUser({ username: 'ab' })
      const response1 = await api.post('/api/users').send(newUserWithShortUsername)
      assert.strictEqual(response1.status, 400)
      assert.strictEqual(response1.body.error.includes('is shorter than the minimum allowed length'), true)

      const newUserWithShortPassword = createMockUser({ password: '12' })
      const response2 = await api.post('/api/users').send(newUserWithShortPassword)
      assert.strictEqual(response2.status, 400)
      assert.strictEqual(response2.body.error.includes('Password has to be at least 3 characters long'), true)
    })
  })

  after(async () => {
    await User.deleteMany({})
    await mongoose.connection.close()
  })
})
