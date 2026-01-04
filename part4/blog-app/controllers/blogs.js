const Blog = require('../models/blogs')
const { userExtractor } = require('../utils/middleware')
const blogsRouter = require('express').Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  return response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  if(!request.body || !request.body.url || !request.body.title)
    return response.status(400).json('Title or url missing')

  const user = request.user
  if(!user) {
    return response.status(401).json({ error: 'User not found. (Invalid token)' })
  }

  const blog = new Blog({ ...request.body, likes: request.body.likes || 0, user: user._id })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  return response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'Blog is not found' })
  }
  const user = request.user
  if(!user || blog.user.toString() !== user._id.toString()) {
    return response.status(401).json({ error: 'The user is not authorized to modify this blog' })
  }
  await Blog.findByIdAndDelete(request.params.id)
  user.blogs = user.blogs.filter(id => id.toString() !== request.params.id)
  await user.save()
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
  const blogWithUser = await result.populate('user', { username: 1, name: 1 })
  return response.json(blogWithUser)
})

module.exports = blogsRouter
