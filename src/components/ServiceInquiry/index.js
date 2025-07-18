import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import InputField from "../../helpers/InputField";
import { useFormikBuilder } from "../../helpers/formikBuilder";
import PartnerService from "../AddCustomer/PartnerService";
import InquiryView from "../InquiryView";
import DataTable from "../../helpers/DataTable";
import Overlay from "../Overlay";

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

const getNextId = (inquiries) => {
  if (inquiries.length === 0) return 1;
  const maxId = Math.max(...inquiries.map((i) => i.id));
  return Number.isNaN(maxId) ? 1 : maxId + 1;
};

function ServiceInquiry() {
  const { id } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [assigneeData, setAssigneeData] = useState([]);
  const [showCustomerModal, setShowCustomerModal] = useState(false);

  useEffect(() => {
    const fetchInquiries = async () => {
      const storedInquiries = await PartnerService.getAllPartners();
      setAssigneeData(storedInquiries);
    };
    fetchInquiries();
  }, []);

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
    assignee: {
      name: "assignee",
      type: "select",
      placeholder: "Assignee",
      dataBinding: {
        data: assigneeData,
        keyField: "id",
        valueField: "partnerName",
      },
      initialValue: assigneeData[0]?.value,
      validation: Yup.string(),
    },
    dueDate: {
      name: "dueDate",
      type: "date",
      placeholder: "Due Date",
      initialValue: "",
      validation: Yup.string().required("Due Date is required"),
    },
  };

  const handleInquirySubmit = (values, { resetForm }) => {
    console.log("Form values:", values);
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
  }, [id]);

  const customerColumns = [
    {
      field: "partnerName",
      header: "Partner Name",
    },
    {
      field: "partner_type",
      header: "Partner Type",
    },
    {
      field: "primary_contact",
      header: "Primary Contact",
    },
    {
      field: "email",
      header: "Email",
    },
    {
      field: "action",
      header: "Action",
      isAction: true,
      actionTemplate: (row) => (
        <button
          className="btn btn-primary btn-sm"
          onClick={() => onCustomerSelect(row)}
        >
          Select
        </button>
      ),
    },
  ];

  const onCustomerSelect = (customer) => {
    formik.setFieldValue("customer", customer.partnerName);
    formik.setFieldValue("firstName", customer.primary_contact);
    formik.setFieldValue("email", customer.email);
    formik.setFieldValue("phone", customer.phone);
    formik.setFieldValue("address", customer.address);
    setShowCustomerModal(false);
  };

  return (
    <div className="container">
      {/* <div className="py-5 text-center">
        <h1 className="h2">Inquiry</h1>
      </div> */}

      {showPopup && (
        <div className="alert alert-success" role="alert">
          Service inquiry saved successfully!
        </div>
      )}

      <div className="row g-5">
        <div className="col-md-7 col-lg-8">
          {/* <h4 className="mb-3">Billing address</h4> */}

          <form onSubmit={formik.handleSubmit} noValidate>
            <div className="row g-3">
              <div className="col-sm-12">
                <label htmlFor="customer" className="form-label">
                  Customer
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    {...formik.getFieldProps("customer")}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => setShowCustomerModal(true)}
                  >
                    ...
                  </button>
                </div>
              </div>
              <InputField
                className="col-sm-6"
                {...fields.firstName}
                formik={formik}
              />
              <InputField
                className="col-sm-6"
                {...fields.lastName}
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
              <InputField {...fields.phone} formik={formik} />

              <InputField {...fields.subject} formik={formik} />
              <InputField {...fields.message} formik={formik} />
              <InputField
                className="col-sm-6"
                {...fields.serviceType}
                formik={formik}
              />
              <InputField
                className="col-sm-6"
                {...fields.priority}
                formik={formik}
              />
              <InputField {...fields.assignee} formik={formik} />
              <InputField {...fields.dueDate} formik={formik} />
              <button className="w-100 btn btn-primary btn-lg" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>

        <div class="col-md-5 col-lg-4 order-md-last">
         <InquiryView />
  
        </div>
      </div>
      {showCustomerModal && (
        <div>
 
          <div
            className="modal-backdrop fade show"
            style={{ zIndex: 1040 }}
          ></div>
      <div className="modal fade show"  style={{ display: 'block', zIndex: 1050 }}
        tabIndex="-1">
          <div className="card ">
            <div className="card-header">
              <h5 className="card-title">Select Customer</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowCustomerModal(false)}
              ></button>
            </div>
            <div className="card-body">
              <DataTable
                data={assigneeData}
                columns={customerColumns}
              />
            </div>
          </div></div></div>
        // {/* </Overlay> */}
    )} 
    </div>
  );
}

export default ServiceInquiry;
