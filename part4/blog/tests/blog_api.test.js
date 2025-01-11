const { test, describe, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')

const api = supertest(app)

test('the list of blogs are returned as json', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}) 

after(async () => {
    await mongoose.connection.close()
})