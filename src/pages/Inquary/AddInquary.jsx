
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../helpers/InputField";
import { useFormikBuilder } from "../../helpers/formikBuilder";
import useConfirm from "../../hooks/useConfirm";
import PartnerService from "../BusinessPartners/PartnerService";
import InquaryService from "./InquaryService";
import InquiryView from "./InquiryView";
import SelectedBusinessPartnerBox from "../BusinessPartners/select-bp";
import { inquiryTypes, priorities } from "./inquiryOptions";

function ServiceInquiry() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assigneeData, setAssigneeData] = useState([]);
  const [selectedPartner] = useState(null);
  const [ConfirmationDialog, confirm] = useConfirm();

  useEffect(() => {
    const fetchPartners = async () => {
      const storedPartners = await PartnerService.getAllPartners();
      const employees = storedPartners ? storedPartners.filter(p => p.isEmployee === true) : [];
      setAssigneeData(employees);
    };
    fetchPartners();
  }, []);

  useEffect(() => {
    if (id) {
      const inquiry = InquaryService.getInquaryById(parseInt(id));
      if (inquiry) {
        console.log("Selected Customer:", inquiry);
        formik.setValues(inquiry);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fields = {
    id: {
      name: "id",
      type: "text",
      placeholder: "Job No",
      initialValue: "<New>",
      disabled: true,
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
      initialValue: "ssss",
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
        data: assigneeData,
        keyField: "id",
        valueField: "partnerName",
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

    if (id) {
      // Update existing inquiry
      InquaryService.createInquary({
        ...values, 
        id: parseInt(id)
      });
    } else {
      // Create new inquiry
      InquaryService.createInquary({
        ...values,
        id: 0,
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

  return (
    <div>
      <ConfirmationDialog />
      <div className="row mt-3">
        <div className="col-md-7 col-lg-8">
          <form onSubmit={formik.handleSubmit} noValidate>
            <div className="row g-3">
              <InputField {...fields.id} formik={formik} className="col-sm-6"/>
              <InputField {...fields.jobDate} formik={formik} className="col-sm-6"/>
              
              <SelectedBusinessPartnerBox
                showChange={false}
                showContinue={false}
                selectedPartner={selectedPartner}
                isOpen={false}
              />

              <InputField {...fields.deliveredBy} formik={formik} />
              <InputField {...fields.itemName} formik={formik} />
              <InputField {...fields.serialNo} formik={formik} />
              <InputField {...fields.description} formik={formik} />
              
              <div className="col-sm-12"> 
                <label className="form-label">Items / Accessories</label>
                <div className="card">
                  <div className="card-body">
                    <div className="row g-2">
                      <InputField {...fields.charger} formik={formik} className="col-4 col-lg-3 col-xl-2"/>
                      <InputField {...fields.powerCable} formik={formik} className="col-4 col-lg-3 col-xl-2"/>
                      <InputField {...fields.bag} formik={formik} className="col-4 col-lg-3 col-xl-2"/>
                      <InputField {...fields.toner} formik={formik} className="col-4 col-lg-3 col-xl-2"/>
                      <InputField {...fields.cartridge} formik={formik} className="col-4 col-lg-3 col-xl-2"/>
                      <InputField {...fields.ribbon} formik={formik} className="col-4 col-lg-3 col-xl-2"/>
                      <InputField {...fields.mouse} formik={formik} className="col-4 col-lg-3 col-xl-2"/>
                      <InputField {...fields.usbcable} formik={formik} className="col-4 col-lg-3 col-xl-2"/>
                      <InputField {...fields.videoCable} formik={formik} className="col-4 col-lg-3 col-xl-2"/>
                    </div>
                  </div>
                </div>
              </div>
              
              <InputField {...fields.toDo} formik={formik} />
              <InputField className="col-sm-6" {...fields.serviceType} formik={formik} />
              <InputField className="col-sm-6" {...fields.priority} formik={formik} />
              <InputField {...fields.assignee} formik={formik} className="col-sm-6"/>
              <InputField {...fields.dueDate} formik={formik} className="col-sm-6"/>
              
              <button className="w-100 btn btn-primary" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-md-5 col-lg-4 order-md-last">
          <InquiryView />
        </div>
      </div>
    </div>
  );
}

export default ServiceInquiry;