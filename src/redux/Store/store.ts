import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { user_Slice } from '../Reducers/userSlice';
import { error_Slice } from '../Reducers/errorslice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Combine reducers
const rootReducer = combineReducers({
  user: user_Slice.reducer,
  error: error_Slice.reducer,
});

// Persist configuration
const persistConfig = {
  key: 'user',
  storage: AsyncStorage,
  whitelist: ['user'], // only persist the `user` slice
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const Store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Persistor
export const persistor = persistStore(Store);

// Types
export type RootSate = ReturnType<typeof Store.getState>;
export type AppState = typeof Store.dispatch;
