import { useState } from 'react'

const Togglable = ({ children, buttonLabel }) => {
	const [visible, setVisible] = useState(false)

	const showWhenVisible = { display: visible ? '' : 'none' }
	const hideWhenVisible = { display: visible ? 'none' : '' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	return (
		<div style={{ paddingTop: 30 }}>
			<div style={hideWhenVisible}>
				<button onClick={toggleVisibility} id='togglable-show'>{buttonLabel}</button>
			</div>
			<div style={showWhenVisible}>
				{children}
				<button onClick={toggleVisibility} id='togglable-hide'>cancel</button>
			</div>
		</div>
	)
}

export default Togglable