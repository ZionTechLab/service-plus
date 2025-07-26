import DataTable from "../../components/DataTable";
import Modal from "../../components/Modal";

function BusinessPartnerFind({ show, onClose, customers, onCustomerSelect, onNewCustomer }) {
  const customerColumns = [
    {
      field: "partnerName",
      header: "Partner Name",
    },
    {
      field: "contactPerson",
      header: "Contact Person",
    },
    {
      field: "phone1",
      header: "Phone 1",
    },
    {
      field: "phone2",
      header: "Phone 2",
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

  return (
    <Modal show={show} onClose={onClose} title="Select Customer">
      <DataTable data={customers} columns={customerColumns} />
      <button className="btn btn-secondary mt-3" onClick={onNewCustomer}>
        New Customer
      </button>
    </Modal>
  );
}

export default BusinessPartnerFind;
