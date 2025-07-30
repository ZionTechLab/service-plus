import  { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DataTable from '../../components/DataTable';
import useConfirm from '../../hooks/useConfirm';
import InquaryService from './InquaryService';

function InquiryList() {
  const [dataset, setDataset] = useState([]);
  const navigate = useNavigate();
  const [ConfirmationDialog, confirm] = useConfirm();

  useEffect(() => {
    const fetchData = async () => {
      const data = await InquaryService.getAllInquairies();
      setDataset(data || []);
    };
    fetchData();
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
          <button class="btn btn-outline-primary btn-icon btn-sm" title="Edit" onClick={() => handleEdit(row.id)}>
            <i className="bi bi-pencil"></i>
          </button>
          <button class="btn btn-outline-danger btn-icon btn-sm" title="Edit" onClick={() => handleDelete(row.id)}>
            <i className="bi bi-trash"></i>
          </button>
        </div>
      )
    },
    { header: 'Job No', field: 'id' },
    // { header: 'Customer', field: 'customer' },
    { header: 'Customer', field: 'partnerName',class:'text-nowrap' },
    { header: 'Person', field: 'contactPerson' ,class:'text-nowrap'},
    // { header: 'Email', field: 'email' ,class:'text-nowrap'},
    { header: 'Phone 1', field: 'phone1' ,class:'text-nowrap'},
    // { header: 'Phone 2', field: 'phone2' ,class:'text-nowrap' },
    // { header: 'Address', field: 'address' },
    // { header: 'Service Type', field: 'serviceType' ,class:'text-nowrap'},
    // { header: 'Priority', field: 'priority' },
    { header: 'Item Name', field: 'itemName' },
    { header: 'Serial No', field: 'serialNo' },
    { header: 'Nature Of Faulty', field: 'description' },
    { header: 'To Do', field: 'toDo' },
    // { header: 'Status', field: 'status' },
    { header: 'Collection Date', field: 'jobDate',class:'text-nowrap' },
    { header: 'Due Date', field: 'dueDate',class:'text-nowrap' },
    { header: 'Assignee', field: 'assignee' }
  ];

  return (
    <div>     
      <ConfirmationDialog />
      <DataTable columns={columns} data={dataset} >
        <Link to="/Inquiry/add">
          <button className=" btn btn-primary ">New</button>
      </Link>
    </DataTable>
    </div>
  );
}

export default InquiryList;
