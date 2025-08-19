import axios, { axiosRequest } from '../../helpers/axiosMiddleware';
import config from '../../config/config';

class ConfirmationService {
  constructor() {
    this.apiBase = config.apiBaseUrl + "vehicle-confirmation";
  }

  async create(reportData) {
    // detect FormData in browser
    const isFormData =
      typeof FormData !== "undefined" && reportData instanceof FormData;

    let axiosConfig = {};

    if (!isFormData) {
      // JSON payload
      axiosConfig.headers = { "Content-Type": "application/json" };
    } else {
      // Browser: do NOT set Content-Type (browser/axios will add the multipart boundary)
      // Node (e.g. using form-data package): forward formData headers if available
      if (
        typeof window === "undefined" &&
        typeof reportData.getHeaders === "function"
      ) {
        axiosConfig.headers = reportData.getHeaders();
      }
    }

    const res = await axiosRequest(
      axios.post(this.apiBase, reportData, axiosConfig)
    );
    return res;
  }

  async update(param) {
    const { images, ...headerWithoutImages } = param.header;
    const updatedParam = {
      ...param,
      header: headerWithoutImages,
    };

    const res = await axiosRequest(axios.post(`${this.apiBase}/update`, updatedParam));
    if (res && res.success) {
      console.log("Update successful, executing additional operation...", res);
      const formData = new FormData();
      formData.append("image", images[0], images[0].name);
      formData.append("id", res.data);
      console.log("Form Data for image upload:", formData.values());

      const res2 = await axiosRequest(
        axios.post(`${this.apiBase}/images`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      );
      console.log("Image upload response:", res2);

    } else {
      console.error("Update failed:", res);
    }

    return null;
  }

  async getUi() {
    const res = await axiosRequest(axios.get(`${this.apiBase}/get-ui`));
    return res;
  }

  async get(id) {
    const res = await axiosRequest(axios.get(`${this.apiBase}/get/${id}`));
    return res;
  }

  async getAll() {
    const res = await axiosRequest(axios.get(this.apiBase));
    return res;
  }
}

const confirmationServiceInstance = new ConfirmationService();
export default confirmationServiceInstance;
