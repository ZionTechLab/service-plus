import React from "react";
import styles from "./InvoiceLineItems.module.css";

// columns: [{ header, field, type, placeholder, width }]
function InvoiceLineItems({ items, columns, onChange, onAdd, onRemove }) {
  return (
    <div className="mb-3">
      <label className="form-label">Line Items</label>
      <div className="table-responsive">
        <table className="table table-bordered align-middle mb-0">
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th key={col.field || i} style={col.width ? { width: col.width } : {}}>
                  {col.header}
                </th>
              ))}
              <th style={{ width: "15%" }}></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx} className={styles.tr}>
                {columns.map((col, cidx) => (
                  <td key={col.field || cidx} className={styles.td}>
                    <input
                      type={col.type || "text"}
                      className={`form-control ${styles.sd}`}
                      value={item[col.field] ?? ""}
                      onChange={e => onChange(idx, { ...item, [col.field]: e.target.value })}
                      placeholder={col.placeholder || col.header}
                    />
                  </td>
                ))}
                <td>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => onRemove(idx)}
                    disabled={items.length === 1}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button type="button" className="btn btn-outline-primary btn-sm mt-2" onClick={onAdd}>
        <i className="bi bi-plus"></i> Add Line
      </button>
    </div>
  );
}

export default InvoiceLineItems;
