// const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')

const { test, describe, after, beforeEach } = require('node:test')

const assert = require('node:assert')
console.log("ASSERT DONE")


const supertest = require('supertest')
console.log("SUPERTEST DONE")

const app = require('../app')
console.log("APP DONE")

const api = supertest(app)
console.log("API DONE")
const Blog = require('../models/blog')





// test('there are zero blogs', async () => {
//     console.log("EXPECT ZERO BLOGS")
//   const response = await api.get('/api/blogs')

//   assert.strictEqual(response.body.length, 0)
// })
beforeEach(async () => {
    await Blog.deleteMany({})
})
test('correct length blogs', async ()=>{
    const blogs = [
        {
          _id: "5a422a851b54a676234d17f7",
          title: "React patterns",
          author: "Michael Chan",
          url: "https://reactpatterns.com/",
          likes: 7,
          __v: 0
        },
        {
          _id: "5a422aa71b54a676234d17f8",
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
          likes: 5,
          __v: 0
        },
        {
          _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 12,
          __v: 0
        },
        {
          _id: "5a422b891b54a676234d17fa",
          title: "First class tests",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
          likes: 10,
          __v: 0
        },
        {
          _id: "5a422ba71b54a676234d17fb",
          title: "TDD harms architecture",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
          likes: 0,
          __v: 0
        },
        {
          _id: "5a422bc61b54a676234d17fc",
          title: "Type wars",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
          likes: 2,
          __v: 0
        }
    ]
    for (const blog of blogs){
        await api.post('/api/blogs').send(blog)
    }
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, blogs.length)
})

test('Unique identifier is named ID', async ()=>{
    const response = await api.get('/api/blogs')
    const blogs = response.body
    const result = true
    for (const blog of blogs){
        if (!blog.id){
            result = false
            break
        }
    }
    assert.strictEqual(result, true)
})

after(async () => {
    await mongoose.connection.close()
})