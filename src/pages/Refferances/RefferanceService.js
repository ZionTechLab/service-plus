import axios, { axiosRequest } from '../../helpers/axiosMiddleware';
import config from '../../config/config';

class RefferanceService {
  constructor() {
         this.apiBase = config.apiBaseUrl+'ref-category';
  }

  	async getUi(category) {
		const res = await axiosRequest(axios.get(`${this.apiBase}/get-ui`, { params: { category } }));
		return res;
	}

  async update(param, category) {
    const res = await axiosRequest(axios.post(`${this.apiBase}/update`, { param, category }));
    return res;
  }

  async get(id, category) {
      const res = await axiosRequest(axios.get(`${this.apiBase}/get`, { params: { id, category } }));
    return res;
  }

  async getAll(category) {
    const res = await axiosRequest(axios.get(`${this.apiBase}/get-all`, { params: { ...category } }));
    return res;
  }



  
}



const RefferanceServiceInstance = new RefferanceService();
export default RefferanceServiceInstance;