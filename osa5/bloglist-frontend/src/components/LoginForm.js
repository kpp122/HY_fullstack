import PropTypes from 'prop-types'

const LoginForm = ({ username, setUsername, password, setPassword, handleLogin }) => {

	return (
		<form onSubmit={handleLogin} id='login-form'>
            username: <input value={username} onChange={({ target }) => setUsername(target.value)} id='login-username' />
			<br />
            password: <input value={password} onChange={({ target }) => setPassword(target.value)} id='login-password' />
			<br />
			<button type="submit" id='login-button'>login</button>
		</form>
	)
}

LoginForm.propTypes = {
	username: PropTypes.string.isRequired,
	setUsername: PropTypes.func.isRequired,
	password: PropTypes.string.isRequired,
	setPassword: PropTypes.func.isRequired,
	handleLogin: PropTypes.func.isRequired

}

export default LoginForm