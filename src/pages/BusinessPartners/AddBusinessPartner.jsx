import {  useEffect } from "react";
import * as Yup from "yup";
import InputField from "../../helpers/InputField";
import { useParams,useNavigate } from "react-router-dom";
import { useFormikBuilder } from "../../helpers/formikBuilder";
import ApiService from "./PartnerService";
import MessageBoxService from "../../services/MessageBoxService";
import transformDateFields from "../../helpers/transformDateFields";

const fields = {
  id: {
    name: "id",
    type: "text",
    placeholder: "ID",
    initialValue: "<New>",
    disabled: true,
    // validation: Yup.string().required("ID is required"),
  },
  partnerCode: {
    name: "partnerCode",
    type: "text",
    placeholder: "Partner Code",
    initialValue: "",
    validation: Yup.string().required("Partner Code is required"),
  },
  partnerName: {
    name: "partnerName",
    type: "text",
    placeholder: "Partner Name",
    initialValue: "",
    validation: Yup.string().required("Partner Name is required"),
  },
  contactPerson: {
    name: "contactPerson",
    type: "text",
    placeholder: "Contact Person",
    initialValue: "",
    validation: Yup.string().required("Contact Person is required"),
  },
  email: {
    name: "email",
    type: "email",
    placeholder: "Email",
    initialValue: "",
    validation: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  },
  address: {
    name: "address",
    type: "text",
    placeholder: "Address",
    initialValue: "",
    validation: Yup.string().required("Address is required"),
  },
  phone1: {
    name: "phone1",
    type: "phone",
    placeholder: "Phone 1",
    initialValue: "",
    validation: Yup.string().required("Phone number is required"),
  },
  phone2: {
    name: "phone2",
    type: "phone",
    placeholder: "Phone 2",
    initialValue: "",
    validation: Yup.string().required("Phone number is required"),
  },

  isCustomer: {
    name: "isCustomer",
    type: "switch",
    initialValue: false,
    validation: Yup.boolean(),
    placeholder: "Customer",
  },
  isSupplier: {
    name: "isSupplier",
    type: "switch",
    initialValue: false,
    validation: Yup.boolean(),
    placeholder: "Supplier",
  },
  isDriver: {
    name: "isDriver",
    type: "switch",
    initialValue: false,
    validation: Yup.boolean(),
    placeholder: "Driver",
  },
  isHelper: {
    name: "isHelper",
    type: "switch",
    initialValue: false,
    validation: Yup.boolean(),
    placeholder: "Helper",
  },
  active: {
    name: "active",
    type: "switch",
    initialValue: true,
    validation: Yup.boolean(),
    placeholder: "Active",
  },
};

function AddBusinessPartner() {
  const { id } = useParams();
  const navigate = useNavigate();
  // const [uiData, setUiData] = useState({loading: false, success: false, error: '', data: {} });

  useEffect(() => {
    if (id) {
      const fetchTxn = async () => {
        const response = await ApiService.get(id);

        if (response.success) {
          if (response.data) { 
              console.log(response.data);
              const {partnerType,...rest } = response.data;

              const normalized = transformDateFields(rest, fields);
            formik.setValues({ ...normalized });

            if (partnerType) {
              const partnerTypes = partnerType;
              console.log("Partner Types:", partnerTypes);
              formik.setFieldValue("isCustomer", partnerTypes.includes("C"));
              formik.setFieldValue("isSupplier", partnerTypes.includes("S"));
              formik.setFieldValue("isDriver", partnerTypes.includes("D"));
              formik.setFieldValue("isHelper", partnerTypes.includes("H"));
            }

         
          }
        }
      };
      fetchTxn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (values, { resetForm }) => {



 const { isCustomer, isSupplier, isDriver, isHelper, ...rest } = values;

 const param = { 
      header: { ...rest , id: parseInt(id ? id : 0)}, 
      detail: [
        isCustomer ? { type: 'C' } : null,
        isSupplier ? { type: 'S' } : null,
        isDriver ? { type: 'D' } : null,
        isHelper ? { type: 'H' } : null,
      ].filter(Boolean),
      isUpdate:id ? true : false
    };
    console.log( param);
    const response=await ApiService.update({ ...param });
console.log("Response from API:", response);

    // const param = id ? { ...values, id: parseInt(id) } : { ...values, id: parseInt(0) };
    // const response = await ApiService.createPartner({...param});
    if (response.success) {
      MessageBoxService.show({
        message: "Business Partner saved successfully!",
        type: "success",
        onClose: () => navigate( "/business-partner"),
      });
      resetForm();
      // dataGridRef.current.reset();
      // setLineItems([]);
    }
 
  };

  const formik = useFormikBuilder(fields, handleSubmit);



  return (
    <div className="">
      <div className="container p-3">
          <form onSubmit={formik.handleSubmit} >
            <div className="card mb-3">

            <div className="card-body">
            <div className="row g-2">
              <InputField className="col-md-3 col-sm-6" {...fields.id} formik={formik} />
              <InputField className="col-md-3 col-sm-6" {...fields.partnerCode} formik={formik} />
              <InputField className="col-sm-6" {...fields.partnerName} formik={formik} />
              <InputField className="col-sm-6" {...fields.contactPerson} formik={formik} />
              </div> <div className="row g-2">
              <InputField className="col-md-6 col-sm-12" {...fields.email} formik={formik} />
                 <InputField className="col-sm-3" {...fields.phone1} formik={formik} />
              <InputField className="col-sm-3" {...fields.phone2} formik={formik} />
              <InputField className="col-sm-12" {...fields.address} formik={formik} />
           
              <div className="col-sm-6 row g-2">
                <InputField className="col-3" {...fields.isCustomer} formik={formik} />
                <InputField className="col-3" {...fields.isSupplier} formik={formik} />
                <InputField className="col-3" {...fields.isDriver} formik={formik} />
                 <InputField className="col-3" {...fields.isHelper} formik={formik} />
              </div>
              <InputField className="col-sm-6" {...fields.active} formik={formik} />
                  <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </div>
            </div></div></div>
          </form>
        </div>
      </div>
    // </div>
  );
}

export default AddBusinessPartner;