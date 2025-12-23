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

test('blogs is saved correctly', async  () => {
  const newBlog = {
    author: 'Test Author',
    title: 'Test Title',
    url: 'http://testurl.com',
    likes: 3
  }
  const response = await api.post('/api/blogs').send(newBlog)
  const responseBodyCopyWithoutId =
    { author: response.body.author, title: response.body.title, url: response.body.url, likes: response.body.likes }
  assert.strictEqual(response.status, 201)
  assert.deepStrictEqual(responseBodyCopyWithoutId, newBlog)

  const blogsInDb = await helper.blogsInDB()
  assert.strictEqual(blogsInDb.length, helper.initialBlogs.length + 1)

  const newBlogInDb = blogsInDb.find(blog => blog.title === 'Test Title')
  assert.deepStrictEqual(response.body, newBlogInDb)

})

test('adding a new blog without likes property sets likes to 0', async () => {
  const newBlog = {
    author: 'Test Author',
    title: 'Test Title',
    url: 'http://testurl.com',
  }
  const response = await api.post('/api/blogs').send(newBlog)
  assert.strictEqual(response.status, 201)
  assert.strictEqual(response.body.likes, 0)

  const blogsInDb = await helper.blogsInDB()
  assert.strictEqual(blogsInDb.length, helper.initialBlogs.length + 1)

  const newBlogInDb = blogsInDb.find(blog => blog.title === 'Test Title')
  assert.deepStrictEqual(response.body.likes, newBlogInDb.likes)
})

test('Adding a new blog without title and url properties returns status code 400', async () => {
  const newBlogWithoutTitle = { author: 'Test Author1', url: 'http://testurl1.com' }
  const response1 = await api.post('/api/blogs').send(newBlogWithoutTitle)
  assert.strictEqual(response1.status, 400)
  const newBlogWithoutUrl = { author: 'Test Author2', title: 'Test Title2' }
  const response2 = await api.post('/api/blogs').send(newBlogWithoutUrl)
  assert.strictEqual(response2.status, 400)
  const newBlogWithoutTitleAndUrl = { author: 'Test Author3' }
  const response3 = await api.post('/api/blogs').send(newBlogWithoutTitleAndUrl)
  assert.strictEqual(response3.status, 400)
})

after(async () => {
  await Blog.deleteMany({})
  await mongoose.connection.close()
})
