import { Link, useNavigate } from 'react-router-dom';
import DataTable from '../../components/DataTable';
import { useEffect, useState } from 'react';
import MessageBoxService from '../../services/MessageBoxService';
import { useLoadingSpinner } from '../../hooks/useLoadingSpinner';

function DailyReportIndex() {
  const [uiData, setUiData] = useState({loading: false, success: false, error: '', data: [] });
  const navigate = useNavigate();
  const { showSpinner, hideSpinner } = useLoadingSpinner();

  useEffect(() => {
    const fetchReports = async () => {
      setUiData(prev => ({ ...prev, loading: true, error: '', data: [] }));
      showSpinner();
      // Replace with actual service call
      const data = JSON.parse(localStorage.getItem('dailyReports') || '[]');
      setUiData(prev => ({ ...prev, data, loading: false }));
      hideSpinner();
    };
    fetchReports();
  }, []);

  const handleDelete = (id) => {
    MessageBoxService.show({
      message: 'Are you sure you want to delete this report?',
      type: 'danger',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: () => {
        const updated = uiData.data.filter((data) => data.id !== id);
        setUiData({ ...uiData, data: updated });
        localStorage.setItem('dailyReports', JSON.stringify(updated));
      },
      onClose: null
    });
  };

  const handleEdit = (id) => {
    navigate(`/daily-report/edit/${id}`);
  };

  const columns = [
    {
      header: 'Actions',
      isAction: true,
      actionTemplate: (row) => (
        <div className="d-flex gap-2 justify-content-center">
          <button className="btn btn-sm btn-primary" onClick={() => handleEdit(row.id)}>
            <i className="bi bi-pencil"></i>
          </button>
          <button className="btn btn-sm btn-danger" onClick={() => handleDelete(row.id)}>
            <i className="bi bi-trash"></i>
          </button>
        </div>
      ),
    },
    { header: 'Date', field: 'date' },
    { header: 'Vehicle No', field: 'vehicleNo' },
    { header: 'Hirer', field: 'hirer' },
    { header: 'Type of Machine', field: 'typeOfMachine' },
    { header: 'Operator', field: 'operator' },
    { header: 'Helper', field: 'helper' },
  ];

  return (
    <div className="container-fluid p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Daily Reports</h4>
        <Link to="/daily-report/add" className="btn btn-success">
          <i className="bi bi-plus-lg"></i> Add Daily Report
        </Link>
      </div>
      <DataTable columns={columns} data={uiData.data} loading={uiData.loading} />
    </div>
  );
}

export default DailyReportIndex;
