
import * as Yup from "yup";
import React, { useState } from "react";
import InputField from "../helpers/InputField";
import { useFormikBuilder } from "../helpers/formikBuilder";
import usePopupMessage from "../components/PopupMessage";
import DataGrid from "../components/DataGrid";
import SelectedBusinessPartnerBox from "./BusinessPartners/select-bp";

import  "./Invoice.css";
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
      type: "amount",
      placeholder: "Amount",
      width: "25%"
    },
    // {
    //   header: "Total",
    //   field: "total",
    //   type: "amount",
    //   placeholder: "Amount",
    //   width: "25%"
    // }
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
      // validation: Yup.string().required("Invoice No is required"),
      disabled: true,
    },  
      date: {
      name: "date",
      type: "date",
      placeholder: "Invoice Date",
      initialValue: new Date().toISOString().split("T")[0],
      validation: Yup.string().required("Invoice Date is required"),
    },
    partner: {
      name: "partner",
      type: "partner-select",
      placeholder: "Customer",
      initialValue: "",
      // validation: Yup.string().required("Customer is required"),
      isOpen: false,
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


    preparedBy: {
      name: "preparedBy",
      type: "text",
      placeholder: "Prepared By",
      initialValue: "",
      // validation: Yup.string(),
    },
    receivedBy: {
      name: "receivedBy",
      type: "text",
      placeholder: "Received By",
      initialValue: "",
      // validation: Yup.string(),
    },
    amount: {
      name: "amount",
      type: "amount",
      placeholder: "Amount",
      initialValue: "",
      validation: Yup.number().typeError("Amount must be a number"),
            disabled: true,
      labelOnTop:false
    },
    advance: {
      name: "advance",
      type: "amount",
      placeholder: "Advance",
      initialValue: 0,
      // validation: Yup.number().typeError("Advance must be a number"),
       labelOnTop:false
    },
    totalAmount: {
      name: "totalAmount",
      type: "amount",
      placeholder: "Total Amount",
      initialValue: "",
      validation: Yup.number().typeError("Total Amount must be a number"),
      disabled: true,
       labelOnTop:false
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
    console.log("Form submitted:", values);
    console.log("Line items:", lineItems);
    // For now, just show confirmation
    // confirm("Invoice saved!", { confirmText: "OK", type: "success" });
    resetForm();
    setLineItems([{ ...emptyLineItem }]);
  };

  const formik = useFormikBuilder(fields, handleSubmit);

  // Keep totalAmount in sync
  React.useEffect(() => {
    calculateTotal();
    // eslint-disable-next-line
  }, [lineItems]);
  React.useEffect(() => {
    calculateTotal();
    // eslint-disable-next-line
  }, [formik.values.advance]);
function calculateTotal()
{
    let c = calcTotal();
    formik.setFieldValue("amount", c);
    formik.setFieldValue("totalAmount", c - (parseFloat(formik.values.advance) || 0));
}

  return (
    <div className="container mt-4">
      {ConfirmationDialog}
      <form onSubmit={formik.handleSubmit} noValidate>
      <div className="row g-3">
        <InputField {...fields.invoiceNo} formik={formik} className="col-md-6" />
        <InputField {...fields.date} formik={formik} className="col-md-6" />
        <SelectedBusinessPartnerBox field={fields.partner} formik={formik} />      
        <InputField {...fields.typeOfVehicle} formik={formik} className="col-md-6" />
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
      <div className="row  justify-content-end">
        <InputField {...fields.amount} formik={formik} className="col-md-6 text-end " />
      </div>
      <div className="row  justify-content-end">
        <InputField {...fields.advance} formik={formik} className="col-md-6 text-end" />
      </div>
      <div className="row  justify-content-end">
        <InputField {...fields.totalAmount} formik={formik} className="col-md-6 text-end" />
      </div>
      <div className="row g-3 mt-2">
        {/* <InputField {...fields.kmHours} formik={formik} className="col-md-4" /> */}
        <InputField {...fields.preparedBy} formik={formik} className="col-md-6" />
        <InputField {...fields.receivedBy} formik={formik} className="col-md-6" />
      </div>

      <button className="w-100 btn btn-primary mt-3" type="submit">
        Submit
      </button>
      </form>
    </div>
    );
}

export default Invoice;
