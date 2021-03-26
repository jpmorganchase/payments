import { combineReducers } from '@reduxjs/toolkit';

import apiStatusSlice from './slices/statusSlice/apiStatusSlice';

const RootReducer = combineReducers({
  apiStatus: apiStatusSlice,
});

export default RootReducer;
