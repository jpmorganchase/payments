import { combineReducers } from '@reduxjs/toolkit';

import StatusSlice from './slices/statusSlice';

const RootReducer = combineReducers({
  status: StatusSlice,
});

export default RootReducer;
