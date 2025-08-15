import { useRef, useState,useEffect } from "react";
import { useParams,useNavigate, data } from "react-router-dom";
import * as Yup from "yup";
import InputField from "../../helpers/InputField";
import { useFormikBuilder } from "../../helpers/formikBuilder";
import MessageBoxService from "../../services/MessageBoxService";
// import DataGrid from "../../components/DataGrid";
import ApiService from "./ConfirmationService";
import SelectedBusinessPartnerBox from "../BusinessPartners/select-bp";
// import sanitizeAmountFields from "../../helpers/sanitizeAmountFields";
import Tabs from "../../components/Tabs";
import { useLoadingSpinner } from '../../hooks/useLoadingSpinner';

import ImageInputField from '../../components/ImageInputField';


const AddConfirmation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("vehicle");
    const [uiData, setUiData] = useState({loading: false, success: false, error: '', data: {} });

  const { showSpinner, hideSpinner } = useLoadingSpinner();

const fields = {
    id: {
      name: "id",
      type: "text",
      placeholder: "ID",
      initialValue: "<Auto>",
      disabled: true,
      // visible: false
      // validation: Yup.string().required("ID is required"),
    },
    vehicleMake: {
      name: "vehicleMake",
      type: "select",
      placeholder: "Make",
      dataBinding: {
        data:uiData.data.Make,
        // data: [
        //   { key: "car", value: "Car" },
        //   { key: "van", value: "Van" },
        //   { key: "truck", value: "Truck" },
        //   { key: "bus", value: "Bus" },
        //   { key: "other", value: "Other" },
        // ],
        keyField: "id",
        valueField: "value",
      },
      initialValue: "car",
      validation: Yup.string().required("Type of Vehicle is required"),
    },
    vehicleModel: {
      name: "vehicleModel",
      type: "select",
      placeholder: "Model",
      dataBinding: {
        data:uiData.data.Model,
        // data: [
        //   { key: "car", value: "Car" },
        //   { key: "van", value: "Van" },
        //   { key: "truck", value: "Truck" },
        //   { key: "bus", value: "Bus" },
        //   { key: "other", value: "Other" },
        // ],
        keyField: "id",
        valueField: "value",
      },
      initialValue: "car",
      validation: Yup.string().required("Type of Vehicle is required"),
    },



  // vehicleModel: {
  //   name: "vehicleModel",
  //   type: "text",
  //   placeholder: "Model",
  //   initialValue: "",
  //   // validation: Yup.string().required("Vehicle Model is required"),
  // },
  grade: {
    name: "grade",
    type: "text",
    placeholder: "Grade",
    initialValue: "",
    // validation: Yup.string().required("Grade is required"),
  },
  colour: {
    name: "colour",
    type: "text",
    placeholder: "Colour",
    initialValue: "",
    // validation: Yup.string().required("Colour is required"),
  },
  year: {
    name: "year",
    type: "number",
    placeholder: "Year",
    initialValue: "",
    // validation: Yup.number().required("Year is required"),
  },
  millage: {
    name: "millage",
    type: "number",
    placeholder: "Millage",
    initialValue: "",
    // validation: Yup.number().required("Millage is required"),
  },
  engineCapacity: {
    name: "engineCapacity",
    type: "number",
    placeholder: "Engine Capacity",
    initialValue: "",
    // validation: Yup.number().required("Engine Capacity is required"),
  },
   fuelType: {
    name: "fuelType",
    type: "text",
    placeholder: "Fuel Type",
    initialValue: "",
    // validation: Yup.string().required("Fuel Type is required"),
  },
     transmission: {
    name: "transmission",
    type: "text",
    placeholder: "Transmission",
    initialValue: "",
    // validation: Yup.string().required("Transmission is required"),
  },
  chassisNo: {
    name: "chassisNo",
    type: "text",
    placeholder: "Chassis No",
    initialValue: "",
    // validation: Yup.string().required("Chassis No is required"),
  },


  supplier: {
    name: "supplier",
    type: "partner-select",
    placeholder: "Supplier",
    initialValue: "",
    // validation: Yup.string().required("Supplier is required"),
      isOpen: false,
  },
  customer: {
    name: "customer",
    type: "partner-select",
    placeholder: "Customer",
    initialValue: "",
    // validation: Yup.string().required("Customer is required"),
      isOpen: false,
  },
  purchaseDate: {
    name: "purchaseDate",
    type: "date",
    placeholder: "Purchase Date",
    initialValue: "",
    // validation: Yup.string().required("Purchase Date is required"),
  },
  cifYen: {
    name: "cifYen",
    type: "number",
    placeholder: "CIF YEN",
    initialValue: "",
    // validation: Yup.number().required("CIF YEN is required"),
  },
  auctionPrice: {
    name: "auctionPrice",
    type: "number",
    placeholder: "Auction Price",
    initialValue: "",
    // validation: Yup.number().required("Auction Price is required"),
  },
  tax: {
    name: "tax",
    type: "number",
    placeholder: "TAX",
    initialValue: "",
    // validation: Yup.number().required("TAX is required"),
  },
  freight: {
    name: "freight",
    type: "number",
    placeholder: "Freight",
    initialValue: "",
    // validation: Yup.number().required("Freight is required"),
  },
  paymentDate: {
    name: "paymentDate",
    type: "date",
    placeholder: "Payment Date",
    initialValue: "",
    // validation: Yup.string().required("Payment Date is required"),
  },
  paymentAmount: {
    name: "paymentAmount",
    type: "number",
    placeholder: "Payment Amount",
    initialValue: "",
    // validation: Yup.number().required("Payment Amount is required"),
  },
  paymentRate: {
    name: "paymentRate",
    type: "number",
    placeholder: "Payment Rate",
    initialValue: "",
    // validation: Yup.number().required("Payment Rate is required"),
  },
  paymentAmountYen: {
    name: "paymentAmountYen",
    type: "number",
    placeholder: "Payment Amount (YEN)",
    initialValue: "",
    // validation: Yup.number().required("Payment Amount (YEN) is required"),
  },
  paymentDetails: {
    name: "paymentDetails",
    type: "text",
    placeholder: "Payment Details",
    initialValue: "",
    // validation: Yup.string().required("Payment Details is required"),
  },
  lcOpenDetailsBank: {
    name: "lcOpenDetailsBank",
    type: "text",
    placeholder: "L.C Open Details (Bank)",
    initialValue: "",
    // validation: Yup.string().required("L.C Open Details (Bank) is required"),
  },
  JPY: {
    name: "JPY",
    type: "number",
    placeholder: "JPY",
    initialValue: "",
    // validation: Yup.number().required("JPY is required"),
  },
  lcOpenDetailsDate: {
    name: "lcOpenDetailsDate",
    type: "date",
    placeholder: "L.C Open Date",
    initialValue: "",
    // validation: Yup.date().required("L.C Open Date is required"),
  },
  lcMarginAmount: {
    name: "lcMarginAmount",
    type: "number",
    placeholder: "L.C Margin Amount",
    initialValue: "",
    // validation: Yup.number().required("L.C Margin Amount is required"),
  },
  lcMarginDate: {
    name: "lcMarginDate",
    type: "date",
    placeholder: "L.C Margin Date",
    initialValue: "",
    // validation: Yup.date().required("L.C Margin Date is required"),
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
  clearingCharges: {
    name: "clearingCharges",
    type: "number",
    placeholder: "Clearing Charges",
    initialValue: "",
    validation: Yup.number().required("Clearing Charges is required"),
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
    image: {
      name: "image",
      type: "file",
      placeholder: "Image",
      initialValue: null,
      validation: Yup.mixed(),
      // className: "col-md-12"
    },
};







  useEffect(() => {
   const fetchUi = async () => {
      setUiData(prev => ({ ...prev, loading: true, error: '', data: {} }));
      showSpinner();
      const data = await ApiService.getUi();
      console.log("Fetched UI Data:", data);
      setUiData(prev => ({ ...prev, ...data , loading: false }));
      hideSpinner();
    };
    fetchUi();




    if (id) {
      const fetchTxn = async () => {
        const response = await ApiService.get(id);
        if (response.success) {
          if (response.data) {
            formik.setValues({
              ...response.data,
              // txnDate: formData.txnDate ? formData.txnDate.split("T")[0] : "",
            });
            // setLineItems(lineItems);
            // dataGridRef.current.reset(lineItems);
          }
        }
      };
      fetchTxn();
    }
  }, [id]);

  const tabs = [
    { id: "vehicle", label: "Vehicle & Parties" },
    { id: "purchase", label: "Purchase & Payments" },
    { id: "lc", label: "LC, Import & Costs" },
  ];

  const handleSubmit = async (values, { resetForm }) => {
    console.log("Form Values:", values);
    if(id)
{
   MessageBoxService.show({
        message: "not available",
        type: "success",
        onClose: () => navigate("/vehicale-confirmation"),
      });
      return;
}
    // const sanitizedLineItems = sanitizeAmountFields(lineItems, lineItemColumns);
    const param = { 
      header: { ...values , id: parseInt(id ? id : 0)}, 
      // lineItems: sanitizedLineItems,
      isUpdate:id ? true : false
    };
    const response = await ApiService.create({ ...param });

    if (response.success) {
      MessageBoxService.show({
        message: "Vehicle Confirmation saved successfully!",
        type: "success",
        onClose: () => navigate("/vehicale-confirmation"),
      });
      resetForm();
      // dataGridRef.current.reset();
      // setLineItems([]);
    }
  };

  const formik = useFormikBuilder(fields, handleSubmit);

  return (
    <form onSubmit={formik.handleSubmit} className="p-3">
      {/* <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}> */}
        {/* {activeTab === "vehicle" && ( */}
          <>
           <span className="tab-label">Vehicle Details</span>
                   <div className="row   g-0"> <hr /></div>

          <div className="row">
<div className="col-sm-9">  <div className="row">
  <InputField className="col-md-4 col-sm-6" {...fields.vehicleMake} formik={formik} />
            <InputField className="col-md-4 col-sm-6" {...fields.vehicleModel} formik={formik} />
            <InputField className="col-md-4 col-sm-6" {...fields.grade} formik={formik} />
            <InputField className="col-md-4 col-sm-6" {...fields.year} formik={formik} />
            <InputField className="col-md-4 col-sm-6" {...fields.colour} formik={formik} />
           
            <InputField className="col-md-4 col-sm-6" {...fields.millage} formik={formik} />
             <InputField className="col-md-4 col-sm-6" {...fields.engineCapacity} formik={formik} />
                 <InputField className="col-md-4 col-sm-6" {...fields.fuelType} formik={formik} />
                  <InputField className="col-md-4 col-sm-6" {...fields.transmission} formik={formik} />
                    <InputField className="col-md-4 col-sm-6" {...fields.chassisNo} formik={formik} />
            </div>
            </div>
<div className="col-sm-3"> <ImageInputField {...fields.image} formik={formik} /></div>
                  
            
            
               
          
            </div>
             <div className="row">
               {/* <SelectedBusinessPartnerBox className="col-md-6 col-sm-12" field={fields.customer} formik={formik} />
             */}
 
            <InputField className="col-sm-12" {...fields.description} formik={formik} /></div>
               <div className="row   p-2"> </div>
       <span className="tab-label">Purchase Details</span>
                   <div className="row   g-0"> <hr /></div>

 <div className="row ">
 
            <InputField className="col-md-2 col-sm-6" {...fields.purchaseDate} formik={formik} />
                   <InputField className="col-md-3 col-sm-6" {...fields.auctionPrice} formik={formik} />
            <InputField className="col-md-3 col-sm-6" {...fields.cifYen} formik={formik} />
              <InputField className="col-md-2 col-sm-6" {...fields.tax} formik={formik} />
            <InputField className="col-md-2 col-sm-6" {...fields.freight} formik={formik} />
           </div>     <div className="row ">
     
          
       </div>     <div className="row ">
           <InputField className="col-md-2 col-sm-6" {...fields.paymentDate} formik={formik} />
            <InputField className="col-md-3 col-sm-6" {...fields.paymentAmount} formik={formik} />
            <InputField className="col-md-3 col-sm-6" {...fields.paymentRate} formik={formik} />
            <InputField className="col-md-4 col-sm-6" {...fields.paymentAmountYen} formik={formik} />
         
            </div>     <div className="row ">
              <SelectedBusinessPartnerBox className="col-md-6 col-sm-12" field={fields.supplier} formik={formik} /> 
               <InputField className="col-md-6 col-sm-12" {...fields.paymentDetails} formik={formik} />
          </div>
         <div className="row   p-2"> </div>
           <span className="tab-label">L.C.</span>
                   <div className="row   g-0"> <hr /></div>
                 

      <div className="row">
            <InputField className="col-sm-6" {...fields.lcOpenDetailsBank} formik={formik} />
            <InputField className="col-md-3 col-sm-6" {...fields.JPY} formik={formik} />
            <InputField className="col-md-3 col-sm-6" {...fields.lcOpenDetailsDate} formik={formik} />
            <InputField className="col-md-3 col-sm-6" {...fields.lcMarginAmount} formik={formik} />
            <InputField className="col-md-3 col-sm-6" {...fields.lcMarginDate} formik={formik} />
             </div> <div className="row">
            <InputField className="col-md-3 col-sm-6" {...fields.lcSettlementAmount} formik={formik} />
            <InputField className="col-md-3 col-sm-6" {...fields.lcSettlementCharges} formik={formik} />
            <InputField className="col-md-3 col-sm-6" {...fields.lcSettlementDate} formik={formik} />
             </div> 
            <div className="row   p-2"> </div>
           <span className="tab-label">Clearance</span>
                   <div className="row   g-0"> <hr /></div>
                   <div className="row">
            <InputField className="col-md-3 col-sm-6" {...fields.dutyAmount} formik={formik} />
            <InputField className="col-md-3 col-sm-6" {...fields.dutyDate} formik={formik} />
            <InputField className="col-md-3 col-sm-6" {...fields.clearingCharges} formik={formik} />
            <InputField className="col-md-3 col-sm-6" {...fields.clearingDate} formik={formik} />
            <InputField className="col-md-3 col-sm-6" {...fields.salesTax} formik={formik} />
            <InputField className="col-md-3 col-sm-6" {...fields.transportCost} formik={formik} />
            <InputField className="col-md-3 col-sm-6" {...fields.totalCost} formik={formik} />
        </div>
         </>
        {/* )} */}

        {activeTab === "purchase" && (
          <>
         
          </>
        )}

        {activeTab === "lc" && (<>
     
          </>
        )}
      {/* </Tabs> */}

      <button type="submit" className="btn btn-primary mt-3">Save</button>
    </form>
  );
};

export default AddConfirmation;