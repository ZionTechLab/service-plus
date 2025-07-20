import  { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DataTable from '../../helpers/DataTable';
import useConfirm from '../../hooks/useConfirm';

function InquiryList() {
  const [dataset, setDataset] = useState([]);
  const navigate = useNavigate();
  const [ConfirmationDialog, confirm] = useConfirm();
  useEffect(() => {
    const storedInquiries = JSON.parse(localStorage.getItem('inquiries')) || [];
    setDataset(storedInquiries);
  }, []);

  const handleDelete = (id) => {
    confirm('Are you sure you want to delete this inquiry?', { confirmText: "Delete", cancelText: "Cancel", type: "danger" }).then((result) => {
      if (result) {
        const updated = dataset.filter((data) => data.id !== id);
        setDataset(updated);
        localStorage.setItem('inquiries', JSON.stringify(updated));
      }
    });
  };

  const handleEdit = (id) => {
    navigate(`/inquiry/edit/${id}`);
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
        <Link to="/Inquiry/add">
        <div className="py-3">
          <button className=" btn btn-primary btn-lg ">Add Inquiry</button>
        </div>
      </Link>
       <ConfirmationDialog />
      <DataTable columns={columns} data={dataset} />
    </div>
  );
}

export default InquiryList;
