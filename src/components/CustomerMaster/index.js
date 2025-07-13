import React from 'react';
import { Link } from 'react-router-dom';
import { customers } from '../../data';

function CustomerMaster() {
  return (
    <div>
      <h1>Customer Master</h1>
      <Link to="/add-customer">
        <button>Add Customer</button>
      </Link>
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
