import axios, { axiosRequest } from '../../helpers/axiosMiddleware';
import config from '../../config/config';

class DailyReportService {
	constructor() {
		this.apiBase = config.apiBaseUrl+'activitylogs';
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
