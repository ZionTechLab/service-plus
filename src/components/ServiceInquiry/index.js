import * as Yup from "yup";
import InputField from "../../helpers/InputField";
import {useFormikBuilder} from "../../helpers/formikBuilder";

const inquiryTypes =

[
  {key:1,value: "quotation"},
  {key:2,value: "technical_support"},
  {key:3,value: "complain"},
  {key:4,value: "repair"},
  {key:5,value: "new_order"},
];

// const priorities = {
//   LOW: "low",
//   MEDIUM: "medium",
//   HIGH: "high",
// };

const priorities =[
  {key:1,value:"low"},
    {key:2,value:"medium"},
      {key:3,value:"high"}

]



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
    dataBinding: {data:inquiryTypes,keyField:'key',valueField:'value'},//Object.values(inquiryTypes),
    initialValue: inquiryTypes.QUOTATION,
    validation: Yup.string(), // optional validation
  },
  priority: {
    name: "priority",
    type: "select", // assuming dropdown
    placeholder: "Priority",
      dataBinding: {data:priorities,keyField:'key',valueField:'value'},// options: Object.values(priorities),
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
    <div className="container">
      <div className="my-3 p-3 bg-body rounded shadow-sm">
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
      <div class="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle"> <button class="btn btn-bd-primary py-2 dropdown-toggle d-flex align-items-center" id="bd-theme" type="button" aria-expanded="false" data-bs-toggle="dropdown" aria-label="Toggle theme (dark)"> <svg class="bi my-1 theme-icon-active" aria-hidden="true"><use href="#moon-stars-fill"></use></svg> <span class="visually-hidden" id="bd-theme-text">Toggle theme</span> </button> <ul class="dropdown-menu dropdown-menu-end shadow" aria-labelledby="bd-theme-text" > <li> <button type="button" class="dropdown-item d-flex align-items-center" data-bs-theme-value="light" aria-pressed="false"> <svg class="bi me-2 opacity-50" aria-hidden="true"><use href="#sun-fill"></use></svg>
Light
<svg class="bi ms-auto d-none" aria-hidden="true"><use href="#check2"></use></svg> </button> </li> <li> <button type="button" class="dropdown-item d-flex align-items-center active" data-bs-theme-value="dark" aria-pressed="true"> <svg class="bi me-2 opacity-50" aria-hidden="true"><use href="#moon-stars-fill"></use></svg>
Dark
<svg class="bi ms-auto d-none" aria-hidden="true"><use href="#check2"></use></svg> </button> </li> <li> <button type="button" class="dropdown-item d-flex align-items-center" data-bs-theme-value="auto" aria-pressed="false"> <svg class="bi me-2 opacity-50" aria-hidden="true"><use href="#circle-half"></use></svg>
Auto
<svg class="bi ms-auto d-none" aria-hidden="true"><use href="#check2"></use></svg> </button> </li> </ul> </div>
    </div>
  );
}

export default ServiceInquiry;