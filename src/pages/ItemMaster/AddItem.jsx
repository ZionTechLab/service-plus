import React, { useEffect, useState } from 'react';
import * as Yup from "yup";
import { useFormikBuilder } from "../../helpers/formikBuilder";
import InputField from "../../helpers/InputField";

const fields = {
  item_code: {
    name: "item_code",
    type: "text",
    placeholder: "Item Code",
    initialValue: "",
    validation: Yup.string().required("Item Code is required"),
  },
  item_name: {
    name: "item_name",
    type: "text",
    placeholder: "Item Name",
    initialValue: "",
    validation: Yup.string().required("Item Name is required"),
  },
  description: {
    name: "description",
    type: "textarea",
    placeholder: "Description",
    initialValue: "",
    validation: Yup.string(),
  },
  uom: {
    name: "uom",
    type: "text",
    placeholder: "Unit of Measurement",
    initialValue: "",
    validation: Yup.string().required("Unit of Measurement is required"),
  },
  barcode: {
    name: "barcode",
    type: "text",
    placeholder: "Barcode",
    initialValue: "",
    validation: Yup.string(),
  },
  brand: {
    name: "brand",
    type: "text",
    placeholder: "Brand",
    initialValue: "",
    validation: Yup.string().required("Brand is required"),
  },
  reorder_level: {
    name: "reorder_level",
    type: "number",
    placeholder: "Reorder Level",
    initialValue: "",
    validation: Yup.number().required("Reorder Level is required"),
  },
  cost_price: {
    name: "cost_price",
    type: "number",
    placeholder: "Cost Price",
    initialValue: "",
    validation: Yup.number().required("Cost Price is required"),
  },
  selling_price: {
    name: "selling_price",
    type: "number",
    placeholder: "Selling Price",
    initialValue: "",
    validation: Yup.number().required("Selling Price is required"),
  },
  is_active: {
    name: "is_active",
    type: "checkbox",
    placeholder: "Is Active",
    initialValue: true,
    validation: Yup.boolean(),
  },
};

const getNextId = (items) => {
  if (items.length === 0) return 1;
  const maxId = Math.max(...items.map((i) => i.id));
  return Number.isNaN(maxId) ? 1 : maxId + 1;
};

function ItemMaster() {
  const [items, setItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    setItems(storedItems);
  }, []);

  const handleItemSubmit = (values, { resetForm }) => {
    const items = JSON.parse(localStorage.getItem("items")) || [];
    const newItem = {
      id: getNextId(items),
      ...values,
    };
    items.push(newItem);
    localStorage.setItem("items", JSON.stringify(items));
    resetForm();
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
    setItems(items);
  };

  const formik = useFormikBuilder(fields, handleItemSubmit);

  return (
    <div className="container">
      <div className="py-5 text-center">
        <h1 className="h2">Item Master</h1>
      </div>

      {showPopup && (
        <div className="alert alert-success" role="alert">
          Item saved successfully!
        </div>
      )}

      <div className="row g-5">
        <div className="col-md-12 col-lg-12">
          <h4 className="mb-3">Item Details</h4>

          <form onSubmit={formik.handleSubmit} noValidate>
            <div className="row g-3">
              <InputField className="col-sm-6" {...fields.item_code} formik={formik} />
              <InputField className="col-sm-6" {...fields.item_name} formik={formik} />
              <InputField className="col-sm-12" {...fields.description} formik={formik} />
              <InputField className="col-sm-6" {...fields.uom} formik={formik} />
              <InputField className="col-sm-6" {...fields.barcode} formik={formik} />
              <InputField className="col-sm-6" {...fields.brand} formik={formik} />
              <InputField className="col-sm-6" {...fields.reorder_level} formik={formik} />
              <InputField className="col-sm-6" {...fields.cost_price} formik={formik} />
              <InputField className="col-sm-6" {...fields.selling_price} formik={formik} />
              <InputField className="col-sm-12" {...fields.is_active} formik={formik} />
              <button className="w-100 btn btn-primary btn-lg" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <h1>Item List</h1>
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
