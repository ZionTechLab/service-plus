import React, { useEffect } from 'react';
import './Modal.css';

const Modal = ({ show, onClose, title, children }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (show) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [show, onClose]);

  if (!show) {
    return null;
  }

  return (
    <div>
      <div className="modal-backdrop fade show"></div>
      <div
        className="modal fade show"
        tabIndex="-1"
        role="dialog"
      >
        <div className="card">
          <div className="card-header">
            <h5 className="card-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="card-body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
