import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from '../../helpers/DataTable'; 

function InquiryList() {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const storedInquiries = JSON.parse(localStorage.getItem('inquiries')) || [];
    setInquiries(storedInquiries);
  }, []);






    const columns = [
    { header: 'First Name', field: 'firstName' },
    { header: 'Last Name', field: 'lastName' },
    { header: 'Email', field: 'email' },
    { header: 'Phone', field: 'phone' },
    { header: 'Service Type', field: 'serviceType' },
    { header: 'Priority', field: 'priority' },
    { header: 'Subject', field: 'subject' },
    { header: 'Message', field: 'message' },
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
      <h1>Inquiries</h1>
      <Link to="/main/add-customer">
        <button>Add Customer</button>
      </Link> 
      <DataTable name="User Export" data={inquiries} columns={columns} />
    </div>



  );
}

export default InquiryList;
