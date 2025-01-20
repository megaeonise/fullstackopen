const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')


blogsRouter.get('/blogs', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)
})

blogsRouter.post('/blogs', async (request, response) => {
  const user = await User.findById(request.body.user)
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    user: user.id,
    likes: request.body.likes
  })
  

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/blogs/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/blogs/:id', async (request, response) => {
  const newBlog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }

  const result = await Blog.findByIdAndUpdate(request.params.id, newBlog, {new: true, runValidators: true})
  response.json(result)
})

module.exports = blogsRouter