import React from "react";
import Modal from "../../components/Modal";
import BusinessPartnerFind from "./BusinessPartnerFind";
import PartnerService from "./PartnerService";

function SelectedBusinessPartnerBox({
  field,
  formik,
  className,
  selectedPartner,
  onContinue,
  onChangePartner,
  onCustomerSelect = () => {},
  setCustomerOption = () => {},
  ...props
}) {
  const [open, setOpen] = React.useState(formik.isOpen);
  const [showModal, setShowModal] = React.useState(false);
  const [localSelectedPartner, setLocalSelectedPartner] = React.useState(selectedPartner);

  // React.useEffect(() => {
  //   console.log("init:", formik.values[field?.name]);
  // if(formik.values[field?.name]) {
  // console.log("Selected partner updated:", formik.values[field?.name]);
  //   const fetchPartners = async () => {
  //     const storedPartners = await PartnerService.getPartnerById();
  //      console.log(storedPartners);
  //      setLocalSelectedPartner(storedPartners);
  //     // const employees = storedPartners ? storedPartners.filter(p => p.isEmployee === true) : [];
  //     // setAssigneeData(employees);
  //   };
  //   fetchPartners();

  // }
  // }, []);

  React.useEffect(() => {
    setLocalSelectedPartner(selectedPartner);
  }, [selectedPartner]);

  React.useEffect(() => {
    console.log("Selected partner updated:", formik.values[field?.name]);
  if(formik.values[field?.name]) {
  console.log("Selected partner updated:", formik.values[field?.name]);
    const fetchPartners = async () => {
      const storedPartners = await PartnerService.getPartnerById(formik.values[field?.name]);
       console.log(storedPartners);
       setLocalSelectedPartner(storedPartners);
      // const employees = storedPartners ? storedPartners.filter(p => p.isEmployee === true) : [];
      // setAssigneeData(employees);
    };
    fetchPartners();

  }

          formik.setFieldTouched(field?.name, true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values[field?.name]]);

  const handleCustomerSelect = (customer) => {
    console.log("handleCustomerSelect", customer);
    setLocalSelectedPartner(customer);
    setShowModal(false);
    
    // Field object pattern - update formik
    // if (isFieldMode) {
          console.log(field?.name);
      // Ensure fieldName matches Formik initialValues key and initialValue is set correctly
      formik.setFieldValue(field?.name, customer.id || "");

      console.log("Formik values after setFieldValue:", formik.values);
    // }
    
    // Original pattern callbacks
    if (onCustomerSelect) {
      onCustomerSelect(customer);
    }
    if (onChangePartner) {
      onChangePartner(customer);
    }
  };

//   if (!selectedPartner) return null;
return (
  <div className={className || "col-sm-12"}>      
    <label className="form-label">{field?.placeholder || "Customer"}</label>
    <div className="accordion" id="selectedPartnerAccordion">
      <div className="accordion-item">
        <h2 className="accordion-header d-flex align-items-center justify-content-between" id="selectedPartnerHeading">
          <button
            className={`accordion-button${open ? '' : ' collapsed'}`}
            type="button"
            aria-expanded={open}
            aria-controls="selectedPartnerCollapse"
            onClick={() => setOpen((prev) => !prev)}
            style={{ flex: 1 }}
          >
           {localSelectedPartner?.partnerName || localSelectedPartner?.partnerCode || "-"}
          </button>
          {/* {showChange && ( */}
          <button
            className="btn btn-outline-secondary ms-2"
            onClick={() => setShowModal(true)}
            type="button"
          >
            <i className="bi bi-search"></i>
          </button>
          {/* )} */}
        </h2>
        <div
          id="selectedPartnerCollapse"
          className={`accordion-collapse collapse${open ? ' show' : ''}`}
          aria-labelledby="selectedPartnerHeading"
          data-bs-parent="#selectedPartnerAccordion"
        >
          <div className="accordion-body">
            <div className="row">
              <div className="col-md-6">
                <strong>Partner Code:</strong> {localSelectedPartner?.partnerCode || "-"}
                <br />
                <strong>Partner Name:</strong> {localSelectedPartner?.partnerName || "-"}
                <br />
                <strong>Contact Person:</strong> {localSelectedPartner?.contactPerson || "-"}
                <br />
                <strong>Email:</strong> {localSelectedPartner?.email || "-"}
                <br />
                <strong>Address:</strong> {localSelectedPartner?.address || "-"}
                <br />
              </div>
              <div className="col-md-6">
                <strong>Phone 1:</strong> {localSelectedPartner?.phone1 || "-"}
                <br />
                <strong>Phone 2:</strong> {localSelectedPartner?.phone2 || "-"}
                <br />
                <strong>Customer:</strong> {localSelectedPartner?.isCustomer ? "Yes" : "No"}
                <br />
                <strong>Supplier:</strong> {localSelectedPartner?.isSupplier ? "Yes" : "No"}
                <br />
                <strong>Employee:</strong> {localSelectedPartner?.isEmployee ? "Yes" : "No"}
                <br />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    
    {/* Error display for field pattern */}
    {formik.errors[field?.name] && formik.touched[field?.name] && (
      <div className="text-danger small mt-1">
        {formik.errors[field?.name]}
      </div>
    )}
    
    <Modal show={showModal} onClose={() => setShowModal(false)} title="Search Partner">
      <BusinessPartnerFind
        onCustomerSelect={handleCustomerSelect}
        onNewCustomer={() => setCustomerOption("add")}
      >
        <button
          className="btn btn-primary "
          onClick={() => setCustomerOption("add")}
        >
          Add New Customer
        </button>
      </BusinessPartnerFind>
    </Modal>
  </div>
);
}

export default SelectedBusinessPartnerBox;
