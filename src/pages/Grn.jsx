import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import InputField from "../helpers/InputField";
import { useFormikBuilder } from "../helpers/formikBuilder";
import PartnerService from "../components/AddCustomer/PartnerService";
import DataTable from "../helpers/DataTable";

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
      {/* Add form and table rendering here as needed */}
      <div>GRN Page</div>
    </div>
  );
}

export default Grn;
