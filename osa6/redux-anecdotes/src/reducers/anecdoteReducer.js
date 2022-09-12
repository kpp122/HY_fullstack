import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const objectToChange = state.find(anec => anec.id === id)
      const newObject = { ...objectToChange, votes : objectToChange.votes + 1 }


      return state.map(object => object.id !== id ? object : newObject)

    case 'CREATE':
      return [...state, action.data.object]

    case 'SET':
      return state.concat(...action.data.anecdotes)

    default:
      return state
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const newAnecdote = (object) => {
  return {
    type: 'CREATE',
    data: {
      object
    }
  }
}

export const setAnecdotes = (anecdotes) => {
  return {
    type: 'SET',
    data: {
      anecdotes
    }
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = object => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(object)
    dispatch(newAnecdote(anecdote))
  }
}

export const updateVotes = object => {
  return async dispatch => {
    const newObject = { ...object, votes: object.votes + 1 }
    const anecdote = await anecdoteService.update(newObject)
    dispatch(voteAnecdote(anecdote.id))
  }
}

export default anecdoteReducer