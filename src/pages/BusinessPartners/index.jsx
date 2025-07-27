import { Link, useNavigate } from 'react-router-dom';
import DataTable from '../../components/DataTable';
import PartnerService from './PartnerService';
import { useEffect, useState } from 'react';
import useConfirm from '../../hooks/useConfirm';

function BusinessPartners() {
  const [dataset, setDataset] = useState([]);
  const navigate = useNavigate();
  const [ConfirmationDialog, confirm] = useConfirm();

  useEffect(() => {
    const fetchInquiries = async () => {
      const storedInquiries = await PartnerService.getAllPartners();
      setDataset(storedInquiries);
    };
    fetchInquiries();
  }, []);

  const handleDelete = async (id) => {
 confirm('Are you sure you want to delete this business partner?', { confirmText: "Delete", cancelText: "Cancel", type: "danger" }).then((result) => {
      if (result) {
        const updated = dataset.filter((data) => data.id !== id);
        setDataset(updated);
        localStorage.setItem('partners', JSON.stringify(updated));
      }
    });

    // const isConfirmed = await confirm(
    //   "Are you sure you want to delete this business partner?",
    //   { confirmText: "Delete", cancelText: "Cancel", type: "danger" }
    // );
    // if (isConfirmed) {
    //   const partners = await PartnerService.getAllPartners();
    //   const updated = partners.filter(p => p.id !== id);
    //   localStorage.setItem('partners', JSON.stringify(updated));
    //   setDataset(updated);
    // }
  };

  const handleEdit = (id) => {
    navigate(`/business-partner/edit/${id}`);
  };

  const columns = [{
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

          {/* <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(row.id)}>Edit</button>
          <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(row.id)}>Delete</button> */}
        </div>
      )
    },
    { header: 'ID', field: 'id' },
    { header: 'Code', field: 'partnerCode' },
    { header: 'Partner Name', field: 'partnerName',class:'text-nowrap' },
    { header: 'Contact Person', field: 'contactPerson' ,class:'text-nowrap'},
    { header: 'Email', field: 'email' },
    { header: 'Address', field: 'address' },
    { header: 'Phone', field: 'phone' },
    { header: 'Customer', isAction: true, actionTemplate: (row) => (<input type="checkbox" checked={row.isCustomer} readOnly/>), field: 'isCustomer' },
    { header: 'Supplier', isAction: true, actionTemplate: (row) => (<input type="checkbox" checked={row.isSupplier} readOnly/>), field: 'isSupplier' },
    { header: 'Employee', isAction: true, actionTemplate: (row) => (<input type="checkbox" checked={row.isEmployee} readOnly/>), field: 'isEmployee' },
    { header: 'Active', isAction: true, actionTemplate: (row) => (<input type="checkbox" checked={row.active} readOnly/>), field: 'active' },
  ];

  return (
    <div>    
        {/* <Link to="/business-partner/add">
        <div className="py-3">
          <button className=" btn btn-primary btn-lg ">Add Business Partner</button>
        </div>
      </Link> */}
      <ConfirmationDialog />
      <DataTable name="User Export" data={dataset} columns={columns} >
     <Link to="/business-partner/add">
   
          <button className=" btn btn-primary  ">New</button>
       
      </Link>
      </DataTable>
    </div>
  );
}

export default BusinessPartners;