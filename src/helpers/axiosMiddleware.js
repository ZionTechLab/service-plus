import axios from "axios";
import MessageBoxService from "../services/MessageBoxService";
// ...existing code...
// Generic error handler for Axios errors
export function handleAxiosError(error) {
  console.error("fff");
  let message;
  if (error.response) {
    message = `API Error: ${
      error.response.data?.message ||
      error.response.statusText ||
      "API error occurred."
    }`;
  } else if (error.request) {
    message = `Network Error: ${error.message}`;
  } else {
    message = `Error: ${error.message}`;
  }
  console.error(message);
  MessageBoxService.show({
    message,
    type: "danger",
    confirmText: "Okay",
    onClose: null,
  });
  // Always reject so service methods can handle if needed
  throw new Error("Failed to create partner");
}
// Centralized axios request wrapper
export async function axiosRequest(requestPromise) {
  try {
    const res = await requestPromise;
    return res;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
}
// ...existing code...

export default axios;
