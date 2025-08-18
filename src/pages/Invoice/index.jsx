import { Link, useNavigate, useLocation } from 'react-router-dom';
import DataTable from '../../components/DataTable';
import InvoiceService from './InvoiceService';
import { useEffect, useState } from 'react';
import MessageBoxService from '../../services/MessageBoxService';

function InvoiceIndex() {
  const [uiData, setUiData] = useState({loading: false, success: false, error: '', data: [] });
  const navigate = useNavigate();
  const location = useLocation(); // Use React Router's useLocation hook

  useEffect(() => {
    const fetchInvoices = async () => {
      setUiData((prev) => ({ ...prev, loading: true, error: '', data: [] }));
      const data = await InvoiceService.getAll(location.pathname === '/tax-invoice'?1:0);
      setUiData((prev) => ({ ...prev, ...data, loading: false }));
    };
    fetchInvoices();
    // eslint-disable-next-line
  }, [location.pathname]);

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
    navigate(`${location.pathname}/edit/${id}`);
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
            onClick={() => handleEdit(row.id)}
          >
            <i className="bi bi-pencil"></i>
          </button>
          <button
            className="btn btn-outline-danger btn-icon btn-sm"
            title="Delete"
            onClick={() => handleDelete(row.id)}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      ),
    },  
    { header: 'Invoice No', field: 'txnNoDisplay',class:'text-nowrap' },
    { header: 'Date', field: 'txnDate',class:'text-nowrap' ,type: 'date'},
    { header: 'Customer', field: 'partnerName',class:'text-nowrap' },
    { header: 'Total Amount', field: 'totalAmount',class:'text-nowrap text-end' },
  ];

  return (
    <div>
    {/* <div className="mb-3">
      <small className="text-muted">Current route: {location.pathname}</small>
    </div> */}

      {!uiData.loading && !uiData.error && (
        <DataTable name="Invoice Export" data={uiData.data} columns={columns}>
          <Link to={location.pathname === '/tax-invoice' ? '/tax-invoice/add' : '/invoice/add'}>
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