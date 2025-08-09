import * as Yup from "yup";
import React from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../helpers/InputField";
import { useFormikBuilder } from "../../helpers/formikBuilder";
import MessageBoxService from "../../services/MessageBoxService";
import DataGrid from "../../components/DataGrid";
import { useRef, useState } from "react";

function AddDailyReport() {
  const navigate = useNavigate();
  const dataGridRef = useRef();
  const [lineItems, setLineItems] = useState([]);

  const fields = {
        txnNo: {
      name: "txnNo",
      type: "text",
      placeholder: "Transaction No",
      initialValue: "<Auto>",
      // validation: Yup.string().required("Transaction No is required"),
      disabled: true,
    },
    txnDate: {
      name: "txnDate",
      type: "date",
      placeholder: "Transaction Date",
      initialValue: new Date().toISOString().split("T")[0],
      validation: Yup.string().required("Transaction Date is required"),
    },    partner: {
      name: "partner",
      type: "partner-select",
      placeholder: "Customer",
      initialValue: "",
      // validation: Yup.string().required("Customer is required"),
      isOpen: false,
    },
    vehicleNo: {
      name: "vehicleNo",
      type: "text",
      placeholder: "Vehicle No",
      initialValue: "",
      validation: Yup.string().required("Vehicle No is required"),
    },

    typeOfMachine: {
      name: "typeOfMachine",
      type: "text",
      placeholder: "Type of Machine",
      initialValue: "",
      validation: Yup.string().required("Type of Machine is required"),
    },
    operator: {
      name: "operator",
      type: "text",
      placeholder: "Operator",
      initialValue: "",
      validation: Yup.string().required("Operator is required"),
    },
    helper: {
      name: "helper",
      type: "text",
      placeholder: "Helper",
      initialValue: "",
    },
    remarks: {
      name: "remarks",
      type: "textarea",
      placeholder: "Remarks",
      initialValue: "",
    },
    km: {
      name: "km",
      type: "number",
      placeholder: "K.M.",
      initialValue: "",
    },
    time: {
      name: "time",
      type: "text",
      placeholder: "Time",
      initialValue: "",
    },
    diesel: {
      name: "diesel",
      type: "text",
      placeholder: "Diesel",
      initialValue: "",
    },
    certifiedHours: {
      name: "certifiedHours",
      type: "text",
      placeholder: "Certified Hours",
      initialValue: "",
    },
  };

  const handleSubmit = (values, { resetForm }) => {
    // Save to localStorage
    const reports = JSON.parse(localStorage.getItem('dailyReports') || '[]');
    const newReport = { ...values, lineItems, id: Date.now() };
    localStorage.setItem('dailyReports', JSON.stringify([...reports, newReport]));
    MessageBoxService.show({
      message: 'Daily Report added successfully!',
      type: 'success',
      onClose: () => navigate('/daily-report'),
    });
  };

  const formik = useFormikBuilder(fields, handleSubmit);

  const lineItemColumns = [
    { header: "Work Commence Form", field: "workCommenceForm", type: "text", placeholder: "Work Commence Form" },
    { header: "Amount", field: "amount", type: "amount", placeholder: "Amount" },
    { header: "Hours", field: "hours", type: "text", placeholder: "Hours" },
  ];

  return (
    <div className="container p-3">
      {/* <h4>Add Daily Report</h4> */}
      <form onSubmit={formik.handleSubmit} className="row g-3">
                <InputField {...fields.txnNo} formik={formik} className="col-md-6"/>
         <InputField {...fields.txnDate} formik={formik} className="col-md-6"/>
  <InputField {...fields.partner} formik={formik} className="col-md-12"/>

          <InputField {...fields.vehicleNo} formik={formik} className="col-md-6"/>



          <InputField {...fields.typeOfMachine} formik={formik} className="col-md-6"/>


          <InputField {...fields.operator} formik={formik} className="col-md-6"/>

          <InputField {...fields.helper} formik={formik} className="col-md-6"/>

        <div className="col-md-12">
          <DataGrid
            ref={dataGridRef}
            columns={lineItemColumns}
            initialItems={[]}
            onItemsChange={setLineItems}
          />
        </div>
        <div className="col-md-12">
          <InputField {...fields.remarks} formik={formik} />
        </div>
        <div className="col-md-3">
          <InputField {...fields.km} formik={formik} />
        </div>
        <div className="col-md-3">
          <InputField {...fields.time} formik={formik} />
        </div>
        <div className="col-md-3">
          <InputField {...fields.diesel} formik={formik} />
        </div>
        <div className="col-md-3">
          <InputField {...fields.certifiedHours} formik={formik} />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Save Report</button>
        </div>
      </form>
    </div>
  );
}

export default AddDailyReport;
