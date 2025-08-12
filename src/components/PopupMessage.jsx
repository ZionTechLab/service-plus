
import React, { useState, useCallback } from 'react';

/**
 * usePopupMessage hook for showing confirmation/success popups inline.
 * Returns [PopupMessage JSX, showPopup, closePopup, setPopupOptions]
 */
function usePopupMessage(initialOptions = {}) {
  const [show, setShow] = useState(false);
  const [options, setOptions] = useState({
    message: '',
    onConfirm: null,
    onClose: null,
    confirmText: 'Okay',
    cancelText: '',
    type: 'success',
    ...initialOptions
  });

  const showPopup = useCallback((opts = {}) => {
    setOptions(prev => ({ ...prev, ...opts }));
    setShow(true);
  }, []);

  const closePopup = useCallback(() => {
    setShow(false);
    if (options.onClose) options.onClose();

  }, 
    // eslint-disable-next-line
  [options.onClose]);

  const handleConfirm = useCallback(() => {
    setShow(false);
    if (options.onConfirm) options.onConfirm();
        // eslint-disable-next-line
  },  [options.onConfirm]);

  const PopupMessage = show ? (
    <>
      <div className="modal fade show" style={{ display: 'block', zIndex: 2000 }} tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className={`modal-header bg-${options.type} text-white`}>
              <h5 className="modal-title">{options.type === 'danger' ? 'Oops !' : 'Success'}</h5>
            </div>
            <div className="modal-body">
              <p>{options.message}</p>
            </div>
            <div className="modal-footer">
              {options.onConfirm ? (
                <>
                  <button className={`btn btn-${options.type}`} onClick={handleConfirm}>{options.confirmText}</button>
                  <button className="btn btn-secondary" onClick={closePopup}>{options.cancelText || 'Cancel'}</button>
                </>
              ) : (
                <button className={`btn btn-${options.type}`} onClick={closePopup}>{options.confirmText}</button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" style={{ zIndex: 1999 }}></div>
    </>
  ) : null;

  return [PopupMessage, showPopup, closePopup, setOptions];
}

export default usePopupMessage;
