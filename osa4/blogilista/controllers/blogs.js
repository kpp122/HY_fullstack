const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')

blogsRouter.get('/', async (request, response) => {

    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })

    response.status(200).json(blogs)
})

blogsRouter.post('/', async (request, response) => {

    const body = request.body
    const user = request.user

    if (!user) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = new Blog({
        'title': body.title,
        'author': body.author,
        'url': body.url,
        'likes': body.likes,
        'user': user._id
    })

    if (!blog.title || !blog.author) {
        return response.status(400).send({ 'error': 'missing title or author' })
    }

    result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()

    response.status(201).json(result)
})

blogsRouter.put('/:id', async (request, response) => {
    const { body } = request
    const blog = {
        'title': body.title,
        'author': body.author,
        'url': body.url,
        'likes': body.likes
    }

    const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    if (result) {
        response.status(200).json(result)
    }
    else {
        response.status(404).end()
    }

})

blogsRouter.delete('/:id', async (request, response) => {
    const { user } = request

    if (!user) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() === user._id.toString()) {
        await blog.remove()
        await User.findByIdAndUpdate(user._id,
            { $pull: { 'blogs': request.params.id } })
    }
    else {
        return response.status(401).json({ error: 'blog can only be deleted by author' })
    }

    response.status(204).end()
})

module.exports = blogsRouter