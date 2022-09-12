import { createSlice } from "@reduxjs/toolkit";

const initialState = null

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		setNotification(state, action) {
			return action.payload
		},
		removeNotification(state, action) {
			return null
		}
	}
})

let timeoutID
export const notification = (content, time) => {
	return dispatch => {
		dispatch(setNotification(content))

		if(timeoutID) { clearTimeout(timeoutID) }

		timeoutID = setTimeout(() => {
			dispatch(removeNotification())
		}, 1000 * time)
	}
}

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer