import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import InputField from "../../helpers/InputField";
import { useFormikBuilder } from "../../helpers/formikBuilder";
import PartnerService from "../AddCustomer/PartnerService";
import DataTable from "../../components/DataTable";


const getNextId = (items) => {
  if (items.length === 0) return 1;
  const maxId = Math.max(...items.map((i) => i.id));
  return Number.isNaN(maxId) ? 1 : maxId + 1;
};

function Grn() {
  const { id } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [supplierData, setSupplierData] = useState([]);
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [items, setItems] = useState([]);
  const [showItemModal, setShowItemModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    const fetchSuppliers = async () => {
      const storedSuppliers = await PartnerService.getAllPartners();
      setSupplierData(storedSuppliers.filter(p => p.partner_type === 'Supplier'));
    };
    fetchSuppliers();
  }, []);

  const fields = {
    txnNo: {
      name: "txnNo",
      type: "text",
      placeholder: "TXN No",
      initialValue: "",
      validation: Yup.string(),
    },
    txnDate: {
      name: "txnDate",
      type: "date",
      placeholder: "TXN Date",
      initialValue: new Date().toISOString().slice(0, 10),
      validation: Yup.string().required("TXN Date is required"),
    },
    supplier: {
      name: "supplier",
      type: "text",
      placeholder: "Supplier",
      initialValue: "",
      validation: Yup.string().required("Supplier is required"),
    },
    toStore: {
        name: "toStore",
        type: "select",
        placeholder: "To Store",
        dataBinding: { data: [{id: 1, name: 'Main Store'}, {id: 2, name: 'Sub Store'}], keyField: "id", valueField: "name" },
        initialValue: "Main Store",
        validation: Yup.string().required("To Store is required"),
    },
    remarks: {
      name: "remarks",
      type: "textarea",
      placeholder: "Remarks",
      initialValue: "",
      validation: Yup.string(),
    },
  };

  const handleGrnSubmit = (values, { resetForm }) => {
    console.log("Form values:", values);
    const grns = JSON.parse(localStorage.getItem("grns")) || [];

    if (id) {
      const updatedGrns = grns.map((grn) =>
        grn.id === parseInt(id) ? { ...grn, ...values, items } : grn
      );
      localStorage.setItem("grns", JSON.stringify(updatedGrns));
    } else {
      const newGrn = {
        id: getNextId(grns),
        ...values,
        items,
        status: "new",
        log: [{ status: "new", timestamp: new Date() }],
      };

      grns.push(newGrn);
      localStorage.setItem("grns", JSON.stringify(grns));
    }

    resetForm();
    setItems([]);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  const formik = useFormikBuilder(fields, handleGrnSubmit);

  useEffect(() => {
    if (id) {
      const grns = JSON.parse(localStorage.getItem("grns")) || [];
      const grn = grns.find((i) => i.id === parseInt(id));
      if (grn) {
        formik.setValues(grn);
        setItems(grn.items);
      }
    }
  }, [id, formik]);

  const supplierColumns = [
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
          onClick={() => onSupplierSelect(row)}
        >
          Select
        </button>
      ),
    },
  ];

  const onSupplierSelect = (supplier) => {
    formik.setFieldValue("supplier", supplier.partnerName);
    setShowSupplierModal(false);
  };

  const itemColumns = [
    {
        field: "itemCode",
        header: "Item Code",
    },
    {
        field: "uom",
        header: "UOM",
    },
    {
        field: "quantity",
        header: "Quantity",
    },
    {
        field: "action",
        header: "Action",
        isAction: true,
        actionTemplate: (row) => (
            <>
                <button
                    className="btn btn-primary btn-sm"
                    onClick={() => onEditItem(row)}
                >
                    Edit
                </button>
                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDeleteItem(row)}
                >
                    Delete
                </button>
            </>
        ),
    },
  ];

  const onEditItem = (item) => {
    setCurrentItem(item);
    setShowItemModal(true);
  }

  const onDeleteItem = (item) => {
    setItems(items.filter(i => i.id !== item.id));
  }

  return (
    <div className="container">
      {showPopup && (
        <div className="alert alert-success" role="alert">
          GRN saved successfully!
        </div>
      )}

      <div className="row g-5">
        <div className="col-md-12 col-lg-12">
          <form onSubmit={formik.handleSubmit} noValidate>
            <div className="row g-3">
              <div className="col-sm-6">
                <label htmlFor="supplier" className="form-label">
                  Supplier
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    {...formik.getFieldProps("supplier")}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => setShowSupplierModal(true)}
                  >
                    ...
                  </button>
                </div>
              </div>
                <InputField
                    className="col-sm-6"
                    {...fields.txnDate}
                    formik={formik}
                />
                <InputField
                    className="col-sm-6"
                    {...fields.toStore}
                    formik={formik}
                />
                <InputField
                    className="col-sm-6"
                    {...fields.remarks}
                    formik={formik}
                />
              <button className="w-100 btn btn-primary btn-lg" type="submit">
                Submit
              </button>
            </div>
          </form>

          <div className="py-5">
            <button className="btn btn-primary" onClick={() => setShowItemModal(true)}>Add Item</button>
            <DataTable
                data={items}
                columns={itemColumns}
            />
          </div>
        </div>
      </div>
      {showSupplierModal && (
        <div>
          <div
            className="modal-backdrop fade show"
            style={{ zIndex: 1040 }}
          ></div>
      <div className="modal fade show"  style={{ display: 'block', zIndex: 1050 }}
        tabIndex="-1">
          <div className="card ">
            <div className="card-header">
              <h5 className="card-title">Select Supplier</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowSupplierModal(false)}
              ></button>
            </div>
            <div className="card-body">
              <DataTable
                data={supplierData}
                columns={supplierColumns}
              />
            </div>
          </div></div></div>
    )}
    {showItemModal && (
        <div>
            <div
                className="modal-backdrop fade show"
                style={{ zIndex: 1040 }}
            ></div>
            <div className="modal fade show"  style={{ display: 'block', zIndex: 1050 }}
                tabIndex="-1">
                <div className="card ">
                    <div className="card-header">
                        <h5 className="card-title">{currentItem ? 'Edit Item' : 'Add Item'}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => {
                                setShowItemModal(false);
                                setCurrentItem(null);
                            }}
                        ></button>
                    </div>
                    <div className="card-body">
                        <ItemForm
                            item={currentItem}
                            onSave={(item) => {
                                if (currentItem) {
                                    setItems(items.map(i => i.id === item.id ? item : i));
                                } else {
                                    setItems([...items, { ...item, id: getNextId(items) }]);
                                }
                                setShowItemModal(false);
                                setCurrentItem(null);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )}
    </div>
  );
}

const ItemForm = ({ item, onSave }) => {
    const [itemCode, setItemCode] = useState(item ? item.itemCode : '');
    const [uom, setUom] = useState(item ? item.uom : '');
    const [quantity, setQuantity] = useState(item ? item.quantity : '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...item, itemCode, uom, quantity });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="itemCode" className="form-label">Item Code</label>
                <input type="text" className="form-control" id="itemCode" value={itemCode} onChange={(e) => setItemCode(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="uom" className="form-label">UOM</label>
                <input type="text" className="form-control" id="uom" value={uom} onChange={(e) => setUom(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="quantity" className="form-label">Quantity</label>
                <input type="number" className="form-control" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Save</button>
        </form>
    )
}

export default Grn;
