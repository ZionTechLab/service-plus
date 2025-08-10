import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import InputField from "../../helpers/InputField";
import { useFormikBuilder } from "../../helpers/formikBuilder";
import MessageBoxService from "../../services/MessageBoxService";
import DataGrid from "../../components/DataGrid";
import { useRef, useState } from "react";

import DailyReportService from "./DailyReportService";
import SelectedBusinessPartnerBox from "../BusinessPartners/select-bp";

// Generic function to sanitize all amount fields in line items
function sanitizeAmountFields(items, columns) {
  // Find all fields with type: 'amount'
  const amountFields = columns.filter(col => col.type === 'amount').map(col => col.field);
  return items.map(item => {
    const sanitized = { ...item };
    amountFields.forEach(field => {
      if (typeof sanitized[field] === 'string') {
        sanitized[field] = sanitized[field].replace(/,/g, '');
      }
    });
    return sanitized;
  });
}

function AddDailyReport() {  
  const { id } = useParams();
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
    },    
    partner: {
      name: "partner",
      type: "partner-select",
      placeholder: "Customer",
      initialValue: "",
      validation: Yup.string().required("Customer is required"),
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

  const handleSubmit = async (values, { resetForm }) => {
    // Use generic sanitizer for all amount fields
    const sanitizedLineItems = sanitizeAmountFields(lineItems, lineItemColumns);
    const param = { ...values, txnNo: parseInt(id ? id : 0), lineItems: sanitizedLineItems };
    const response = await DailyReportService.createReport({ ...param });

    if (response.success) {
      MessageBoxService.show({
        message: "Daily Report saved successfully!",
        type: "success",
        onClose: () => navigate("/daily-report"),
      });
      resetForm();
      dataGridRef.current.reset();
      setLineItems([]);
    }
  };

  const formik = useFormikBuilder(fields, handleSubmit);

  const lineItemColumns = [
    { header: "Work Commence Form", field: "desc", type: "text", placeholder: "Work Item" },
    { header: "Amount", field: "amount", type: "amount", placeholder: "Amount" },
    { header: "Hours", field: "hours", type: "text", placeholder: "Hours" },
  ];

  return (
    <div className="container p-3">
      <form onSubmit={formik.handleSubmit} className="row g-3">
        <InputField {...fields.txnNo} formik={formik} className="col-md-6"/>
        <InputField {...fields.txnDate} formik={formik} className="col-md-6"/>
        <SelectedBusinessPartnerBox field={fields.partner} formik={formik} />
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
        <InputField {...fields.remarks} formik={formik} className="col-md-12"/>
        <InputField {...fields.km} formik={formik} className="col-md-3"/>
        <InputField {...fields.time} formik={formik} className="col-md-3"/>
        <InputField {...fields.diesel} formik={formik} className="col-md-3"/>
        <InputField {...fields.certifiedHours} formik={formik} className="col-md-3"/>
        <button type="submit" className="btn btn-primary">Save Report</button>
      </form>
    </div>
  );
}

export default AddDailyReport;