import React, { useEffect, useState } from "react";
import DataTable from "../../components/DataTable";
import PartnerService from "./PartnerService";
import { useLoadingSpinner } from "../../hooks/useLoadingSpinner";

function BusinessPartnerFind({ onCustomerSelect, onNewCustomer, children }) {
  const { showSpinner, hideSpinner } = useLoadingSpinner();
  const [uiData, setUiData] = useState({ loading: false, error: "", data: [] });

  useEffect(() => {
    const fetchInquiries = async () => {
      setUiData({ loading: true, error: "", data: [] });
      showSpinner();
      try {
        const data = await PartnerService.getAllPartners();
        setUiData((prev) => ({ ...prev, data }));
      } catch (error) {
        setUiData((prev) => ({
          ...prev,
          error: "Failed to fetch business partners. Please try again later.",
        }));
      } finally {
        setUiData((prev) => ({ ...prev, loading: false }));
        hideSpinner();
      }
    };
    fetchInquiries();
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
        <DataTable
          data={uiData.data}
          columns={customerColumns}
          onRowSelect={onCustomerSelect}
        >
          {children}
        </DataTable>
      )}

      {uiData.error && (
        <div className="alert alert-danger mt-3">{uiData.error}</div>
      )}
    </div>
  );
}

export default BusinessPartnerFind;
