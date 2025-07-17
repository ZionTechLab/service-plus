import * as Yup from "yup";
import { useFormikBuilder } from "../../helpers/formikBuilder";
import InputField from "../../helpers/InputField";

const fields = {
  itemName: {
    name: "itemName",
    type: "text",
    placeholder: "Item Name",
    initialValue: "",
    validation: Yup.string().required("Item Name is required"),
  },
  itemDescription: {
    name: "itemDescription",
    type: "textarea",
    placeholder: "Item Description",
    initialValue: "",
    validation: Yup.string().required("Item Description is required"),
  },
  itemPrice: {
    name: "itemPrice",
    type: "number",
    placeholder: "Item Price",
    initialValue: "",
    validation: Yup.number().required("Item Price is required"),
  },
  itemCategory: {
    name: "itemCategory",
    type: "text",
    placeholder: "Item Category",
    initialValue: "",
    validation: Yup.string().required("Item Category is required"),
  },
};

import { useState } from "react";

const getNextId = (items) => {
  if (items.length === 0) return 1;
  const maxId = Math.max(...items.map((i) => i.id));
  return Number.isNaN(maxId) ? 1 : maxId + 1;
};

function ItemMaster() {
  const [showPopup, setShowPopup] = useState(false);

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
              <InputField className="col-sm-12" {...fields.itemName} formik={formik} />
              <InputField className="col-sm-12" {...fields.itemDescription} formik={formik} />
              <InputField className="col-sm-6" {...fields.itemPrice} formik={formik} />
              <InputField className="col-sm-6" {...fields.itemCategory} formik={formik} />
              <button className="w-100 btn btn-primary btn-lg" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ItemMaster;
