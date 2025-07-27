
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import InputField from "../../helpers/InputField";
import { useFormikBuilder } from "../../helpers/formikBuilder";
import PartnerService from "../BusinessPartners/PartnerService";
import InquaryService from "./InquaryService";
import InquiryView from "./InquiryView";
import AddBusinessPartner from "../BusinessPartners/AddBusinessPartner";
import BusinessPartnerFind from "../BusinessPartners/BusinessPartnerFind";
import useConfirm from "../../hooks/useConfirm";
import { useNavigate } from "react-router-dom";
import Tabs from "../../components/Tabs";
import SelectedCustomerBox from "../BusinessPartners/card-selectedBP";
import { inquiryTypes, priorities } from "./inquiryOptions";

function ServiceInquiry() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("select-customer");
  const [customerOption, setCustomerOption] = useState("select"); // 'select' or 'add'
  const [assigneeData, setAssigneeData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [ConfirmationDialog, confirm] = useConfirm();
  const navigate = useNavigate();

  // Tab configuration
  const tabs = [
    {
      id: "select-customer",
      label: "Select Customer",
      disabled: false,
    },
    {
      id: "inquiry-details",
      label: "Inquiry Details",
      disabled: !selectedCustomer && !id,
    },
  ];
  useEffect(() => {
    const fetchPartners = async () => {
      const storedPartners = await PartnerService.getAllPartners();
      var cc = storedPartners ? storedPartners.filter(p => p.isEmployee === true) : [];
      setAssigneeData(cc);
    };
    fetchPartners();
    setCustomerOption("select");
  }, []);

  const fields = {
    jobNo: {
      name: "jobNo",
      type: "text",
      placeholder: "Job No",
      initialValue: "",
      // validation: Yup.string().required("Job No is required"),
    },
    jobDate: {
      name: "jobDate",
      type: "date",
      placeholder: "Job Date",
      initialValue: new Date().toISOString().split("T")[0],
      validation: Yup.string().required("Job Date is required"),
    },
    deliveredBy: {
      name: "deliveredBy",
      type: "text",
      placeholder: "Delivered By",
      initialValue: "",
      validation: Yup.string().required("Delivered By is required"),
   
    },
    customer: {
      name: "customer",
      type: "text",
      placeholder: "Customer",
      initialValue: "",
      validation: Yup.string().required("Customer is required"),
    },
    itemName: {
      name: "itemName",
      type: "text",
      placeholder: "Item Name",
      initialValue: "",
      validation: Yup.string().required("Item Name is required"),
    },
    serialNo: {
      name: "serialNo",
      type: "text",
      placeholder: "Serial No",
      initialValue: "",
      validation: Yup.string().required("Serial No is required"),
    },
    description: {
      name: "description",
      type: "textarea",
      placeholder: "Nature Of Faulty",
      initialValue: "",
      validation: Yup.string().required("Nature Of Faulty is required"),
    },
    toDo: {
      name: "toDo",
      type: "textarea",
      placeholder: "To Do",
      initialValue: "",
      validation: Yup.string().required("To Do is required"),
    },
    charger: {
      name: "charger",
      type: "checkbox",
      initialValue: false,
      validation: Yup.boolean(),
      placeholder: "Charger",
    },
    powerCable: {
      name: "powerCable",
      type: "checkbox",
      initialValue: false,
      validation: Yup.boolean(),
      placeholder: "Power Cable",
    },
    bag: {
      name: "bag",
      type: "checkbox",
      initialValue: false,
      validation: Yup.boolean(),
      placeholder: "Bag",
    },
    toner: {
      name: "toner",
      type: "checkbox",
      initialValue: false,
      validation: Yup.boolean(),
      placeholder: "Toner",
    },
    cartridge: {
      name: "cartridge",
      type: "checkbox",
      initialValue: false,
      validation: Yup.boolean(),
      placeholder: "Cartridge",
    },
    ribbon: {
      name: "ribbon",
      type: "checkbox",
      initialValue: false,
      validation: Yup.boolean(),
      placeholder: "Ribbon",
    },
    mouse: {
      name: "mouse",
      type: "checkbox",
      initialValue: false,
      validation: Yup.boolean(),
      placeholder: "Mouse",
    },
    usbcable: {
      name: "usbcable",
      type: "checkbox",
      initialValue: false,
      validation: Yup.boolean(),
      placeholder: "USB Cable",
    },
    videoCable: {
      name: "videoCable",
      type: "checkbox",
      initialValue: false,
      validation: Yup.boolean(),
      placeholder: "Video Cable",
    },
    serviceType: {
      name: "serviceType",
      type: "select",
      placeholder: "Service Type",
      dataBinding: { data: inquiryTypes, keyField: "key", valueField: "value" },
      initialValue: inquiryTypes[0].key,
      validation: Yup.string(),
    },
    priority: {
      name: "priority",
      type: "select",
      placeholder: "Priority",
      dataBinding: { data: priorities, keyField: "key", valueField: "value" },
      initialValue: priorities[1].key,
      validation: Yup.string(),
    },
    assignee: {
      name: "assignee",
      type: "select",
      placeholder: "Assignee",
      dataBinding: {
        data: assigneeData,keyField: "id",valueField: "partnerName",
      },
      initialValue: assigneeData[0]?.id,
      validation: Yup.string(),
    },
    dueDate: {
      name: "dueDate",
      type: "date",
      placeholder: "Due Date",
      initialValue: new Date().toISOString().split("T")[0],
      validation: Yup.string().required("Due Date is required"),
    },
  };

  const handleInquirySubmit = (values, { resetForm }) => {
    console.log("Form values:", values);

    let result;
    if (id) {
      // Update existing inquiry
      result = InquaryService.createInquary({
        id: parseInt(id),
        ...values,
      });
    } else {
      // Create new inquiry
      // eslint-disable-next-line no-unused-vars
      result = InquaryService.createInquary({
        ...values,
        status: "new",
        log: [{ status: "new", timestamp: new Date() }],
      });
    }

    resetForm();
    confirm("Inquiry saved successfully!", {
      confirmText: "OK",
      type: "success",
    }).then(() => {
      navigate(`/inquiry`);
    });
  };

  const formik = useFormikBuilder(fields, handleInquirySubmit);

  useEffect(() => {
    if (id) {
      const inquiry = InquaryService.getInquaryById(parseInt(id));
      if (inquiry) {
        formik.setValues(inquiry);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onCustomerSelect = (customer) => {
    formik.setFieldValue("customer", customer.id);
    setSelectedCustomer(customer);
    setCustomerOption("selected");
    setActiveTab("inquiry-details");
  };

  const handleCustomerCreated = (newCustomer) => {
    // Handle when a new customer is created from AddBusinessPartner
    formik.setFieldValue("customer", newCustomer.id);
    setSelectedCustomer(newCustomer);
    setCustomerOption("selected");
    setActiveTab("inquiry-details");
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (selectedCustomer) setCustomerOption("selected");
  };

  let content = "";
  switch (true) {
    case activeTab === "select-customer" && customerOption === "select":
      content = (
        <div>
          <BusinessPartnerFind
            // customers={assigneeData}
            onCustomerSelect={onCustomerSelect}
            onNewCustomer={() => setCustomerOption("add")}
          >
            <button
              className="btn btn-primary "
              onClick={() => setCustomerOption("add")}
            >
              Add New Customer
            </button>
          </BusinessPartnerFind>
        </div>
      );
      break;
    case activeTab === "select-customer" && customerOption === "selected":
      content = (
        <SelectedCustomerBox
          selectedCustomer={selectedCustomer}
          onContinue={() => setActiveTab("inquiry-details")}
          onChangeCustomer={() => setCustomerOption("select")}
        />
      );
      break;
    case activeTab === "select-customer" && customerOption === "add":
      content = (
        <div>
          <AddBusinessPartner onCustomerCreated={handleCustomerCreated} />
          <div>
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => setCustomerOption("select")}
            >
              Select Customer
            </button>
          </div>
        </div>
      );
      break;
    case activeTab === "inquiry-details":
      content = (
        <div>
          <SelectedCustomerBox
            showChange={false}
            showContinue={false}
            selectedCustomer={selectedCustomer}
            onContinue={() => setActiveTab("inquiry-details")}
            onChangeCustomer={() => setCustomerOption("select")}
          />

          <div className="row  mt-3">
            <div className="col-md-7 col-lg-8">
              <form onSubmit={formik.handleSubmit} noValidate>
                <div className="row g-3">
                  <InputField {...fields.jobNo} formik={formik} className="col-sm-6"/>
                  <InputField {...fields.jobDate} formik={formik} className="col-sm-6"/>
                  <InputField {...fields.deliveredBy} formik={formik} />
                  <InputField {...fields.itemName} formik={formik} />
                  <InputField {...fields.serialNo} formik={formik} />
                  <InputField {...fields.description} formik={formik} />
<div className="col-sm-12" > 
                <label className="form-label">Items / Accessories</label>
                                          <div className="card">
     <div className="card-body">
      {/* <h5>Selected Customer</h5> */}
     
           <div className=" row g-2">
                    <InputField {...fields.charger} formik={formik} className="  col-4 col-lg-3  col-xl-2"/>
                    <InputField {...fields.powerCable} formik={formik} className="  col-4  col-lg-3 col-xl-2"/>
                    <InputField {...fields.bag} formik={formik} className="col-4 col-lg-3 col-xl-2"/>
                    <InputField {...fields.toner} formik={formik} className="col-4 col-lg-3 col-xl-2"/>
                    <InputField {...fields.cartridge} formik={formik} className="col-4 col-lg-3 col-xl-2"/>
                    <InputField {...fields.ribbon} formik={formik} className="col-4 col-lg-3 col-xl-2"/>
                    <InputField {...fields.mouse} formik={formik} className="col-4 col-lg-3 col-xl-2"/>
                    <InputField {...fields.usbcable} formik={formik} className="col-4 col-lg-3 col-xl-2"/>
                    <InputField {...fields.videoCable} formik={formik} className="col-4 col-lg-3 col-xl-2"/>
              </div></div></div></div>
               <InputField {...fields.toDo} formik={formik} />
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
                  <button
                    className="w-100 btn btn-primary btn-lg"
                    type="submit"
                  >
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
      );
      break;
    // You can add more cases here for other combinations if needed
    default:
      content = "";
  }

  return (
    <div>
      <ConfirmationDialog />
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange}>
        {content}
      </Tabs>
    </div>
  );
}

export default ServiceInquiry;
