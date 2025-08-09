import * as Yup from "yup";
import InputField from "../../helpers/InputField";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useFormikBuilder } from "../../helpers/formikBuilder";
import usePopupMessage from "../../components/PopupMessage";

const fields = {
  vehicleModel: {
    name: "vehicleModel",
    type: "text",
    placeholder: "Vehicle Model",
    initialValue: "",
    validation: Yup.string().required("Vehicle Model is required"),
  },
  grade: {
    name: "grade",
    type: "text",
    placeholder: "Grade",
    initialValue: "",
    validation: Yup.string().required("Grade is required"),
  },
  colour: {
    name: "colour",
    type: "text",
    placeholder: "Colour",
    initialValue: "",
    validation: Yup.string().required("Colour is required"),
  },
  year: {
    name: "year",
    type: "number",
    placeholder: "Year",
    initialValue: "",
    validation: Yup.number().required("Year is required"),
  },
  km: {
    name: "km",
    type: "number",
    placeholder: "KM",
    initialValue: "",
    validation: Yup.number().required("KM is required"),
  },
  chassisNo: {
    name: "chassisNo",
    type: "text",
    placeholder: "Chassis No",
    initialValue: "",
    validation: Yup.string().required("Chassis No is required"),
  },
  supplier: {
    name: "supplier",
    type: "text",
    placeholder: "Supplier",
    initialValue: "",
    validation: Yup.string().required("Supplier is required"),
  },
  customer: {
    name: "customer",
    type: "text",
    placeholder: "Customer",
    initialValue: "",
    validation: Yup.string().required("Customer is required"),
  },
  purchaseDate: {
    name: "purchaseDate",
    type: "date",
    placeholder: "Purchase Date",
    initialValue: "",
    validation: Yup.string().required("Purchase Date is required"),
  },
  cifYen: {
    name: "cifYen",
    type: "number",
    placeholder: "CIF YEN",
    initialValue: "",
    validation: Yup.number().required("CIF YEN is required"),
  },
  auctionPrice: {
    name: "auctionPrice",
    type: "number",
    placeholder: "Auction Price",
    initialValue: "",
    validation: Yup.number().required("Auction Price is required"),
  },
  tax: {
    name: "tax",
    type: "number",
    placeholder: "TAX",
    initialValue: "",
    validation: Yup.number().required("TAX is required"),
  },
  frate: {
    name: "frate",
    type: "number",
    placeholder: "Frate",
    initialValue: "",
    validation: Yup.number().required("Frate is required"),
  },
  paymentDate: {
    name: "paymentDate",
    type: "date",
    placeholder: "Payment Date",
    initialValue: "",
    validation: Yup.string().required("Payment Date is required"),
  },
  paymentAmount: {
    name: "paymentAmount",
    type: "number",
    placeholder: "Payment Amount",
    initialValue: "",
    validation: Yup.number().required("Payment Amount is required"),
  },
  paymentRate: {
    name: "paymentRate",
    type: "number",
    placeholder: "Payment Rate",
    initialValue: "",
    validation: Yup.number().required("Payment Rate is required"),
  },
  paymentAmountYen: {
    name: "paymentAmountYen",
    type: "number",
    placeholder: "Payment Amount (YEN)",
    initialValue: "",
    validation: Yup.number().required("Payment Amount (YEN) is required"),
  },
  paymentDetails: {
    name: "paymentDetails",
    type: "text",
    placeholder: "Payment Details",
    initialValue: "",
    validation: Yup.string().required("Payment Details is required"),
  },
  lcOpenDetailsBank: {
    name: "lcOpenDetailsBank",
    type: "text",
    placeholder: "L.C Open Details (Bank)",
    initialValue: "",
    validation: Yup.string().required("L.C Open Details (Bank) is required"),
  },
  JPY: {
    name: "lcOpenDetailsBankJPY",
    type: "number",
    placeholder: "JPY",
    initialValue: "",
    validation: Yup.number().required("JPY is required"),
  },
  lcOpenDetailsDate: {
    name: "lcOpenDetailsBankDate",
    type: "date",
    placeholder: "L.C Open Date",
    initialValue: "",
    validation: Yup.date().required("L.C Open Date is required"),
  },
  lcMarginAmount: {
    name: "lcMarginAmount",
    type: "number",
    placeholder: "L.C Margin Amount",
    initialValue: "",
    validation: Yup.number().required("L.C Margin Amount is required"),
  },
  lcMarginDate: {
    name: "lcMarginDate",
    type: "date",
    placeholder: "L.C Margin Date",
    initialValue: "",
    validation: Yup.date().required("L.C Margin Date is required"),
  },
  lcSettlementAmount: {
    name: "lcSettlementAmount",
    type: "number",
    placeholder: "L.C Settlement Amount",
    initialValue: "",
    validation: Yup.number().required("L.C Settlement Amount is required"),
  },
  lcSettlementCharges: {
    name: "lcSettlementCharges",
    type: "number",
    placeholder: "L.C Settlement Charges",
    initialValue: "",
    validation: Yup.number().required("L.C Settlement Charges is required"),
  },
  lcSettlementDate: {
    name: "lcSettlementDate",
    type: "date",
    placeholder: "L.C Settlement Date",
    initialValue: "",
    validation: Yup.date().required("L.C Settlement Date is required"),
  },
  dutyAmount: {
    name: "dutyAmount",
    type: "number",
    placeholder: "Duty Amount",
    initialValue: "",
    validation: Yup.number().required("Duty Amount is required"),
  },
  dutyDate: {
    name: "dutyDate",
    type: "date",
    placeholder: "Duty Date",
    initialValue: "",
    validation: Yup.date().required("Duty Date is required"),
  },
  clearingChargers: {
    name: "clearingChargers",
    type: "number",
    placeholder: "Clearing Chargers",
    initialValue: "",
    validation: Yup.number().required("Clearing Chargers is required"),
  },
  clearingDate: {
    name: "clearingDate",
    type: "date",
    placeholder: "Clearing Date",
    initialValue: "",
    validation: Yup.date().required("Clearing Date is required"),
  },
  salesTax: {
    name: "salesTax",
    type: "number",
    placeholder: "Sales Tax",
    initialValue: "",
    validation: Yup.number().required("Sales Tax is required"),
  },
  transportCost: {
    name: "transportCost",
    type: "number",
    placeholder: "Transport Cost",
    initialValue: "",
    validation: Yup.number().required("Transport Cost is required"),
  },
  totalCost: {
    name: "totalCost",
    type: "number",
    placeholder: "Total Cost",
    initialValue: "",
    validation: Yup.number().required("Total Cost is required"),
  },
  description: {
    name: "description",
    type: "textarea",
    placeholder: "Description",
    initialValue: "",
    validation: Yup.string().required("Description is required"),
  },
};

