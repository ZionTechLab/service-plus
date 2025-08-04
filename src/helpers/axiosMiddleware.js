import axios from 'axios';

// Axios response interceptor for global error handling
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // API responded with error status
      console.error('API Error:', error.response.status, error.response.data);
      // Optionally, you can trigger a confirmation popup or custom UI here
      // Example: useConfirm(`Error: ${error.response.data.message || 'API error occurred.'}`);
    } else if (error.request) {
      // No response received
      console.error('Network Error:', error.message);
    } else {
      // Other errors
      console.error('Error:', error.message);
    }
    // Always reject so service methods can handle if needed
    return Promise.reject(error);
  }
);

export default axios;
