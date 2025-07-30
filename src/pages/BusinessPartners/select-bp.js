import React from "react";
import { useModalService } from "../../helpers/ModalService";
import BusinessPartnerFind from "./BusinessPartnerFind";
import PartnerService from "./PartnerService";
import Tabs from "../../components/Tabs";
import AddBusinessPartner from "./AddBusinessPartner";

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
  // Remove local modal state
  const [localSelectedPartner, setLocalSelectedPartner] = React.useState(selectedPartner);
  const [activeTab, setActiveTab] = React.useState('search');
  const [tabsInitialized, setTabsInitialized] = React.useState(false);

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

  const { openModal, closeModal } = useModalService();

  const handleCustomerSelect = (customer) => {
    console.log("handleCustomerSelect", customer);
    setLocalSelectedPartner(customer);
    closeModal();
    // Field object pattern - update formik
    formik.setFieldValue(field?.name, customer.id || "");
    console.log("Formik values after setFieldValue:", formik.values);
    if (onCustomerSelect) {
      onCustomerSelect(customer);
    }
    if (onChangePartner) {
      onChangePartner(customer);
    }
  };

  const handleNewCustomerClick = () => {
    setActiveTab('add-customer');
    if (!tabsInitialized) {
      setTabsInitialized(true);
    }
  };

  const handleCustomerCreated = (newCustomer) => {
    console.log("New customer created:", newCustomer);
    // Customer was successfully created, now select it
    handleCustomerSelect(newCustomer);
    setActiveTab('search');
    closeModal();
  };

  // Show modal with current tab
  const showModal = (tabId = activeTab) => {
    openModal({
      title: tabId === 'add-customer' ? "Add New Customer" : "Select Customer",
      component: (
        <Tabs tabs={tabs} activeTab={tabId} onTabChange={handleTabChange}>
          {tabId === 'search' && (
            <BusinessPartnerFind
              onCustomerSelect={handleCustomerSelect}
              onNewCustomer={handleNewCustomerClick}
            >
              {/* <button
                className="btn btn-primary"
                onClick={handleNewCustomerClick}
              >
                Add New Customer
              </button> */}
            </BusinessPartnerFind>
          )}
          {tabId === 'add-customer' && (
            <div className="mt-3">
              <AddBusinessPartner 
                onCustomerCreated={handleCustomerCreated} 
                noForm={true} 
              />
            </div>
          )}
        </Tabs>
      ),
    });
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    showModal(tabId);
  };

  const tabs = [
    { id: 'search', label: 'Search Customer', disabled: false },
    { id: 'add-customer', label: 'Add New Customer', disabled: false }
  ];

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
            <button
              className="btn btn-outline-secondary ms-2"
              onClick={() => showModal()}
              type="button"
            >
              <i className="bi bi-search"></i>
            </button>
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
    </div>
  );
}

export default SelectedBusinessPartnerBox;
