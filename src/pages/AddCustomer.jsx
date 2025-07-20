import * as Yup from 'yup';
import InputField from '../helpers/InputField';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useFormikBuilder } from '../helpers/formikBuilder';
import PartnerService from '../components/AddCustomer/PartnerService';

const fields = {
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
  phone: {
    name: "phone",
    type: "text",
    placeholder: "Phone",
    initialValue: "",
    validation: Yup.string().required("Phone number is required"),
  },


  isCustomer: {
    name: "isCustomer",
    type: "checkbox",
    initialValue: false,
    validation: Yup.boolean(),
    placeholder: "Customer",
  },
  isSupplier: {
    name: "isSupplier",
    type: "checkbox",
    initialValue: false,
    validation: Yup.boolean(),
    placeholder: "Supplier",
  },
  isEmployee: {
    name: "isEmployee",
    type: "checkbox",
    initialValue: false,
    validation: Yup.boolean(),
    placeholder: "Employee",
  },

  active: {
    name: "active",
    type: "checkbox",
    initialValue: true,
    validation: Yup.boolean(),
    placeholder: "Active",
  },
};

function AddCustomer() {
  const { id } = useParams();
  const [showPopup, setShowPopup] = useState(false);

  const handleInquirySubmit = async (values, { resetForm }) => {
    await PartnerService.createPartner(values);

    resetForm();
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  const formik = useFormikBuilder(fields, handleInquirySubmit);

  useEffect(() => {
    if (id) {
      const inquiries = JSON.parse(localStorage.getItem("inquiries")) || [];
      const inquiry = inquiries.find((i) => i.id === parseInt(id));
      if (inquiry) {
        formik.setValues(inquiry);
      }
    }
  }, [id, formik]);
 
  // useEffect(() => {
  //   if (id) {
  //     const inquiries = JSON.parse(localStorage.getItem("inquiries")) || [];
  //     const inquiry = inquiries.find((i) => i.id === parseInt(id));
  //     if (inquiry) {
  //       formik.setValues(inquiry);
  //     }
  //   }
  // }, [id, formik]);

  return (
    <div className="container">
      {/* <div className="py-5 text-center">
        <h1 className="h2">Business Partner Master</h1>
      </div> */}

      {showPopup && (
        <div className="alert alert-success" role="alert">
          Service inquiry saved successfully!
        </div>
      )}

      <div className="row g-5">
        <div className="col-md-12 col-lg-12">
          <form onSubmit={formik.handleSubmit} noValidate>
            <div className="row g-3">
              <InputField
                className="col-sm-12"
                {...fields.partnerCode}
                formik={formik}
              />
              <InputField
                className="col-sm-6"
                {...fields.partnerName}
                formik={formik}
              />
              <InputField
                className="col-sm-6"
                {...fields.contactPerson}
                formik={formik}
              />
              <InputField
                className="col-sm-12"
                {...fields.email}
                formik={formik}
              />
              <InputField
                className="col-sm-12"
                {...fields.address}
                formik={formik}
              />
              <InputField
                className="col-sm-6"
                {...fields.phone}
                formik={formik}
              />
              <InputField
                className="col-sm-2"
                {...fields.isCustomer}
                formik={formik}
              />
              <InputField
                className="col-sm-2"
                {...fields.isSupplier}
                formik={formik}
              />
              <InputField
                className="col-sm-2"
                {...fields.isEmployee}
                formik={formik}
              />
              <InputField
                className="col-sm-6"
                {...fields.active}
                formik={formik}
              />
              <button className="w-100 btn btn-primary btn-lg" type="submit">
           
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCustomer;