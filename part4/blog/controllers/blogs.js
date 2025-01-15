const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')


blogsRouter.get('/blogs', async (request, response, next) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/blogs', async (request, response, next) => {
  const blog = new Blog(request.body)
  result = await blog.save()
  response.status(201).json(result)
})



module.exports = blogsRouter