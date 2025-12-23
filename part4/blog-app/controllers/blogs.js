const Blog = require('../models/blogs')
const blogsRouter = require('express').Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})


blogsRouter.post('/', async (request, response) => {
  const blog = new Blog({ ...request.body, likes: request.body.likes || 0 })
  const savedBlog = await blog.save()
  return response.status(201).json(savedBlog)
})

module.exports = blogsRouter
