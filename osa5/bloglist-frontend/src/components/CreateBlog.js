import { useState } from 'react'
import PropTypes from 'prop-types'

const CreateBlog = ({ newBlog }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()

		const blog = {
			'title': title,
			'author': author,
			'url': url
		}

		newBlog(blog)
		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<h1>create new</h1>
				<div>
            title: <input value={title} onChange={({ target }) => setTitle(target.value)} placeholder='title' id='createBlog-title'/>
				</div>
				<div>
            author: <input value={author} onChange={({ target }) => setAuthor(target.value)} placeholder='author' id='createBlog-author'/>
				</div>
				<div>
            url: <input value={url} onChange={({ target }) => setUrl(target.value)} placeholder='url' id='createBlog-url'/>
				</div>
				<button type="submit" id='createBlog-button'>Create</button>
			</form>
		</div>
	)
}

CreateBlog.propTypes = {
	newBlog : PropTypes.func.isRequired
}

export default CreateBlog