import * as Yup from "yup";
import { useState,useRef,useEffect } from "react";
import { useParams } from "react-router-dom";
import InputField from "../../helpers/InputField";
import { useFormikBuilder } from "../../helpers/formikBuilder";
import DataGrid from "../../components/DataGrid";
import SelectedBusinessPartnerBox from "../BusinessPartners/select-bp";
import InvoiceService from "./InvoiceService";
import MessageBoxService from "../../services/MessageBoxService";
import  "./Invoice.css";

function Invoice() {
  const { id } = useParams();
  const dataGridRef = useRef();
  const [lineItems, setLineItems] = useState([]);

  useEffect(() => {
    if (id) {
      const fetchInquiries = async () => {
        console.log("Fetching inquiries with ID:", id);
        const inquiries = await InvoiceService.getInvoiceById(id);
        console.log("Fetched inquiries:", inquiries);
        if (inquiries) {
          console.log(inquiries.date );
          formik.setValues({
            ...inquiries,
            preparedBy: 'dddd',
            date: inquiries.date ? inquiries.date.split("T")[0] : "",
          });
        }
      };
      fetchInquiries();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const lineItemColumns = [
    {
      header: "Description",
      field: "description",
      type: "text",
      placeholder: "Description",
    },
    {
      header: "Amount",
      field: "amount",
      type: "amount",
      placeholder: "Amount",
      width: "25%",
    },
  ];

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
      validation: Yup.string().required("Customer is required"),
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
      validation: Yup.string(),
    },
    receivedBy: {
      name: "receivedBy",
      type: "text",
      placeholder: "Received By",
      initialValue: "",
    //  validation: Yup.string().required("Received By is required"),
    },
    amount: {
      name: "amount",
      type: "amount",
      placeholder: "Amount",
      initialValue: "",
      // validation: Yup.number()
      // .typeError("Amount must be a number")
      // .positive( "Amount must be greater than 0"),
      disabled: true,
      labelOnTop: false,
    },
    advance: {
      name: "advance",
      type: "amount",
      placeholder: "Advance",
      initialValue: 0,
      // validation: Yup.number().typeError("Advance must be a number"),
      labelOnTop: false,
    },
    totalAmount: {
      name: "totalAmount",
      type: "amount",
      placeholder: "Total Amount",
      initialValue: "",
      // validation: Yup.number()
      // .typeError("Total Amount must be a number")
      // .positive("Amount must be greater than 0"),
      disabled: true,
      labelOnTop: false,
    },
  };

  const calcTotal = () => {

    let xx = lineItems.reduce(



      (sum, item) => sum + (parseFloat(item.amount.replace(/,/g, '')) || 0), 0
    );

    return xx;
  };

  const handleInquirySubmit = async (values, { resetForm } ) => {
    const param = { ...values, invoiceNo: parseInt(id ? id : 0), lineItems };
    console.log("Submitting invoice with values:", param);
    // const savedInvoice = 
    await InvoiceService.createInvoice({ ...param });

    MessageBoxService.show({
      message: "Invoice saved successfully!",
      type: "success",
      onClose: null,
    });
    resetForm();
    dataGridRef.current.reset();
    setLineItems([]);
  };

  const formik = useFormikBuilder(fields, handleInquirySubmit);

  useEffect(() => {
    calculateTotal();
    // eslint-disable-next-line
  }, [lineItems]);

  useEffect(() => {
    calculateTotal();
    // eslint-disable-next-line
  }, [formik.values.advance]);
  
  function calculateTotal() {
    let c = calcTotal();
    formik.setFieldValue("amount", c);
    formik.setFieldValue(
      "totalAmount",
      c - (parseFloat(formik.values.advance.replace(/,/g, '')) || 0)
    );
  }

  return (
    <div className="container mt-4">
      <form onSubmit={formik.handleSubmit} >
        <div className="row g-3">
          <InputField
            {...fields.invoiceNo}
            formik={formik}
            className="col-md-6"
          />
          <InputField {...fields.date} formik={formik} className="col-md-6" />
          <SelectedBusinessPartnerBox field={fields.partner} formik={formik} />
          <InputField
            {...fields.typeOfVehicle}
            formik={formik}
            className="col-md-6"
          />
        </div>

        <div className="row g-3 mt-2">
          <div className="col-12">
            <DataGrid
              ref={dataGridRef}
              initialItems={lineItems}
              columns={lineItemColumns}
              onItemsChange={setLineItems}
            />
          </div>
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
        <div className="row g-3 mt-2">
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
        </div>

        <button className="w-100 btn btn-primary mt-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Invoice;