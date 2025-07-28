import React from "react";




function SelectedCustomerBox({
  selectedCustomer,
  onContinue,
  onChangeCustomer,
  showContinue = true,
  showChange = true,
  isOpen = true
}) {
  const [open, setOpen] = React.useState(isOpen);

  React.useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  if (!selectedCustomer) return null;
  return (
    <div className="accordion" id="selectedCustomerAccordion">
      <div className="accordion-item">
        <h2 className="accordion-header" id="selectedCustomerHeading">
          <button
            className={`accordion-button${open ? '' : ' collapsed'}`}
            type="button"
            aria-expanded={open}
            aria-controls="selectedCustomerCollapse"
            onClick={() => setOpen((prev) => !prev)}
          >
            Selected Customer: {selectedCustomer.partnerName || selectedCustomer.partnerCode || "-"}
          </button>
        </h2>
        <div
          id="selectedCustomerCollapse"
          className={`accordion-collapse collapse${open ? ' show' : ''}`}
          aria-labelledby="selectedCustomerHeading"
          data-bs-parent="#selectedCustomerAccordion"
        >
          <div className="accordion-body">
            <div className="row">
              <div className="col-md-6">
                <strong>Partner Code:</strong>{" "}
                {selectedCustomer.partnerCode || "-"}
                <br />
                <strong>Partner Name:</strong>{" "}
                {selectedCustomer.partnerName || "-"}
                <br />
                <strong>Contact Person:</strong>{" "}
                {selectedCustomer.contactPerson || "-"}
                <br />
                <strong>Email:</strong> {selectedCustomer.email || "-"}
                <br />
                <strong>Address:</strong>{" "}
                {selectedCustomer.address || "-"}
                <br />
              </div>
              <div className="col-md-6">
                <strong>Phone 1:</strong>{" "}
                {selectedCustomer.phone1 || "-"}
                <br />
                <strong>Phone 2:</strong>{" "}
                {selectedCustomer.phone2 || "-"}
                <br />
                <strong>Customer:</strong>{" "}
                {selectedCustomer.isCustomer ? "Yes" : "No"}
                <br />
                <strong>Supplier:</strong>{" "}
                {selectedCustomer.isSupplier ? "Yes" : "No"}
                <br />
                <strong>Employee:</strong>{" "}
                {selectedCustomer.isEmployee ? "Yes" : "No"}
                <br />
                {/* <strong>Active:</strong>{" "}
                {selectedCustomer.active ? "Yes" : "No"}
                <br /> */}
              </div>
            </div>
            <div className="mt-3">
              {showContinue && (
                <button
                  className="btn btn-primary me-2"
                  onClick={onContinue}
                >
                  Continue to Inquiry Details
                </button>
              )}
              {showChange && (
                <button
                  className="btn btn-outline-secondary"
                  onClick={onChangeCustomer}
                >
                  Change Customer
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectedCustomerBox;
