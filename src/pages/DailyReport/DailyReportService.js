import axios, { axiosRequest } from '../../helpers/axiosMiddleware';

class DailyReportService {
	constructor() {
		this.apiBase = 'http://localhost:3000/api/activitylogs'; // Replace with your actual API endpoint
	}

	async createReport(reportData) {
		const res = await axiosRequest(axios.post(this.apiBase, reportData));
		return res;
	}

	async getReportById(id) {
		const res = await axiosRequest(axios.get(`${this.apiBase}/${id}`));
		return res;
	}

	async getAllReports() {
		const res = await axiosRequest(axios.get(this.apiBase));
		return res;
	}
}

const dailyReportServiceInstance = new DailyReportService();
export default dailyReportServiceInstance;
