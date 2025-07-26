import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import InputField from "../../helpers/InputField";
import { useFormikBuilder } from "../../helpers/formikBuilder";
import PartnerService from "../BusinessPartners/PartnerService";
import InquiryView from "./InquiryView";
import CustomerModal from "../BusinessPartners/BusinessPartnerFind";
import AddBusinessPartner from "../BusinessPartners/AddBusinessPartner";
import useConfirm from '../../hooks/useConfirm';
import {  useNavigate } from 'react-router-dom';

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
  const [workflowState, setWorkflowState] = useState('select-customer');
  const [assigneeData, setAssigneeData] = useState([]);
  const [showCustomerModal, setShowCustomerModal] = useState(true);
  const [ConfirmationDialog, confirm] = useConfirm();
    const navigate = useNavigate();
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
 confirm(      "Inquiry saved successfully!",      { confirmText: "OK", type: "success" }
    ).then((result) => {   navigate(`/inquiry`); });
      
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
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onCustomerSelect = (customer) => {
    formik.setFieldValue("customer", customer.partnerName);
    formik.setFieldValue("firstName", customer.primary_contact);
    formik.setFieldValue("email", customer.email);
    formik.setFieldValue("phone", customer.phone);
    formik.setFieldValue("address", customer.address);
    setShowCustomerModal(false);
    setWorkflowState('add-inquiry');
  };

  const handleNewCustomer = () => {
    setShowCustomerModal(false);
    setWorkflowState('add-customer');
  };

  return (
    <div className="container">
      <ConfirmationDialog />

      {workflowState === 'select-customer' && (
        <CustomerModal
          show={showCustomerModal}
          onClose={() => setShowCustomerModal(false)}
          customers={assigneeData}
          onCustomerSelect={onCustomerSelect}
          onNewCustomer={handleNewCustomer}
        />
      )}

      {workflowState === 'add-customer' && (
        <AddBusinessPartner />
      )}

      {workflowState === 'add-inquiry' && (
        <div>
          <h4 className="mb-3">Customer</h4>
          <div className="row g-5">
            <div className="col-md-7 col-lg-8">
              <form onSubmit={formik.handleSubmit} noValidate>
                <div className="row g-3">
                  <InputField
                    className="col-sm-12"
                    {...fields.customer}
                    formik={formik}
                  />
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

            <div className="col-md-5 col-lg-4 order-md-last ">
              <InquiryView />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServiceInquiry;
