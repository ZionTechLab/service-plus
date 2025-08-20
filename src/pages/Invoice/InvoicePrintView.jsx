import React from 'react';
import './Invoice.css';

const InvoicePrintView = ({ formikValues, lineItems = [], isTaxInvoice }) => {
  const values = formikValues || {};

  return (
    <div className="invoice-print-layout">
      <header className="inv-header">
        <h1 className="inv-title">Samanala Enterprises</h1>
        <div className="inv-sub">Importers of Heavy Equipments, Hiring of Earth Moving Machineries & Transporters and Spare Parts Suppliers</div>
        <div className="inv-contact">Thambarawila, Waikkala. Tel : 031 2278 365 / 0777 712 213 / 0777 880 989</div>
        <div className="inv-box">INVOICE</div>
      </header>

      <section className="inv-meta">
        <div>
          <div>To : <span className="inv-underline">{values.partner?.name || values.partner || ""}</span></div>
          <div>Address : <span className="inv-underline">{values.partner?.address || ""}</span></div>
        </div>
        <div className="inv-right">
          <div>Type of Vehicle : <span className="inv-underline">{values.ref1 || ""}</span></div>
          <div>Date : <span className="inv-underline">{values.txnDate || ""}</span></div>
        </div>
      </section>

      <section className="inv-table">
        <table>
          <thead>
            <tr>
              <th className="desc">Description</th>
              <th className="amt">Amount</th>
            </tr>
          </thead>
          <tbody>
            {lineItems && lineItems.length ? (
              lineItems.map((li, idx) => (
                <tr key={idx}>
                  <td className="desc">{li.description}</td>
                  <td className="amt">{li.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="desc">&nbsp;</td>
                <td className="amt">&nbsp;</td>
              </tr>
            )}

            {Array.from({ length: Math.max(12 - (lineItems?.length || 0), 0) }).map((_, i) => (
              <tr key={`blank-${i}`}>
                <td className="desc">&nbsp;</td>
                <td className="amt">&nbsp;</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="inv-km">K.M. / Hours</div>
      </section>

      <section className="inv-bottom">
        <div className="left">
          <div>Prepared by : <span className="inv-dots">......................................</span></div>
          <div className="received">Received by</div>
        </div>
        <div className="right">
          <div className="tot-row"><span>Amount</span><span>{values.amount}</span></div>
          {!isTaxInvoice && <div className="tot-row"><span>Advance</span><span>{values.advance}</span></div>}
          <div className="tot-row total"><span>Total Amount</span><span>{values.totalAmount}</span></div>
        </div>
      </section>

      <div className="inv-serial">{values.id || ""}</div>
    </div>
  );
};

export default InvoicePrintView;
