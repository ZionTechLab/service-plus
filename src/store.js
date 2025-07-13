import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
// import chatReducer from './features/chat/chatSlice'; // Import the new chat reducer

const store = configureStore({
  reducer: {
    auth: authReducer,
    // chat: chatReducer, // Add the chat reducer
    // Add other reducers here
    // itineraries: itinerariesReducer, // Example
  },
});

export default store;
