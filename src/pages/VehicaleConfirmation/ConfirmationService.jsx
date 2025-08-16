import axios, { axiosRequest } from '../../helpers/axiosMiddleware';
import config from '../../config/config';

class ConfirmationService {
	constructor() {
		this.apiBase = config.apiBaseUrl+'vehicle-confirmation';
	}

	async create(reportData) {
	    // detect FormData in browser
    const isFormData = (typeof FormData !== 'undefined') && (reportData instanceof FormData);

    let axiosConfig = {};

    if (!isFormData) {
        // JSON payload
        axiosConfig.headers = { 'Content-Type': 'application/json' };
    } else {
        // Browser: do NOT set Content-Type (browser/axios will add the multipart boundary)
        // Node (e.g. using form-data package): forward formData headers if available
        if (typeof window === 'undefined' && typeof reportData.getHeaders === 'function') {
            axiosConfig.headers = reportData.getHeaders();
        }
    }

    const res = await axiosRequest(axios.post(this.apiBase, reportData, axiosConfig));
    return res;
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
