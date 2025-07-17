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
            <th>Code</th>
            <th>Name</th>
            <th>Description</th>
            <th>UOM</th>
            <th>Barcode</th>
            <th>Brand</th>
            <th>Reorder Level</th>
            <th>Cost Price</th>
            <th>Selling Price</th>
            <th>Is Active</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.item_code}</td>
              <td>{item.item_name}</td>
              <td>{item.description}</td>
              <td>{item.uom}</td>
              <td>{item.barcode}</td>
              <td>{item.brand}</td>
              <td>{item.reorder_level}</td>
              <td>{item.cost_price}</td>
              <td>{item.selling_price}</td>
              <td>{item.is_active ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ItemMaster;
