const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: {
    type: Number,
    default: 0
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    if(typeof returnedObject.likes!=="number"){
      console.log('my name jeff')
    }
  }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog