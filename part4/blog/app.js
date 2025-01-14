const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')
const { errorHandler } = require('./utils/error_handler')



mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use('/api', blogsRouter)
app.use(errorHandler)

module.exports = app