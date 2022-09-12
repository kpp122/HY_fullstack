import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const createNew = async (content) => {
	const newObject = { content, votes: 0 }
	const response = await axios.post(baseUrl, newObject)
	return response.data
}

const update = async (object) => {
	const { id } = object
	const newObject = { content : object.content, votes : object.votes}

	const response = await axios.put(`${baseUrl}/${id}`, newObject)
	return response.data
}
const exports = {
	getAll,
	createNew,
	update
}

export default exports