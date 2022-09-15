import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const initialState = [];
const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    createBlog(state, action) {
      return [action.payload, ...state];
    },
    remove(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
    update(state, action) {
      const newObject = action.payload;
      return state.map((blog) => (blog.id !== newObject.id ? blog : newObject));
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const response = await blogService.getAll();
    dispatch(setBlogs(response));
  };
};

export const newBlog = (blogObject, user) => {
  return async (dispatch) => {
    const response = await blogService.create(blogObject);
    // eslint-disable-next-line no-unused-vars
    const { token, ...rest } = user;
    dispatch(createBlog({ ...response, user: rest }));
  };
};

export const removeBlog = (blogObject) => {
  return async (dispatch) => {
    await blogService.remove(blogObject.id);
    dispatch(remove(blogObject.id));
  };
};

export const updateBlog = (id, blogObject) => {
  return async (dispatch) => {
    const response = await blogService.update(id, blogObject);
    dispatch(update({ response }));
  };
};

export const createComment = (id, comment) => {
  return async (dispatch) => {
    const response = await blogService.postComment(id, comment);
    dispatch(update(response));
  };
};

const { setBlogs, createBlog, remove, update } = blogSlice.actions;
export default blogSlice.reducer;
