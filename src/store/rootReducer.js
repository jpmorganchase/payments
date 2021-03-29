import { combineReducers } from '@reduxjs/toolkit';

import apiStatusSlice from './apiStatusSlice';

const RootReducer = combineReducers({
  apiStatus: apiStatusSlice,
});

export default RootReducer;
