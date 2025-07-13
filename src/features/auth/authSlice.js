import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  user: null, // Store user information like name, email, etc.
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload; // payload should be user object
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

// Selector to get the login status
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
// Selector to get user information
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
