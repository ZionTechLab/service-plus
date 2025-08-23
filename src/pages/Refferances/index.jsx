import { Link, useNavigate } from 'react-router-dom';
import DataTable from '../../components/DataTable';
import { useEffect, useState } from 'react';
import ApiService from './RefferanceService';
import MessageBoxService from '../../services/MessageBoxService';

function RefferanceListing() {
  const [uiData, setUiData] = useState({loading: false, success: false, error: '', data: [] });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUi = async () => {
      setUiData((prev) => ({ ...prev, loading: true, error: '', data: [] }));
      const data = await ApiService.getAll({ categoryType: 70 });
console.log(data);

      setUiData((prev) => ({ ...prev, ...data, loading: false }));
    };
    fetchUi();
    // eslint-disable-next-line
  }, []);

  const handleDelete = async (id) => {
       MessageBoxService.show({
      message: 'Are you sure you want to delete this invoice?',
      type: 'danger',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: () => {
        const updated = uiData.data.filter((data) => data.id !== id);
        setUiData({ ...uiData, data: updated });
        localStorage.setItem('invoices', JSON.stringify(updated));
      },
      onClose: null
    });
  };

  const handleEdit = (id) => {
    navigate(`/refferance/edit/${id}`);
  };

  const columns = [
    {
      header: 'Actions',
      isAction: true,
      actionTemplate: (row) => (
        <div className="d-flex gap-2 justify-content-center">
          <button className="btn btn-outline-primary btn-icon btn-sm" title="Edit" onClick={() => handleEdit(row.id)}>
            <i className="bi bi-pencil"></i>
          </button>
          <button className="btn btn-outline-danger btn-icon btn-sm" title="Delete" onClick={() => handleDelete(row.id)}>
            <i className="bi bi-trash"></i>
          </button>
        </div>
      )
    },
    { header: 'ID', field: 'id' },
    { header: uiData.data.meta?.metaValue,field: 'value', class:'text-nowrap'  },
    { header: uiData.data.meta?.metaDesc, field: 'description', class:'text-nowrap'  },
    { header: 'Active', field: 'active', type: "boolean" , class:'text-center'  },

  ];

  return (
    <div>
      {!uiData.loading && !uiData.error && (
        <DataTable name="User Master" data={uiData.data.data} columns={columns}>
          <Link to="/refferance/add">
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

export default RefferanceListing;