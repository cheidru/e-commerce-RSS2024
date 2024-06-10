import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice';
import appReducer from './appSlice';
import cartReducer from './cartSlice';
import anonymousReducer from './anonymousSlice';

const store = configureStore({
  reducer: {
    userSlice: userReducer,
    appSlice: appReducer,
    cartSlice: cartReducer,
    anonymousSlice: anonymousReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
