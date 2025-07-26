import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import InputField from "../../helpers/InputField";
import { useFormikBuilder } from "../../helpers/formikBuilder";
import PartnerService from "../BusinessPartners/PartnerService";
import InquiryView from "./InquiryView";
import AddBusinessPartner from "../BusinessPartners/AddBusinessPartner";
import useConfirm from '../../hooks/useConfirm';
import { useNavigate } from 'react-router-dom';
import Tabs from '../../components/Tabs';

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
  const [activeTab, setActiveTab] = useState('select-customer');
  const [customerOption, setCustomerOption] = useState('select'); // 'select' or 'add'
  const [assigneeData, setAssigneeData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [ConfirmationDialog, confirm] = useConfirm();
  const navigate = useNavigate();

  // Tab configuration
  const tabs = [
    {
      id: 'select-customer',
      label: 'Select Customer',
      disabled: false
    },
    {
      id: 'inquiry-details',
      label: 'Inquiry Details',
      disabled: !selectedCustomer && !id
    }
  ];
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
    formik.setFieldValue("firstName", customer.contactPerson);
    formik.setFieldValue("email", customer.email);
    formik.setFieldValue("phone", customer.phone1 || customer.phone2);
    formik.setFieldValue("address", customer.address);
    setSelectedCustomer(customer);
    setActiveTab('inquiry-details');
  };

  const handleCustomerCreated = (newCustomer) => {
    // Handle when a new customer is created from AddBusinessPartner
    formik.setFieldValue("customer", newCustomer.partnerName);
    formik.setFieldValue("firstName", newCustomer.contactPerson);
    formik.setFieldValue("email", newCustomer.email);
    formik.setFieldValue("phone", newCustomer.phone1 || newCustomer.phone2);
    formik.setFieldValue("address", newCustomer.address);
    setSelectedCustomer(newCustomer);
    setCustomerOption('select');
    setActiveTab('inquiry-details');
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'select-customer') {
      setCustomerOption('select');
    }
  };

  return (
    <div className="container">
      <ConfirmationDialog />
      
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange}>
        {activeTab === 'select-customer' && (
          <div>
            <h4 className="mb-3">Select Customer</h4>
            
            {/* Customer Option Selection */}
            <div className="mb-4">
              <div className="btn-group" role="group" aria-label="Customer options">
                <button
                  type="button"
                  className={`btn ${customerOption === 'select' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setCustomerOption('select')}
                >
                  Select Existing Customer
                </button>
                <button
                  type="button"
                  className={`btn ${customerOption === 'add' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setCustomerOption('add')}
                >
                  Add New Customer
                </button>
              </div>
            </div>

            {/* Select Customer Option */}
            {customerOption === 'select' && (
              <div>
                {!selectedCustomer && (
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title mb-0">Choose a Customer</h5>
                    </div>
                    <div className="card-body">
                      {assigneeData && assigneeData.length > 0 ? (
                        <>
                          <div className="table-responsive">
                            <table className="table table-striped table-hover">
                              <thead>
                                <tr>
                                  <th>Partner Name</th>
                                  <th>Contact Person</th>
                                  <th>Phone</th>
                                  <th>Email</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {assigneeData.map((customer) => (
                                  <tr key={customer.id}>
                                    <td>{customer.partnerName}</td>
                                    <td>{customer.contactPerson}</td>
                                    <td>{customer.phone1 || customer.phone2}</td>
                                    <td>{customer.email}</td>
                                    <td>
                                      <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => onCustomerSelect(customer)}
                                      >
                                        Select
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <div className="mt-3 text-end">
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => {
                                setSelectedCustomer(null);
                                setCustomerOption('');
                              }}
                            >
                              Return
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-muted">No customers found.</p>
                          <button 
                            className="btn btn-primary"
                            onClick={() => setCustomerOption('add')}
                          >
                            Add First Customer
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {selectedCustomer && (
                  <div className="alert alert-success">
                    <h5>Selected Customer: {selectedCustomer.partnerName}</h5>
                    <p>Contact: {selectedCustomer.contactPerson}</p>
                    <p>Email: {selectedCustomer.email}</p>
                    <div className="mt-3">
                      <button 
                        className="btn btn-primary me-2"
                        onClick={() => setActiveTab('inquiry-details')}
                      >
                        Continue to Inquiry Details
                      </button>
                      <button 
                        className="btn btn-outline-secondary"
                        onClick={() => {
                          setSelectedCustomer(null);
                        }}
                      >
                        Change Customer
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Add Customer Option */}
            {customerOption === 'add' && (
              <div>
                <AddBusinessPartner onCustomerCreated={handleCustomerCreated} />
              </div>
            )}
          </div>
        )}

        {activeTab === 'inquiry-details' && (
          <div>
            <h4 className="mb-3">Inquiry Details</h4>
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
      </Tabs>
    </div>
  );
}

export default ServiceInquiry;
