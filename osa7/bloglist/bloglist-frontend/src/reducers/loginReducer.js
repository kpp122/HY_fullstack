import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { notification } from './notificationReducer';

const initialState = null;
const loginSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      return action.payload;
    },
    logout() {
      window.localStorage.removeItem('loggedBlogUser');
      return null;
    },
    loginStatus() {
      const loggedUser = window.localStorage.getItem('loggedBlogUser');

      if (loggedUser) {
        const user = JSON.parse(loggedUser);
        blogService.setToken(user.token);
        return user;
      }
    },
  },
});

export const userLogin = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(login(user));
    } catch (exception) {
      dispatch(
        notification(
          { message: 'invalid username or password', state: false },
          2
        )
      );
      dispatch(login(null));
    }
  };
};

const { login } = loginSlice.actions;
export const { logout, loginStatus } = loginSlice.actions;
export default loginSlice.reducer;
