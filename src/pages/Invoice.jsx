
import * as Yup from "yup";
import React, { useState } from "react";
import InputField from "../helpers/InputField";
import { useFormikBuilder } from "../helpers/formikBuilder";
import usePopupMessage from "../components/PopupMessage";
import DataGrid from "../components/DataGrid";
import SelectedBusinessPartnerBox from "./BusinessPartners/select-bp";

function Invoice() {
    // Remove selectedPartner state, use formik and fields config for partner selection
  const [ConfirmationDialog, confirm] = usePopupMessage();
  // Define columns for DataGrid
  const lineItemColumns = [
    {
      header: "Description",
      field: "description",
      type: "text",
      placeholder: "Description",
      // width: "60%"
    },
    {
      header: "Amount",
      field: "amount",
      type: "number",
      placeholder: "Amount",
      width: "25%"
    },
    {
      header: "Total",
      field: "total",
      type: "amount",
      placeholder: "Amount",
      width: "25%"
    }
  ];
  const emptyLineItem = lineItemColumns.reduce((acc, col) => ({ ...acc, [col.field]: "" }), {});
  const [lineItems, setLineItems] = useState([ { ...emptyLineItem } ]);

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
    partner: {
      name: "customer",
      type: "partner-select",
      placeholder: "Customer",
      initialValue: "",
      validation: Yup.string().required("Customer is required"),
      isOpen: false,
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
    kmHours: {
      name: "kmHours",
      type: "amount",
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
      type: "amount",
      placeholder: "Total Amount",
      initialValue: "",
      validation: Yup.number().typeError("Total Amount must be a number"),
      disabled: true,
    },
  };

  // Calculate total from line items
  const calcTotal = () => {
    let xx=lineItems.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    console.log("Total calculated:", xx);
    return xx;
  };

  // Remove handleLineChange, handleLineAdd, handleLineRemove

  const handleSubmit = (values, { resetForm }) => {
    // For now, just show confirmation
    confirm("Invoice saved!", { confirmText: "OK", type: "success" });
    resetForm();
    setLineItems([{ ...emptyLineItem }]);
  };

  const formik = useFormikBuilder(fields, handleSubmit);

  // Keep totalAmount in sync
  React.useEffect(() => {
    console.log("Line items changed:", lineItems);
    formik.setFieldValue("totalAmount", calcTotal());
    // eslint-disable-next-line
  }, [lineItems]);

  return (
    <div className="container mt-4">
      {ConfirmationDialog}
      <h2 className="mb-3">Invoice</h2>
      <form onSubmit={formik.handleSubmit} noValidate>
        <div className="row g-3">
          <InputField {...fields.invoiceNo} formik={formik} className="col-md-6" />
          <InputField {...fields.date} formik={formik} className="col-md-6" />
          <SelectedBusinessPartnerBox field={fields.partner} formik={formik} />
        </div>
        <div className="row g-3 mt-2">
          {/* <InputField {...fields.to} formik={formik} className="col-md-6" /> */}
          <InputField {...fields.typeOfVehicle} formik={formik} className="col-md-6" />
          {/* <InputField {...fields.address} formik={formik} className="col-md-12" /> */}
        </div>
        <div className="row g-3 mt-2">
          <div className="col-12">
            <DataGrid
              items={lineItems}
              columns={lineItemColumns}
              onItemsChange={setLineItems}
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
