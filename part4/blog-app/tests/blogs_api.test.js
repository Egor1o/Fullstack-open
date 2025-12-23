const supertest = require('supertest')
const app = require('../app')
const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const Blog = require('../models/blogs')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('each blog has a mapped id property', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach((blog) => {
    const id = Object.keys(blog).includes('id') ? 'id' : null
    const _id = Object.keys(blog).includes('_id') ? '_id' : null
    assert.strictEqual(id, 'id')
    assert.strictEqual(_id, null)
  })
})

after(async () => {
  await Blog.deleteMany({})
  await mongoose.connection.close()
})
