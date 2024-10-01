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

blogsRouter.put('/:id', async (req, res) =>{
  const {title, author, url, likes} = req.body
  const id = req.params.id
  const blog = {
    id, title, author, url, likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {new: true})
  res.json(updatedBlog)
})

blogsRouter.delete('/', async(req, res) => {
  await Blog.deleteMany({})
  res.status(204).end()
})

blogsRouter.delete('/:id', async(req, res)=>{
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})
module.exports = blogsRouter