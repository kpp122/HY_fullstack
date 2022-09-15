import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducers/notificationReducer';
import blogReducer from './reducers/blogReducer';
import loginReducer from './reducers/loginReducer';
import userReducer from './reducers/userReducer';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blog: blogReducer,
    login: loginReducer,
    user: userReducer,
  },
});

export default store;
