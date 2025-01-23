const express = require('express')
const mongoose = require('mongoose')
require('express-async-errors')
const app = express()
const cors = require('cors')
const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const config = require('./utils/config')
const { errorHandler } = require('./utils/error_handler')
const { tokenExtractor } = require('./utils/token_extractor')



mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use(tokenExtractor)
app.use('/api', blogsRouter)
app.use('/api', usersRouter)
app.use('/api', loginRouter)
app.use(errorHandler)

module.exports = app