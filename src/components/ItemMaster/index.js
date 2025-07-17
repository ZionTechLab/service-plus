import React, { useEffect, useState } from 'react';
import ItemMasterForm from './ItemMaster';

function ItemMaster() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    setItems(storedItems);
  }, []);

  return (
    <div>
      <ItemMasterForm />
      <h1>Item Master</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.itemName}</td>
              <td>{item.itemDescription}</td>
              <td>{item.itemPrice}</td>
              <td>{item.itemCategory}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ItemMaster;
