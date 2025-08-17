import React from 'react';
import './Dashboard.css';

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
    </div>
  );
};

export default Dashboard;
