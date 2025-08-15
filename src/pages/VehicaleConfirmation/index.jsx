import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DataTable from '../../components/DataTable';
import ApiService from "./ConfirmationService";
import MessageBoxService from '../../services/MessageBoxService';
import { useLoadingSpinner } from '../../hooks/useLoadingSpinner';

function VehicaleConfirmation() {
  const [uiData, setUiData] = useState({loading: false, success: false, error: '', data: [] });
  const navigate = useNavigate();
  const { showSpinner, hideSpinner } = useLoadingSpinner();

  useEffect(() => {
    const fetchTxn = async () => {
      setUiData(prev => ({ ...prev, loading: true, error: '', data: [] }));
      showSpinner();
      const data = await ApiService.getAll();
      setUiData(prev => ({ ...prev, ...data , loading: false }));
      hideSpinner();
    };
    fetchTxn();
    // eslint-disable-next-line
  }, []);

  const handleDelete = (id) => {
    MessageBoxService.show({
      message: 'Are you sure you want to delete this confirmation?',
      type: 'danger',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: () => {
        const updated = uiData.data.filter((data) => data.id !== id);
        setUiData({ ...uiData, data: updated });
      },
      onClose: null
    });
  };

  const handleEdit = (id) => {
    navigate(`/vehicale-confirmation/edit/${id}`);
  };

  const columns = [
    { header: 'Actions', isAction: true, actionTemplate: (row) => (
      <div className="d-flex gap-2 justify-content-center">
        <button className="btn btn-outline-primary btn-icon btn-sm" title="Edit" onClick={() => handleEdit(row.id)}>
          <i className="bi bi-pencil"></i>
        </button>
        <button className="btn btn-outline-danger btn-icon btn-sm" title="Delete" onClick={() => handleDelete(row.id)}>
          <i className="bi bi-trash"></i>
        </button>
      </div>
    ) },
      { header: 'id', field: 'id' },
        { header: ' Make', field: 'make' },
    { header: ' Model', field: 'model' },
    { header: 'Grade', field: 'grade' },
    { header: 'Colour', field: 'colour' },
    { header: 'Year', field: 'year' },
    { header: 'KM', field: 'km' },
    { header: 'Purchase Date', field: 'purchaseDate' },
  ];

  return (
<div>
      {!uiData.loading && !uiData.error && (
        <DataTable name="Vehicle Confirmation" data={uiData.data} columns={columns}>
          <Link to="/vehicale-confirmation/add">
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

export default VehicaleConfirmation;