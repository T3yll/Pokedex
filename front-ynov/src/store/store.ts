import { configureStore } from '@reduxjs/toolkit';
import { trainerSlice } from '../features/trainers/trainerSlice';

export const store = configureStore({
  reducer: {
    trainers: trainerSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
