import { useRef, useState,useEffect } from "react";
import { useParams,useNavigate ,useLocation} from "react-router-dom";
import * as Yup from "yup";
import InputField from "../../helpers/InputField";
import { useFormikBuilder } from "../../helpers/formikBuilder";
import MessageBoxService from "../../services/MessageBoxService";
import DataGrid from "../../components/DataGrid";
import ApiService from "./InvoiceService";
import SelectedBusinessPartnerBox from "../BusinessPartners/select-bp";
import sanitizeAmountFields from "../../helpers/sanitizeAmountFields";
import transformDateFields from "../../helpers/transformDateFields";
import  "./Invoice.css";
import Modal from "../../components/Modal";
import InvoicePrintView from "./InvoicePrintView";

function Invoice() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dataGridRef = useRef();
  const [lineItems, setLineItems] = useState([]);
  const [uiData, setUiData] = useState({loading: false, success: false, error: '', data: {} });
  const location = useLocation(); 
  const [isTaxInvoice, setIsTaxInvoice] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
   let isTaxInvoice_ = 0;
    if(location.pathname.includes('tax-invoice')) {
      isTaxInvoice_=1
      setIsTaxInvoice(1)
    }

   const fetchUi = async () => {
      setUiData(prev => ({ ...prev, loading: true, error: '', data: {} }));
      const data = await ApiService.getUi();
      setUiData(prev => ({ ...prev, ...data , loading: false }));
    };
    fetchUi();

    if (id) {
      const fetchTxn = async () => {
        const response = await ApiService.get(id,isTaxInvoice_);
        if (response.success) {
          if (response.data) {
            const { lineItems, ...formData } = response.data;
            // normalize all date fields using the fields descriptor
            const normalized = transformDateFields(formData, fields);
            formik.setValues({ ...normalized });
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
    ref1: {
      name: "ref1",
      type: "select",
      placeholder: "Type of Vehicle",
      dataBinding: {
        data: uiData.data.VehicleType,
        keyField: "id",
        valueField: "value",
      },

      validation: isTaxInvoice ? undefined : Yup.number().required("Type of Vehicle is required")
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
    taxAmount: {
      name: "taxAmount",
      type: "amount",
      placeholder: "Vat (18 %)",
      initialValue: 0,
      validation: Yup.number()
        .typeError("Vat must be a number"),
        // .positive("Vat must be greater than 0"),
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
if(id)
{
   MessageBoxService.show({
        message: "not available",
        type: "success",
        onClose: () => navigate(isTaxInvoice ? "/tax-invoice" : "/invoice"),
      });
      return;
}
    const sanitizedLineItems = sanitizeAmountFields(lineItems, lineItemColumns);
    const param = { 
      header: { ...values , id: parseInt(id ? id : 0)}, 
      lineItems: sanitizedLineItems,
      isUpdate:id ? true : false
      , isTaxInvoice
    };
    const response = await ApiService.update({ ...param });

    if (response.success) {
      MessageBoxService.show({
        message: "Invoice saved successfully!",
        type: "success",
        onClose: () => navigate(isTaxInvoice ? "/tax-invoice" : "/invoice"),
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
      (sum, item) => sum + (parseFloat( String(item.amount).replace(/[^\d.]/g, '')   )|| 0),
      0
    );

    
    console.log(total);
    formik.setFieldValue("amount", total);
    const taxAmount = isTaxInvoice ? total * 0.18 : 0;
    formik.setFieldValue("taxAmount", taxAmount);
    formik.setFieldValue(
      "totalAmount",
      total + taxAmount - (parseFloat(formik.values.advance) || 0)
    );
  }

  return (
    <div className="container p-3">   
      <form onSubmit={formik.handleSubmit} className=" g-3">
        <div className="row g-2">
          <InputField {...fields.id} formik={formik} className={isTaxInvoice ? "col-md-6 col-sm-6" : "col-md-3 col-sm-6"} />
          <InputField {...fields.txnDate} formik={formik} className={isTaxInvoice ? "col-md-6 col-sm-6" : "col-md-3 col-sm-6"}/>
        {isTaxInvoice?null:(  <InputField {...fields.ref1} formik={formik} className="col-sm-6" /> )}
          <SelectedBusinessPartnerBox field={fields.partner} formik={formik} />
         
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
{isTaxInvoice?(   <div className="row  justify-content-end">
          <InputField
            {...fields.taxAmount}
            formik={formik}
            className="col-md-6 text-end"
          />
        </div>):null}

       {isTaxInvoice?null:(
        <div className="row  justify-content-end">
          <InputField
            {...fields.advance}
            formik={formik}
            className="col-md-6 text-end"
          />
        </div>)}
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
{/* 
      <button className="w-100 btn btn-primary mt-3" type="submit">
          Submit
        </button>  */}

                        <div className="d-flex justify-content-end mt-3">
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </div>
        <div className="d-flex gap-2 mt-2">
      
      
    (<> <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setShowPreview((s) => !s)}
          >
            {showPreview ? "Hide Preview" : "Print Preview"}
          </button>
          {/* <button
            type="button"
            className="btn btn-success"
            onClick={() => window.print()}
          >
            Print
          </button> */}
          </>)
        </div>
      </form>

  {/* Modal-based preview */}
      <Modal show={showPreview} onClose={() => setShowPreview(false)} title="Invoice Preview">
        <InvoicePrintView formikValues={formik.values} lineItems={lineItems} isTaxInvoice={isTaxInvoice} id={id} fields={fields} />
        <div className="mt-3 d-flex justify-content-end">
          <button className="btn btn-secondary me-2" onClick={() => setShowPreview(false)}>Close</button>
          <button className="btn btn-primary" onClick={() => window.print()}>Print</button>
        </div>
      </Modal>
    </div>
  );
}

export default Invoice;