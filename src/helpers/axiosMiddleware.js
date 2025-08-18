import axios from "axios";
import MessageBoxService from "../services/MessageBoxService";
import LoadingSpinnerService from "../services/LoadingSpinnerService";

export function handleAxiosError(error) {
   
  let message;
  if (error.response) {
    message = ` ${
      error.response.data?.error ||
      error.response.statusText ||
      "API error occurred."
    }`;
  } else if (error.request) {
    message = ` ${error.message || "Network error occurred."}`;
  } else {
    message = `Error: ${error.message}`;
  }
  MessageBoxService.show({
    message,
    type: "danger",
    onClose: null,
  });
  return message;
}

export async function axiosRequest(requestPromise, options = {}) {
  const { showSpinner = true, message = "Loading..." } = options;

  try {
    if (showSpinner) LoadingSpinnerService.show(message);

    const res = await requestPromise;

    return {
      data: res.data,
      error: null,
      success: true,
    };
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    return {
      data: null,
      error: errorMessage,
      success: false,
    };
  } finally {
    if (showSpinner) LoadingSpinnerService.hide();
  }
}

export default axios;
