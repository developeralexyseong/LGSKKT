import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import boardReducer from './board';

export const store = configureStore({
  reducer: {
    user: userReducer,
    board: boardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
