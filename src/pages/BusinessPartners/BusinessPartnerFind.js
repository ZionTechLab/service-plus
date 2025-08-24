import  { useEffect, useState } from "react";
import DataTable from "../../components/DataTable";
import ApiService from "./PartnerService";

function BusinessPartnerFind({ onCustomerSelect,  children,type }) {
  const [uiData, setUiData] = useState({loading: false, success: false, error: '', data: [] });

  useEffect(() => {
    const fetchInvoices = async () => {
      setUiData(prev => ({ ...prev, loading: true, error: '', data: [] }));
      console.log(type);
      const data = await ApiService.getAll(type);
      setUiData(prev => ({ ...prev, ...data , loading: false }));
    };
    fetchInvoices();
    // eslint-disable-next-line
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
      header: "Phone 1",
      class: "text-nowrap",
    },
    {
      field: "phone2",
      header: "Phone 2",
      class: "text-nowrap",
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
      {!uiData.loading && !uiData.error && (
        <div>
        <DataTable
          data={uiData.data}
          columns={customerColumns}
          onRowSelect={onCustomerSelect}
        >
          {children}
        </DataTable>
        </div>
      )}

      {uiData.error && (
        <div className="alert alert-danger mt-3">{uiData.error}</div>
      )}
    </div>
  );
}

export default BusinessPartnerFind;
