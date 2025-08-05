import React, { useState, useEffect } from "react";
import styles from "./InvoiceLineItems.module.css";
// columns: [{ header, field, type, placeholder, width }]

function DataGrid({ columns, items: initialItems, onItemsChange }) {
  const emptyLineItem = columns.reduce((acc, col) => ({ ...acc, [col.field]: "" }), {});
  const [items, setItems] = useState(initialItems && initialItems.length ? initialItems : [{ ...emptyLineItem }]);

  useEffect(() => {
    if (typeof onItemsChange === "function") {
      onItemsChange(items);
    }
    // eslint-disable-next-line
  }, [items]);

  const handleChange = (idx, newItem) => {
    const updated = [...items];
    updated[idx] = newItem;
    setItems(updated);
  };
  const handleAdd = () => {
    setItems([...items, { ...emptyLineItem }]);
  };
  const handleRemove = idx => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== idx));
    }
  };

  return (
    <div className="mb-3">
      {/* <label className="form-label">Line Items</label> */}
      <div className="table-responsive">
        <table className="table table-bordered align-middle mb-0">
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th key={col.field || i} style={col.width ? { width: col.width } : {}}>
                  {col.header}
                </th>
              ))}
              <th style={{ width: "40px" }}></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx} className={styles.tr}>
                {columns.map((col, cidx) => (
                  <td key={col.field || cidx} className={styles.td}>
                    {col.type === "amount" ? (
                      <input
                        type="text"
                        inputMode="decimal"
                        pattern="^\\d*(\\.\\d{0,2})?$"
                        className={`form-control text-end ${styles.sd}`}
                        value={
                          item[col.field] !== undefined && item[col.field] !== ""
                            ? Number(item[col.field]).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                            : ""
                        }
                        onChange={e => {
                          // Remove non-numeric except dot, allow max 2 decimals
                          let val = e.target.value.replace(/[^\d.]/g, "");
                          if (val.split(".").length > 2) val = val.replace(/\.+$/, "");
                          if (/^\d*(\.\d{0,2})?$/.test(val)) {
                            handleChange(idx, { ...item, [col.field]: val });
                          }
                        }}
                        placeholder={col.placeholder || col.header}
                        maxLength={15}
                      />
                    ) : (
                      <input
                        type={col.type || "text"}
                        className={`form-control ${styles.sd}`}
                        value={item[col.field] ?? ""}
                        onChange={e => handleChange(idx, { ...item, [col.field]: e.target.value })}
                        placeholder={col.placeholder || col.header}
                      />
                    )}
                  </td>
                ))}
                <td>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemove(idx)}
                    disabled={items.length === 1}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}  
             <tr  className={styles.tr}>
              
       {columns.map((col, i) => (
                <td key={col.field || i} style={col.width ? { width: col.width } : {}}>
                  {/* {col.header} */}
                </td>
              ))}
              <td style={{ width: "40px" }}></td>

              
                </tr>
          </tbody>
        </table>
      </div>
      <button type="button" className="btn btn-outline-primary btn-sm mt-2" onClick={handleAdd}>
        <i className="bi bi-plus"></i> Add Line
      </button>
    </div>
  );
}

export default DataGrid;
