import React from "react";
import { useModalService } from "../../helpers/ModalService";
import BusinessPartnerFind from "./BusinessPartnerFind";
import ApiService from "./PartnerService";
import Tabs from "../../components/Tabs";
import AddBusinessPartner from "./AddBusinessPartner";
import { useLoadingSpinner } from "../../hooks/useLoadingSpinner";

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
  const [localSelectedPartner, setLocalSelectedPartner] =
    React.useState(selectedPartner);
  const [activeTab, setActiveTab] = React.useState("search");
  const [tabsInitialized, setTabsInitialized] = React.useState(false);
  const { showSpinner, hideSpinner } = useLoadingSpinner();
  // console.log("SelectedBusinessPartnerBox rendered");

  React.useEffect(() => {
    // console.log("Selected partner updated:");
    setLocalSelectedPartner(selectedPartner);
  }, [selectedPartner]);

  // React.useEffect(() => {
  //   console.log("Selected partner updated:", localSelectedPartner);
  // }, [localSelectedPartner]);

  React.useEffect(() => {
    // console.log("Formik values changed:");
    if (formik.values[field?.name]) {
      const fetchInquiries = async () => {
        showSpinner();
        try {
          const storedPartners = await ApiService.get(
            formik.values[field?.name]
          );
          setLocalSelectedPartner(storedPartners.data);
        } catch (error) {
          setLocalSelectedPartner(null);
        } finally {
          hideSpinner();
        }
      };
      fetchInquiries();
    } else {
      setLocalSelectedPartner(null);
    }
    // formik.setFieldTouched(field?.name, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values[field?.name]]);

  const { openModal, closeModal } = useModalService();

  const handleCustomerSelect = (customer) => {
    //  console.log("handleCustomerSelect", customer);
    setLocalSelectedPartner(customer);
    closeModal();
    formik.setFieldValue(field?.name, customer.id || "");
    // console.log("Formik values after setFieldValue:", formik.values);
    if (onCustomerSelect) {
      onCustomerSelect(customer);
    }
    if (onChangePartner) {
      onChangePartner(customer);
    }
  };

  const handleNewCustomerClick = () => {
    setActiveTab("add-customer");
    if (!tabsInitialized) {
      setTabsInitialized(true);
    }
  };

  const handleCustomerCreated = (newCustomer) => {
    handleCustomerSelect(newCustomer);
    setActiveTab("search");
    closeModal();
  };

  // Show modal with current tab
  const showModal = (tabId = activeTab) => {
    openModal({
      title: tabId === "add-customer" ? "Add New Customer" : "Select Customer",
      component: (
        <Tabs tabs={tabs} activeTab={tabId} onTabChange={handleTabChange}>
          {tabId === "search" && (
            <>
              <BusinessPartnerFind
                onCustomerSelect={handleCustomerSelect}
                onNewCustomer={handleNewCustomerClick}
              />
            </>
          )}
          {tabId === "add-customer" && (
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
    { id: "search", label: "Search Customer", disabled: false },
    { id: "add-customer", label: "Add New Customer", disabled: false },
  ];

  return (
    <div className={className || "col-sm-12"}>
      <label className="form-label">{field?.placeholder || "Customer"}</label>
      <div className="accordion" id="selectedPartnerAccordion">
        <div className="accordion-item">
          <h2
            className="accordion-header d-flex align-items-center justify-content-between"
            id="selectedPartnerHeading"
          >
            <button
              className={`accordion-button${open ? "" : " collapsed"}`}
              type="button"
              aria-expanded={open}
              aria-controls="selectedPartnerCollapse"
              onClick={() => setOpen((prev) => !prev)}
              style={{ flex: 1 }}
            >
              {localSelectedPartner?.isCustomer ? (
                <>
                  {" "}
                  <div
                    className="d-flex align-items-center justify-content-center bg-primary text-white"
                    style={{
                      width: 20,
                      height: 20,
                      // borderRadius: "50%",
                      fontWeight: 600,
                      fontSize: 12,
                      flexShrink: 0,
                      marginRight: 4,
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    C
                  </div>{" "}
                </>
              ) : null}
              {localSelectedPartner?.isSupplier ? (
                <>
                  {" "}
                  <div
                    className="d-flex align-items-center justify-content-center bg-primary text-white"
                    style={{
                      width: 20,
                      height: 20,
                      // borderRadius: "50%",
                      fontWeight: 600,
                      fontSize: 12,
                      flexShrink: 0,
                      marginRight: 4,
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    S
                  </div>{" "}
                </>
              ) : null}
              {localSelectedPartner?.isEmployee ? (
                <div
                  className="d-flex align-items-center justify-content-center bg-primary text-white"
                  style={{
                    width: 20,
                    height: 20,
                    // borderRadius: "50%",
                    fontWeight: 600,
                    fontSize: 12,
                    flexShrink: 0,
                    marginRight: 4,
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  E
                </div>
              ) : null}
              <h6 className="mb-0">
                <small className="text-muted">
                  {localSelectedPartner?.partnerCode
                    ? ` ${localSelectedPartner.partnerCode} - `
                    : ""}
                </small>{" "}
                {localSelectedPartner?.partnerName ||
                  localSelectedPartner?.partnerCode ||
                  "-"}
              </h6>
            </button>
            <button
              className="btn btn-outline-secondary ms-2"
              onClick={() => showModal()}
              type="button"
            >
              <i className="bi bi-search"></i>
            </button>
          </h2>
        </div>
        <div
          id="selectedPartnerCollapse"
          className={`accordion-collapse collapse${open ? " show" : ""}`}
          aria-labelledby="selectedPartnerHeading"
          data-bs-parent="#selectedPartnerAccordion"
        >
          <div className="accordion-body card">
            <div className="">
              <div className="row">
                <div className="col-md-6 mb-2">
                  {/* <div className="small text-muted">Contact Person</div> */}
                  <div>
                    <i className="bi bi-person-fill text-primary"></i>{" "}
                    {localSelectedPartner?.contactPerson || "-"}
                  </div>
                </div>

                <div className="col-md-6 mb-2">
                  {/* <div className="small text-muted">Email</div> */}
                  <div>
                    <i className="bi bi-envelope-fill text-primary"></i>{" "}
                    {localSelectedPartner?.email ? (
                      <a
                        href={`mailto:${localSelectedPartner.email}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {localSelectedPartner.email}
                      </a>
                    ) : (
                      "-"
                    )}
                  </div>
                </div>

                <div className="col-md-6 mb-2">
                  {/* <div className="small text-muted">Address</div> */}
                  <div>
                    <i className="bi bi-geo-alt-fill text-primary"></i>{" "}
                    {localSelectedPartner?.address || "-"}
                  </div>
                </div>

                <div className="col-md-6 mb-2">
                  {/* <div className="small text-muted">Phone</div> */}
                  <div>
                    <i className="bi bi-telephone-fill text-primary"></i>{" "}
                    {localSelectedPartner?.phone1 ? (
                      <a
                        href={`tel:${localSelectedPartner.phone1}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {localSelectedPartner.phone1}
                      </a>
                    ) : (
                      "-"
                    )}
                    {localSelectedPartner?.phone2
                      ? ` | ${localSelectedPartner.phone2}`
                      : ""}
                  </div>
                </div>

                {localSelectedPartner?.notes ? (
                  <div className="col-12 mt-2">
                    <div className="small text-muted">Notes</div>
                    <div className="text-break">
                      dd{localSelectedPartner.notes}
                    </div>
                  </div>
                ) : null}
              </div>

            </div>
          </div>
        </div>
      </div>

      {formik.errors[field?.name] && formik.touched[field?.name] && (
        <div className="text-danger small mt-1">
          {formik.errors[field?.name]}
        </div>
      )}
    </div>
  );
}

export default SelectedBusinessPartnerBox;
