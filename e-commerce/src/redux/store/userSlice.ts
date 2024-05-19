/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  isUserLogged: boolean;
  email: string;
  id: string;
};

const initialState: UserState = {
  isUserLogged: false,
  email: '',
  id: '',
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUserLogged(state, action: PayloadAction<boolean>) {
      state.isUserLogged = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setID(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
    logout(state) {
      state.isUserLogged = false;
      state.email = '';
      state.id = '';
    },
  },
});

export const { setUserLogged, setEmail, setID, logout } = userSlice.actions;

export default userSlice.reducer;
