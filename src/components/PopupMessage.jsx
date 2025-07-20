import React from 'react';

function PopupMessage({ show, message, onClose }) {
  if (!show) return null;
  return (
    <>
      <div className="modal fade show" style={{ display: 'block', zIndex: 2000 }} tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title">Success</h5>
            </div>
            <div className="modal-body">
              <p>{message}</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-success" onClick={onClose}>Okay</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" style={{ zIndex: 1999 }}></div>
    </>
  );
}

export default PopupMessage;
