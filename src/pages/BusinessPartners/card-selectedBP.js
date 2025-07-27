import React from "react";


function SelectedCustomerBox({
  selectedCustomer,
  onContinue,
  onChangeCustomer,
  showContinue = true,
  showChange = true
}) {
  if (!selectedCustomer) return null;
  return (
    <div className="card">
      <div className="card-body">
      <h5>Selected Customer</h5>
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
  );
}

export default SelectedCustomerBox;
