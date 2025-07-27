import React, { useEffect ,useState} from "react";
import DataTable from "../../components/DataTable";
import PartnerService from "./PartnerService";

function BusinessPartnerFind({ onCustomerSelect, onNewCustomer, children }) {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
    const fetchPartners = async () => {
      const storedPartners = await PartnerService.getAllPartners();
      setCustomers(storedPartners);
    };
    fetchPartners();
  }, []);
  
  const customerColumns = [
    {
      field: "partnerName",
      header: "Partner",
    },
    {
      field: "contactPerson",
      header: "Person",
    },
    {
      field: "phone1",
      header: "Phone 1",class:'text-nowrap' 
    },
    {
      field: "phone2",
      header: "Phone 2",class:'text-nowrap' 
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
    <div>
      <DataTable
        data={customers}
        columns={customerColumns}
        onRowSelect={onCustomerSelect}
      >
        {children}
      </DataTable>
      {/* <button className="btn btn-secondary mt-3" onClick={onNewCustomer}>
        New Customer
      </button> */}
    </div>
  );
}

export default BusinessPartnerFind;
