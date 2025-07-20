import { Link, useNavigate } from 'react-router-dom';
import DataTable from '../../helpers/DataTable';
import PartnerService from './PartnerService';
import { useEffect, useState } from 'react';

function BusinessPartners() {
  const [sampleData, setInquiries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInquiries = async () => {
      const storedInquiries = await PartnerService.getAllPartners();
      setInquiries(storedInquiries);
    };
    fetchInquiries();
  }, []);

  const columns = [
    { header: 'ID', field: 'id' },
    { header: 'Partner Code', field: 'partnerCode' },
    { header: 'Partner Name', field: 'partnerName' },
    { header: 'Contact Person', field: 'contactPerson' },
    { header: 'Email', field: 'email' },
    { header: 'Address', field: 'address' },
    { header: 'Phone', field: 'phone' },
    { header: 'Is Customer', isAction: true, actionTemplate: (row) => (<input type="checkbox" checked={row.isCustomer} />), field: 'isCustomer' },
    { header: 'Is Supplier', isAction: true, actionTemplate: (row) => (<input type="checkbox" checked={row.isSupplier} />), field: 'isSupplier' },
    { header: 'Is Employee', isAction: true, actionTemplate: (row) => (<input type="checkbox" checked={row.isEmployee} />), field: 'isEmployee' },
    { header: 'Active', isAction: true, actionTemplate: (row) => (<input type="checkbox" checked={row.active} />), field: 'active' },
    {
      header: 'Actions',
      isAction: true,
      actionTemplate: (row) => (
        <div className="d-flex gap-2 justify-content-center">
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => navigate(`/business-partner/edit/${row.id}`)}
          >
            Edit
          </button>
          <button className="btn btn-sm btn-outline-danger" onClick={() => alert(`Delete ${row.name}`)}>Delete</button>
        </div>
      )
    }
  ];

  return (
    <div>
      <Link to="/business-partner/add">
      <div className="py-3">
        <button className=" btn btn-primary btn-lg ">Add Business Partner</button>
      </div>
      </Link>
      <DataTable name="User Export" data={sampleData} columns={columns} />
    </div>
  );
}

export default BusinessPartners;