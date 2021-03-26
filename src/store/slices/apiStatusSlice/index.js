import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  apiStatus: [],
};

const apiStatusSlice = createSlice({
  name: 'apiStatus',
  initialState,
  reducers: {
    setStatus(state, action) {
      state.apiStatus = action.payload;
    },
  },
});

export default apiStatusSlice.reducer;
