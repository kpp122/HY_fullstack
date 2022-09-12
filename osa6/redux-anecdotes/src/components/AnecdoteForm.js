import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notification } from "../reducers/notificationReducer"

const AnecdoteForm = (props) => {

	const addAnecdote = async (e) => {
		e.preventDefault()
		const content = e.target.anecdote.value
		e.target.anecdote.value = ''

		props.createAnecdote(content)
		props.notification(`Added '${content}'`, 2)
	  }

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={addAnecdote}>
				<div><input name='anecdote' /></div>
				<button type='submit'>create</button>
			</form>
		</div>
	)
}

const mapDispatchToProps = {
	createAnecdote,
	notification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)