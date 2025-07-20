import * as Yup from 'yup';
import InputField from '../../helpers/InputField';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useFormikBuilder } from '../../helpers/formikBuilder';
import PartnerService from './PartnerService';
import useConfirm from '../../hooks/useConfirm';

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

function AddBusinessPartner() {
  const { id } = useParams();
  const [ConfirmationDialog, confirm] = useConfirm();

  const handleInquirySubmit = async (values, { resetForm }) => {
    await PartnerService.createPartner(values);

    resetForm();
 confirm(
      "Business partner saved successfully!",
      { confirmText: "OK", type: "success" }
    );
  };

  const formik = useFormikBuilder(fields, handleInquirySubmit);

  useEffect(() => {
    if (id) {
      const fetchInquiries = async () => {
        const inquiries = await PartnerService.getPartnerById(id);
       if (inquiries) {
         formik.setValues(inquiries);
       }
      };
      fetchInquiries();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ id]);


  return (
    <div className="container">
      <ConfirmationDialog />
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
              <div className="col-sm-6 row g-2">
              <InputField
                className="col-4"
                {...fields.isCustomer}
                formik={formik}
              />
              <InputField
                className="col-4"
                {...fields.isSupplier}
                formik={formik}
              />
              <InputField
                className="col-4"
                {...fields.isEmployee}
                formik={formik}
              />
              </div>
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

export default AddBusinessPartner;