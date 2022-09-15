import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = ({ addNew }) => {
	const { reset : resetContent, ...content } = useField('text')
	const { reset : resetAuthor, ...author} = useField('text')
	const { reset : resetInfo, ...info} = useField('text')
	const navigate = useNavigate()


	const handleSubmit = (e) => {
		e.preventDefault()
		addNew({
			content: content.value,
			author: author.value,
			info: info.value,
			votes: 0
		})

		navigate('/')
	}

	const resetFields = (e) => {
		e.preventDefault()
		resetContent()
		resetAuthor()
		resetInfo()
	}

	return (
		<div>
			<h2>create a new anecdote</h2>
			<form onSubmit={handleSubmit}>
				<div>
					content
					<input {...content} />
				</div>
				<div>
					author
					<input {...author} />
				</div>
				<div>
					url for more info
					<input {...info} />
				</div>
				<button type='submit'>create</button>
				<button onClick={resetFields}>reset</button>
			</form>
		</div>
	)

}

export default CreateNew