const Blog = require('../models/blogs')
const blogsRouter = require('express').Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})


blogsRouter.post('/', async (request, response) => {
  if(!request.body || !request.body.url || !request.body.title)
    return response.status(400).json('Title or url missing')

  const blog = new Blog({ ...request.body, likes: request.body.likes || 0 })
  const savedBlog = await blog.save()
  return response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  return response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'Blog is not found' })
  }

  blog.title = request.body.title ? request.body.title : blog.title
  blog.likes = request.body.likes ? request.body.likes : blog.likes
  blog.author = request.body.author ? request.body.author : blog.author
  blog.url = request.body.url ? request.body.url : blog.url

  const result = await blog.save()
  return response.json(result)
})

module.exports = blogsRouter
