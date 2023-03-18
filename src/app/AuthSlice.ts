import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from 'react-redux-typescript';
import { user } from './@types.data';
import { RootState } from './store';

// init state
const initialState = {
  isUser: true,
  email: '',
  isLoading: false,
  fullName: '',
} as user;

const AuthSlice = createSlice({
  // name used in action types
  name: 'auth',
  // initial state
  initialState,
  // an object of "case reducers"
  // key names are used to generate actions
  reducers: {
    createUser: (state: user, action: PayloadAction<string, user>) => {
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
      state.isUser = true;
    },
    setIsloading: (state: user, action: PayloadAction<string, boolean>) => {
      state.isLoading = action.payload;
    },
    logOut: (state: user) => {
      state.isUser = false;
      state.email = '';
      state.fullName = '';
    },
  },
});

export const { createUser, setIsloading, logOut } = AuthSlice.actions;
export default AuthSlice.reducer;

// create and export the selector
export const selectAuth = (state: RootState) => state.auth;
