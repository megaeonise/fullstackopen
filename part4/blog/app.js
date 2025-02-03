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
const { userExtractor } = require('./utils/user_extractor')



mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use('/api', usersRouter)
app.use('/api', loginRouter)
if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}
app.use(tokenExtractor)
app.use('/api', userExtractor, blogsRouter)
app.use(errorHandler)

module.exports = app