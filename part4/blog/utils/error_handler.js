const logger = require('../utils/logger')
const errorHandler = (error, request, response, next) => {
    logger.error(error)
    if (error.name === 'ValidationError') {
      return response.status(400).json({ error: 'Bad Request' })
    }
    next(error)
  }

module.exports = {
    errorHandler
}