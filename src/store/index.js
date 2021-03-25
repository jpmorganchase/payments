import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: counterSlice.reducer,
});

export default store;
