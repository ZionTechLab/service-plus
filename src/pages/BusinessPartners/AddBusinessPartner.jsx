import {  useEffect } from "react";
import * as Yup from "yup";
import InputField from "../../helpers/InputField";
import { useParams,useNavigate } from "react-router-dom";
import { useFormikBuilder } from "../../helpers/formikBuilder";
import ApiService from "./PartnerService";
import usePopupMessage from "../../components/PopupMessage";
import MessageBoxService from "../../services/MessageBoxService";
import transformDateFields from "../../helpers/transformDateFields";

const fields = {
  ID: {
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
  isEmployee: {
    name: "isEmployee",
    type: "switch",
    initialValue: false,
    validation: Yup.boolean(),
    placeholder: "Employee",
  },

  active: {
    name: "active",
    type: "switch",
    initialValue: true,
    validation: Yup.boolean(),
    placeholder: "Active",
  },
};

function AddBusinessPartner({ onCustomerCreated }) {
  const { id } = useParams();
  const navigate = useNavigate();
  // const [uiData, setUiData] = useState({loading: false, success: false, error: '', data: {} });
  const [ConfirmationDialog] = usePopupMessage();

  useEffect(() => {
    if (id) {
      const fetchTxn = async () => {
        const response = await ApiService.getPartnerById(id);
        if (response.success) {
          if (response.data) {
              const normalized = transformDateFields(response.data, fields);
            formik.setValues({ ...normalized });
          }
        }
      };
      fetchTxn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // useEffect(() => {
  //   if (id) {
  //     const fetchInquiries = async () => {
  //       const inquiries = await PartnerService.getPartnerById(id);
  //       console.log("Fetched inquiries:", inquiries);
  //       if (inquiries) {
  //         formik.setValues({
  //           ...inquiries,
  //           isCustomer: inquiries.isCustomer ? true : false,
  //           isSupplier: inquiries.isSupplier ? true : false,
  //           isEmployee: inquiries.isEmployee ? true : false,
  //           active: inquiries.active ? true : false,
  //         });
  //       }
  //     };
  //     fetchInquiries();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [id]);
  const handleSubmit = async (values, { resetForm }) => {

    const param = id ? { ...values, id: parseInt(id) } : { ...values, id: parseInt(0) };
    const response = await ApiService.createPartner({...param});
    if (response.success) {
      MessageBoxService.show({
        message: "Invoice saved successfully!",
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
      {ConfirmationDialog}
      <div className="row g-5">
        <div className="col-md-12 col-lg-12">
          <form onSubmit={formik.handleSubmit} >
            <div className="row g-2">
              <InputField className="col-md-3 col-sm-6" {...fields.ID} formik={formik} />
              <InputField className="col-md-3 col-sm-6" {...fields.partnerCode} formik={formik} />
              <InputField className="col-sm-6" {...fields.partnerName} formik={formik} />
              <InputField className="col-sm-6" {...fields.contactPerson} formik={formik} />
              </div> <div className="row g-2">
              <InputField className="col-md-6 col-sm-12" {...fields.email} formik={formik} />
                 <InputField className="col-sm-3" {...fields.phone1} formik={formik} />
              <InputField className="col-sm-3" {...fields.phone2} formik={formik} />
              <InputField className="col-sm-12" {...fields.address} formik={formik} />
           
              <div className="col-sm-6 row g-2">
                <InputField className="col-4" {...fields.isCustomer} formik={formik} />
                <InputField className="col-4" {...fields.isSupplier} formik={formik} />
                <InputField className="col-4" {...fields.isEmployee} formik={formik} />
              </div>
              <InputField className="col-sm-6" {...fields.active} formik={formik} />
                  <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </div>
              {/* <button className="w-100 btn btn-primary btn-lg" type="submit" >
                Save
              </button> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBusinessPartner;