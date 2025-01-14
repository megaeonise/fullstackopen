const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')


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
  logger.info(typeof request.body.title, 'is this okay')
  const blog = new Blog(request.body)
  try {
  result = await blog.save()
  response.status(201).json(result)
  }
  catch(exception) {
    next(exception)
  }
})



module.exports = blogsRouter