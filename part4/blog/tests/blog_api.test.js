const { test, describe, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')



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
    const users = await api.get('/api/users')
    let user = await User.findById(users.body[0].id)

    const blogObjects = initialBlogs.map(blog => new Blog({
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        user: user.id
      }))
    const promiseArray =  blogObjects.map(blog => blog.save())
    const savedBlogs = await Promise.all(promiseArray)
    savedBlogs.forEach((blog) => user.blogs = user.blogs.concat(blog._id))
    console.log(user)
    await user.save()
})

describe('when there are some blogs saved initially', () => {
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
        const users = await api.get('/api/users')
        const newBlog = {
            title: 'radiance...',
            author: 'BRANDON SANDERSON',
            url: 'twokmatrix.com',
            likes: 12314583,
            user: users.body[0].id
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
        const usersId = response.body.map(r=>r.user.id)
        const blogObject = {
            title: titles,
            author: authors,
            url: urls,
            likes: likes,
            user: usersId
        }
        assert.strictEqual(response.body.length, initialBlogs.length+1)
        Object.keys(newBlog).forEach((key) => assert(blogObject[key].includes(newBlog[key])))
    })

    test('likes defaults to 0 if likes is missing', async () => {
        const users = await api.get('/api/users')
        const newBlog = {
            title: 'test...',
            author: 'BTEST',
            url: 'test.com',
            user: users.body[0].id
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
        const users = await api.get('/api/users')
        const newBlog = {
            title: '',
            author: 'BTEST',
            url: '',
            likes: 21023,
            user: users.body[0].id
        }
        
        const request = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

        assert.strictEqual(request.status, 400)
        assert.strictEqual(request.text ,'{"error":"Bad Request"}')
    })

    test('a blog can be deleted', async () => {
        let response = await api.get('/api/blogs')
        const id = response.body[0].id
        const no_of_blogs = response.body.length
        await api.delete(`/api/blogs/${id}`)
        .expect(204)
        response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, no_of_blogs-1)
    })

    test('a blog can be updated', async () => {
        const blogUpdate = {
            title: 'RHYTHYM of war',
            author: 'Brandon Sanderson',
            url: 'www.brandonsanderson.com',
            likes: 9999999
        }
        const beforeUpdate = await api.get('/api/blogs')
        const update = await api.put(`/api/blogs/${beforeUpdate.body[0].id}`).send(blogUpdate)
        const afterUpdate = await api.get('/api/blogs')

        assert.strictEqual(beforeUpdate.body.length, afterUpdate.body.length)
        Object.keys(blogUpdate).forEach((key) => assert.strictEqual(update.body[key], blogUpdate[key]))
    })


})

after(async () => {
    await mongoose.connection.close()
})