const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')
const { set } = require('lodash')

const api = supertest(app)

describe('when there are initially some blogs saved', () => {

    beforeAll(async () => {
        await User.deleteMany({})
        let passwordHash = await bcrypt.hash('secret', 10)

        const user = new User({
            name: 'user',
            username: 'root',
            blogs: [],
            passwordHash

        })

        await user.save()
    })

    beforeEach(async () => {
        await Blog.deleteMany({})
        const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
        const promiseArray = blogObjects.map(blog => blog.save())
        await Promise.all(promiseArray)
    })

    describe('blogs are returned correctly', () => {

        test('blogs are returned as json', async () => {
            await api.get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/)
        })

        test('all blogs are returned', async () => {
            const response = await api.get('/api/blogs')
            expect(response.body).toHaveLength(helper.initialBlogs.length)
        })

        test('returned blog has correct id field', async () => {
            const response = await api.get('/api/blogs')
            const obj = response.body[0]
            expect(obj.id).toBeDefined()
        })
    })

    describe('blogs can be added', () => {

        let authHeader

        beforeAll(async () => {
            const root = {
                username: 'root',
                password: 'secret'
            }

            const logIn = await api
                .post('/api/login')
                .send(root)

            authHeader = {'Authorization' : `bearer ${logIn.body.token}`}
        })


        test('new blog can be added', async () => {
            const blog = {
                title: "Testi kirja",
                author: "Kirjoittaja",
                url: "https://dummy.com/",
                likes: 18
            }

            const res = await api.post('/api/blogs')
                .set(authHeader)
                .send(blog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
            expect(JSON.parse(JSON.stringify(blogsAtEnd))).toContainEqual(res.body)
        })

        test('adding blog without token returns status 401', async () => {
            const blog = {
                title: "Testi kirja",
                author: "Kirjoittaja",
                url: "https://dummy.com/",
                likes: 18
            }

            const blogsAtStart = await helper.blogsInDb()
            const res = await api.post('/api/blogs')
            .send(blog)
            .expect(401)
            .expect('Content-Type', /application\/json/)

            blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
        })

        test('missing blog likes set to 0', async () => {
            const blog = {
                title: "Testi kirja",
                author: "Kirjoittaja",
                url: "https://dummy.com/",
            }
            const res = await api.post('/api/blogs')
                .set(authHeader)
                .send(blog)
                .expect(201)
                .expect('Content-Type', /application\/json/)
            expect(res.body.likes).toBe(0)
        })

        test('blogs with missing author or title wont be added', async () => {
            let blog = {
                title: "Testi kirja",
                url: "https://dummy.com/"
            }
            await api.post('/api/blogs')
                .set(authHeader)
                .send(blog)
                .expect(400)

            blog = {
                author: "Kirjoittaja",
                url: "https://dummy.com/"
            }
            await api.post('/api/blogs')
                .set(authHeader)
                .send(blog)
                .expect(400)
        })
    })

    describe('blogs can be deleted', () => {
        let authHeader

        beforeAll(async () => {
            const root = {
                username: 'root',
                password: 'secret'
            }

            const logIn = await api
                .post('/api/login')
                .send(root)

            authHeader = {'Authorization' : `bearer ${logIn.body.token}`}
        })

        test('blog removal with valid id returns status 204', async () => {
            const blog = {
                title: "Testi kirja",
                author: "Kirjoittaja",
                url: "https://dummy.com/",
                likes: 18
            }
            const blogsAtStart = await helper.blogsInDb()
            const res = await api.post('/api/blogs')
                .set(authHeader)
                .send(blog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            await api
                .delete(`/api/blogs/${res.body.id}`)
                .set(authHeader)
                .expect(204)

            const blogsAfterDelete = await helper.blogsInDb()
            expect(blogsAfterDelete).toHaveLength(blogsAtStart.length)

            const idList = blogsAfterDelete.map(blog => blog.id)
            expect(idList).not.toContain(res.body.id)
        })
    })

    describe('blogs can be edited', () => {
        test('blog with valid id gets edited succesfully', async () => {
            const blogs = helper.initialBlogs
            const updatedBlog = blogs[0]
            updatedBlog['author'] = 'new author'

            const result = await api
                .put(`/api/blogs/${updatedBlog._id}`)
                .send(updatedBlog)
                .expect(200)

            const newBlogs = await helper.blogsInDb()
            const blogAtEnd = newBlogs.find(blog => blog.id === updatedBlog._id)
            expect(blogAtEnd.author).toBe(updatedBlog.author)
        })

        test('blog update with invalid id returns status 400', async () => {
            const blog = {
                title: "Testi kirja",
                author: "Kirjoittaja",
                url: "https://dummy.com/",
                likes: 100
            }

            await api
                .put(`/api/blogs/${99999}`)
                .send(blog)
                .expect(400)
        })

        test('blog that does not exists fails with status 404', async () => {
            const blog = {
                title: "Testi kirja",
                author: "Kirjoittaja",
                url: "https://dummy.com/",
                likes: 100
            }
            const id = mongoose.Types.ObjectId()

            await api
                .put(`/api/blogs/${id}`)
                .send(blog)
                .expect(404)
        })
    })

    describe('when there is initially one user in DB', () => {
        beforeEach(async () => {
            await User.deleteMany({})

            const passwordHash = await bcrypt.hash('secret', 10)
            const user = new User({
                username: 'root',
                passwordHash
            })

            await user.save()
        })

        test('creation of fresh user', async () => {
            const usersAtStart = await helper.usersInDb()

            const newUser = {
                username: 'superuser',
                name: 'testuser',
                password: 'password'
            }

            await api
                .post('/api/users')
                .send(newUser)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const usersAtEnd = await User.find({})
            expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

            const userNames = usersAtEnd.map(user => user.username)
            expect(userNames).toContain(newUser.username)
        })

        test('creation fails with status 400 if username is taken', async () => {
            const usersAtStart = await helper.usersInDb()

            const newUser = {
                username: 'root',
                name: 'testuser',
                password: 'secret'
            }

            res = await api.post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            expect(res.body.error).toContain('name must be unique')

            const usersAtEnd = await helper.usersInDb()
            expect(usersAtStart).toHaveLength(usersAtEnd.length)

        })
    })

    describe('user with invalid information wont be created', () => {
        test('creation fails with status 400 if username is missing', async () => {
            const usersAtStart = await helper.usersInDb()

            const newUser = {
                name: 'testuser',
                password: 'secret'
            }

            res = await api.post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            expect(res.body.error).toContain('username must be given')

            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd).toHaveLength(usersAtStart.length)
        })

        test('creation fails with status 400 if password is missing', async () => {
            const usersAtStart = await helper.usersInDb()

            const newUser = {
                username: 'username',
                name: 'testuser'
            }

            res = await api.post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            expect(res.body.error).toContain('password must be given')

            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd).toHaveLength(usersAtStart.length)
        })

        test('creation fails with status 400 is password does not match min length', async () => {
            const usersAtStart = await helper.usersInDb()

            const newUser = {
                username: 'username',
                name: 'testuser',
                password: 'aa'
            }

            res = await api.post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            expect(res.body.error).toContain('password must be atleast 3 characters long')

            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd).toHaveLength(usersAtStart.length)
        })
    })

})

afterAll(() => {
    mongoose.connection.close()
})
