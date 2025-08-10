import { Link, useNavigate } from 'react-router-dom';
import DataTable from '../../components/DataTable';
import { useEffect, useState } from 'react';
import MessageBoxService from '../../services/MessageBoxService';
import { useLoadingSpinner } from '../../hooks/useLoadingSpinner';
import DailyReportService from "./DailyReportService";

function DailyReportIndex() {
  const [uiData, setUiData] = useState({loading: false, success: false, error: '', data: [] });
  const navigate = useNavigate();
  const { showSpinner, hideSpinner } = useLoadingSpinner();

  useEffect(() => {
    const fetchReports = async () => {
      setUiData(prev => ({ ...prev, loading: true, error: '', data: [] }));
      showSpinner();
        const data = await DailyReportService.getAllReports();
        setUiData(prev => ({ ...prev, ...data , loading: false }));
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
          <button className="btn btn-sm btn-primary" onClick={() => handleEdit(row.txnIndex)}>
            <i className="bi bi-pencil"></i>
          </button>
          <button className="btn btn-sm btn-danger" onClick={() => handleDelete(row.txnIndex)}>
            <i className="bi bi-trash"></i>
          </button>
        </div>
      ),
    },
    { header: 'txnIndex', field: 'txnIndex',class:'text-nowrap ' },
    { header: 'Txn No', field: 'txnNo',class:'text-nowrap ' },
    { header: 'Date', field: 'txnDate' },
    { header: 'Customer', field: 'partnerName' },
    { header: 'Vehicle No', field: 'vehicleNo' },
    { header: 'Type of Machine', field: 'typeOfMachine' },
    { header: 'Operator', field: 'operator' },
    { header: 'Helper', field: 'helper' },
  ];

  return (
    <div>
      {!uiData.loading && !uiData.error && (
        <DataTable name="Daily Report" data={uiData.data} columns={columns}>
          <Link to="/daily-report/add">
            <button className="btn btn-primary">New</button>
          </Link>
        </DataTable>
      )}
      {uiData.error && (
        <div className="alert alert-danger mt-3">{uiData.error}</div>
      )}
    </div>
  );
}

export default DailyReportIndex;