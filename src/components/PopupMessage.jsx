import React from 'react';

function PopupMessage({ show, message, onClose, onConfirm, confirmText = 'Okay', cancelText, type = 'success' }) {
  if (!show) return null;
  return (
    <>
      <div className="modal fade show" style={{ display: 'block', zIndex: 2000 }} tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className={`modal-header bg-${type} text-white`}>
              <h5 className="modal-title">{type === 'danger' ? 'Confirm' : 'Success'}</h5>
            </div>
            <div className="modal-body">
              <p>{message}</p>
            </div>
            <div className="modal-footer">
              {onConfirm ? (
                <>
                  <button className={`btn btn-${type}`} onClick={onConfirm}>{confirmText}</button>
                  <button className="btn btn-secondary" onClick={onClose}>{cancelText || 'Cancel'}</button>
                </>
              ) : (
                <button className={`btn btn-${type}`} onClick={onClose}>{confirmText}</button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" style={{ zIndex: 1999 }}></div>
    </>
  );
}

export default PopupMessage;
