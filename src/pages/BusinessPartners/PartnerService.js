import axios from '../../helpers/axiosMiddleware';

class PartnerService {
  constructor() {
    this.apiBase = 'http://localhost:3000/api/business-partners'; // Replace with your actual API endpoint
  }

  async createPartner(partnerData) {
    const res = await axios.post(this.apiBase, partnerData);
    return res.data;
  }

  async getPartnerById(id) {
    const res = await axios.get(`${this.apiBase}/${id}`);
    return res.data;
  }

  async getAllPartners() {
    const res = await axios.get(this.apiBase);
    return res.data;
  }
}

const partnerServiceInstance = new PartnerService();
export default partnerServiceInstance;