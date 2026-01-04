const supertest = require('supertest')
const app = require('../app')
const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const Blog = require('../models/blogs')
const api = supertest(app)
const User = require('../models/users')

describe('when there are blogs initially saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    await helper.createAndSaveMockUser()
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api.get('/api/blogs').expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blogs returned are of a correct length', async () => {
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

  describe('addition of a new blog/blogs ', () => {
    test('succeeds with valid data', async  () => {
      const authResponse = await api.post('/api/login').send({
        username: helper.mockTestUser.username,
        password: helper.mockTestUser.password
      })
      const token = authResponse.body.token
      const newBlog = {
        author: 'Test Author',
        title: 'Test Title',
        url: 'http://testurl.com',
        likes: 3
      }
      const response = await api.post('/api/blogs').send(newBlog).set('Authorization', `Bearer ${token}`)
      const responseBodyCopyWithoutId =
        { author: response.body.author, title: response.body.title, url: response.body.url, likes: response.body.likes }
      assert.strictEqual(response.status, 201)
      assert.deepStrictEqual(responseBodyCopyWithoutId, newBlog)

      const blogsInDb = await helper.blogsInDB()
      assert.strictEqual(blogsInDb.length, helper.initialBlogs.length + 1)

      const newBlogInDb = blogsInDb.find(blog => blog.title === 'Test Title')
      assert.deepStrictEqual(response.body, { ...newBlogInDb, user: newBlogInDb.user.toString() })

    })

    test('without likes property sets likes to 0', async () => {
      const authResponse = await api.post('/api/login').send({
        username: helper.mockTestUser.username,
        password: helper.mockTestUser.password
      })
      const token = authResponse.body.token
      const newBlog = {
        author: 'Test Author',
        title: 'Test Title',
        url: 'http://testurl.com',
      }
      const response = await api.post('/api/blogs').send(newBlog).set('Authorization', `Bearer ${token}`)
      assert.strictEqual(response.status, 201)
      assert.strictEqual(response.body.likes, 0)

      const blogsInDb = await helper.blogsInDB()
      assert.strictEqual(blogsInDb.length, helper.initialBlogs.length + 1)

      const newBlogInDb = blogsInDb.find(blog => blog.title === 'Test Title')
      assert.deepStrictEqual(response.body.likes, newBlogInDb.likes)
    })

    test('without title, url or both properties returns status code 400', async () => {
      const authResponse = await api.post('/api/login').send({
        username: helper.mockTestUser.username,
        password: helper.mockTestUser.password
      })
      const token = authResponse.body.token
      const newBlogWithoutTitle = { author: 'Test Author1', url: 'http://testurl1.com' }
      const response1 = await api.post('/api/blogs').send(newBlogWithoutTitle).set('Authorization', `Bearer ${token}`)
      assert.strictEqual(response1.status, 400)
      const newBlogWithoutUrl = { author: 'Test Author2', title: 'Test Title2' }
      const response2 = await api.post('/api/blogs').send(newBlogWithoutUrl).set('Authorization', `Bearer ${token}`)
      assert.strictEqual(response2.status, 400)
      const newBlogWithoutTitleAndUrl = { author: 'Test Author3' }
      const response3 = await api.post('/api/blogs').send(newBlogWithoutTitleAndUrl).set('Authorization', `Bearer ${token}`)
      assert.strictEqual(response3.status, 400)
    })
  })

  describe('updating an existing blog', () => {
    test('with a correct data returns an updated object', async () => {
      const blogsAtStart = await helper.blogsInDB()
      const blogToUpdate = blogsAtStart[0]

      const updatedBlogData = {
        title: 'Updated Title',
        likes: 12,
        author: blogToUpdate.author,
        url: blogToUpdate.url
      }

      const response = await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlogData)
      assert.strictEqual(response.status, 200)
      assert.deepStrictEqual(response.body, { ...updatedBlogData, id: blogToUpdate.id })
    })

    test('with a correct data does not change other fields', async () => {
      const blogsAtStart = await helper.blogsInDB()
      const blogToUpdate = blogsAtStart[0]

      const updatedBlogData = {
        likes: 12
      }

      const response = await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlogData)
      assert.strictEqual(response.status, 200)
      assert.strictEqual(response.body.author, blogToUpdate.author)
      assert.strictEqual(response.body.url, blogToUpdate.url)
      assert.strictEqual(response.body.title, blogToUpdate.title)
    })

    test('with a correct data does not change the number of blogs', async () => {
      const blogsAtStart = await helper.blogsInDB()
      const blogToUpdate = blogsAtStart[0]
      const response = await api.put(`/api/blogs/${blogToUpdate.id}`).send({})
      assert.strictEqual(response.status, 200)
      const blogsAtEnd = await helper.blogsInDB()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })

  })


  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid and user is authorized', async () => {
      const blogsAtStart = await helper.blogsInDB()
      const authResponse = await api.post('/api/login').send({
        username: helper.mockTestUser.username,
        password: helper.mockTestUser.password
      })
      const token = authResponse.body.token
      const newBlog = {
        author: 'Test Author',
        title: 'Test Title',
        url: 'http://testurl.com',
      }
      const response = await api.post('/api/blogs').send(newBlog).set('Authorization', `Bearer ${token}`)
      const blogToDeleteId = response.body.id
      const deleteResponse = await api.delete(`/api/blogs/${blogToDeleteId}`).set('Authorization', `Bearer ${token}`)
      const blogsAtEnd = await helper.blogsInDB()
      assert.strictEqual(deleteResponse.status, 204)
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
      const deletedBlog = blogsAtEnd.find(blog => blog.id === blogToDeleteId)
      assert.strictEqual(deletedBlog, undefined)
    })
    test('fails with status code 401 if user is not authorized', async () => {
      const blogsAtStart = await helper.blogsInDB()
      const blogToDelete = blogsAtStart[0]
      const authResponse = await api.post('/api/login').send({
        username: helper.mockTestUser.username,
        password: helper.mockTestUser.password
      })
      const token = authResponse.body.token
      await api.delete(`/api/blogs/${blogToDelete.id}`).set('Authorization', `Bearer ${token}`)
      const blogsAtEnd = await helper.blogsInDB()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })
  })
  after(async () => {
    await Blog.deleteMany({})
    await mongoose.connection.close()
  })
})

