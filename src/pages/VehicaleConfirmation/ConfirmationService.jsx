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
    const updatedParam = { ...param, header: headerWithoutImages };
    // console.log(images, updatedParam);
    const res = await axiosRequest(
      axios.post(`${this.apiBase}/update`, updatedParam)
    );
    if (res && res.success) {
      console.log("Update successful, executing additional operation...", res);

      if (images && images.length > 0) {
        const formData = new FormData();
        images.forEach((img, idx) => {
          console.log("Image:", img);
          try {
            formData.append("image", img, img.name || `image_${idx}`);
          } catch (err) {
            formData.append("image", img);
          }
        });
        formData.append("id", res.data);

        // Log file names for debugging without trying to iterate FormData on all runtimes
        // try {
        //   const names = images.map((i) => (i && i.name ? i.name : String(i)));
        //   console.log("Uploading images:", names);
        // } catch (e) {
        //   console.log("Uploading images (names unavailable)", images.length);
        // }

        // Build upload headers: in browser let axios set Content-Type (do not set multipart boundary),
        // in Node (form-data package) forward getHeaders()
        let uploadHeaders = {};
        if (
          typeof window === "undefined" &&
          typeof formData.getHeaders === "function"
        ) {
          uploadHeaders = formData.getHeaders();
        }

        const res2 = await axiosRequest(
          axios.post(`${this.apiBase}/images`, formData, {
            headers: uploadHeaders,
          })
        );
        console.log("Image upload response:", res2);
        return res2;
      } else {
        console.log("No images to upload");
      }
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
