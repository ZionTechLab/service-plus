import axios, { axiosRequest } from '../../helpers/axiosMiddleware';
import config from '../../config/config';

class ConfirmationService {
	constructor() {
		this.apiBase = config.apiBaseUrl+'vehicle-confirmation';
	}

	async create(reportData) {
		const res = await axiosRequest(axios.post(this.apiBase, reportData));
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
