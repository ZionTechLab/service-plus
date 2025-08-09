import { Link, useNavigate } from 'react-router-dom';
import DataTable from '../../components/DataTable';
import PartnerService from './PartnerService';
import { useEffect, useState } from 'react';
import MessageBoxService from '../../services/MessageBoxService';
import { useLoadingSpinner } from '../../hooks/useLoadingSpinner';

function BusinessPartners() {
  const [uiData, setUiData] = useState({ error: '', data: [] });
  const navigate = useNavigate();
  const { showSpinner, hideSpinner } = useLoadingSpinner();

  useEffect(() => {


    
    const fetchInquiries = async () => {
      showSpinner();
      try {
        const storedInquiries = await PartnerService.getAllPartners();
        setUiData({ error: '', data: storedInquiries });
      } catch (error) {
        setUiData({ error: 'Failed to fetch business partners. Please try again later.', data: [] });
      } finally {
        hideSpinner();
      }
    };
    fetchInquiries();
    // eslint-disable-next-line
  }, []);

  const handleDelete = (id) => {
    MessageBoxService.show({
      message: 'Are you sure you want to delete this business partner?',
      type: 'danger',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: () => {
        const updated = uiData.data.filter((data) => data.id !== id);
        setUiData({ ...uiData, data: updated });
        localStorage.setItem('partners', JSON.stringify(updated));
      },
      onClose: null
    });
  };

  const handleEdit = (id) => {
    console.log('Editing business partner with ID:', id);
    navigate(`/business-partner/edit/${id}`);
  };

  
  const columns = [
    {
      header: "Actions",
      isAction: true,
      actionTemplate: (row) => (
        <div className="d-flex gap-2 justify-content-center">
          <button
            class="btn btn-outline-primary btn-icon btn-sm"
            title="Edit"
            onClick={() => handleEdit(row.id)}
          >
            <i className="bi bi-pencil"></i>
          </button>
          <button
            class="btn btn-outline-danger btn-icon btn-sm"
            title="Edit"
            onClick={() => handleDelete(row.id)}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      ),
    },
    { header: "ID", field: "id" },
    { header: "Code", field: "partnerCode" },
    { header: "Partner Name", field: "partnerName", class: "text-nowrap" },
    { header: "Contact Person", field: "contactPerson", class: "text-nowrap" },
    { header: "Email", field: "email" },
    { header: "Address", field: "address" },
    { header: "Phone", field: "phone" },
    {
      header: "Customer",
      isAction: true,
      actionTemplate: (row) => (
        <input type="checkbox" checked={row.isCustomer} readOnly />
      ),
      field: "isCustomer",
    },
    {
      header: "Supplier",
      isAction: true,
      actionTemplate: (row) => (
        <input type="checkbox" checked={row.isSupplier} readOnly />
      ),
      field: "isSupplier",
    },
    {
      header: "Employee",
      isAction: true,
      actionTemplate: (row) => (
        <input type="checkbox" checked={row.isEmployee} readOnly />
      ),
      field: "isEmployee",
    },
    {
      header: "Active",
      isAction: true,
      actionTemplate: (row) => (
        <input type="checkbox" checked={row.active} readOnly />
      ),
      field: "active",
    },
  ];


  return (
    <div>
      <DataTable name="User Export" data={uiData.data} columns={columns} >
        <Link to="/business-partner/add">
          <button className=" btn btn-primary  ">New</button>
        </Link>
      </DataTable>
      {uiData.error && (
        <div className="alert alert-danger mt-3">{uiData.error}</div>
      )}
    </div>
  );
}

export default BusinessPartners;