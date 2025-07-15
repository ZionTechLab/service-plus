import React from 'react';
import { Link } from 'react-router-dom';
import { customers } from '../../data';
import DataTable from '../../helpers/DataTable'; 
function CustomerMaster() {
   const sampleData = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ];
    const columns = [
    { header: 'ID', field: 'id' },
    { header: 'Name', field: 'name' },
    { header: 'Email', field: 'email' },
    // Example with action buttons
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
      <h1>Customer Master</h1>
      <Link to="/main/add-customer">
        <button>Add Customer</button>
      </Link> 
      <DataTable name="User Export" data={sampleData} columns={columns} />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerMaster;
