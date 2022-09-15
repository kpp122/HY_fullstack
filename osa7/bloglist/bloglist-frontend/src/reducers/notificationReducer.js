import { createSlice } from '@reduxjs/toolkit';

const initialState = { message: null, state: false };

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    removeNotification() {
      return initialState;
    },
  },
});

let timeoutID;

export const notification = (message, time) => {
  return (dispatch) => {
    dispatch(setNotification(message));

    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    timeoutID = setTimeout(() => {
      dispatch(removeNotification());
    }, time * 1000);
  };
};

export const { setNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
