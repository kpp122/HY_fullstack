import { useSelector, useDispatch } from "react-redux"
import { updateVotes } from "../reducers/anecdoteReducer"
import { notification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
	const dispatch = useDispatch()
	const anecdotes = useSelector(({ anecdotes, filter }) => {
		const tmp = [...anecdotes].sort((a, b) => b.votes - a.votes)

		if (filter === '') {
			return tmp
		}
		else {
			return tmp.filter(str => str.content.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
		}
	})


	const vote = (anecdote) => {
		dispatch(updateVotes(anecdote))
		dispatch(notification(`You voted '${anecdote.content}'`, 5))

	}

	return (
		<div>
			{anecdotes
				.map(anecdote => <Anecdote key={anecdote.id} {...{ anecdote, vote }} />)
			}
		</div>
	)
}

const Anecdote = ({ anecdote, vote }) => {
	return (
		<>
			<div>
				{anecdote.content}
			</div>
			<div>
				has {anecdote.votes}
				<button onClick={() => vote(anecdote)}>vote</button>
			</div>
		</>
	)
}

export default AnecdoteList