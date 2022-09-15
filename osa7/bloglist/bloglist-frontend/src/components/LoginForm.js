import PropTypes from 'prop-types';

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
}) => {
  return (
    <form onSubmit={handleLogin} id="login-form">
      <div className="form-group">
        <label htmlFor="login-username">Username</label>
        <input
          className="form-control"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          id="login-username"
        />
      </div>
      <br />
      <div className="form-group">
        <label htmlFor="login-password">password</label>
        <input
          className="form-control"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          id="login-password"
        />
      </div>
      <br />
      <button className="btn btn-primary" type="submit" id="login-button">
        login
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
