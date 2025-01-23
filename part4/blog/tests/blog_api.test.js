const { test, describe, after, beforeEach, before } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const { initial } = require('lodash')




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

let token = ''


beforeEach(async () => {
    await User.deleteMany({})
    const newUser =
        {
            username: 'blogtester',
            name: 'blogger',
            password: 'iheartblogs'
        }
    const userLogin = {username: 'blogtester', password: 'iheartblogs'}
    await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
    const login = await api.post('/api/login').send(userLogin).expect(200)
    token = login.body.token
    await Blog.deleteMany({})
    await api.post('/api/blogs').set({Authorization: `Bearer ${token}`}).send(initialBlogs[0]).expect(201)
    await api.post('/api/blogs').set({Authorization: `Bearer ${token}`}).send(initialBlogs[1]).expect(201)
    await api.post('/api/blogs').set({Authorization: `Bearer ${token}`}).send(initialBlogs[2]).expect(201)
})

describe('when there are some blogs saved initially', () => {
    test('the correct number of blogs are returned as json', async () => {
        response = await api.get('/api/blogs').set({Authorization: `Bearer ${token}`})
        .expect(200)
        .expect('Content-Type', /application\/json/)
        assert.strictEqual(response.body.length, initialBlogs.length)
    })


    test('the unique identifier of the blog posts is named id', async () => {
        const response = await api.get('/api/blogs').set({Authorization: `Bearer ${token}`})
        const ids = response.body.map(r=>r.id)
        assert.strictEqual(response.body.length, ids.length)
    })

    test('a valid blog can be added', async () => {
        const newBlog = {
            title: 'radiance...',
            author: 'BRANDON SANDERSON',
            url: 'twokmatrix.com',
            likes: 12314583,
        }
        
        await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs').set({Authorization: `Bearer ${token}`})
        const titles = response.body.map(r=>r.title)
        const authors = response.body.map(r=>r.author)
        const urls = response.body.map(r=>r.url)
        const likes = response.body.map(r=>r.likes)
        const blogObject = {
            title: titles,
            author: authors,
            url: urls,
            likes: likes,
        }
        assert.strictEqual(response.body.length, initialBlogs.length+1)
        Object.keys(newBlog).forEach((key) => assert(blogObject[key].includes(newBlog[key])))
    })

    test('likes defaults to 0 if likes is missing', async () => {
        const newBlog = {
            title: 'test...',
            author: 'BTEST',
            url: 'test.com',
        }
        
        await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs').set({Authorization: `Bearer ${token}`})
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
            likes: 21023,
        }
        
        const request = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)

        assert.strictEqual(request.status, 400)
        assert.strictEqual(request.text ,'{"error":"Bad Request"}')
    })

    test('a blog can be deleted', async () => {
        let response = await api.get('/api/blogs').set({Authorization: `Bearer ${token}`})
        const id = response.body[0].id
        const no_of_blogs = response.body.length
        await api.delete(`/api/blogs/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)
        response = await api.get('/api/blogs').set({Authorization: `Bearer ${token}`})
        assert.strictEqual(response.body.length, no_of_blogs-1)
    })

    test('a blog can be updated', async () => {
        const blogUpdate = {
            title: 'RHYTHYM of war',
            author: 'Brandon Sanderson',
            url: 'www.brandonsanderson.com',
            likes: 9999999
        }
        const beforeUpdate = await api.get('/api/blogs').set({Authorization: `Bearer ${token}`})
        const update = await api.put(`/api/blogs/${beforeUpdate.body[0].id}`).set({Authorization: `Bearer ${token}`}).send(blogUpdate)
        const afterUpdate = await api.get('/api/blogs').set({Authorization: `Bearer ${token}`})

        assert.strictEqual(beforeUpdate.body.length, afterUpdate.body.length)
        Object.keys(blogUpdate).forEach((key) => assert.strictEqual(update.body[key], blogUpdate[key]))
    })

    test('adding a blog fails with status code 401 if token is not provided', async () =>{
        const newBlog = {
            title: 'radiance...',
            author: 'BRANDON SANDERSON',
            url: 'twokmatrix.com',
            likes: 12314583,
        }
        
        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)
    })


})

after(async () => {
    await mongoose.connection.close()
})