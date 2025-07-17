import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DataTable from '../../helpers/DataTable'; 

function InquiryList() {
  const [inquiries, setInquiries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedInquiries = JSON.parse(localStorage.getItem('inquiries')) || [];
    setInquiries(storedInquiries);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      const updatedInquiries = inquiries.filter((inquiry) => inquiry.id !== id);
      setInquiries(updatedInquiries);
      localStorage.setItem('inquiries', JSON.stringify(updatedInquiries));
    }
  };

  const handleEdit = (id) => {
    console.log("sss")
    navigate(`/main/service-inquiry/${id}`);
  };






  const columns = [ 
    {
      header: 'Actions',
      isAction: true,
      actionTemplate: (row) => (
        <div className="d-flex gap-2 justify-content-center">
          <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(row.id)}>Edit</button>
          <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(row.id)}>Delete</button>
        </div>
      )
    },
    { header: 'ID', field: 'id' },
    { header: 'Customer', field: 'customer' },
    { header: 'First Name', field: 'firstName' },
    { header: 'Last Name', field: 'lastName' },
    { header: 'Email', field: 'email' },
    { header: 'Phone', field: 'phone' },
    { header: 'Address', field: 'address' },
    { header: 'Service Type', field: 'serviceType' },
    { header: 'Priority', field: 'priority' },
    { header: 'Subject', field: 'subject' },
    { header: 'Message', field: 'message' },
    { header: 'Status', field: 'status' },
    { header: 'Due Date', field: 'dueDate' },
    { header: 'Assignee', field: 'assignee' }
   
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
