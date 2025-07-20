import DataTable from "../../helpers/DataTable";

function CustomerModal({
  show,
  onClose,
  customers,
  onCustomerSelect,
}) {
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

  if (!show) {
    return null;
  }

  return (
    <div>
   
      <div className="modal-backdrop fade show" style={{ zIndex: 1040 }}></div>
      <div
        className="modal fade show"
        style={{
          display: "block",
          zIndex: 1050,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        tabIndex="-1"
      >
        <div className="card">
          <div className="card-header">
            <h5 className="card-title">Select Customer</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              style={{ position: "absolute", right: "1rem" }}
            ></button>
          </div>
          <div className="card-body">
            <DataTable data={customers} columns={customerColumns} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerModal;
