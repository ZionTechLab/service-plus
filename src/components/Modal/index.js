
import React from 'react';
import './Modal.css';

const Modal = ({ show, onClose, title, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div>
      <div className="modal-backdrop fade show" style={{ zIndex: 1040 }}></div>
      <div
        className="modal fade show"
        style={{
          display: 'block',
          zIndex: 1050,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        tabIndex="-1"
      >
        <div className="card">
          <div className="card-header">
            <h5 className="card-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              style={{ position: 'absolute', right: '1rem', top: '1rem' }}
            ></button>
          </div>
          <div className="card-body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
