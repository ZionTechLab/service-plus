import {  useState,useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import * as Yup from "yup";
import InputField from "../../helpers/InputField";
import { useFormikBuilder } from "../../helpers/formikBuilder";
import MessageBoxService from "../../services/MessageBoxService";
import ApiService from "./ConfirmationService";
import SelectedBusinessPartnerBox from "../BusinessPartners/select-bp";
// Multi-image selection is wired through InputField type "images"
import config from '../../config/config';
import transformDateFields from "../../helpers/transformDateFields";
const AddConfirmation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [uiData, setUiData] = useState({loading: false, success: false, error: '', data: {} });
  const [uiDataFiltered, setuiDataFiltered] = useState( {Make:  [],Model:  [],Grade:  [],Colour:  []} );
  const [isUpdate, setIsUpdate] = useState(false);

const fields = {
    id: {
      name: "id",
      type: "text",
      placeholder: "ID",
      initialValue: "<Auto>",
      disabled: true,
    },
    make: {
      name: "make",
      type: "select",
      placeholder: "Make",
      dataBinding: {
        data:uiDataFiltered.Make,
        keyField: "id",
        valueField: "value",
      },
      validation: Yup.number().required("Type of Vehicle is required"),
    },
    model: {
      name: "model",
      type: "select",
      placeholder: "Model",
      dataBinding: {
        data:uiDataFiltered.Model,
        keyField: "id",
        valueField: "value",
      },
       validation: Yup.number().required("Type of Vehicle is required"),
    },
    grade: {
      name: "grade",
      type: "select",
      placeholder: "Grade",
      dataBinding: {
        data:uiDataFiltered.Grade,
        keyField: "id",
        valueField: "value",
      },
       validation: Yup.number().required("Grade of Vehicle is required"),
    },
    colour: {
      name: "colour",
      type: "select",
      placeholder: "Colour",
      dataBinding: {
        data:uiDataFiltered.Colour,
        keyField: "id",
        valueField: "value",
      },
       validation: Yup.number().required("Colour of Vehicle is required"),
    },
    year: {
      name: "year",
      type: "number",
      placeholder: "Year",
      initialValue: 2024,
      validation: Yup.number().required("Year is required"),
    },
    millage: {
      name: "millage",
      type: "number",
      placeholder: "Millage",
      initialValue: 0,
      validation: Yup.number().required("Millage is required"),
    },
    engineCapacity: {
      name: "engineCapacity",
      type: "number",
      placeholder: "Engine Capacity",
      initialValue: 0,
      // validation: Yup.number().required("Engine Capacity is required"),
    },
    fuelType: {
      name: "fuelType",
      type: "select",
      placeholder: "Fuel Type",
      dataBinding: {
        data:uiDataFiltered.FuelType,
        keyField: "id",
        valueField: "value",
      },
       validation: Yup.number().required("Fuel Type of Vehicle is required"),
    },
    transmission: {
      name: "transmission",
      type: "select",
      placeholder: "Transmission",
      dataBinding: {
        data:uiDataFiltered.Transmission,
        keyField: "id",
        valueField: "value",
      },
       validation: Yup.number().required("Transmission of Vehicle is required"),
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
      initialValue: 0,
      validation: Yup.number().required("Supplier is required"),
        isOpen: false,
    },
  // customer: {
  //   name: "customer",
  //   type: "partner-select",
  //   placeholder: "Customer",
  //   initialValue: "",
  //   // validation: Yup.string().required("Customer is required"),
  //     isOpen: false,
  // },
    purchaseDate: {
      name: "purchaseDate",
      type: "date",
      placeholder: "Purchase Date",
      initialValue: new Date().toISOString().split("T")[0],
      // validation: Yup.string().required("Purchase Date is required"),
    },
    cifYen: {
      name: "cifYen",
      type: "number",
      placeholder: "CIF YEN",
      initialValue: 0,
      // validation: Yup.number().required("CIF YEN is required"),
    },
    auctionPrice: {
      name: "auctionPrice",
      type: "number",
      placeholder: "Auction Price",
      initialValue: 0,
      // validation: Yup.number().required("Auction Price is required"),
    },
    tax: {
      name: "tax",
      type: "number",
      placeholder: "TAX",
      initialValue: 0,
      // validation: Yup.number().required("TAX is required"),
    },
    freight: {
      name: "freight",
      type: "number",
      placeholder: "Freight",
      initialValue: 0,
      // validation: Yup.number().required("Freight is required"),
    },
    paymentDate: {
      name: "paymentDate",
      type: "date",
      placeholder: "Payment Date",
      initialValue: new Date().toISOString().split("T")[0],
      // validation: Yup.string().required("Payment Date is required"),
    },
    paymentAmount: {
      name: "paymentAmount",
      type: "number",
      placeholder: "Payment Amount",
      initialValue: 0,
      // validation: Yup.number().required("Payment Amount is required"),
    },
    paymentRate: {
      name: "paymentRate",
      type: "number",
      placeholder: "Payment Rate",
      initialValue: 0,
      // validation: Yup.number().required("Payment Rate is required"),
    },
    paymentAmountYen: {
      name: "paymentAmountYen",
      type: "number",
      placeholder: "Payment Amount (YEN)",
      initialValue: 0,
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
      initialValue: 0,
      // validation: Yup.string().required("L.C Open Details (Bank) is required"),
    },
    JPY: {
      name: "JPY",
      type: "number",
      placeholder: "JPY",
      initialValue: 0,
      // validation: Yup.number().required("JPY is required"),
    },
    lcOpenDetailsDate: {
      name: "lcOpenDetailsDate",
      type: "date",
      placeholder: "L.C Open Date",
      initialValue: new Date().toISOString().split("T")[0],
      // validation: Yup.date().required("L.C Open Date is required"),
    },
    lcMarginAmount: {
      name: "lcMarginAmount",
      type: "number",
      placeholder: "L.C Margin Amount",
      initialValue: 0,
      // validation: Yup.number().required("L.C Margin Amount is required"),
    },
    lcMarginDate: {
      name: "lcMarginDate",
      type: "date",
      placeholder: "L.C Margin Date",
      initialValue: new Date().toISOString().split("T")[0],
      // validation: Yup.date().required("L.C Margin Date is required"),
    },
    lcSettlementAmount: {
      name: "lcSettlementAmount",
      type: "number",
      placeholder: "L.C Settlement Amount",
      initialValue: 0,
      validation: Yup.number().required("L.C Settlement Amount is required"),
    },
    lcSettlementCharges: {
      name: "lcSettlementCharges",
      type: "number",
      placeholder: "L.C Settlement Charges",
      initialValue: 0,
      validation: Yup.number().required("L.C Settlement Charges is required"),
    },
    lcSettlementDate: {
      name: "lcSettlementDate",
      type: "date",
      placeholder: "L.C Settlement Date",
      initialValue: new Date().toISOString().split("T")[0],
      // validation: Yup.date().required("L.C Settlement Date is required"),
    },
    dutyAmount: {
      name: "dutyAmount",
      type: "number",
      placeholder: "Duty Amount",
      initialValue: 0,
      validation: Yup.number().required("Duty Amount is required"),
    },
    dutyDate: {
      name: "dutyDate",
      type: "date",
      placeholder: "Duty Date",
      initialValue: new Date().toISOString().split("T")[0],
      // validation: Yup.date().required("Duty Date is required"),
    },
    clearingCharges: {
      name: "clearingCharges",
      type: "number",
      placeholder: "Clearing Charges",
      initialValue: 0,
      validation: Yup.number().required("Clearing Charges is required"),
    },
    clearingDate: {
      name: "clearingDate",
      type: "date",
      placeholder: "Clearing Date",
      initialValue: new Date().toISOString().split("T")[0],
      // validation: Yup.date().required("Clearing Date is required"),
    },
    salesTax: {
      name: "salesTax",
      type: "number",
      placeholder: "Sales Tax",
      initialValue: 0,
      validation: Yup.number().required("Sales Tax is required"),
    },
    transportCost: {
      name: "transportCost",
      type: "number",
      placeholder: "Transport Cost",
      initialValue: 0,
      validation: Yup.number().required("Transport Cost is required"),
    },
    totalCost: {
      name: "totalCost",
      type: "number",
      placeholder: "Total Cost",
      initialValue: 0,
      validation: Yup.number().required("Total Cost is required"),
    },
    description: {
      name: "description",
      type: "textarea",
      placeholder: "Description",
      initialValue: "",
      // validation: Yup.string().required("Description is required"),
    },  
    images: {
      name: "images",
      type: "images",
      placeholder: "",
      initialValue: [],
      // validation: Yup.array().of(Yup.mixed()),
    },
};

  useEffect(() => {
    const fetchUi = async () => {
      setUiData(prev => ({ ...prev, loading: true, error: '', data: {} }));
      const data = await ApiService.getUi();
      console.log("Fetched UI Data:", data);
      setUiData(prev => ({ ...prev, ...data , loading: false }));
      setuiDataFiltered(prev => ({ ...prev,  Make: data.data.Make || [],Colour: data.data.Colour || [], FuelType: data.data.FuelType || [], Transmission: data.data.Transmission || [] }));
    };
    fetchUi();

    if (id) {
      setIsUpdate(true);
      const fetchTxn = async () => {
        const response = await ApiService.get(id);
        if (response.success && response.data) {
          const data = { ...response.data };

          // Normalize to an array of File objects for the UI
          const toFile = async (imgNameOrUrl) => {
            try {
              const url = imgNameOrUrl.includes('http')
                ? imgNameOrUrl
                : config.apiBaseUrl.replace('/api','') + 'uploads/' + imgNameOrUrl;
              const res = await fetch(url);
              const blob = await res.blob();
              const filename = (url.split('/').pop() || 'image').split('?')[0];
              return new File([blob], filename, { type: blob.type || 'image/jpeg' });
            } catch (e) {
              console.error('image fetch failed', e);
              return null;
            }
          };

          let imageFiles = [];
          if (Array.isArray(data.images)) {
            const results = await Promise.all(data.images.map(toFile));
            imageFiles = results.filter(Boolean);
          } else if (typeof data.image === 'string' && data.image) {
            const f = await toFile(data.image);
            if (f) imageFiles = [f];
          }
  const normalized = transformDateFields(data, fields);
           
          formik.setValues({
            ...normalized,
            images: imageFiles,
          });
        }
      };
      fetchTxn();
    }
     // eslint-disable-next-line
  }, [id]);

  const handleSubmit = async (values, { resetForm }) => {

    const param = { 
      header: { ...values , id: parseInt(id ? id : 0)}, 
      isUpdate:id ? true : false
    };
     console.log("Form Values:", values);
    const response = await ApiService.update({ ...param });
    console.log("Update Confirmation response:", response);

    if (response.success) {
      MessageBoxService.show({
        message: "Invoice saved successfully!",
        type: "success",
        onClose: () => navigate("/vehicale-confirmation"),
      });
      resetForm();

    }
//  const v={ ...values , id: parseInt(id ? id : 0),isUpdate:id ? true : false }
// console.log(v)

// console.log("Form Data:", formData);
    // Backward compatibility: send first image also as single 'image'
    // if (Array.isArray(v.images) && v.images.length > 0) {
    //   const first = v.images[0];
    //   if (first instanceof File) formData.append('image', first, first.name);
    // }
    // const response = await ApiService.create(formData);

    // if (response && response.success) {
    //   MessageBoxService.show({
    //     message: "Vehicle Confirmation saved successfully!",
    //     type: "success",
    //     onClose: () => navigate("/vehicale-confirmation"),
    //   });
    //   resetForm();
    //   return;
    // }

    // show error if save failed
    // MessageBoxService.show({
    //   message: response?.error || "Failed to save Vehicle Confirmation.",
    //   type: "danger",
    // });
  };


  const formik = useFormikBuilder(fields, handleSubmit);

  useEffect(() => {
    const filteredModels = (uiData.data.Model || []).filter(
        // eslint-disable-next-line
      m => m.parentId == formik.values.make
    );
    setuiDataFiltered(prev => ({ ...prev, Model: filteredModels ,Grade:[]}));
      filterGrade();
        // eslint-disable-next-line
}, [formik.values.make]);

  useEffect(() => {
      const filteredData = (uiData.data.Grade || []).filter(
          // eslint-disable-next-line
      m => m.parentId == formik.values.model
    );
    setuiDataFiltered(prev => ({ ...prev, Grade: filteredData }));
  // eslint-disable-next-line
  }, [formik.values.model]);

const filterGrade = () => {

}

  return (
    <form onSubmit={formik.handleSubmit} className="p-3">
      <div className="row">
        {isUpdate?(
        <div className="col-sm-6">
          <div className="card mb-3">
            <div className="card-header">Vehicle Photos</div>
            <div className="card-body">
              <div className="row">
                <InputField className="col-12 mb-2" {...fields.images} formik={formik} />
              </div>
            </div>
          </div>
        </div>):null}

        <div className="col-sm-6">
          <div className="card mb-3">
            <div className="card-header">Vehicle Details</div>
            <div className="card-body">
              <div className="row">
                <InputField className="col-md-3 col-sm-6 col-6" {...fields.make} formik={formik} />
                <InputField className="col-md-3 col-sm-6 col-6" {...fields.model} formik={formik} />
                <InputField className="col-md-3 col-sm-6 col-6" {...fields.grade} formik={formik} />
                <InputField className="col-md-3 col-sm-6 col-6" {...fields.colour} formik={formik} />
                <InputField className="col-md-3 col-sm-6 col-6" {...fields.fuelType} formik={formik} />
                
                <InputField className="col-md-3 col-sm-6 col-6" {...fields.transmission} formik={formik} />
                <InputField className="col-md-3 col-sm-6 col-6" {...fields.year} formik={formik} />
                <InputField className="col-md-3 col-sm-6 col-6" {...fields.millage} formik={formik} />
                <InputField className="col-md-3 col-sm-6 col-6" {...fields.engineCapacity} formik={formik} />

                <InputField className="col-md-9 col-sm-6 col-6" {...fields.chassisNo} formik={formik} />
              </div>
            </div>
          </div>
        </div>
      {/* </div>

      <div className="row"> */}
        <div className={isUpdate ? "col-sm-12" : "col-sm-6"}>
          <div className="card mb-3">
            <div className="card-header">Description</div>
            <div className="card-body">
              <InputField className="col-12" {...fields.description} formik={formik} />
            </div>
          </div>
        </div>
      {/* </div>

      <div className="row"> */}
        <div className="col-sm-12">
          <div className="card mb-3">
            <div className="card-header">Purchase Details</div>
            <div className="card-body">
              <div className="row">
                <InputField className="col-md-3 col-sm-6 col-6" {...fields.purchaseDate} formik={formik} />
                <InputField className="col-md-3 col-sm-6 col-6" {...fields.auctionPrice} formik={formik} />
                <InputField className="col-md-3 col-sm-6 col-6" {...fields.cifYen} formik={formik} />
                <InputField className="col-md-3 col-sm-6 col-6" {...fields.tax} formik={formik} />
                <InputField className="col-md-3 col-sm-6 col-6" {...fields.freight} formik={formik} />
              </div>

              <div className="row">
                <InputField className="col-md-3 col-sm-6 col-6" {...fields.paymentDate} formik={formik} />
                <InputField className="col-md-3 col-sm-6 col-6" {...fields.paymentAmount} formik={formik} />
                <InputField className="col-md-3 col-sm-6 col-6" {...fields.paymentRate} formik={formik} />
                <InputField className="col-md-3 col-sm-6 col-6" {...fields.paymentAmountYen} formik={formik} />
              </div>

              <div className="row">
                <SelectedBusinessPartnerBox className="col-md-6 col-sm-12 " field={fields.supplier} formik={formik} />
                <InputField className="col-md-6 col-sm-12 " {...fields.paymentDetails} formik={formik} />
              </div>
            </div>
          </div>
        </div>
      {/* </div>

      <div className="row"> */}
        <div className="col-sm-12">
          <div className="card mb-3">
            <div className="card-header">L.C.</div>
            <div className="card-body">
              <div className="row">
                <InputField className="col-md-3 col-sm-6 col-6" {...fields.lcOpenDetailsDate} formik={formik} />
                <InputField className="col-md-6 col-sm-12 col-6" {...fields.lcOpenDetailsBank} formik={formik} />
                <InputField className="col-md-3 col-sm-6 col-6" {...fields.JPY} formik={formik} />
              
                
              </div>   <div className="row">
<InputField className="col-md-3 col-sm-6 col-6" {...fields.lcMarginDate} formik={formik} /> 
                 <InputField className="col-md-3 col-sm-6 col-6" {...fields.lcMarginAmount} formik={formik} />
           
                <InputField className="col-md-3 col-sm-6 col-6" {...fields.lcSettlementAmount} formik={formik} />
                <InputField className="col-md-3 col-sm-6 col-6" {...fields.lcSettlementCharges} formik={formik} />
                <InputField className="col-md-3 col-sm-6 col-6" {...fields.lcSettlementDate} formik={formik} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card mb-3">
            <div className="card-header">Clearance</div>
            <div className="card-body">
              <div className="row"> 
                <InputField className="col-md-3 col-sm-6 col-6" {...fields.dutyDate} formik={formik} />
                <InputField className="col-md-3 col-sm-6 col-6" {...fields.dutyAmount} formik={formik} />
              </div>
              <div className="row"> 
                <InputField className="col-md-3 col-sm-6 col-6" {...fields.clearingDate} formik={formik} />
                <InputField className="col-md-3 col-sm-6 col-6" {...fields.clearingCharges} formik={formik} />
               
                <InputField className="col-md-3 col-sm-6 col-6" {...fields.salesTax} formik={formik} />
                <InputField className="col-md-3 col-sm-6 col-6" {...fields.transportCost} formik={formik} />
                <InputField className="col-md-3 col-sm-6 col-6" {...fields.totalCost} formik={formik} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </div>
    </form>
  );
};

export default AddConfirmation;