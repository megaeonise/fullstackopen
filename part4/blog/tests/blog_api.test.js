const { test, describe, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const Blog = require('../models/blog')


const api = supertest(app)

const initialBlogs = [
    {
        title: 'test',
        author: '',
        url: 'test.com',
        likes: 0
    },
    {
        title: 'THE WAY OF KINGS TWOK',
        author: 'BRANDON SANDERSON',
        url: 'twokmatrix.com',
        likes: 9911021
    },
    {
        title: 'THE WAY OF KINGS PATH OF RADIANCE',
        author: 'BRANDON SANDERSON',
        url: 'twokmatrix.com',
        likes: 9911021
    },
]

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const promiseArray =  blogObjects.map(blog => blog.save())

    await Promise.all(promiseArray)
})

test('the correct number of blogs are returned as json', async () => {
    response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    assert.strictEqual(response.body.length, initialBlogs.length)
})


test('the unique identifier of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    const ids = response.body.map(r=>r.id)
    assert.strictEqual(response.body.length, ids.length)
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'radiance...',
        author: 'BRANDON SANDERSON',
        url: 'twokmatrix.com',
        likes: 12314583
      }
    
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(r=>r.title)
    const authors = response.body.map(r=>r.author)
    const urls = response.body.map(r=>r.url)
    const likes = response.body.map(r=>r.likes)

    assert.strictEqual(response.body.length, initialBlogs.length+1)
    assert(titles.includes('radiance...'))
    assert(authors.includes('BRANDON SANDERSON'))
    assert(urls.includes('twokmatrix.com'))
    assert(likes.includes(12314583))
})

test('likes defaults to 0 if likes is missing', async () => {
    const newBlog = {
        title: 'test...',
        author: 'BTEST',
        url: 'test.com',
      }
    
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(r=>r.title)
    const likes = response.body.map(r=>r.likes)

    assert.strictEqual(response.body.length, initialBlogs.length+1)
    const index = titles.indexOf('test...')
    assert.strictEqual(likes[index], 0)
})

test('400 bad request returned if title and url are missing', async () => {
    const newBlog = {
        title: '',
        author: 'BTEST',
        url: '',
        likes: 21023
      }
    
    const request = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

    assert.strictEqual(request.status, 400)
    assert.strictEqual(request.text ,'{"error":"Bad Request"}')


})

after(async () => {
    await mongoose.connection.close()
})