const AddConfirmation = () => {
  const { id } = useParams();
  const popup = usePopupMessage();
  const formik = useFormikBuilder(fields, async (values) => {
    // TODO: Save logic here
    popup.show({ message: "Saved successfully!", type: "success" });
  });

  useEffect(() => {
    if (id) {
      // TODO: Fetch and set form values for edit
    }
  }, [id]);

  return (
    <form onSubmit={formik.handleSubmit} className="p-3">
     <div className="row g-3">
              <InputField className="col-sm-6" {...fields.vehicleModel} formik={formik} />
              <InputField className="col-sm-6" {...fields.grade} formik={formik} />
              <InputField className="col-sm-6" {...fields.colour} formik={formik} />
              <InputField className="col-sm-3" {...fields.year} formik={formik} />
              <InputField className="col-sm-3" {...fields.km} formik={formik} />
                <InputField className="col-sm-6" {...fields.chassisNo} formik={formik} />
              <InputField className="col-sm-6" {...fields.purchaseDate} formik={formik} />
              <hr/>
              <InputField className="col-sm-12" {...fields.supplier} formik={formik} />
              <InputField className="col-sm-12" {...fields.customer} formik={formik} />
              <InputField className="col-sm-6" {...fields.purchaseDate} formik={formik} />
              <InputField className="col-sm-6" {...fields.cifYen} formik={formik} />
              <InputField className="col-sm-6" {...fields.auctionPrice} formik={formik} />
              <InputField className="col-sm-3" {...fields.tax} formik={formik} />
              <InputField className="col-sm-3" {...fields.frate} formik={formik} />
                   <InputField className="col-sm-6" {...fields.paymentAmount} formik={formik} />
                      <InputField className="col-sm-6" {...fields.paymentDate} formik={formik} />
                         <InputField className="col-sm-6" {...fields.paymentRate} formik={formik} />
                            <InputField className="col-sm-6" {...fields.paymentAmountYen} formik={formik} />
              <InputField className="col-sm-12" {...fields.paymentDetails} formik={formik} />
              <InputField className="col-sm-12" {...fields.lcOpenDetailsBank} formik={formik} />
               <InputField className="col-sm-6" {...fields.JPY} formik={formik} />
                <InputField className="col-sm-6" {...fields.lcOpenDetailsDate} formik={formik} />
              <InputField className="col-sm-6" {...fields.lcMarginAmount} formik={formik} />
              <InputField className="col-sm-6" {...fields.lcMarginDate} formik={formik} />
              <InputField className="col-sm-4" {...fields.lcSettlementAmount} formik={formik} />
                    <InputField className="col-sm-4" {...fields.lcSettlementCharges} formik={formik} />
                          <InputField className="col-sm-4" {...fields.lcSettlementDate} formik={formik} />
              <InputField className="col-sm-6" {...fields.dutyAmount} formik={formik} />
                <InputField className="col-sm-6" {...fields.dutyDate} formik={formik} />
              <InputField className="col-sm-6" {...fields.clearingChargers} formik={formik} />
                     <InputField className="col-sm-6" {...fields.clearingDate} formik={formik} />
              <InputField className="col-sm-6" {...fields.salesTax} formik={formik} />
                <InputField className="col-sm-6" {...fields.transportCost} formik={formik} />
              <InputField className="col-sm-6" {...fields.totalCost} formik={formik} />
              <InputField className="col-sm-12" {...fields.description} formik={formik} />



              </div>
      <button type="submit" className="btn btn-primary mt-3">Save</button>
    </form>
  );
};

export default AddConfirmation;
