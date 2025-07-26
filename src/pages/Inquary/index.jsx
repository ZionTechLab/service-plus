import  { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DataTable from '../../components/DataTable';
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
          {/* <button className="btn btn-sm btn-outline-primary border-0" onClick={() => handleEdit(row.id)}>
            <i className="bi bi-pencil"></i>
          </button>
          <button className="btn btn-sm btn-outline-danger border-0" onClick={() => handleDelete(row.id)}>
            <i className="bi bi-trash"></i>
          </button> */}
          <button class="btn btn-outline-primary btn-icon btn-sm" title="Edit" onClick={() => handleEdit(row.id)}>
                                           <i className="bi bi-pencil"></i>
                                        </button>
<button class="btn btn-outline-danger btn-icon btn-sm" title="Edit" onClick={() => handleDelete(row.id)}>
                                            <i className="bi bi-trash"></i>
                                        </button>
        </div>
      )
    },
    { header: 'ID', field: 'id' },
    { header: 'Customer', field: 'customer' },
    { header: 'First Name', field: 'firstName',class:'text-nowrap' },
    { header: 'Last Name', field: 'lastName' ,class:'text-nowrap'},
    { header: 'Email', field: 'email' },
    { header: 'Phone', field: 'phone' },
    { header: 'Address', field: 'address' },
    { header: 'Service Type', field: 'serviceType' ,class:'text-nowrap'},
    { header: 'Priority', field: 'priority' },
    { header: 'Subject', field: 'subject' },
    { header: 'Message', field: 'message' },
    { header: 'Status', field: 'status' },
    { header: 'Due Date', field: 'dueDate',class:'text-nowrap' },
    { header: 'Assignee', field: 'assignee' }
  ];

  return (
    <div>     

       <ConfirmationDialog />
      <DataTable columns={columns} data={dataset} >        <Link to="/Inquiry/add">

          <button className=" btn btn-primary ">Add Inquiry</button>

      </Link></DataTable>
    </div>
  );
}

export default InquiryList;
