import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/user';

const initialState = [];
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers(state, action) {
      console.log('PAYLOAD', action.payload);
      return action.payload;
    },
  },
});

const { setUsers } = userSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(setUsers(users));
  };
};

export default userSlice.reducer;
