// import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "../InputField";
import {useFormikBuilder} from "../../helpers/formikBuilder";
const inquiryTypes = {
  QUOTATION: "quotation",
  TECHNICAL_SUPPORT: "technical_support",
  COMPLAIN: "complain",
  REPAIR: "repair",
  NEW_ORDER: "new_order",
};

const priorities = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
};

const fields = {
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
  phone: {
    name: "phone",
    type: "text",
    placeholder: "Phone",
    initialValue: "",
    validation: Yup.string().required("Phone number is required"),
  },
  serviceType: {
    name: "serviceType",
    type: "select", // assuming it's a dropdown
    placeholder: "Service Type",
    options: Object.values(inquiryTypes),
    initialValue: inquiryTypes.QUOTATION,
    validation: Yup.string(), // optional validation
  },
  priority: {
    name: "priority",
    type: "select", // assuming dropdown
    placeholder: "Priority",
    options: Object.values(priorities),
    initialValue: priorities.MEDIUM,
    validation: Yup.string(), // optional
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


function ServiceInquiry() {

 const handleInquirySubmit = (values, { resetForm }) => {
  const inquiries = JSON.parse(localStorage.getItem("inquiries")) || [];

  const newInquiry = {
    ...values,
    id: new Date().getTime(),
    status: "new",
    log: [{ status: "new", timestamp: new Date() }],
  };

  inquiries.push(newInquiry);
  localStorage.setItem("inquiries", JSON.stringify(inquiries));
  resetForm();
};

  const formik = useFormikBuilder(fields, handleInquirySubmit);
  
  return (
    <div className="ServiceInquiry">
      <div className="container">
        <h1>Service Inquiry</h1>
        <form onSubmit={formik.handleSubmit} noValidate>
          <InputField {...fields.firstName} formik={formik} />
          <InputField {...fields.lastName} formik={formik} />
          <InputField {...fields.email} formik={formik} />
          <InputField {...fields.phone} formik={formik} />
          <InputField {...fields.serviceType} formik={formik} />
          <InputField {...fields.priority} formik={formik} />
          <InputField {...fields.subject}  formik={formik}          />
          <InputField {...fields.message} formik={formik}          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ServiceInquiry;