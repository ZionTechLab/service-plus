import axios, { axiosRequest } from '../../helpers/axiosMiddleware';
import config from '../../config/config';

class PartnerService {
  constructor() {
    this.apiBase = config.apiBaseUrl+'business-partners';
  }

  async update(param) {
    const res = await axiosRequest(axios.post(`${this.apiBase}/update`, param));
    return res;
  }

  async get(id) {
    const res = await axiosRequest(axios.get(`${this.apiBase}/get`,{ params: { id } }));
    return res;
  }

  async getAll() {
    const res = await axiosRequest(axios.get(`${this.apiBase}/get-all`));
    return res;
  }
}

const partnerServiceInstance = new PartnerService();
export default partnerServiceInstance;