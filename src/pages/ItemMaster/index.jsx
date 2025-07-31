import { useEffect, useState } from "react";
import DataTable from "../../components/DataTable";
import { Link, useNavigate } from 'react-router-dom';
function ItemMasterSummary() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];
    setItems(storedItems);
  }, []);

  const columns = [
    { header: "ID", field: "id" },
    { header: "Code", field: "item_code" },
    { header: "Name", field: "item_name" },
    { header: "Description", field: "description" },
    { header: "UOM", field: "uom" },
    { header: "Barcode", field: "barcode" },
    { header: "Brand", field: "brand" },
    { header: "Reorder Level", field: "reorder_level" },
    { header: "Cost Price", field: "cost_price" },
    { header: "Selling Price", field: "selling_price" },
    { header: "Is Active", isAction: true, actionTemplate: (row) => (<input type="checkbox" checked={row.is_active} readOnly />), field: "is_active" },
  ];

  return (
    <div>
      <h2 className="mb-3">Item Master Summary</h2>
      <DataTable name="Item Export" data={items} columns={columns}>
       <Link to="/item-master/add">
   
          <button className=" btn btn-primary  ">New</button>
       
      </Link>
      </DataTable>
    </div>
  );
}

export default ItemMasterSummary;
