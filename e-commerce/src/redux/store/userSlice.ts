/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  addresses: [];
  shippingAddressIds: [];
  billingAddressIds: [];
};

export type AuthToken = {
  email: string;
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
};

type UserState = {
  user: User;
  authToken: AuthToken;
};

const initialState: UserState = {
  user: {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    addresses: [],
    shippingAddressIds: [],
    billingAddressIds: [],
  },
  authToken: {
    email: '',
    access_token: '',
    expires_in: 0,
    token_type: '',
    scope: '',
    refresh_token: '',
  },
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUserLogged(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setAuthToken(state, action: PayloadAction<AuthToken>) {
      state.authToken = action.payload;
    },
    logout(state) {
      state.user = initialState.user;
      state.authToken = initialState.authToken;
    },
  },
});

export const { setUserLogged, setAuthToken, logout } = userSlice.actions;

export default userSlice.reducer;
