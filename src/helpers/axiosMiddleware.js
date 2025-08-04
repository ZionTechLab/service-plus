import axios from 'axios';
// ...existing code...
// Generic error handler for Axios errors
export function handleAxiosError(error, confirm) {
  
  if (error.response) {
    // API responded with error status
    confirm(`API Error: ${error.response.data?.message || error.response.statusText || 'API error occurred.'}`);
  } else if (error.request) {
    // No response received
    confirm(`Network Error: ${error.message}`);
  } else {
    // Other errors
    confirm(`Error: ${error.message}`);
  }
  // Always reject so service methods can handle if needed
  throw new Error('Failed to create partner');
}
// ...existing code...

export default axios;
