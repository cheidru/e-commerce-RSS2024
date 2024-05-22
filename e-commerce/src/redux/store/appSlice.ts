/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthToken = {
  token: string;
  refreshToken: string;
  dateCreate: Date;
  ttl: number;
};

type AppState = {
  authToken: AuthToken;
};

const initialState: AppState = {
  authToken: {
    token: '',
    refreshToken: '',
    dateCreate: new Date(),
    ttl: 0,
  },
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setAppToken(state, action: PayloadAction<AuthToken>) {
      state.authToken = action.payload;
    },
  },
});

export const { setAppToken } = appSlice.actions;

export default appSlice.reducer;
