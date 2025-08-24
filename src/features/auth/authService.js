import axios, { axiosRequest } from '../../helpers/axiosMiddleware';
import config from '../../config/config';

class AuthService {
  constructor() {
    this.apiBase = config.apiBaseUrl + 'auth';
  }

  async login(credentials) {
    const res = await axiosRequest(
      axios.post(`${this.apiBase}/login`, credentials)
    );
    return res;
  }

  async logout() {
    const res = await axiosRequest(
      axios.post(`${this.apiBase}/logout`)
    );
    return res;
  }

  async getCurrentUser() {
    const res = await axiosRequest(
      axios.get(`${this.apiBase}/me`)
    );
    return res;
  }

  async refreshToken() {
    const res = await axiosRequest(
      axios.post(`${this.apiBase}/refresh`)
    );
    return res;
  }

  async changePassword(passwordData) {
    const res = await axiosRequest(
      axios.post(`${this.apiBase}/change-password`, passwordData)
    );
    return res;
  }

  async init() {
    const res = await axiosRequest(
      axios.get(`${this.apiBase}/init`)
    );
    return res;
  }
}

const AuthServiceInstance = new AuthService();
export default AuthServiceInstance;