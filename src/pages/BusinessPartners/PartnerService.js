import axios from 'axios';

class PartnerService {
  constructor() {
    this.apiBase = 'http://localhost:3000/api/business-partners'; // Replace with your actual API endpoint
  }

  async createPartner(partnerData) {
    try {
      const res = await axios.post(this.apiBase, partnerData);
      return res.data;
    } catch (error) {
      console.error('Error creating partner:', error);
      throw new Error('Failed to create partner');
    }
  }

  async getPartnerById(id) {
    try {
      const res = await axios.get(`${this.apiBase}/${id}`);
      return res.data;
    } catch (error) {
      console.error('Error getting partner by ID:', error);
      return null;
    }
  }

  async getAllPartners() {
    try {
      const res = await axios.get(this.apiBase);
      return res.data;
    } catch (error) {
      console.error('Error getting partners:', error);
      return [];
    }
  }
}

const partnerServiceInstance = new PartnerService();
export default partnerServiceInstance;