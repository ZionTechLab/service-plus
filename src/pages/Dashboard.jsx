import React from 'react';
import './Dashboard.css';
import SimpleBarChart from '../components/Charts/SimpleBarChart';
import SimpleLineChart from '../components/Charts/SimpleLineChart';

const Dashboard = () => {
  return (
    <div className="container my-4">
      <h2>Dashboard</h2>
      <div className="row">
        <div className="col-md-3">
          <div className="card pastel pastel-invoices mb-3">
            <div className="card-body">
              <h5 className="card-title">Invoices</h5>
              <p className="card-text display-6">0</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card pastel pastel-partners mb-3">
            <div className="card-body">
              <h5 className="card-title">Business Partners</h5>
              <p className="card-text display-6">0</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card pastel pastel-items mb-3">
            <div className="card-body">
              <h5 className="card-title">Items</h5>
              <p className="card-text display-6">0</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card pastel pastel-grn mb-3">
            <div className="card-body">
              <h5 className="card-title">GRN</h5>
              <p className="card-text display-6">0</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card p-3">
            <h6>Monthly Invoices</h6>
            <SimpleBarChart
              data={[
                { label: 'Jan', value: 12 },
                { label: 'Feb', value: 18 },
                { label: 'Mar', value: 9 },
                { label: 'Apr', value: 24 },
                { label: 'May', value: 16 },
                { label: 'Jun', value: 20 },
              ]}
              color="#427FA8"
              height={220}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-3">
            <h6>Active Partners Trend</h6>
            <SimpleLineChart
              data={[
                { label: 'Jan', value: 5 },
                { label: 'Feb', value: 6 },
                { label: 'Mar', value: 8 },
                { label: 'Apr', value: 7 },
                { label: 'May', value: 9 },
                { label: 'Jun', value: 11 },
              ]}
              color="#CE746B"
              height={220}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
