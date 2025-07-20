import { Link } from 'react-router-dom';
import DataTable from '../helpers/DataTable';
import PartnerService from '../components/AddCustomer/PartnerService';
import { useEffect, useState } from 'react';

function CustomerMaster() {
  const [sampleData, setInquiries] = useState([]);

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
          <button className="btn btn-sm btn-outline-primary" onClick={() => alert(`Edit ${row.name}`)}>Edit</button>
          <button className="btn btn-sm btn-outline-danger" onClick={() => alert(`Delete ${row.name}`)}>Delete</button>
        </div>
      )
    }
  ];
  return (
    <div>
      {/* <h1>Customer Master</h1> */}
      <Link to="/add-customer">
      <div className="py-3">
        <button className=" btn btn-primary btn-lg ">Add Customer</button>
      </div>
      </Link>
      <DataTable name="User Export" data={sampleData} columns={columns} />
    </div>
  );
}

export default CustomerMaster;
