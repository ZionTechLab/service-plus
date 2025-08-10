import axios, { axiosRequest } from '../../helpers/axiosMiddleware';

class PartnerService {
  constructor() {
    this.apiBase = 'http://localhost:3000/api/business-partners'; // Replace with your actual API endpoint
  }

  async createPartner(partnerData) {
    const res = await axiosRequest(axios.post(this.apiBase, partnerData));
    return res;
  }

  async getPartnerById(id) {
    const res = await axiosRequest(axios.get(`${this.apiBase}/${id}`));
    return res;
  }

  async getAllPartners() {
    const res = await axiosRequest(axios.get(this.apiBase));
    return res;
  }
}

const partnerServiceInstance = new PartnerService();
export default partnerServiceInstance;