import { configureStore } from '@reduxjs/toolkit';
import { user_Slice } from '../Reducers/userSlice';
import { error_Slice } from '../Reducers/errorslice';

export const Store = configureStore({
  reducer: {
    user: user_Slice.reducer,
    error: error_Slice.reducer,
  },
});

export type RootSate = ReturnType<typeof Store.getState>;
export type AppState = typeof Store.dispatch;