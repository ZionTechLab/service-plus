import React from "react";
import Modal from "../../components/Modal";
import BusinessPartnerFind from "./BusinessPartnerFind";

function SelectedBusinessPartnerBox({
  // Field object pattern props
  field,
  formik,
  className,
  // Original props
  selectedPartner,
  onContinue,
  onChangePartner,
  // showContinue = true,
  // showChange = true,
  // isOpen = true,
  onCustomerSelect = () => {},
  setCustomerOption = () => {},
  ...props
}) {
  const [open, setOpen] = React.useState(formik.isOpen);
  const [showModal, setShowModal] = React.useState(false);
  const [localSelectedPartner, setLocalSelectedPartner] = React.useState(selectedPartner);

  // If field and formik are provided, use field object pattern
  // const isFieldMode = field && formik;
  // const fieldName = field?.name || '';
  // const hasError = isFieldMode && formik.errors[fieldName] && formik.touched[fieldName];
  // const label = field?.placeholder || "Customer";

  // React.useEffect(() => {
  //   setOpen(isOpen);
  // }, [isOpen]);

  React.useEffect(() => {
    setLocalSelectedPartner(selectedPartner);
  }, [selectedPartner]);

  React.useEffect(() => {
    console.log("Selected partner updated:", formik.values[field?.name]);
          formik.setFieldTouched(field?.name, true);
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
            {/* <div className="mt-3">
              {showContinue && (
                <button
                  className="btn btn-primary me-2"
                  onClick={onContinue}
                  type="button"
                >
                  Continue to Partner Details
                </button>
              )}
            </div> */}
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
