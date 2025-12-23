const Blog = require('../models/blogs')
const blogsRouter = require('express').Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})


blogsRouter.post('/', async (request, response) => {
  if(!request.body || !request.body.url || !request.body.title)
    return response.status(400).end()

  const blog = new Blog({ ...request.body, likes: request.body.likes || 0 })
  const savedBlog = await blog.save()
  return response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  return response.status(204).end()
})

module.exports = blogsRouter
