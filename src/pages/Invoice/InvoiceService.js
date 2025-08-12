import axios, { axiosRequest } from '../../helpers/axiosMiddleware';

class InvoiceService {
  constructor() {
    this.apiBase = 'http://localhost:3000/api/debtors'; // Replace with your actual API endpoint
  }

  async createInvoice(invoiceData) {
    const res = await axiosRequest(axios.post(this.apiBase, invoiceData));
    return res;
  }

  async getInvoiceById(id) {
    const res = await axiosRequest(axios.get(`${this.apiBase}/${id}`));
    return res;
  }

  async getAllInvoices() {
    const res = await axiosRequest(axios.get(this.apiBase));
    return res;
  }
}

const invoiceServiceInstance = new InvoiceService();
export default invoiceServiceInstance;