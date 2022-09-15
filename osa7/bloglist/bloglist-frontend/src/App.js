import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.css';
import Blogs from './components/Blogs';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import CreateBlog from './components/CreateBlog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import Users from './components/Users';
import User from './components/User';

import { notification } from './reducers/notificationReducer';
import { initializeBlogs } from './reducers/blogReducer';
import { userLogin, logout, loginStatus } from './reducers/loginReducer';
import { initializeUsers } from './reducers/userReducer';

import { Route, Routes, Link } from 'react-router-dom';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
    dispatch(loginStatus());
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      dispatch(userLogin({ username, password }));
      setUsername('');
      setPassword('');
    } catch (exception) {
      dispatch(
        notification(
          {
            message: 'wrong username or password',
            state: false,
          },
          5
        )
      );
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (user === null) {
    return (
      <div className="container">
        <h1>Log in to application</h1>
        <Notification />
        <LoginForm
          {...{
            username,
            setUsername,
            password,
            setPassword,
            handleLogin,
          }}
        />
      </div>
    );
  }

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        ></button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                <span className="sr-only">
                  <Link to="/blogs">Blogs</Link>
                </span>
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="#">
                <span className="sr-only">
                  <Link to="/users">Users</Link>
                </span>
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="#">
                <span className="sr-only">
                  {user ? (
                    <div>
                      <em>{user.name} logged in</em>{' '}
                      <button
                        className="btn primary-btn"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <Link to="/login" />
                  )}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div>
        <h2>blogs</h2>
        <Notification />
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/users" element={<Users />} />
          <Route
            path="/login"
            elements={
              <LoginForm
                {...{
                  username,
                  setUsername,
                  password,
                  setPassword,
                  handleLogin,
                }}
              />
            }
          />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<Blog />} />
        </Routes>

        <Togglable buttonLabel={'create new blog'}>
          <CreateBlog />
        </Togglable>
      </div>
    </div>
  );
};

export default App;
