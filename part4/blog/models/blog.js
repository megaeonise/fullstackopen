const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {type: String, required: true},
  author: String,
  url: {type: String, required: true},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  likes: {
    type: Number,
    default: 0
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
  }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog