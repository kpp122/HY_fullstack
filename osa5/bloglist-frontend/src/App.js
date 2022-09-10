import { useState, useEffect } from 'react'
import './index.css'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [newMessage, setNewMessage] = useState({ msg: null, state: false })

	useEffect(() => {
		const fetchBlogs = async () => {
			const blogs = await blogService.getAll()
			setBlogs(blogs)
		}
		fetchBlogs()
	}, [])

	useEffect(() => {
		const loggedUser = window.localStorage.getItem('loggedBlogUser')
		if (loggedUser) {
			const user = JSON.parse(loggedUser)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const user = await loginService.login({ username, password })

			window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))

			setUser(user)
			blogService.setToken(user.token)
			setUsername('')
			setPassword('')

		}
		catch (exception) {
			setNewMessage({ msg: 'wrong username or password', state: false })
			setTimeout(() => {
				setNewMessage({ msg: null, state: false })
			}, 3000)
		}

	}

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogUser')
		setUser(null)
	}

	const createBlog = async (blogObject) => {

		try {
			const blog = await blogService.create(blogObject)
			const newBlogs = await blogService.getAll()
			setBlogs(newBlogs)
			setNewMessage({ msg: `a new blog ${blog.title} by ${blog.author} added`, state: true })
		}
		catch (exception) {
			setNewMessage({ msg: exception.response.data.error, state: false })
		}
		setTimeout(() => {
			setNewMessage({ msg: null, state: false })
		}, 3000)

	}

	const updateLikes = async (id, blogObject) => {
		try {
			await blogService.update(id, blogObject)
			const newBlogs = await blogService.getAll()
			setBlogs(newBlogs)
		}
		catch (exception) {
			setNewMessage({ msg: 'blog could not be added ', state: false })
			setTimeout(() => {
				setNewMessage({ msg: null, state: false })
			}, 2000)
		}
	}

	const removeBlog = async (blogObject) => {

		if (window.confirm(`remove blog ${blogObject.title} by ${blogObject.author}`)) {
			try {
				await blogService.remove(blogObject.id)
				const newBlogs = blogs.filter(blog => blog.id !== blogObject.id)
				setBlogs(newBlogs)
			}
			catch (exception) {
				console.log(exception)
			}
		}
	}


	if (user === null) {
		return (
			<div>
				<h1>Log in to application</h1>
				<Notification message={newMessage} />
				<LoginForm {...{ username, setUsername, password, setPassword, handleLogin }} />
			</div>
		)
	}

	return (
		<div>
			<div>
				<h2>blogs</h2>
				<Notification message={newMessage} />
				<div>
					{user.name} logged in <button onClick={handleLogout}>Logout</button>
				</div>
				<Togglable buttonLabel={'create new blog'}>
					<CreateBlog newBlog={createBlog} />
				</Togglable>

				<div>
					{blogs
						.filter(blog => blog.user.username === user.username)
						.sort((a, b) => b.likes - a.likes)
						.map(blog => <Blog key={blog.id} blog={blog} updateLikes={updateLikes} removeBlog={removeBlog} />)}
				</div>
			</div>
		</div>
	)
}

export default App
