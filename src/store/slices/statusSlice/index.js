import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: [],
};

const StatusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export default StatusSlice.reducer;
