import axios, { axiosRequest } from '../../helpers/axiosMiddleware';

class DailyReportService {
	constructor() {
		this.apiBase = 'http://localhost:3000/api/daily-reports'; // Replace with your actual API endpoint
	}

	async createReport(reportData) {
		const res = await axiosRequest(axios.post(this.apiBase, reportData));
		return res.data;
	}

	async getReportById(id) {
		console.log("Fetching daily report with ID:", id);
		const res = await axiosRequest(axios.get(`${this.apiBase}/${id}`));
		console.log("Fetched daily report data:", res.data);
		return res.data;
	}

	async getAllReports() {
		const res = await axiosRequest(axios.get(this.apiBase));
		return res;
	}
}

const dailyReportServiceInstance = new DailyReportService();
export default dailyReportServiceInstance;
