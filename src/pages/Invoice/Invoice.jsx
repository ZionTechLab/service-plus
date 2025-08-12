import { useRef, useState,useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import * as Yup from "yup";
import InputField from "../../helpers/InputField";
import { useFormikBuilder } from "../../helpers/formikBuilder";
import MessageBoxService from "../../services/MessageBoxService";
import DataGrid from "../../components/DataGrid";
import InvoiceService from "./InvoiceService";
import SelectedBusinessPartnerBox from "../BusinessPartners/select-bp";
import sanitizeAmountFields from "../../helpers/sanitizeAmountFields";
import  "./Invoice.css";

function Invoice() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dataGridRef = useRef();
  const [lineItems, setLineItems] = useState([]);

  useEffect(() => {
    if (id) {
      const fetchTxn = async () => {
        const response = await InvoiceService.getInvoiceById(id);
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
    ref1: {
      name: "ref1",
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
    amount: {
      name: "amount",
      type: "amount",
      placeholder: "Amount",
      initialValue: 0,
      validation: Yup.number()
        .typeError("Amount must be a number")
        .positive("Amount must be greater than 0"),
      disabled: true,
      labelOnTop: false,
    },
    advance: {
      name: "advance",
      type: "amount",
      placeholder: "Advance",
      initialValue: 0,
      validation: Yup.number().typeError("Advance must be a number"),
      labelOnTop: false,
    },
    totalAmount: {
      name: "totalAmount",
      type: "amount",
      placeholder: "Total Amount",
      initialValue: 0,
      validation: Yup.number()
      .typeError("Total Amount must be a number")
      .positive("Amount must be greater than 0"),
      disabled: true,
      labelOnTop: false,
    },
  };

  const lineItemColumns = [
    { header: "Description", field: "description", type: "text", placeholder: "Description" },
    { header: "Amount", field: "amount", type: "amount", placeholder: "Amount", width: "25%" },
  ];



  const handleSubmit = async (values, { resetForm } ) => {
    const sanitizedLineItems = sanitizeAmountFields(lineItems, lineItemColumns);
    const param = { 
      header: { ...values , txnNo: parseInt(id ? id : 0)}, 
      lineItems: sanitizedLineItems,
      isUpdate:id ? true : false
    };
    const response = await InvoiceService.createInvoice({ ...param });
console.log(response);
    if (response.success) {
      MessageBoxService.show({
        message: "Invoice saved successfully!",
        type: "success",
        onClose: () => navigate("/invoice"),
      });
      resetForm();
      dataGridRef.current.reset();
      setLineItems([]);
    }
  };

  const formik = useFormikBuilder(fields, handleSubmit);



  useEffect(() => {
    calculateTotal();
    // eslint-disable-next-line
  }, [lineItems,formik.values.advance]);
   
  function calculateTotal() {
    const total = lineItems.reduce(
      (sum, item) => sum + (parseFloat(item.amount)|| 0),
      0
    );
    formik.setFieldValue("amount", total);
    formik.setFieldValue(
      "totalAmount",
      total - (parseFloat(formik.values.advance) || 0)
    );
  }

  return (
    <div className="container p-3">
      <form onSubmit={formik.handleSubmit} className=" g-3">
        <div className="row g-3">
          <InputField {...fields.txnNo} formik={formik} className="col-md-6" />
          <InputField {...fields.txnDate} formik={formik} className="col-md-6" />
          <SelectedBusinessPartnerBox field={fields.partner} formik={formik} />
          <InputField {...fields.ref1} formik={formik} className="col-md-6" />
            <DataGrid
              ref={dataGridRef}
              initialItems={lineItems}
              columns={lineItemColumns}
              onItemsChange={setLineItems}
            />
            </div>
        <div className="row  justify-content-end">
          <InputField
            {...fields.amount}
            formik={formik}
            className="col-md-6 text-end "
          />
        </div>
        <div className="row  justify-content-end">
          <InputField
            {...fields.advance}
            formik={formik}
            className="col-md-6 text-end"
          />
        </div>
        <div className="row  justify-content-end">
          <InputField
            {...fields.totalAmount}
            formik={formik}
            className="col-md-6 text-end"
          />
        </div>
        {/* <div className="row g-3 mt-2">
          <InputField
            {...fields.preparedBy}
            formik={formik}
            className="col-md-6"
          />
          <InputField
            {...fields.receivedBy}
            formik={formik}
            className="col-md-6"
          />
        </div> */}

        <button className="w-100 btn btn-primary mt-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Invoice;