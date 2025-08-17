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

  async get(id,isTaxInvoice) {
    // const res = await axiosRequest(axios.get(`${this.apiBase}/get/${id}`));
      const res = await axiosRequest(axios.get(`${this.apiBase}/get`, { params: { id,isTaxInvoice } }));
    return res;
  }

  async getAll(isTaxInvoice) {
    const res = await axiosRequest(axios.get(`${this.apiBase}/get-all`, { params: { isTaxInvoice } }));
    return res;
  }
}
const invoiceServiceInstance = new InvoiceService();
export default invoiceServiceInstance;