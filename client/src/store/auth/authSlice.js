import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'not-authenticated',
  user: {},
  errorMessage: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = 'checking';
      state.user = {};
      state.errorMessage = undefined;
    },
    onLogin: (state, { payload }) => {
      state.status = 'authenticated';
      state.user = payload;
      state.errorMessage = undefined;
    },
    onLogout: (state) => {
      state.status = 'not-authenticated';
      state.user = {};
      state.errorMessage = undefined;
    },
  },
});
export const { onChecking, onLogin, onLogout } = authSlice.actions;
