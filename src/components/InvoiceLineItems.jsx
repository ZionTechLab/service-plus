import React from "react";
import "./InvoiceLineItems.css";

function InvoiceLineItems({ items, onChange, onAdd, onRemove }) {
  return (
    <div className="mb-3">
      <label className="form-label">Description / Amount</label>
      <div className="table-responsive">
        <table className="table table-bordered align-middle mb-0">
          <thead>
            <tr>
              <th style={{ width: "60%" }}>Description</th>
              <th style={{ width: "25%" }}>Amount</th>
              <th style={{ width: "15%" }}></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx}>
                <td>
                  <input
                    type="text"
                    className="form-control no-padding-input"
                    value={item.description}
                    onChange={e => onChange(idx, { ...item, description: e.target.value })}
                    placeholder="Description"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control no-padding-input"
                    value={item.amount}
                    onChange={e => onChange(idx, { ...item, amount: e.target.value })}
                    placeholder="Amount"
                  />
                </td>
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
