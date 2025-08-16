import axios, { axiosRequest } from '../../helpers/axiosMiddleware';
import config from '../../config/config';

class InvoiceService {
  constructor() {
        this.apiBase = config.apiBaseUrl+'invoice';
  }

  	async getUi() {
		const res = await axiosRequest(axios.get(`${this.apiBase}/get-ui`));
		return res;
	}
  
  async update(invoiceData) {
    const res = await axiosRequest(axios.post(`${this.apiBase}/update`, invoiceData));
    return res;
  }

  async get(id) {
    const res = await axiosRequest(axios.get(`${this.apiBase}/get/${id}`));
    return res;
  }

  async getAll() {
    const res = await axiosRequest(axios.get(`${this.apiBase}/get-all`));
    return res;
  }
}
const invoiceServiceInstance = new InvoiceService();
export default invoiceServiceInstance;