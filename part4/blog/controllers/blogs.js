const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/blogs', async (request, response, next) => {
  try {
  const blogs = await Blog.find({})
  response.json(blogs)
  }
  catch(exception) {
    next(exception)
  }
})

blogsRouter.post('/blogs', async (request, response, next) => {
  const blog = new Blog(request.body)
  try {
  await blog.save()
  response.status(201).json(result)
  }
  catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter