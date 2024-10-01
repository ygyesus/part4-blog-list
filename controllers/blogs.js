const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
   await Blog
      .find({})
      .then(blogs => {
        res.json(blogs)
      })
})

blogsRouter.post('/', async (req, res) => {

    const blog = new Blog(req.body)

    await blog.save()
        .then(result => {
            res.status(201).json(result)
        })
})

blogsRouter.delete('/', async(req, res) => {
  await Blog.deleteMany({})
  res.status(204).end()
})
module.exports = blogsRouter