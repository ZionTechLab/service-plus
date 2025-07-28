
import * as Yup from "yup";
import React, { useState } from "react";
import InputField from "../helpers/InputField";
import { useFormikBuilder } from "../helpers/formikBuilder";
import useConfirm from "../hooks/useConfirm";
import InvoiceLineItems from "../components/InvoiceLineItems";

function Invoice() {
  const [ConfirmationDialog, confirm] = useConfirm();
  const [lineItems, setLineItems] = useState([
    { description: "", amount: "" }
  ]);

  // Field configuration based on invoice image
  const fields = {
    invoiceNo: {
      name: "invoiceNo",
      type: "text",
      placeholder: "Invoice No",
      initialValue: "<Auto>",
      validation: Yup.string().required("Invoice No is required"),
      disabled: true,
    },
    to: {
      name: "to",
      type: "text",
      placeholder: "To",
      initialValue: "",
      validation: Yup.string().required("To is required"),
    },
    address: {
      name: "address",
      type: "text",
      placeholder: "Address",
      initialValue: "",
      validation: Yup.string().required("Address is required"),
    },
    typeOfVehicle: {
      name: "typeOfVehicle",
      type: "select",
      placeholder: "Type of Vehicle",
      dataBinding: {
        data: [
          { key: "car", value: "Car" },
          { key: "van", value: "Van" },
          { key: "truck", value: "Truck" },
          { key: "bus", value: "Bus" },
          { key: "other", value: "Other" },
        ],
        keyField: "key",
        valueField: "value",
      },
      initialValue: "car",
      validation: Yup.string().required("Type of Vehicle is required"),
    },
    date: {
      name: "date",
      type: "date",
      placeholder: "Invoice Date",
      initialValue: new Date().toISOString().split("T")[0],
      validation: Yup.string().required("Invoice Date is required"),
    },
    // Remove single description/amount fields, handled by lineItems
    kmHours: {
      name: "kmHours",
      type: "text",
      placeholder: "K.M. / Hours",
      initialValue: "",
      validation: Yup.string(),
    },
    preparedBy: {
      name: "preparedBy",
      type: "text",
      placeholder: "Prepared By",
      initialValue: "",
      validation: Yup.string(),
    },
    receivedBy: {
      name: "receivedBy",
      type: "text",
      placeholder: "Received By",
      initialValue: "",
      validation: Yup.string(),
    },
    advance: {
      name: "advance",
      type: "amount",
      placeholder: "Advance",
      initialValue: "",
      validation: Yup.number().typeError("Advance must be a number"),
    },
    totalAmount: {
      name: "totalAmount",
      type: "number",
      placeholder: "Total Amount",
      initialValue: "",
      validation: Yup.number().typeError("Total Amount must be a number"),
      disabled: true,
    },
  };

  // Calculate total from line items
  const calcTotal = () => {
    return lineItems.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
  };

  const handleLineChange = (idx, newItem) => {
    const updated = [...lineItems];
    updated[idx] = newItem;
    setLineItems(updated);
  };
  const handleLineAdd = () => {
    setLineItems([...lineItems, { description: "", amount: "" }]);
  };
  const handleLineRemove = idx => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter((_, i) => i !== idx));
    }
  };

  const handleSubmit = (values, { resetForm }) => {
    // For now, just show confirmation
    confirm("Invoice saved!", { confirmText: "OK", type: "success" });
    resetForm();
    setLineItems([{ description: "", amount: "" }]);
  };

  const formik = useFormikBuilder(fields, handleSubmit);

  // Keep totalAmount in sync
  React.useEffect(() => {
    formik.setFieldValue("totalAmount", calcTotal());
    // eslint-disable-next-line
  }, [lineItems]);

  return (
    <div className="container mt-4">
      <ConfirmationDialog />
      <h2 className="mb-3">Invoice</h2>
      <form onSubmit={formik.handleSubmit} noValidate>
        <div className="row g-3">
          <InputField {...fields.invoiceNo} formik={formik} className="col-md-6" />
          <InputField {...fields.date} formik={formik} className="col-md-6" />
        </div>
        <div className="row g-3 mt-2">
          <InputField {...fields.to} formik={formik} className="col-md-6" />
          <InputField {...fields.typeOfVehicle} formik={formik} className="col-md-6" />
          <InputField {...fields.address} formik={formik} className="col-md-12" />
        </div>
        <div className="row g-3 mt-2">
          <div className="col-12">
            <InvoiceLineItems
              items={lineItems}
              onChange={handleLineChange}
              onAdd={handleLineAdd}
              onRemove={handleLineRemove}
            />
          </div>
        </div>
        <div className="row g-3 mt-2">
          <InputField {...fields.kmHours} formik={formik} className="col-md-4" />
          <InputField {...fields.preparedBy} formik={formik} className="col-md-4" />
          <InputField {...fields.receivedBy} formik={formik} className="col-md-4" />
        </div>
        <div className="row g-3 mt-2">
          <InputField {...fields.advance} formik={formik} className="col-md-4" />
          <InputField {...fields.totalAmount} formik={formik} className="col-md-4" />
        </div>
        <button className="w-100 btn btn-primary mt-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Invoice;
