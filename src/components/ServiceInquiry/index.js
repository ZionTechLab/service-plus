import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import InputField from "../../helpers/InputField";
import { useFormikBuilder } from "../../helpers/formikBuilder";

const inquiryTypes = [
  { key: 1, value: "quotation" },
  { key: 2, value: "technical_support" },
  { key: 3, value: "complain" },
  { key: 4, value: "repair" },
  { key: 5, value: "new_order" },
];

const priorities = [
  { key: 1, value: "low" },
  { key: 2, value: "medium" },
  { key: 3, value: "high" },
];

const fields = {
  customer: {
    name: "customer",
    type: "text",
    placeholder: "Customer",
    initialValue: "",
    validation: Yup.string().required("Customer is required"),
  },
  firstName: {
    name: "firstName",
    type: "text",
    placeholder: "First Name",
    initialValue: "",
    validation: Yup.string().required("First Name is required"),
  },
  lastName: {
    name: "lastName",
    type: "text",
    placeholder: "Last Name",
    initialValue: "",
    validation: Yup.string().required("Last Name is required"),
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
  serviceType: {
    name: "serviceType",
    type: "select",
    placeholder: "Service Type",
    dataBinding: { data: inquiryTypes, keyField: "key", valueField: "value" },
    initialValue: inquiryTypes[0].value,
    validation: Yup.string(),
  },
  priority: {
    name: "priority",
    type: "select",
    placeholder: "Priority",
    dataBinding: { data: priorities, keyField: "key", valueField: "value" },
    initialValue: priorities[1].value,
    validation: Yup.string(),
  },
  subject: {
    name: "subject",
    type: "text",
    placeholder: "Subject",
    initialValue: "",
    validation: Yup.string().required("Subject is required"),
  },
  message: {
    name: "message",
    type: "textarea",
    placeholder: "Message",
    initialValue: "",
    validation: Yup.string().required("Message is required"),
  },
};

const getNextId = (inquiries) => {
  if (inquiries.length === 0) return 1;
  const maxId = Math.max(...inquiries.map((i) => i.id));
  return Number.isNaN(maxId) ? 1 : maxId + 1;
};

function ServiceInquiry() {
  const { id } = useParams();

  const handleInquirySubmit = (values, { resetForm }) => {
    const inquiries = JSON.parse(localStorage.getItem("inquiries")) || [];

    if (id) {
      const updatedInquiries = inquiries.map((inquiry) =>
        inquiry.id === parseInt(id) ? { ...inquiry, ...values } : inquiry
      );
      localStorage.setItem("inquiries", JSON.stringify(updatedInquiries));
    } else {
      const newInquiry = {
        id: getNextId(inquiries),
        ...values,
        status: "new",
        log: [{ status: "new", timestamp: new Date() }],
      };

      inquiries.push(newInquiry);
      localStorage.setItem("inquiries", JSON.stringify(inquiries));
    }

     resetForm();
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
  }, [id]);

  return (
    <div className="container">
      <div className="py-5 text-center">
        <h1 className="h2">Checkout form</h1>
      </div>

      <div className="row g-5">
        <div className="col-md-12 col-lg-12">
          <h4 className="mb-3">Billing address</h4>

          <form onSubmit={formik.handleSubmit} noValidate>
            <div className="row g-3">
              <InputField className="col-sm-12" {...fields.customer} formik={formik} />
              <InputField className="col-sm-6" {...fields.firstName} formik={formik} />
              <InputField className="col-sm-6" {...fields.lastName} formik={formik} />
              <InputField className="col-sm-12" {...fields.email} formik={formik} />
              <InputField className="col-sm-12" {...fields.address} formik={formik} />
              <InputField {...fields.phone} formik={formik} />
              <InputField className="col-sm-6" {...fields.serviceType} formik={formik} />
              <InputField className="col-sm-6" {...fields.priority} formik={formik} />
              <InputField {...fields.subject} formik={formik} />
              <InputField {...fields.message} formik={formik} />

              <button className="w-100 btn btn-primary btn-lg" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ServiceInquiry;
