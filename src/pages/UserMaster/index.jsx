import { Link, useNavigate } from 'react-router-dom';
import DataTable from '../../components/DataTable';
import { useEffect, useState } from 'react';
import useConfirm from '../../hooks/useConfirm';

function UserMaster() {
  const [dataset, setDataset] = useState([]);
  const navigate = useNavigate();
  const [ConfirmationDialog, confirm] = useConfirm();

  useEffect(() => {
    const fetchUsers = async () => {
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      setDataset(storedUsers);
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    confirm('Are you sure you want to delete this user?', { confirmText: "Delete", cancelText: "Cancel", type: "danger" }).then((result) => {
      if (result) {
        const updated = dataset.filter((data) => data.id !== id);
        setDataset(updated);
        localStorage.setItem('users', JSON.stringify(updated));
      }
    });
  };

  const handleEdit = (id) => {
    navigate(`/user-master/edit/${id}`);
  };

  const columns = [
    {
      header: 'Actions',
      isAction: true,
      actionTemplate: (row) => (
        <div className="d-flex gap-2 justify-content-center">
          <button className="btn btn-outline-primary btn-icon btn-sm" title="Edit" onClick={() => handleEdit(row.id)}>
            <i className="bi bi-pencil"></i>
          </button>
          <button className="btn btn-outline-danger btn-icon btn-sm" title="Delete" onClick={() => handleDelete(row.id)}>
            <i className="bi bi-trash"></i>
          </button>
        </div>
      )
    },
    { header: 'ID', field: 'id' },
    { header: 'Username', field: 'username' },
    { header: 'Email', field: 'email' },
    { header: 'Full Name', field: 'full_name' },
    { header: 'Phone', field: 'phone' },
    { header: 'Profile Picture', field: 'profile_picture' },
    { header: 'Role', field: 'role' },
    { header: 'Status', field: 'status' },
    { header: 'Last Login', field: 'last_login' },
    { header: 'Created At', field: 'created_at' },
    { header: 'Updated At', field: 'updated_at' },
    { header: 'Deleted At', field: 'deleted_at' }
  ];

  return (
    <div>
      <ConfirmationDialog />
      <DataTable name="User Master" data={dataset} columns={columns}>
        <Link to="/user-master/add">
          <button className="btn btn-primary">New</button>
        </Link>
      </DataTable>
    </div>
  );
}

export default UserMaster;