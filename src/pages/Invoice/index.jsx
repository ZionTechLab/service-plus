import { Link, useNavigate } from 'react-router-dom';
import DataTable from '../../components/DataTable';
import InvoiceService from './InvoiceService';
import { useEffect, useState } from 'react';
import MessageBoxService from '../../services/MessageBoxService';
import { useLoadingSpinner } from '../../hooks/useLoadingSpinner';

function InvoiceIndex() {
  const [uiData, setUiData] = useState({loading: false, success: false, error: '', data: [] });
  const navigate = useNavigate();
  const { showSpinner, hideSpinner } = useLoadingSpinner();

  useEffect(() => {
    const fetchInvoices = async () => {
      setUiData(prev => ({ ...prev, loading: true, error: '', data: [] }));
      showSpinner();
        const data = await InvoiceService.getAllInvoices();
        setUiData(prev => ({ ...prev, ...data , loading: false }));
        hideSpinner();
    };
    fetchInvoices();
    // eslint-disable-next-line
  }, []);

  const handleDelete = (id) => {
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
    navigate(`/invoice/edit/${id}`);
  };

  const columns = [
    {
      header: 'Actions',
      isAction: true,
      actionTemplate: (row) => (
        <div className="d-flex gap-2 justify-content-center">
          <button
            className="btn btn-outline-primary btn-icon btn-sm"
            title="Edit"
            onClick={() => handleEdit(row.txnIndex)}
          >
            <i className="bi bi-pencil"></i>
          </button>
          <button
            className="btn btn-outline-danger btn-icon btn-sm"
            title="Delete"
            onClick={() => handleDelete(row.txnIndex)}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      ),
    },  
    // { header: 'txnIndex', field: 'txnIndex',class:'text-nowrap d-none' },
    { header: 'Invoice No', field: 'txnNo',class:'text-nowrap' },
    { header: 'Date', field: 'txnDate',class:'text-nowrap' },
    { header: 'Customer', field: 'partnerName',class:'text-nowrap' },
    { header: 'Total Amount', field: 'totalAmount',class:'text-nowrap text-end' },
    // { header: 'Prepared By', field: 'preparedBy',class:'text-nowrap' },
    // { header: 'Received By', field: 'receivedBy',class:'text-nowrap' },
  ];

  return (
    <div>
      {!uiData.loading && !uiData.error && (
        <DataTable name="Invoice Export" data={uiData.data} columns={columns}>
          <Link to="/invoice/add">
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

export default InvoiceIndex;