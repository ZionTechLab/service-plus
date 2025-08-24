import { createSlice } from '@reduxjs/toolkit';

// Load initial state from localStorage
const loadAuthState = () => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (serializedState === null) {
      return {
        isLoggedIn: false,
        user: null,
        initData: null,
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      isLoggedIn: false,
      user: null,
      initData: null,
    };
  }
};

const initialState = loadAuthState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload; // payload should be user object
      // Persist to localStorage
      localStorage.setItem('authState', JSON.stringify(state));
    },

    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.initData = null;
      // Remove from localStorage
      localStorage.removeItem('authState');
    },
  },
});

export const { loginSuccess, initSuccess, logoutSuccess } = authSlice.actions;

// Selector to get the login status
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
// Selector to get user information
export const selectUser = (state) => state.auth.user;
// Selector to get init data
export const selectInitData = (state) => state.auth.initData;

export default authSlice.reducer;
