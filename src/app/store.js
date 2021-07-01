import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import positionsReducer from '../features/positions/positionsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    positions: positionsReducer,
  },
});
