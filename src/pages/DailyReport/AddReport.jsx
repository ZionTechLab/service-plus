import { useRef, useState,useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import * as Yup from "yup";
import InputField from "../../helpers/InputField";
import { useFormikBuilder } from "../../helpers/formikBuilder";
import MessageBoxService from "../../services/MessageBoxService";
import DataGrid from "../../components/DataGrid";
import DailyReportService from "./DailyReportService";
import SelectedBusinessPartnerBox from "../BusinessPartners/select-bp";
import sanitizeAmountFields from "../../helpers/sanitizeAmountFields";

function AddDailyReport() {  
  const { id } = useParams();
  const navigate = useNavigate();
  const dataGridRef = useRef();
  const [lineItems, setLineItems] = useState([]);

  useEffect(() => {
    if (id) {
      const fetchTxn = async () => {
        const response = await DailyReportService.getReportById(id);
        if (response.success) {
          if (response.data) {
            const { lineItems, ...formData } = response.data;
            formik.setValues({
              ...formData,
              txnDate: formData.txnDate ? formData.txnDate.split("T")[0] : "",
            });
            setLineItems(lineItems);
            dataGridRef.current.reset(lineItems);
          }
        }
      };
      fetchTxn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fields = {
    id: {
      name: "id",
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

  const lineItemColumns = [
    { header: "Work Commence Form", field: "description", type: "text", placeholder: "Work Item" },
    { header: "Amount", field: "amount", type: "amount", placeholder: "Amount" },
    { header: "Hours", field: "hours", type: "text", placeholder: "Hours" },
  ];

  const handleSubmit = async (values, { resetForm }) => {
    if(id)
{
   MessageBoxService.show({
        message: "not available",
        type: "success",
        onClose: () => navigate("/invoice"),
      });
      return;
}
    const sanitizedLineItems = sanitizeAmountFields(lineItems, lineItemColumns);
    const param = { 
      header: { ...values , id: parseInt(id ? id : 0)}, 
      lineItems: sanitizedLineItems,
      isUpdate:id ? true : false
    };
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

  return (
    <div className="container p-3">
      <form onSubmit={formik.handleSubmit} >
         <div className="card mb-3">

            <div className="card-body">
        <div className="row g-2">
        <InputField {...fields.id} formik={formik} className="col-md-3 col-sm-6"/>
        <InputField {...fields.txnDate} formik={formik} className="col-md-3 col-sm-6"/>
        <SelectedBusinessPartnerBox field={fields.partner} formik={formik} className="col-sm-6"/>
        <InputField {...fields.vehicleNo} formik={formik} className="col-md-3 col-sm-6"/>
        <InputField {...fields.typeOfMachine} formik={formik} className="col-md-3 col-sm-6"/>
        <InputField {...fields.operator} formik={formik} className="col-md-3 col-sm-6"/>
        <InputField {...fields.helper} formik={formik} className="col-md-3 col-sm-6"/>
        <div className="col-md-12">
          <DataGrid
            ref={dataGridRef}
            columns={lineItemColumns}
            initialItems={[]}
            onItemsChange={setLineItems}
          />
        </div></div>
         <div className="row g-2">
        <InputField {...fields.remarks} formik={formik} className="col-sm-6"/>
 <div className="col-sm-6 ">
    <div className="row g-2">
        <InputField {...fields.km} formik={formik} className="col-md-6"/>
        <InputField {...fields.time} formik={formik} className="col-md-6"/>
        <InputField {...fields.diesel} formik={formik} className="col-md-6"/>
        <InputField {...fields.certifiedHours} formik={formik} className="col-md-6"/></div>
        </div></div>
        <button type="submit" className="btn btn-primary">Save Report</button>
    </div></div>
      </form>
    </div>
  );
}

export default AddDailyReport;