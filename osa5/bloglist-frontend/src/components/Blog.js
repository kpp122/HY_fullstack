import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateLikes, removeBlog }) => {
	const [visible, setVisible] = useState(false)

	const showWhenVisible = { display: visible ? '' : 'none' }
	const buttonLabel = !visible ? 'view' : 'hide'
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}
	const handleButton = () => {

		const newBlog = {
			'author': blog.author,
			'likes': blog.likes + 1,
			'title': blog.title,
			'url': blog.url,
			'user': blog.user.id
		}
		updateLikes(blog.id, newBlog)

	}

	const handleRemove = () => {
		const blogObject = {
			'author': blog.author,
			'title': blog.title,
			'id': blog.id
		}
		removeBlog(blogObject)
	}

	return (
		<div style={blogStyle} className='blog'>
			<div>
				{blog.title} {blog.author} <button onClick={() => setVisible(!visible)} id='blog-visibilityButton'>{buttonLabel}</button>
			</div>
			<div style={showWhenVisible} className='blogHiddenContent'>
				<p>{blog.url}</p>
				<span>likes </span>
				<span className='blogLike'>{blog.likes} </span>
				<button onClick={handleButton} id='blog-likeButton'>vote</button>
				<p>{blog.user.name}</p>
				<button onClick={handleRemove} id='blog-removeButton'>remove</button>
			</div>
		</div>
	)
}

Blog.propTypes = {
	updateLikes: PropTypes.func.isRequired,
	removeBlog: PropTypes.func.isRequired
}

export default Blog